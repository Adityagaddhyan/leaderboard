const mongoose =require('mongoose');
const {Schema}=require('mongoose');
const userSchema=new Schema({
    // (Name, Age, Location, Email Id, phoneNumber).
    name: {
        type: String,
        maxlength: 40,
    },
    email: {
        type: String,
        trim: true,
        sparse:true,
        index:true,
        unique: true,
    },
    location:{
        type:String,
        trim:true
    },
    phone:{
        type:String,
        trim:true,
        unique:true,
        index:true,
        required: true

    },
    passwordHash: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: "player"
    },
    
})
const User=mongoose.model('User',userSchema);
module.exports=User;