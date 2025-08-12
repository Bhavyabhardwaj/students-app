const { roadmapSave, findAllRoadmaps, deleteById } = require('../repository/roadmapRepository');
const { roadmapFind } = require('../repository/roadmapRepository');

async function findRoadmapById(id) {
    const myRoadmap = await roadmapFind(id);
    if (!myRoadmap) {
        throw { reason: "Roadmap not found", statusCode: 401 };
    }
    return myRoadmap;
}

async function SavingRoadmap(roadmapDetails) {
    const newRoadmap = await roadmapSave(roadmapDetails);

    if (!newRoadmap) {
        throw { reason: "Roadmap not saved", statusCode: 501 };
    }

    return newRoadmap;
}

async function getUserRoadmaps(userId) {
    try {
        const roadmaps = await findAllRoadmaps(userId);
        return roadmaps;
    } catch (error) {
        console.log("Error in roadmapService -> getUserRoadmaps:", error);
        throw error;
    }
}

async function deleteRoadmapById(id) {
    const deleted = await deleteById(id);
    if (!deleted) {
        throw { reason: "Roadmap not found or already deleted", statusCode: 404 };
    }
    return deleted;
}

module.exports = {
    SavingRoadmap,
    findRoadmapById,
    getUserRoadmaps,
    deleteRoadmapById
};
