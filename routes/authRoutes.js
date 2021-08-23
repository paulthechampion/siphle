const express = require("express")
const app = express()
const passport = require("passport")
const csurf = require("csurf")
const UserInfo = require("../module/userInfo")
const requireLogin = require("../middlewares/requireLogin")


app.get("/google",
        passport.authenticate("google",{
        scope:["profile","email"]
    })
)

app.get("/google/callback", passport.authenticate("google"),(req,res)=>{
    res.redirect("/home")
})

app.get("/api/logout",(req,res)=>{
    req.logOut()
    res.redirect("/")
})


app.get("/api/current_user",requireLogin,(req,res)=>{
    res.send(req.user)
})


app.get('/signup', (req,res)=>{
    const message= req.flash('error')
    res.send({
        message:message,
        hasErrors :message.length>0
    })
    
    });

app.post("/signup", passport.authenticate('local-signup',{
    failureRedirect:'/signup',
    failureFlash: true
}),(req,res)=>{
        res.status(200).end()
})

app.get('/signin', (req,res)=>{
    const message= req.flash('error')
    const token = req.csrfToken
    res.send({
        message:message,
        hasErrors :message.length>0
    })  
})

app.post("/signin",passport.authenticate("local-signin",{
    failureRedirect:'/signin',
    failureFlash: true
}),(req,res)=>{
     res.redirect("/home")
})

app.put("/add-info",requireLogin,async(req,res)=>{
    const {username,displayname,birthday}= req.body
    let user = req.user
    user.username = username
    user.displayname= displayname
    user.birthday =birthday
    await user.save()
    res.status(200).end()
})

app.put("/location",requireLogin,async(req,res)=>{
    let info= await UserInfo.findOne({user :req.user})
    console.log(info)
    if(!info){
        info = new UserInfo()
    }
    let location= req.body
    console.log(location)

     info.user= req.user
     info.geometry={
         "type":"point",
         "coordinates":location
     }

 
    try{
        await info.save()
        res.status(201).json({message:{msgBody:"Added Your Location", msgError:false}})
    }catch{
        res.status(500).json({message:{msgBody:"Location did not add, try again", msgError:true}})
    }
})


module.exports=app
