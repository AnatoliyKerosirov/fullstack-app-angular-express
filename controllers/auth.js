const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const keys = require('../config/keys')
const errorHeandler = require('../utils/errorHeandler')

module.exports.login = async function(req, res){
    const candidate = await User.findOne({email: req.body.email})
    if(candidate){
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        // const passwordResult = false
        if(passwordResult){
            //generate Token
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id},
                keys.jwt,
                {expiresIn: 3600})
            res.status(200).json({token: `Bearer ${token}`})
        } else {
            res.status(401).json({
                message: "Пароли не совпадают, попробуйте еще!",
            })
        }
    } else {
        res.status(404).json({
            message: "пользователя с таким email не найдено",
        })
    }
}

module.exports.register = async function(req, res){
    const candidate = await User.findOne({email: req.body.email})
    if(candidate){
        //if user exists
        res.status(409).json({
            message: 'Такой email уже есть, попробуйте ввести другой'
        })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt)
        })
        try{
            await user.save()
            res.status(201).json(user)
        } catch(e){
            errorHeandler(res, {message: 'Error create user: ' + e})
        }
    }
}