const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
})

module.exports = mongoose.model('users', userSchema)