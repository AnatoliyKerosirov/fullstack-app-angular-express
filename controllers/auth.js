const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

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
            message: "пользователя с таким email не найдено"
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
            id: req.body.id,
            name: req.body.name || '',
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt),
            role: req.body.role
        })
        try{
            await user.save()
            res.status(201).json(user)
        } catch(e){
            console.log('Error write new user in mongoDB:', e)
        }

    }
}