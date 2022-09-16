const { Dress, FashionDesigner, User } = require('../models/index')
const { Op } = require('sequelize')
const compareHashedPassword = require('../helpers/compareHashedPassword')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')



class Controller {
    static home(req, res) {
        let {search} = req.query
        let option = {}
        if(search) {
            option = {
                where: {
                    name: {[Op.iLike]: `%${search}`}
                }
            }
        }
        Dress.findAll({
            attributes: {exclude: ['DressId']},
        },option)
        .then((result) => {
            // res.send(result)
            res.render('home', {result})
        })
        .catch((error) => {
            res.send(error)
        })
    }
    static getAllProducts(req, res) {
        let {search} = req.query
        let option = {}
        if(search){
            option = {
                where:{
                    name:{[Op.iLike]: `%${search}`}
                }
            }
        }
        Dress.findAll({
            attributes: {exclude: ['DressId']},
        },option)
            .then((result) => {
                res.render('home', { result})
            })
            .catch((error) => {
                res.send(error)
            })
    }
    static getProductAddform(req, res) {
        res.render('addFormProduct')
    }
    static postAddProduct(req, res) {
        const { dressModel, price, stock } = req.body
        const input = {dressModel, price, stock}
        console.log(input);
        Dress.create(input)
            .then((result) => {
                res.redirect('/dashboard/admin')
            })
            .catch((error) => {
                if(!error.errors){
                    res.send(error)
                }else{
                    let invalid = {}
                    error.errors.forEach(el => {
                        invalid[el.path] = el.message
                    })
                    .then((result) => {
                        res.render('addFormProduct', {result: input})
                    })
                    .catch((error) => {
                        res.send(error)
                    })
                }
            })

    }
    static getProductEditform(req, res) {
        const { id } = req.params
        Dress.findOne({
            attributes: {exclude: ['DressId']},
            where: {
                id: id
            }
        })
            .then((result) => {
                res.render('editProduct', { result })
            })
            .catch((error) => {
                // console.log(error)
                res.send(error)
            })
    }
    static editProduct(req, res) {
        const { id } = req.params
        const { dressModel, price, stock, imageUrl } = req.body
        console.log(req.body);
        Dress.update({
            dressModel,
            price,
            stock,
            imageUrl
        }, {
            where:{
                id
            }
        })
            .then((result) => {
                res.redirect(`/dasboard/admin`)
            })
            .catch((error) => {
                res.send(error)
            })
    }
    
    static deleteProduct(req, res) {
        const { id } = req.params
        Dress.destroy({
            where: {
                id: id
            }
        })
            .then((result) => {
                res.redirect('/products')
            })
            .catch((error) => {
                res.send(error)
            })
    }
    static showUser(req,res){
        User.findAll({
            where:{
                role:"user"
            }
        })
        .then((result) => {
            res.render('userPage', {result})
        })
        .catch((error) => {
            res.send(error)
        })
    }
    static deleteUser(req, res) {
        const {id} = req.params
        User.destroy({
            where: {
                id: id
            }
        })
        .then(()=> {
            res.redirect('/dasboard/admin/listUser')
        })
        .catch((error) => {
            res.send(error)
        })
    }
    
    static getSignup(req, res) {
        res.render('register', { input: {}, invalid: {} })
    }
    static postSignup(req, res) {
        const { email, password, name } = req.body
        // console.log(req.body);
        const input = { email, password, name, role: 'user' }
        // console.log(input);
        User.create(input)
        .then(() => {
                const transporter = nodemailer.createTransport(smtpTransport({
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    auth: {
                        user: 'webmail.auto.sender@gmail.com',
                        pass: 'mhrztczzwoimzmxs'
                    }
                }))
                const mailOptions = {
                    from: 'webmail.auto.sender@gmail.com@gmail.com',
                    to: `${email}`,
                    subject: `Thank you for register ${name}`,
                    text: 'That was easy!'
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) console.log(error);
                    else console.log('Email sent: ' + info.res);
                });

                res.redirect('/signin')
            })
            .catch(err => {
                console.log(err);
                if (!err.errors) res.send(err);
                else {
                    let invalid = {};
                    err.errors.forEach(el => invalid[el.path] = el.message);
                    res.render('register', { input, invalid });
                }
            });
    }
    
    static getSignin(req, res) {
        res.render('login', { input: {}, invalid: {} });
    }

    static postSignin(req, res) {
        const { email, password } = req.body;
        const input = { email };
        User.findOne({ where: { email: { [Op.eq]: email } } })
            .then(user => {
                let invalid = {};
                if (user === null || !compareHashedPassword(password, user.password)) {
                    invalid.credential = 'Invalid email or password';
                    res.render('login', { input, invalid });
                }
                if (compareHashedPassword(password, user.password)) {
                    req.session.user = {
                        id: user.id,
                        role: user.role
                    }
                    console.log(req.session)
                    res.redirect(`/products/${user.role}`)

                }
            })
            .catch(err => res.send(err));
    }
    static logOut(req, res) {
        req.session.destroy((err) => {
            res.redirect('/')
        })
    }
    static userBuy(req, res) {
        const {id} = req.params
    let price;
    Dress.findByPk(id)
      .then(product => {
        price = product.price;
        console.log(price);
        return Dress.update({ stock: 1 }, { where: { id: id } });
      })
      .then(() => {
        return User.findOne({ where: { UserId: req.session.user.id } })
      })
      .then((user) => {
        return User.update({ balance: user.balance - price }, { where: { UserId: req.session.user.id } })
      })
      .then(() => res.redirect('/'))
      .catch(err => {
        if (!err.errors) res.send(err)
        else {
          res.send(err)
        }
    })
    }
}





module.exports = Controller