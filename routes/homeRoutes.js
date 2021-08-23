const express = require("express")
const app = express()
const UserInfo = require("../module/userInfo")
const User = require("../module/user")
const requireLogin = require("../middlewares/requireLogin")

app.get("/",requireLogin,(req,res)=>{
    console.log("HOMMMMMMMMMMMMME")
    res.send(`This is ${req.user} page`)
})

app.get("/nearby",requireLogin,async(req,res)=>{
    let mainUser= await UserInfo.findOne({user :req.user})
   console.log(mainUser.geometry.coordinates) 
   
    try{
        let nearby = await UserInfo.aggregate().near({
            near: mainUser.geometry.coordinates,
            distanceField: "dist", // required
            maxDistance: 100000,
            spherical: true, // required
        
        })//.limit(1)
        let nearbyUsers= await User.populate(nearby, {path: "user"})
    
        res.send(nearbyUsers)
    }catch(err){
        res.status(500).json({message:{msgBody:"Internal Sever Error", msgError:true}})
    }
})

app.get("/userinfo",requireLogin, async(req,res)=>{
    let user = await UserInfo.findOne({user:req.user})
    console.log(user)
    try{
        res.send(user)
    }catch(err){
        res.status(500).json({message:{msgBody:"Internal Sever Error", msgError:true}})
    }
})

app.put("/follow",requireLogin,async(req,res)=>{
    let followId = req.body
    //console.log(followId)
    console.log("here")
   try{
        let secUser= await UserInfo.findOne({user:followId.followId})
        secUser.followers.push(req.user)
        await secUser.save()
        console.log("did one")

        let primeUser=await UserInfo.findOne({user:req.user.id})
        primeUser.following.push(followId.followId)
        await primeUser.save()
        console.log("done")
        res.status(201).send({mssg:"Following done",primeUser, secUser})
    }catch(err){
        res.status(500).send("Internal server error")
    }
})

app.put("/unfollow",requireLogin,async(req,res)=>{
    let followId = req.body
    //console.log(followId)
    console.log("here")
   try{
        let secUser= await UserInfo.findOne({user:followId.followId})
        secUser.followers.pull(req.user)
        await secUser.save()
        console.log("did one")

        let primeUser=await UserInfo.findOne({user:req.user.id})
        primeUser.following.pull(followId.followId)
        await primeUser.save()
        console.log("done")
        res.status(201).send({mssg:"unFollowing done",primeUser, secUser})
    }catch(err){
        res.status(500).send("Internal server error")
    }
})



module.exports=app