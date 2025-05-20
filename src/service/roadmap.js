const {roadmapSave} = require('../repository/roadmapRepository');
const {roadmapFind}=require('../repository/roadmapRepository')


async function findRoadmapById(id){
    const myRoadmap=await roadmapFind(id)
    if(!myRoadmap){
        throw{reason:"roadmap not found",statusCode:401}
    }
    return  myRoadmap;
}

async function SavingRoadmap(roadmapDetails) {
    const newRoadmap = await roadmapSave(roadmapDetails);

    if (!newRoadmap) {
        throw { reason: "Roadmap not saved", statusCode: 501 };
    }

    return newRoadmap;
}

module.exports = {
    SavingRoadmap,findRoadmapById
};
