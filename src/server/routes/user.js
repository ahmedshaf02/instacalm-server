
const express = require("express")
const router = express.Router()
const mongo =  require("mongoose")
const requireLogin = require("../middleware/requireLogin")
const Post = mongo.model("Post")
const User = mongo.model("User")


// to see other user profile
router.get("/user/:id",requireLogin,(req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{

        Post.find({postedBy:req.params.id})
        .populate("postedBy","_id name")
        .exec((err,post)=>{
            if(err){
                res.status(422).json({error:err})
            }
            res.json({user,post})
        })
        
    }).catch(error=>res.status(404).json({error:"User not found"}))
})
    
// to search user 
router.get("/search/:name",requireLogin,(req,res)=>{

    let regex = new RegExp(req.params.name,"i")
    User.find({name:regex})
    .then(data=>{
        console.log(data)
        res.json(data)
    })
    .catch(err=>console.log(err))
})

router.put("/updateimage",requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{
        $set:{image:req.body.image}
    },{new:true},
    (err,data)=>{
        if(err || !data){
            res.status(422).json({error:"not updated"})
        }
        res.json(data)
    }
    )
   
})
// my followed post 
router.get("/followingpost",requireLogin,(req,res)=>{
    Post.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name")
    .populate("comment.postedBy","_id name")
    .then(posts=>{
        console.log(posts)
        res.json({posts})
    })
    .catch(err=>{
        res.json({error:err})
    })
})
       
module.exports = router