
const { response } = require('express');
const Roadmap = require('../schema/roadmapSchema');

async function roadmapFind(id){
    try{
       const roadmap=await Roadmap.findById(id);
        return roadmap;
    }catch(error){
        console.log(error)
    }
}



async function roadmapSave(roadmapDetails) {
    try {
        const response = await Roadmap.create(roadmapDetails);
        return response;
    } catch(error){
        console.log(error)
    }
    
}





module.exports={
    roadmapSave,roadmapFind}