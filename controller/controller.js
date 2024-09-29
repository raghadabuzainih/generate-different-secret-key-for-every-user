const user = require('../models/user')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60
const createToken = async(id) => {
    const User = await user.findById(id)
    return jwt.sign({id}, User.userSecret, {
        expiresIn: maxAge
    })
}

const post_login = async(req, res) => {
    try{
        const {email, password} = req.body
        const User = await user.login(email, password)
        const token = createToken(User._id)
        res.cookie('jwt', token, {maxAge: maxAge*1000, httpOnly: true})
        res.status(200).json(User)
    }catch(err){
        res.status(400).send(err)
    }
}

const post_signup = async(req, res) => {
    try{
        const {email, password} = req.body
        const newUser = await user.create({email, password})
        const token = createToken(newUser._id)
        res.cookie('jwt', token, {maxAge: maxAge*1000, httpOnly: true})
        res.status(200).json(newUser)
    }catch(err){
        res.status(400).send(err)
    }
}

module.exports = {post_login, post_signup}