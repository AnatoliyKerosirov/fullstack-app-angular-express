const moment = require('moment')
const Order = require('../models/Order')
const errorHeandler = require('../utils/errorHeandler')

const getAllOrders = async (user) => {
    return await Order.find({user}).sort({date: 1})
}

const getOrdersMap = (orders = {}) => {
    const ordersDays = {}
    orders.forEach(order => {
        const dateOrder = moment(order.date).format('YYYY-MM-DD')
        if(!ordersDays[dateOrder]){
            ordersDays[dateOrder] = []
        }
        ordersDays[dateOrder].push(order)
    })
    return ordersDays
}

const calculateGainOrders = (orders = {}) => {
    return Object.keys(orders).reduce((sumTotal, key) => {
        return  sumTotal += +orders[key].sum
    }, 0)
}

const calculateCostOrders = (orders = {}) => {
    return Object.keys(orders).reduce((sumTotal, key) => {
        return  sumTotal += +orders[key].cost
    }, 0)
}

module.exports.overview = async function(req, res){
    try{
        const day = req.params.day ? req.params.day : moment().add(-1, 'd')
        const dayFormat = moment(day).format('YYYY-MM-DD')
        const allOrders = await getAllOrders(req.user)
        //Всего заказов
        const numberAllOrders = Object.keys(allOrders).length
        //Заказы по дням
        const ordersDays = getOrdersMap(allOrders)
        //количество дней
        const numberDaysInOrders = Object.keys(ordersDays).length
        //среднее кол-во заказов в день
        const averageNumberOrdersPerDay = +(numberAllOrders / numberDaysInOrders).toFixed(0)
        //заказы за день day
        const ordersDay = ordersDays[dayFormat] ? ordersDays[dayFormat] : []
        const numberOrdersDay = ordersDay.length
        //% для количества заказов за день (от общего кол-ва)
        const percentNumberOrdersDay = +((1 - averageNumberOrdersPerDay / numberOrdersDay) * 100).toFixed(2)
        //Общая выручка(Gain)
        const gainAllOrders = calculateGainOrders(allOrders)
        // Общая выручка(Gain) себестоимость
        const gainCostAllOrders = Object.keys(allOrders).reduce((sumTotal, key) => {
            return  sumTotal += +allOrders[key].cost
        }, 0)
        // console.log('gainCostAllOrders:', gainCostAllOrders)
        //Средняя выручка(Gain) за день по всем заказам
        const averageGain = +(gainAllOrders / numberAllOrders * averageNumberOrdersPerDay).toFixed(2)
        //Выручка за day (вчера или указанный день)
        const gainPricePerDay = ordersDay.reduce((sum, order) => {
            return sum += order.sum
        }, 0)
        const gainCostPerDay = ordersDay.reduce((sum, order) => {
            return sum += +order.cost
        }, 0)
        //Процент выручки(Gain) за day
        const percentGainPerDay = +((1 - averageGain / gainPricePerDay) * 100).toFixed(2)
        //Сравнение выручки
        const compareGain = +(gainPricePerDay - averageGain).toFixed(2)
        //Сравнение количества заказов
        const compareNumberOrders = +(numberOrdersDay - averageNumberOrdersPerDay).toFixed(0)
        res.status(200).json({
            day,
            gain: {
                percent: percentGainPerDay,
                compare: compareGain,
                day: gainPricePerDay,
                isHigher: percentGainPerDay > 0
            },
            orders: {
                percent: percentNumberOrdersDay,
                compare: compareNumberOrders,
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

module.exports.analytics = async function(req, res){
    try {
        const allOrders = await getAllOrders(req.user)
        const ordersDays = getOrdersMap(allOrders)
        const gainAllOrders = calculateGainOrders(allOrders)
        const averageGain = +(gainAllOrders / Object.keys(ordersDays).length).toFixed(2)
        const chart = Object.keys(ordersDays).map(label => {
            const gain = calculateGainOrders(ordersDays[label])
            const cost = calculateCostOrders(ordersDays[label])
            const number = ordersDays[label].length
            return {gain, cost, number, label}
        })
        res.status(200).json({
            averageGain, chart
        })
    } catch (e) {
        errorHeandler(res, e)
    }
}