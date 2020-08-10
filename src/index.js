

const express = require("express")
const app = express()
const PORT = 4000;
const cors = require("cors")

// const middleware = (req,res,next)=>{
//     console.log("middleware executed")
//     next()
// }


const mongo = require("mongoose")
const {mongoUrl} = require("./keys")

mongo.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(connect=>console.log(" mongoDb connected"))
.catch(err=>console.log(err))

// mongo.connection.on("connected",()=>console.log("mongoDB connected"))
// mongo.connection.on("error",()=>console.log("not connected"))


require("./server/models/post")
require("./server/models/users")
app.use(cors())
app.use(express.json())
app.use(require('./server/routes/auth'))
app.use(require('./server/routes/post'))
app.use(require('./server/routes/user'))


app.listen(process.env.PORT || PORT,()=>{
    console.log("server is running on port ","http://localhost:"+PORT)
})