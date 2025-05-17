const { createGoal } = require("../service/goalService");

async function goalAdd(req, res) {
    try {
        // Assume user is authenticated by middleware and req.user is set
        const goalData = {
            ...req.body,
            userId: req.user.id  // req.user is set in isLoggedIn middleware
        };

        const response = await createGoal(goalData);

        return res.status(201).json({
            message: 'Successfully added the goal',
            success: true,
            data: response,
            error: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.reason || "Something went wrong",
            data: {},
            error: error
        });
    }
}

module.exports = {
    goalAdd
}
