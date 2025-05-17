const Goal = require('../schema/goalSchema');



async function addGoal(goalDetails) {
    try {
        const response = await Goal.create(goalDetails);
        return response;
    } catch(error){
        console.log(error)
    }
    
}

module.exports = {
    
    addGoal
};