
const Goal = require('../schema/goalSchema');



async function addGoal(goalDetails) {
    try {
        const response = await Goal.create(goalDetails);
        return response;
    } catch(error){
        console.log(error)
    }
    
}

async function deleteGoal(goalID){
    try{
        const response= await Goal.findByIdAndDelete(goalID)
        return response
    }
    catch(error){
        console.log(error)
    }
}


module.exports = {
    
    addGoal,deleteGoal
};