const express = require("express")
const app = express()
const Posts = require("../module/posts")
const requireLogin = require("../middlewares/requireLogin")

app.post("/createpost",requireLogin,async(req,res)=>{
    const{title,body} = req.body
    if(!title || !body){
        res.status(422).json({error:"Please add all the fields"})
    }
    try{
        const post= new Posts({
            title,
            body, 
            postedBy:req.user
        })
        await post.save()
        res.send(Post)
    }catch (err){
        res.status(500).json({mssg:"Internal server error"})
    }
})

app.get("/allpost",requireLogin,async(req,res)=>{
    try{
     let allPost= await Posts.find().populate("postedBy","_id username displayname")
     res.send(allPost)
    }catch(err){
    res.status(500).json({mssg:"Internal sever error"})
    }
})

app.get("/mypost",requireLogin,async(req,res)=>{
   try{
    let myPost =await Posts.find({postedBy:req.user._id})
    .populate("postedBy","_id username displayname")
    res.send(myPost)
   }catch(err){
    res.status(500).json({mssg:"Internal sever error"})
   }
})


module.exports = app