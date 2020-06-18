module.exports.getBrand = function(req, res){
    res.status(200).json({
        brand: 'from controller Brand brand'
    })
}

module.exports.create = function(req, res){
    res.status(200).json({
        create: 'from controller Brand create'
    })
}

module.exports.getProducts = function(req, res){
    res.status(200).json({
        getProductsByBrand: 'from controller Brand getProductsByBrand'
    })
}

module.exports.edit = function(req, res){
    res.status(200).json({
        edit: 'from controller Brand edit'
    })
}

module.exports.delete = function(req, res){
    res.status(200).json({
        delete: 'from controller Brand delete'
    })
}