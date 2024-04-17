const Recruiter = require('../models/recruiter-model')

const recruiterValidationSchema = {
    userId:{
        custom:{
            options: async function(value, { req }){
                const recruiter = await Recruiter.findOne({userId:req.user.id})
                if(recruiter){
                    throw new Error('Profile already created')
                }else{
                    return true
                }
            }
        }
    },
    companyName:{
        in:['body'],
        exists:{
            errorMessage:'companyName is required'
        },
        notEmpty:{
            errorMessage:'companyName cannot be empty'
        },
        trim:true
    },
    email: {
        exists: {
            errorMessage: 'email is required'
        },
        notEmpty: {
            errorMessage: 'email cannot be blank'
        },
        isEmail: {
            errorMessage: 'invalid email format'
        },
        normalizeEmail: true,
        trim: true 
    },
    website:{
        in: ['body'],
        exists: {
            errorMessage: 'website is required'
        },
        notEmpty: {
            errorMessage: 'website cannot be empty'
        },
        isURL: {
            errorMessage: 'invalid url'
        },
        trim: true
    },
    address:{
        in: ['body'],
        exists: {
            errorMessage: 'address is required'
        },
        notEmpty: {
            errorMessage: 'address cannot be empty'
        },
        trim: true
    }
}

module.exports = recruiterValidationSchema