const userRouter = require("./users")
const express = require('express');
const Controller = require("../controllers/controller");
const router = express.Router()

router.get('/', Controller.home)

router.use('/users', userRouter)





module.exports = router