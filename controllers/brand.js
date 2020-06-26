const Brand = require('../models/Brand')
const Product = require('../models/Product')
const errorHeandler = require('../utils/errorHeandler')

// (GET) api/brands?offset=10&limit=10
module.exports.getBrands = async function(req, res){
    try{
        const brands = await Brand.find().offset(req.query.offset).limit(req.query.limit)
        res.status(200).json(brands)
    } catch (e) {
        errorHeandler(res, e)
    }
}

module.exports.getBrand = async function(req, res){
    try{
        const brand = await Order.findOne({
            _id: req.body.id
        })
        res.status(200).json(brand)
    } catch (e) {
        errorHeandler(res, e)
    }
}

module.exports.create = async function(req, res){
    try{
        const newBrand = await new Brand({
            name: req.body.name,
            idParent: req.body.idParent,
            imageSrc: req.file ? req.file.path : ''
        }).save()
        res.status(201).json(newBrand)
    } catch (e) {
        errorHeandler(res, e)
    }
}
// (GET) api/brands/products/:id?offset=10&limit=10
module.exports.getProducts = async function(req, res){
    try{
        const products = await Product.find({idBrand: req.params.id}).sort({idProduct}).offset(req.query.offset).limit(req.query.limit)
        res.status(200).json(products)
    } catch (e) {
        errorHeandler(res, e)
    }
}

module.exports.update = async function(req, res){
    const updated = {
        name: req.body.name,
        idParent: req.body.idParent || null
    }
    if(req.file){
        updated.imageSrc = req.file.path
    }
    try{
        const updateBrand = await Brand.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(updateBrand)
    } catch (e) {
        errorHeandler(res, e)
    }
}

module.exports.remove = function(req, res){
    try{

        res.status(200).json({
            message: "Бренд был удален"
        })
    } catch (e) {
        errorHeandler(res, e)
    }
}