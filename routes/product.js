const express = require('express')
const passport = require('passport')
const router = express.Router()
const upload = require('../middleware/upload')
const controller = require('../controllers/product')
const passportAuth = passport.authenticate('jwt', {session: false})

router.get('/:id', passportAuth, controller.getProduct)
router.post('/', passportAuth, upload.single('image'), controller.create)
router.patch('/:id', passportAuth, upload.single('image'), controller.update)
router.delete('/:id', passportAuth, controller.remove)

module.exports = router