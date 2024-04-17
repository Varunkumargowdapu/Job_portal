const mongoose = require('mongoose')
const { Schema, model} = mongoose

const recruiterSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    companyName:String,
    email:String,
    website:String,
    address:String
},{timestamps :true})

const Recruiter = model('Recruiter', recruiterSchema)

module.exports = Recruiter
