const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/signup', Controller.getSignup)
router.post("/signup", Controller.postSignup)
router.get('/signin', Controller.getSignin)
router.post("/signin", Controller.postSignin)
router.get("/logout", Controller.logOut)




module.exports = router