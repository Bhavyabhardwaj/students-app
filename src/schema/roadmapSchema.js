const mongoose= require('mongoose')
const roadmapSchema= new mongoose.Schema({
    content:{
        type:String
    },
    roadmapName:{
        type:String,
        required:true
        
    }
})
module.exports = mongoose.model('Roadmap', roadmapSchema);
