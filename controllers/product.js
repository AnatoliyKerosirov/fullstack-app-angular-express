module.exports.getProduct = function(req, res){
    res.status(200).json({
        product: 'from controller Product product'
    })
}

module.exports.create = function(req, res){
    res.status(200).json({
        create: 'from controller Product create'
    })
}

module.exports.edit = function(req, res){
    res.status(200).json({
        edit: 'from controller Product edit'
    })
}

module.exports.delete = function(req, res){
    res.status(200).json({
        delete: 'from controller Product delete'
    })
}