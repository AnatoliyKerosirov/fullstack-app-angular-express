const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')

const keys = require('./config/keys')
const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')
const brandRoutes = require('./routes/brand')
const productRoutes = require('./routes/product')
const analyticsRoutes = require('./routes/analytics')

const app = express()

mongoose.connect(keys.mongoURI)
    .then(() => console.log('MongoDb connected!'))
    .catch(error => console.log(error))

app.use(passport.initialize())

require('./middleware/passport')(passport)

app.use('/uploads', express.static('uploads'))

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/brand', brandRoutes)
app.use('/api/product', productRoutes)
app.use('/api/analytics', analyticsRoutes)

module.exports = app