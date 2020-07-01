const Order = require('../models/Order')
const errorHeandler = require('../utils/errorHeandler')

module.exports.getAll = async function(req, res){
    const query = {}
    if(req.query.startDate){
        query.date = {
            //Больше или равно
            $gte: req.query.startDate
        }
    }
    if(req.query.endDate){
        if(!query.date)
            query.date = {}
        //Меньше или равно
        query.date['$lte'] = req.query.endDate
    }
    try{
        const orders = await Order.find(query)
            .sort({date: -1})
            .offset(req.query.offset)
            .limit(req.query.limit)
        res.status(200).json(orders)
    } catch (e) {
        errorHeandler(res, e)
    }
}

module.exports.getOrder = async function(req, res){
    try{
        const order = Order.findOne({_id: req.body.id})
        res.status(200).json(order)
    } catch (e) {
        errorHeandler(res, e)
    }
}

module.exports.create = async function(req, res){
    const total = (ident) => {
        return  req.body.listProducts.reduce((total, item) => {return total += item.quantity * item[ident]}, 0)
    }
    try{
        const lastOrder = await Order.find().sort({date: -1})
        const maxOrder = lastOrder[0].idOrder ? lastOrder[0].idOrder : 0
        const order = await new Order({
            idOrder: maxOrder + 1,
            date: new Date(),
            sum: total('price'),
            cost: total('cost'),
            listProducts: req.body.listProducts,
            userInfo: req.body.userInfo,
            shipmentInfo: req.body.shipmentInfo,
            comment: req.body.comment
        }).save()
        res.status(201).json(order)
    } catch (e) {
        errorHeandler(res, {message: `Order save: ${order} , error: ${e}`})
    }
}

module.exports.update = async function(req, res){
    try{
        const updateOrder = new Order({

        })
        res.status(200).json()
    } catch (e) {
        errorHeandler(res, e)
    }
}

module.exports.remove = function(req, res){
    try{
        res.status(200).json()
    } catch (e) {
        errorHeandler(res, e)
    }
}