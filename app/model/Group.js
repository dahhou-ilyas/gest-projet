const mongoose=require('mongoose');

const GroupSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    invitationToken: {
        type: String,
        unique: true
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }]
});

GroupSchema.pre('save',async function (next){
    if(!this.isNew){
        return next();
    }
    try {
        if(!this.users.includes(this.cretedBy)){
            this.users.push(this.cretedBy)
        }
        next();
    } catch (error) {
        next(error)
    }
})

const Group=mongoose.model('Group',GroupSchema);

module.exports = Group