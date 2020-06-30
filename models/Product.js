const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    idProduct: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        default: ''
    },
    idCategory: {
        type: String,
        default: ''
    },
    idBrand: {
        type: String,
        default: ''
    },
    cost: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    imageSrc: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('products', productSchema)