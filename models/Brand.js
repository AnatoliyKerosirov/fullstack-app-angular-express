const mongoose = require('mongoose')
const Schema = mongoose.Schema

const brandSchema = new Schema({
    idBrand: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        default: ''
    },
    idParent: {
        type: Number,
        default: 0
    },
    imageSrc: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('brands', brandSchema)