const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',   
        required: true
    },
    goal: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Web Development', 'DSA', 'ML', 'AI', 'Other'], 
        default: 'Other'
    },
    deadline: {
        type: Date,
        required: true
    },
    progress: {
        type: Number,
        default: 0, 
        min: 0,
        max: 100
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
        default: 'Not Started'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Goal', goalSchema);
