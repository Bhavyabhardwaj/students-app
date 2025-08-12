const {addGoal,deleteGoal, findAllGoals}=require('../repository/goalRepository')

async function findGoal(goalID){
    const response= await deleteGoal(goalID)
    return response
}

async function createGoal(goalDetails){
    const newGoal = await addGoal({
        user: goalDetails.userId, 
        goal: goalDetails.goal,
        category: goalDetails.category,
        deadline: goalDetails.deadline
    });
    if (!newGoal) {
        throw({ reason: "goal not Added", statusCode: 501 });
    }
    return newGoal;
}

async function showAllGoals(userId){
    const response = await findAllGoals(userId);
    return response;
}


module.exports={
    createGoal,findGoal,showAllGoals
}