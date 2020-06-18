const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        default: ''
    },
    idCategory: {
        ref: 'categories',
        type: mongoose.Schema.ObjectId
    },
    idBrand: {
        ref: 'brands',
        type: mongoose.Schema.ObjectId
    },
    cost: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('products', productSchema)