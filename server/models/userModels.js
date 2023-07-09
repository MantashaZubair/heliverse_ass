const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    first_name: {
    type:String,
    required:true,
    trim:true
   },
   last_name: {
    type:String,
    required:true,
    trim:true
   },
   email: {
    type:String,
    required:true,
    unique:true
   },
   gender: {
    type: String,
    enum: [],
    required: true
  },
  domain: {
    type: String,
    enum: [],
    required: true
  },
  avatar:{},
  available:{
    type: Boolean,
    default: true
  }

   
},{timestamps:true})

module.exports= mongoose.model("users" , userSchema)