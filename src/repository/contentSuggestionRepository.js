const ContentSuggestion = require('../schema/contentSuggestionSchema');

async function saveSuggestion(details) {
    try {
        const result = await ContentSuggestion.create(details);
        return result;
    } catch (error) {
        console.log("Repo Save Error:", error);
        return null;
    }
}

async function getSuggestionsByUser(userId) {
    try {
        const result = await ContentSuggestion.find({ user: userId }).sort({ createdAt: -1 });
        return result;
    } catch (error) {
        console.log("Repo Fetch Error:", error);
        return null;
    }
}

module.exports = {
    saveSuggestion,
    getSuggestionsByUser
};
