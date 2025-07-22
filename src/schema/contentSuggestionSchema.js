const mongoose = require('mongoose');

const contentSuggestionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',     // ✅ IMPORTANT
        required: true
    },
    goal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Goal',
        required: true
    },
    suggestionText: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ContentSuggestion', contentSuggestionSchema);
