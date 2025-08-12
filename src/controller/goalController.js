const { createGoal,findGoal, showAllGoals } = require("../service/goalService");

async function goalAdd(req, res) {
    try {
        
        const goalData = {
            ...req.body,
            userId: req.user.id  
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

async function goalDelete(req, res) {
    try {
        const response = await findGoal(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Successfully deleted the goal',
            error: {},
            data: response
        })
    } catch (error) {
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                error: error
            });
        }
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            error: error
        });
    }
}

async function showGoals(req, res) {
    try {
        const response = await showAllGoals(req.user.id);

        return res.status(200).json({
            message: 'Successfully fetched the goals',
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
    goalAdd,goalDelete,showGoals
}
