const userRouter = require("./users")
const productRouter = require("./products")
const express = require('express');
const Controller = require("../controllers/controller");
const router = express.Router()

router.get('/', Controller.home)

router.use('/users', userRouter)
router.use('/products', productRouter)





module.exports = router