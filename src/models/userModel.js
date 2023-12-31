const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    lastname:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    telegramNick:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },  
    ReferralCode:{
        type:String,
        required:true
    },  
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: true,
    },
},
{
    timestamps: true
}
)

module.exports =mongoose.model("User",userSchema)