const router = require('express').Router();
const Controller = require('../controllers/controller');


// user
router.get('/signup', Controller.getSignup)
router.post("/signup", Controller.postSignup)
router.get('/signin', Controller.getSignin)
router.post("/signin", Controller.postSignin)
router.get("/logout", Controller.logOut)
//admin
router.get('/dashboard/admin/',Controller.getAllProducts)
router.get('/dashboard/admin/product/add',Controller.getProductAddform)
router.post('/dashboard/admin/product/add',Controller.postAddProduct)
router.get('/dashboard/admin/product/edit/:id',Controller.getProductEditform)
router.post('/dashboard/admin/product/edit/:id',Controller.editProduct)
router.get('/dashboard/admin/product/delete/:id',Controller.deleteProduct)
router.get('/dashboard/admin/listUser',Controller.showUser)
router.get('/dashboard/admin/listUser/delete/:id',Controller.deleteUser)




module.exports = router