const Product = require('../models/Product')
const Category = require('../models/Category')
const errorHeandler = require('../utils/errorHeandler')

module.exports.getCategories = async function(req, res){
    try{
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch (e) {
        errorHeandler(res, e)
    }
}

module.exports.getCategory = async function(req, res){
    try{
        const category = await Category.findById(req.params.id)
        res.status(200).json(category)
    } catch (e) {
        errorHeandler(res, e)
    }
}

module.exports.create = async function(req, res){
    const category = new Category({
        idCategory: req.body.idCategory,
        name: req.body.name,
        idParent: req.body.idParent,
        imageSrc: req.file ? req.file.path : ''
    })
    try{
        await category.save()
        res.status(201).json(category)
    } catch (e) {
        errorHeandler(res, e)
    }
}

module.exports.getProducts = async function(req, res){
    try{
        const products = await Product.find({idCategory: req.params.idCategory})
        res.status(200).json(products)
    } catch (e) {
        errorHeandler(res, e)
    }
}

module.exports.update =  async function(req, res){
    console.log('req.file.path: ', req.file)
    const updated = {
        name: req.body.name || '',
        idParent: req.body.idParent || null
    }
    if(req.file){
        updated.imageSrc = req.file.path
        console.log(req.file.path)
    }
    try{
        const category = await Category.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(category)
    } catch (e) {
        errorHeandler(res, e)
    }
}

module.exports.remove = async function(req, res){
    try{
        await Category.remove({_id: req.params.id})
        await Product.remove({idCategory: req.params.id})
        res.status(200).json({
            message: "Категория и товар из нее были удалены!"
        })
    } catch (e) {
        errorHeandler(res, e)
    }
}