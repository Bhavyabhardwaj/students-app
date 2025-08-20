const mongoose = require('mongoose');

const contentSuggestionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',     
        required: true
    },
    goal: {
        type:String
    },
    suggestionText: {
        type: String
       
    },
    contentName:{
        type:String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ContentSuggestion', contentSuggestionSchema);
