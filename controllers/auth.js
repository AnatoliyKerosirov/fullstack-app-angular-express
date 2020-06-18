const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports.login = function(req, res){
    res.status(200).json({
        login: 'from controller'
    })
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