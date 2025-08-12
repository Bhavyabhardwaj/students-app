const mongoose= require('mongoose');
const { stringify } = require('postcss');
const roadmapSchema= new mongoose.Schema({
    user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    content:{
        type:String
    },
    roadmapName:{
        type:String,
      
        
    },
    goalName:{
        type:String,

    },
     deadline: {
        type: Date,
        
    }

})
module.exports = mongoose.model('Roadmap', roadmapSchema);
