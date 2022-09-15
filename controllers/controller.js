const { Dress, FashionDesigner, User } = require('../models/index')
const compareHashedPassword = require('../helpers/compareHashedPassword')
const { Op } = require('sequelize')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')


class Controller {
    static home(req, res) {
        res.send('hello world') //!ini nanti ganti home
    }
    static getAllProducts(req, res) {
        Dress.findAll()
            .then((result) => {
                res.render('allProduct', { result, user: req.session.user })
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
    static getProductEditform(req, res) {
        const { id } = req.params
        Dress.findOne({
            where: {
                id: id
            }
        })
            .then((result) => {
                res.render('editProduct', { result })
            })
            .catch((error) => {
                res.send(error)
            })
    }
    static editProduct(req, res) {
        const { id } = req.params
        const { dressModel, price, stock, FashionDesignerId } = req.body
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
        const { id } = req.params
        Dress.findOne({
            where: {
                id: id
            }
        })
            .then((result) => {
                res.render('detailProduct', { result })
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
}





module.exports = Controller