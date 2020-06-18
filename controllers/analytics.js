module.exports.overview = function(req, res){
    res.status(200).json({
        order: 'from controller Analytics overview'
    })
}

module.exports.analytics = function(req, res){
    res.status(200).json({
        create: 'from controller Analytics analytics'
    })
}