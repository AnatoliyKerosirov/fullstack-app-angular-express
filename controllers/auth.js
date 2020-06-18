const User = require('../models/User')

module.exports.login = function(req, res){
    res.status(200).json({
        login: 'from controller'
    })
}

module.exports.register = function(req, res){
    const user = new User({
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    user.save().then(() => console.log('User created'))
}