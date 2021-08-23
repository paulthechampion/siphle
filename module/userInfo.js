const mongoose = require('mongoose');

//create geolocation Schema
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
    geometry:GeoSchema,
    followers :[{type:mongoose.Schema.Types.ObjectId,ref:"siphle-user"}],
    following :[{type:mongoose.Schema.Types.ObjectId,ref:"siphle-user"}]
})


module.exports= mongoose.model('siphle-info', userInfoSchema)