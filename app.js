const express = require('express')

const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')
const brandRoutes = require('./routes/brand')
const productRoutes = require('./routes/product')
const analyticsRoutes = require('./routes/analytics')

const app = express()

app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/brand', brandRoutes)
app.use('/api/product', productRoutes)
app.use('/api/analytics', analyticsRoutes)

module.exports = app