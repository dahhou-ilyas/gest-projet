const mongoose=require('mongoose');

const ProjectSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    tasks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId
    }
})

const Project=mongoose.model('Project',ProjectSchema);

module.exports=Project;