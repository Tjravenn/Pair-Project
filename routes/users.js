const router = require('express').Router();
const userController = require('../controllers/userController');

const isAuth = (request, response, next) => {
  if (request.session.user) response.redirect('/');
  else next();
}

router.get('/signup',isAuth, userController.getSignup)
router.post("/signup",isAuth, userController.postSignup)
router.get('/signin',isAuth, userController.getSignin)
router.post("/signin",isAuth, userController.postSignin)
router.get("/logout",isAuth, userController.logOut)




module.exports = router