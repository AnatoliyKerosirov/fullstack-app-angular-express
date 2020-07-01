const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    idOrder: {
        type: Number,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: ''
    },
    sum: {
        type: Number,
        default: 0
    },
    cost: {
        type: Number,
        default: 0
    },
    listProducts: [{
        idProduct: {
            type: Number,
            default: 0
        },
        name: {
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
        quantity: {
            type: Number,
            default: 0
        }
    }],
    userInfo: {
        type: String,
        default: ''
    },
    shipmentInfo: {
        type: String,
        default: ''
    },
    comment:{
        type: String,
        default: ''
    }
})


module.exports = mongoose.model('orders', productSchema)