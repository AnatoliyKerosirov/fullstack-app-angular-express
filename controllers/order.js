module.exports.getOrder = function(req, res){
    res.status(200).json({
        order: 'from controller Order get order'
    })
}

module.exports.create = function(req, res){
    res.status(200).json({
        create: 'from controller Order create'
    })
}

module.exports.edit = function(req, res){
    res.status(200).json({
        edit: 'from controller Order edit'
    })
}

module.exports.delete = function(req, res){
    res.status(200).json({
        delete: 'from controller Order delete'
    })
}