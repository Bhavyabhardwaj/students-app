const { response } = require('express');
const Content = require('../schema/contentSuggestionSchema');

async function contentFind(id) {
    try {
        const content = await Content.findById(id);
        return content;
    } catch (error) {
        console.log(error);
    }
}

async function findAllContents(userId) {
    try {
        const response = await Content.find({ user: userId });
        return response;
    } catch (error) {
        console.log("Error in contentRepository -> findAllContents:", error);
        throw error;
    }
}

async function contentSave(contentDetails) {
    try {
        const response = await Content.create(contentDetails);
        return response;
    } catch (error) {
        console.log(error);
    }
}

async function deleteById(id) {
    try {
        const response = await Content.findByIdAndDelete(id);
        return response;
    } catch (error) {
        console.log("Error in contentRepository -> deleteById:", error);
        throw error;
    }
}

module.exports = {
    contentSave,
    contentFind,
    findAllContents,
    deleteById
};
