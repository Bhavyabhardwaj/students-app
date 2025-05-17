const {addGoal}=require('../repository/goalRepository')

async function createGoal(goalDetails){
    const newGoal= await addGoal({
        goal : goalDetails.goal,
        category: goalDetails.category,
        deadline: goalDetails.deadline


    })
    if(!newGoal){
        throw({reason: "goal not Added" ,statusCode:501})
        
    }
    return newGoal;
}

module.exports={
    createGoal
}