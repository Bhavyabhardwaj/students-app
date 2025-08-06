const axios = require('axios');
const Goal = require('../schema/goalSchema');
const ContentSuggestion = require('../schema/contentSuggestionSchema');
const { saveSuggestion } = require('../repository/contentSuggestionRepository');

async function generateSuggestionForGoal(goal) {
    try {
       
       

        const goalText =goal;

        // 2. Call AI API
        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'llama3-70b-8192',
                messages: [
                    {
                        role: 'user',
                        content: `bhai iss goal k liye you tube videos k link bhej do  : "${goal}". `,
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

        

                

        return suggestionText;

    } catch (error) {
        console.error('Suggestion Error:', error.response?.data || error.message);
        throw { reason: "Failed to generate suggestion", statusCode: 500 };
    }
}

module.exports = {
    generateSuggestionForGoal
};
