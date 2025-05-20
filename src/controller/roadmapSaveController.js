const {SavingRoadmap, findRoadmapById} = require("../service/roadmap");
const { roadmap } = require("./openaiController");

async function saveRoadmap(req, res) {
        const {content} = roadmap
        const {raodmapName}=req.body

    const roadmapDetails = {
        content,raodmapName
    };
    
        const response = await SavingRoadmap(roadmapDetails);

        return res.status(201).json({
            message: 'Successfully saved the roadmap',
            success: true,
            data: response,
            error: {}
        });
    } 
async function findRoadmap(req, res) {
    try {
        const response = await findRoadmapById(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched the roadmap',
            error: {},
            data: response
        })
    } catch (error){
        console.log(error)
    }
}


module.exports = {
    saveRoadmap,findRoadmap
}
