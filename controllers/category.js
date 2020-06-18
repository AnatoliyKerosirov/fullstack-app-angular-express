module.exports.getCategory = function(req, res){
    res.status(200).json({
        getCategory: 'from controller getCategory'
    })
}

module.exports.create = function(req, res){
    res.status(200).json({
        create: 'from controller Category create'
    })
}

module.exports.getProducts = function(req, res){
    res.status(200).json({
        getProductsByCategory: 'from controller Category getProductsByCategory'
    })
}

module.exports.edit = function(req, res){
    res.status(200).json({
        edit: 'from controller Category edit'
    })
}

module.exports.delete = function(req, res){
    res.status(200).json({
        delete: 'from controller Category delete'
    })
}