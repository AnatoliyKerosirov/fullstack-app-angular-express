const express = require('express')
const passport = require('passport')
const controller = require('../controllers/analytics')
const router = express.Router()

const passportAuth = passport.authenticate('jwt', {session: false})

router.get('/analytics', passportAuth, controller.analytics)
router.get('/overview', passportAuth, controller.overview)


module.exports = router