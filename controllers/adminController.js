const {Dress, Users} = require ('../models')
const {Op} = require('sequelize')

class Controller {
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
        Dress.findAll(option)
            .then((result) => {
                res.render('allProduct', { result})
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
                        res.render('addFormProduct', {result})
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
            FashionDesignerId
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
        Users.findAll({
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
        Users.destroy({
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
}

module.exports = Controller