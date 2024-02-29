const mongoose=require('mongoose');
const GroupSchema=new mongoose.Schema({
    name:String,
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    cretedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
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