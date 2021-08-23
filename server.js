const express = require("express")
const app = express()
const port= process.env.PORT || 7000
const mongoose = require("mongoose")
const keys = require("./config/keys")
const cookieSession = require("cookie-session")
const bodyParser = require("body-parser")
const passport = require("passport")
const flash = require("connect-flash")
const validator = require("express-validator")

const authRoutes = require("./routes/authRoutes")
const homeRoutes = require("./routes/homeRoutes")


app.use(
    cookieSession({
        maxAge:30 * 24 *60 *60*1000,
        keys:[keys.cookieKey],
        httpOnly:true,
        secure:true
    })
)
app.use(bodyParser.json())
app.use(flash())
app.use(validator())

app.use(passport.initialize())
app.use(passport.session())


require("./services/passport")

mongoose.connect(keys.mongoKey,{
    useUnifiedTopology:true, useNewUrlParser:true ,useCreateIndex:true,useFindAndModify:false
})

const db = mongoose.connection

db.on("error", error=>console.error(error))
db.once("open", ()=>console.log("connected to database"))



app.use("/auth", authRoutes)
app.use("/home", homeRoutes)

app.listen(port,()=>{
    console.log("listening to port 7000")
})