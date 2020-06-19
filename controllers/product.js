const Product = require('../models/Product')
const errorHeandler = require('../utils/errorHeandler')


module.exports.getProduct = async function(req, res){
    try{
        const product = await Product.findOne({_id: req.body._id})
        res.status(200).json(product)
    } catch (e) {
        errorHeandler(res, e)
    }
}

module.exports.create = async function(req, res){
    try{
        const product = await new Product({
            idProduct: req.body.idProduct,
            name: req.body.name,
            idCategory: req.body.idCategory,
            idBrand: req.body.idBrand,
            cost: req.body.cost,
            price: req.body.price,
            imageSrc: req.body.imageSrc
        }).save()
        res.status(201).json(product)
    } catch (e) {
        errorHeandler(res, e)
    }
}

module.exports.update = async function(req, res){
    try{
        const product = await Product.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
            )
        res.status(200).json(product)
    } catch (e) {
        errorHeandler(res, e)
    }
}

module.exports.remove = async function(req, res){
    try{
        await Product.remove({_id: req.body.id})
        res.status(200).json({
            message: "Продукт удален"
        })
    } catch (e) {
        errorHeandler(res, e)
    }
}