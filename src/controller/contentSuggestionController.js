const { generateSuggestionForGoal } = require('../service/contentSuggestionService');

const getSuggestionFromGoalId = async (req, res) => {
    try {
        const goal=req.body.goal
        const suggestion = await generateSuggestionForGoal(goal);

        return res.status(201).json({
            success: true,
            message: 'Suggestion generated for goal',
            data: suggestion,
            error: {}
        });

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.reason || "Something went wrong",
            data: {},
            error
        });
    }
};

module.exports = {
    getSuggestionFromGoalId
};
