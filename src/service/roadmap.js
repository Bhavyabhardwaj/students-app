const { roadmap } = require('../controller/openaiController');
const {roadmapSave}=require('../repository/roadmapRepository')


async function SavingRoadmap(roadmapDetails){
    const newRoadmap= await roadmapSave({
        roadmapDetails : roadmap
 })
    if(!newRoadmap){
        throw({reason: "Roadmap not saved" ,statusCode:501})
        
    }
    return newRoadmap;
}

module.exports={
    SavingRoadmap
}