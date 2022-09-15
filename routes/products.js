const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get("/", Controller.getAllProducts)
router.get('/add', Controller.getProductAddform)
router.post("/add", Controller.postAddProduct)
router.get('/edit/:id', Controller.getProductEditform)
router.post("/edit", Controller.editProduct)
router.get('/:id', Controller.getProductById)
router.get("/delete/:id", Controller.deleteProduct)


module.exports = router
