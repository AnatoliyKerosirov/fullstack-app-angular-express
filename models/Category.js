const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
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
        ref: 'categories',
        type: mongoose.Schema.ObjectId
    }
})

module.exports = mongoose.model('categories', categorySchema)