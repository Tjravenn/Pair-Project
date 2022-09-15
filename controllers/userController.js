const compareHashedPassword = require('../helpers/compareHashedPassword')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

class Controller{
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