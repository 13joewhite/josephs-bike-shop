const express = require('express')
const authRouter = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

//signup
authRouter.post('/signup', async (req, res, next) => {
    try {
        let user = await  User.findOne({ username: req.body.username.toLowerCase() })
        if(user){
            res.status(403)
            return next(new Error('Username is already taken'))
        }
        user = new User(req.body)
        await user.save((err, savedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            const token = jwt.sign(savedUser.toObject(), process.env.SECRET)
            return res.status(200).send({ token, user: savedUser})
        })
    } catch (error) {
        console.log(error.message)
        res.status(500)
    }
})

//login
authRouter.post('/login', async (req, res, next) => {
    try {
        let user = await  User.findOne({ username: req.body.username.toLowerCase() })
        if(!user) {
            res.status(403)
            return next(new Error("Username or Password is incorrect"))
        }   
        if(req.body.password !== user.password) {
            res.status(403)
            return next(new Error("Username or Password is incorrect"))
        }     
        const token = jwt.sign(user.toObject(), process.env.SECRET)
        return res.status(200).send({ token, user: user})
    } catch (error) {
        console.log(error.message)
        res.status(500)
    }
   })


module.exports = authRouter