const express = require('express')
const passport = require('passport')

const controller = require('../controllers/brand')
const upload = require('../middleware/upload')
const router = express.Router()

const passportAuth = passport.authenticate('jwt', {session: false})

router.get('/', passportAuth, controller.getBrands)
router.get('/:id', passportAuth, controller.getBrand)
router.post('/', passportAuth, upload.single('image'), controller.create)
router.get('/products/:id', passportAuth, controller.getProducts)
router.patch('/:id', passportAuth, upload.single('image'), controller.update)
router.delete('/:id', passportAuth, controller.remove)

module.exports = router