const axios = require('axios');
const Goal = require('../schema/goalSchema');
const ContentSuggestion = require('../schema/contentSuggestionSchema');
const { saveSuggestion } = require('../repository/contentSuggestionRepository');

async function generateSuggestionForGoal(goalId, userId) {
    try {
        // 1. Fetch goal
        const goalDoc = await Goal.findById(goalId);

        if (!goalDoc) {
            throw { reason: "Goal not found", statusCode: 404 };
        }

        const goalText = goalDoc.goal;

        // 2. Call AI API
        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'llama3-70b-8192',
                messages: [
                    {
                        role: 'user',
                        content: `Suggest best curated learning resources for this goal: "${goalText}". 
Include:
- Top YouTube videos (title + channel)
- Practice platforms
- Useful websites or tools
- Study structure or tips.`,
                    },
                ],
                temperature: 0.7,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const suggestionText = response.data.choices[0].message.content;

        // 3. Save to DB
        const saved = await saveSuggestion({
            goal: goalId,
            user: userId,
            suggestionText
        });

        // 4. Refetch full document to ensure populated fields
        const fullSuggestion = await ContentSuggestion.findById(saved._id)
            .populate('goal', 'goal category deadline')  // optional: populate goal details
            .populate('user', 'name email');             // optional: populate user info

        return fullSuggestion;

    } catch (error) {
        console.error('Suggestion Error:', error.response?.data || error.message);
        throw { reason: "Failed to generate suggestion", statusCode: 500 };
    }
}

module.exports = {
    generateSuggestionForGoal
};
