const mongoose=require("mongoose");
const bcrypt=require('bcrypt')

const UserSchema=new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
})

UserSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    try {
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(this.password,salt);

        this.password=hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
})

const User = mongoose.model('User', UserSchema);

module.exports=User;