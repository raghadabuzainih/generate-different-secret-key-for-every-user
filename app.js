const express = require('express')
const mongoose = require('mongoose')
const app = express()
const router = require('./router/router')
const cookieParser = require('cookie-parser')

const dbURI = 'mongodb+srv://[username]:[password]@cluster0.5j4sjdd.mongodb.net/[dbname]?retryWrites=true&w=majority';

//middleware
app.use(cookieParser())
app.use(express.json())

mongoose.connect(dbURI)
.then(result => app.listen(3000))
.catch(err => console.log(err))

app.use(router)
