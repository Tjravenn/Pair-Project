const dress = require('../models/dress')
const {Dress, FashionDesigner, User} = require('../models/index')

class Controller{
    static home(req, res){
        res.send('hello world') //!ini nanti ganti home
    }
    static getAllProducts(req,res){
        Dress.findAll()
        .then((result) => {
            res.render('allProduct', {result, user:req.session.user})
        })
        .catch((error) => {
            res.send(error)
        })
    }
    static getProductAddform(req, res){
        res.render('addFormProduct')
    }
    static postAddProduct(req, res){
        const {dressModel, price, stock} = req.body
        Dress.create({
            dressModel,
            price,
            stock
        })
        .then((result) => {
            res.redirect('/products')
        })
        .catch((error) => {
            res.send(error)
        })

    }
    static getProductEditform(req, res){
        const {id} = req.params
        Dress.findOne({
            where:{
                id: id
            }
        })
        .then((result) => {
            res.render('editProduct', {result})
        })
        .catch((error) => {
            res.send(error)
        })
    }
    static editProduct(req, res){
        const {id} = req.params
        const {dressModel, price, stock, FashionDesignerId} = req.body
        Dress.update({
            dressModel,
            price, 
            stock, 
            FashionDesignerId: id
        })
        .then((result) => {
            res.redirect(`/products/${id}`)
        })
    }
    static getProductById(req, res) {
        const {id} = req.params
        Dress.findOne({
            where :{
                id: id
            }
        })
        .then((result) => {
            res.render('detailProduct', {result})
        })
        .catch((error) => {
            res.send(error)
        })
    }
    static deleteProduct(req, res) {
        const {id} = req.params
        Dress.destroy({
            where:{
                id: id
            }
        })
        .then((result) => {
            res.redirect('/products')
        })

    }
    static getSignup(req, res) {
        const login = req.session.loggedIn
        if(login === false){
            res.render('formSignUp')
        }

    }
    static postSignup(req, res) {
        const {email,  password, name} = req.body
        User.findOne({
            where: {
                email: email,
                username: name
            }
        })
            .then(user => {
                if (!user) {
                    bcrypt.hash(password, 10, (err, hash) => {
                    userData.password = hash
                    User.create(userData)
                        .then(user => {
                            res.send({ status: user.email + 'REGISTERED' })
                        })
                        .catch((error) => {
                            res.send('ERROR: ' + err)
                        })
                    })
                } else {
                    res.send({ error: "USER ALREADY EXISTS" })
                }
            })
            .catch(err => {
                res.send('ERROR: ' + err)
    })
}
    static getSignin(req, res) {

    }
    static postSignin(req, res) {
        User.findOne({where:{ username: username} },
            function(err, users) {
                if (err) { return done(err); }
                if (!users) {
                return done(null, false, { message: 'Incorrect username.' });
                }
                if (!users.password === password) {
                return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, users);
            });

    }
    static logOut(req, res) {
        req.session.destroy((err) => {
            res.redirect('/')
        })
    }
}



module.exports = Controller