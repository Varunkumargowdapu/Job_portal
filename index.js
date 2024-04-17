require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const { checkSchema } = require('express-validator')
const configureDB = require('./config/db')
const userRegisterValidationSchema = require('./app/validations/user-register-validations')
const userLoginValidationSchema = require('./app/validations/user-login-validations')
const candidateValidationSchema = require('./app/validations/candidate-validations')
const recruiterValidationSchema = require('./app/validations/recruiter-validations')
const authenticateUser = require('./app/middlewares/authenticateUser')
const authorizeUser = require('./app/middlewares/authorizeUser')
const usersCltr = require('./app/controllers/users-cltr')
const jobsCltr = require('./app/controllers/jobs-cltr')
const candidatesCltr = require('./app/controllers/candidate-cltr')
const recruiterCltr = require('./app/controllers/recruiter-cltr')
const app = express()
const port = 3333
configureDB()

app.use(express.json())
app.use(morgan('combined'))
app.use(cors())

//application level middleware - using for logging request for debug purpose
app.use(function(req, res, next){
    console.log(`${req.ip} - ${req.method} - ${req.url} - ${new Date()}`)
    next()
})

app.post('/users/register', checkSchema(userRegisterValidationSchema), usersCltr.register)
app.post('/users/login', checkSchema(userLoginValidationSchema), usersCltr.login)
app.get('/users/account', authenticateUser, usersCltr.account)
app.get('/users/checkemail',usersCltr.checkEmail)

app.get('/api/jobs',authenticateUser, jobsCltr.list)
app.post('/api/jobs', authenticateUser,authorizeUser(['recruiter']), jobsCltr.create)

app.post('/api/candidates/profile', authenticateUser, authorizeUser(['candidate']), checkSchema(candidateValidationSchema), candidatesCltr.create)
app.get('/api/candidates/profile', candidatesCltr.show)
app.put('/api/candidates/profile', candidatesCltr.update)

app.post('/api/recruiter/profile',authenticateUser,authorizeUser(['recruiter']), checkSchema(recruiterValidationSchema), recruiterCltr.create)

app.listen(port, () => {
    console.log('server running on port', port)
})