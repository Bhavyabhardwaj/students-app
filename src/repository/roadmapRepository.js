const { response } = require('express');
const Roadmap = require('../schema/roadmapSchema');

async function roadmapFind(id) {
    try {
        const roadmap = await Roadmap.findById(id);
        return roadmap;
    } catch (error) {
        console.log(error);
    }
}

async function findAllRoadmaps(userId) {
    try {
        const response = await Roadmap.find({ user: userId });
        return response;
    } catch (error) {
        console.log("Error in roadmapRepository -> findAllRoadmaps:", error);
        throw error;
    }
}

async function roadmapSave(roadmapDetails) {
    try {
        const response = await Roadmap.create(roadmapDetails);
        return response;
    } catch (error) {
        console.log(error);
    }
}

async function deleteById(id) {
    try {
        const response = await Roadmap.findByIdAndDelete(id);
        return response;
    } catch (error) {
        console.log("Error in roadmapRepository -> deleteById:", error);
        throw error;
    }
}

module.exports = {
    roadmapSave,
    roadmapFind,
    findAllRoadmaps,
    deleteById
};
