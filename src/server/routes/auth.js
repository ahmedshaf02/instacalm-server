
const express = require("express")
const router = express.Router()
const mongo =  require("mongoose")
const User = mongo.model("User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {jsonKey} = require("../../keys")
const requireLogin = require("../middleware/requireLogin")


router.post("/signup",(req,res)=>{
    const{name,email,password,image} = req.body
    if(!name || !email || !password){
     return  res.status(422).json({error:"please add all the fields"})
    }

    User.findOne({email:email})
    .then(savedUser=>{
        if(savedUser){
          return  res.json({message:"user already exist with this email"})
        }
        bcrypt.hash(password,12)
        .then(hashedPassword=>{
            
            const user = new User({
                name,
                email,
                password:hashedPassword,
                image
            })
    
            user.save().then(user=>{
                res.json({message:"signup successfully"})
            }).catch(err=>console.log(err))
        })

    }).catch(err=>console.log(err))
})


router.get("/user", requireLogin,(req,res)=>{
    res.json({user:req.user})
})
router.get("/",(req,res)=>{
    res.send("app")
})



router.post("/signin",(req,res)=>{
    const {email,password} = req.body
    if(!email || ! password){
        res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
         return   res.status(422).json({error:"invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
            //  return   res.json({message:"successfully signed in"})
            const token = jwt.sign({_id:savedUser._id},jsonKey)
            const{_id,name,email,following,follower,image} = savedUser
            res.json({token,user:{_id,name,email,following,follower,image}})
            }
            else{
             return res.status(422).json({error:"invalid email or password"})
            }
        })
        .catch(err=>console.log(err))
    })
})

module.exports = router