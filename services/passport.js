const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const LocalStrategy = require("passport-local")
const keys = require("../config/keys")
const User = require("../module/user")


passport.serializeUser((user,done)=>{
    done(null, user.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user)
    })
})


//passpot stragtegy for Google
passport.use(new GoogleStrategy({
    clientID:keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:"/auth/google/callback",
    proxy:true
},async(accessToken, refreshToken, profile, done)=>{
    const exisitingUser = await User.findOne({email:profile._json.email})

    if(exisitingUser){
        return done(null, exisitingUser)
    }
    console.log(profile._json.email)
    const user = new User({googleId:profile.id,email:profile._json.email})
    await user.save()
    done(null,user)
})
)


//passport strategy for local

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField:'password',
    passReqToCallback:true
},function(req,email,password,done){
    req.checkBody('email', "Invalid email").notEmpty().isEmail()
    req.checkBody('password', "Passowrd is too short, must be more than eight characters").notEmpty().isLength({min:4})
    var errors = req.validationErrors()
    if(errors){
        let message =[]
        errors.forEach((error)=>{
            message.push(error.msg)
        })
        return done(null,false,req.flash("error", message))
    }
    User.findOne({'email':email},(err,user)=>{
        if(err){
            return done(err);
        }
        if(user){
            return done(null,false,{message:"Email is already in use"})
        }
        let newUser = new User();
            newUser.email = email
            newUser.password = newUser.encryptPassword(password)
            newUser.save(function(err,result){
                if(err){
                    return done(err);
                }
                return done(null, newUser)
            }) 
    })
}
))

passport.use("local-signin", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async(req,email,password,done)=>{
    req.checkBody('email', "Invalid email").notEmpty().isEmail()
    req.checkBody('password', "Incorrect Password").notEmpty()
    var errors = req.validationErrors()
    if(errors){
        let message =[]
        errors.forEach((error)=>{
            message.push(error.msg)
        })
        return done(null,false,req.flash("error", message))
    }
   const user = await User.findOne({'email':email})
        if(!user){
            return done(null,false,{message:"Email is incorrect"})
        }
        if(!user.validPassword(password)){
            return done(null,false,{message:"Password is incorrect"})
        }
        return done(null,user); 
}))