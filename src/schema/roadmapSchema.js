const mongoose= require('mongoose')
const roadmapSchema= new mongoose.Schema({
    content:{
        type:String
    },
    roadmapName:{
        type:String,
      
        
    }
})
module.exports = mongoose.model('Roadmap', roadmapSchema);
