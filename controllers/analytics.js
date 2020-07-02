const moment = require('moment')
const Order = require('../models/Order')
const errorHeandler = require('../utils/errorHeandler')

module.exports.overview = async function(req, res){
    try{
        const day = req.params.day ? req.params.day : moment().add(-1, 'd')
        const dayFormat = moment(day).format('YYYY-MM-DD')
        const allOrders = await Order.find({user: req.user.id}).sort({date: 1})
        //Всего заказов
        const numberAllOrders = Object.keys(allOrders).length
        //Заказы по дням
        const ordersDays = {}
        allOrders.forEach(order => {
            const dateOrder = moment(order.date).format('YYYY-MM-DD')
            if(!ordersDays[dateOrder]){
                ordersDays[dateOrder] = []
            }
            ordersDays[dateOrder].push(order)
        })
        //количество дней
        const numberDaysInOrders = Object.keys(ordersDays).length
        //среднее кол-во заказов в день
        const averageOrdersPerDay = +(numberAllOrders / numberDaysInOrders).toFixed(0)
        //заказы за день day
        const ordersDay = ordersDays[dayFormat] ? ordersDays[dayFormat] : []
        const numberOrdersDay = ordersDay.length
        //% для количества заказов за день (от общего кол-ва)
        const percentNumberOrdersDay = +((1 - numberOrdersDay / numberAllOrders) * 100).toFixed(2)
        //Общая выручка(Gain)
        const gainAllOrders = Object.keys(allOrders).reduce((sumTotal, key) => {
           return  sumTotal += +allOrders[key].sum
        }, 0)
        // Общая выручка(Gain) себестоимость
        const gainCostAllOrders = Object.keys(allOrders).reduce((sumTotal, key) => {
            return  sumTotal += +allOrders[key].cost
        }, 0)
        // console.log('gainCostAllOrders:', gainCostAllOrders)
        //Средняя выручка(Gain) за день по всем заказам
        const averageGain = +(gainAllOrders / numberAllOrders * averageOrdersPerDay).toFixed(2)
        //Выручка за day (вчера или указанный день)
        const gainPricePerDay = ordersDay.reduce((sum, order) => {
            return sum += order.sum
        }, 0)
        const gainCostPerDay = ordersDay.reduce((sum, order) => {
            return sum += +order.cost
        }, 0)
        //Процент выручки(Gain) за day
        const percentGainPerDay = +((1 - gainPricePerDay / gainAllOrders) * 100).toFixed(2)
        //Сравнение выручки
        const compareGain = +(gainPricePerDay - averageGain).toFixed(2)
        //Сравнение количества заказов
        const compareNumberOrders = +(numberOrdersDay - averageOrdersPerDay).toFixed(0)
        res.status(200).json({
            day,
            gain: {
                percent: Math.abs(percentGainPerDay),
                compare: Math.abs(compareGain),
                day: gainPricePerDay,
                isHigher: percentGainPerDay > 0
            },
            orders: {
                percent: Math.abs(percentNumberOrdersDay),
                compare: Math.abs(compareNumberOrders),
                day: numberOrdersDay,
                isHigher: compareNumberOrders > 0
            },
            cost: {
                day: gainCostPerDay,
            }
        })
    } catch (e) {
        errorHeandler(res, e)
    }
}

module.exports.analytics = function(req, res){
    res.status(200).json({
        create: 'from controller Analytics analytics'
    })
}