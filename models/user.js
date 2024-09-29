const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const userSc = new Schema({
    'email' : {
        type: String
    },
    'password' : {
        type: String
    },
    'userSecret' : {
        type: String
    }
}, {timestamps: true})

//before adding the user to database
userSc.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = bcrypt.hash(this.password, salt)
    this.userSecret = crypto.randomBytes(64).toString("hex")
    next()
})

//checks the user & email that were entered
userSc.statics.login = async(email, password) => {
    const User = await this.findOne({email})
    if(User){
        const auth = bcrypt.compare(this.password, User.password)
        if(auth) return User
        throw Error('incorrect password')
    }throw Error('incorrect email')
}

const user = mongoose.model('user', userSc)
module.exports = user