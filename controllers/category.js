const Product = require('../models/Product')
const Category = require('../models/Category')
const errorHeandler = require('../utils/errorHeandler')

module.exports.getCategory = function(req, res){
    res.status(200).json({
        getCategory: 'from controller getCategory'
    })
}

module.exports.create = function(req, res){
    try{
        const category = new Category({

        })
        res.status(200).json()
    } catch (e) {
        errorHeandler(res, e)
    }
}

module.exports.getProducts = async function(req, res){
    try{
        const products = await Product.find({
            idCategory: req.params.idCategory
        })
        res.status(200).json(products)
    } catch (e) {
        errorHeandler(res, e)
    }
}

module.exports.edit = function(req, res){
    res.status(200).json({
        edit: 'from controller Category edit'
    })
}

module.exports.delete = function(req, res){
    res.status(200).json({
        delete: 'from controller Category delete'
    })
}