const mongoose = require('mongoose')
const Schema = mongoose.Schema

const brandSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        default: ''
    },
    idParent: {
        ref: 'brands',
        type: mongoose.Schema.ObjectId
    }
})

module.exports = mongoose.model('brands', brandSchema)