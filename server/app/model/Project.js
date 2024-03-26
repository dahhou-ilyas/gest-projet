const mongoose=require('mongoose');

const ProjectSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    descriptionProjet:{
        type:String,
        required:true
    },
    tasks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }
})

const Project=mongoose.model('Project',ProjectSchema);

module.exports=Project;