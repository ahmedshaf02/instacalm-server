
const mongo = require("mongoose")
const {ObjectId} = mongo.Schema.Types
const postSchema = new mongo.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    likes:[{type:ObjectId,ref:"User"}],
    comment:[{
        text:String,
        postedBy:{type:ObjectId,ref:"User"}
    }],

    postedBy:{
        type: ObjectId,
        ref:"User"
    }
})
module.exports = mongo.model("Post",postSchema)