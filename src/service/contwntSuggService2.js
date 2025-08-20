const { contentSave, contentFind,findAllContents,deleteById } = require('../repository/contentSuggestionRepository');


async function findContentById(id) {
    const myContent = await contentFind(id);
    if (!myContent) {
        throw { reason: "Content not found", statusCode: 401 };
    }
    return myContent;
}

async function SavingContent(contentDetails) {
    const newContent = await contentSave(contentDetails);

    if (!newContent) {
        throw { reason: "Content not saved", statusCode: 501 };
    }

    return newContent;
}

async function getUserContents(userId) {
    try {
        const contents = await findAllContents(userId);
        return contents;
    } catch (error) {
        console.log("Error in contentService -> getUserContents:", error);
        throw error;
    }
}

async function deleteContentById(id) {
    const deleted = await deleteById(id);
    if (!deleted) {
        throw { reason: "Content not found or already deleted", statusCode: 404 };
    }
    return deleted;
}

module.exports = {
    SavingContent,
    findContentById,
    getUserContents,
    deleteContentById
};
