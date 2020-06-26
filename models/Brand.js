const mongoose = require('mongoose')
const Schema = mongoose.Schema

const brandSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    idParent: {
        type: Number,
        default: ''
    },
    imageSrc: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('brands', brandSchema)