const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    idParent: {
        type: String,
        default: ''
    },
    imageSrc: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('categories', categorySchema)