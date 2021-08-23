const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')
//const userInfo = require("./userInfo")

const GeoSchema = new mongoose.Schema({
    type:{
        type:String,
        default:"Point"
    },
    coordinates:{
        type:[Number],
        index:"2dsphere"
    }
})

const userInfoSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:"siphle-user"},
    geometry:GeoSchema
})


const userSchema = new mongoose.Schema({
    
    email:{type:String},
    password:{type:String},
    googleId:{type:String},
    username:{type:String},
    displayname:{type:String},
    birthday:{type:Date},
    userInfo:userInfoSchema

})

userSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5),null);
}

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

module.exports= mongoose.model('siphle-user', userSchema)