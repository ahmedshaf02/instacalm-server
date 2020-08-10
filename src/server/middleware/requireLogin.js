
const jwt = require("jsonwebtoken")
const { jsonKey } = require("../../keys")
const mongo  = require("mongoose")
const User = mongo.model("User")

module.exports = (req,res,next)=>{
    const{authorization} = req.headers
    // authorization  = "Bearer dnsjvnsdvjsdn"
    if(!authorization){
        res.status(401).json({error:"you must be sign in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,jsonKey,(err,payload)=>{
        if(err){
         return   res.status(401).json({error:"you must be sign in"})
        }
        const {_id} = payload
        User.findById(_id).then(userdata=>{
            req.user = userdata
            console.log(req.user)
            next()
        })

    })
}