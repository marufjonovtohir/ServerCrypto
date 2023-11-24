const bcrypt =require("bcrypt")
const { json } = require("express")
const JWT = require ("jsonwebtoken")
const crypto = require('crypto')

const User = require("../models/userModel")

const userCtrl = {
signup: async(req,res) => {
    try {
        const {name, password, email, lastname, role,telegramNick,ReferralCode} = req.body

        if(!name || !password || !email || !lastname ||!role || !telegramNick || !ReferralCode ) {
            function ReferralCode() {
                
                const randomString = crypto.randomBytes(6).toString('hex').toUpperCase();
                
                const referralCode = `REF-${randomString}`;
              
                return referralCode;
            }
            return res.status(400).json({msg: "Please fill all lines"})
        }
        

        const checkUser = await User.findOne({email,ReferralCode})

        if(checkUser) {
            return res.status(403).json({msg: "This email already exist!"})
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)
        
        
        const newUser = await User({name,password: hashedPassword,lastname, email, role,telegramNick,ReferralCode})
        
        await newUser.save()
  
        const token = JWT.sign({name, id: newUser._id},
            process.env.JWT_SECRET_KEY,{expiresIn:"2h"})

        res.status(201).json({msg: "signup successfuly", newUser,token })
      
        
    } catch (error) {
        res.json({msg: error.message})
    }
},
login : async(req,res)=>{
try {
    const {email, password} =req.body
    if (!email || !password) {
        return res.status(400).json({msg: "Please fill all lines"})
    }
    const user = await User.findOne({email})
    if (user) {
        const verifyPass =await bcrypt.compare(password, user.password)

        if (verifyPass) {
            const token = await  JWT.sign({id: user.id, name: user.name, lastname: user.lastname, role: user.role},process.env.JWT_SECRET_KEY,{expiresIn:'2h'})

            return res.status(200).json({msg:"Login successfuly", token})
        }
        return res.status(400).json({msg:"Email or password incorrect"})
    }
    res.status(400).json({msg:"User not found"})
} catch (error) {
    res.json({msg: error.message})
}
},
getAllUsers: async (req, res) => {
    try {
        const users = await User.find({})

        res.status(200).json({message: "All users", users})
    } catch (error) {
        res.status(403).json(error)
    }
},
}


module.exports = userCtrl