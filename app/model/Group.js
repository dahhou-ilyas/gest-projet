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
    }
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

GroupSchema.methods.inviteUser=async function (userId){
    try {
        if(!this.users.includes(userId)){
            this.users.push(userId);
            await this.save();
            return true;
        }else{
            return false;
        }
    } catch (error) {
        throw error
    }
}

const Group=mongoose.model('Group',GroupSchema);

module.exports = Group