const { Dress, FashionDesigner, User } = require('../models/index')
const { Op } = require('sequelize')



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
        Dress.findAll(option)
        .then((result) => {
            // res.send(result)
            res.render('home', {result})
        })
        .catch((error) => {
            res.send(error)
        })
    }
    
    
}





module.exports = Controller