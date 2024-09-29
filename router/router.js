const {Router} = require('express')
const router = Router()
const controll = require('../controller/controller')

router.post('/login', controll.post_login)
router.post('/signup', controll.post_signup)

module.exports = router