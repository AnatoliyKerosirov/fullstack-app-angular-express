const express = require('express')
const passport = require('passport')

const controller = require('../controllers/order')
const router = express.Router()

const passportAuth = passport.authenticate('jwt', {session: false})

router.get('/', passportAuth, controller.getAll)
router.get('/:id', passportAuth, controller.getOrder)
router.post('/', passportAuth, controller.create)
router.patch('/:id', passportAuth, controller.update)
router.delete('/:id', passportAuth, controller.remove)

module.exports = router