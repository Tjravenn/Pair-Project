const userRouter = require("./users")
const adminRouter = require('./admin')
const express = require('express');
const Controller = require("../controllers/controller");
const router = express.Router()

router.get('/', Controller.home)

router.use('/users', userRouter)
router.use('/admins', adminRouter )





module.exports = router