
const Roadmap = require('../schema/roadmapSchema');



async function roadmapSave(roadmapDetails) {
    try {
        const response = await Roadmap.create(roadmapDetails);
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
    
    roadmapSave,deleteGoal
};