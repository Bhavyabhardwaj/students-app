const Goal = require('../schema/goalSchema');



async function createGoal(goalDetails) {
    try {
        const response = await Goal.create(goalDetails);
        return response;
    } catch(error){
        console.log(error)
    }
    
}

module.exports = {
    
    createGoal
};