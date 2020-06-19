const express = require('express')
const passport = require('passport')
const upload = require('../middleware/upload')

const controller = require('../controllers/category')
const router = express.Router()
const passportAuth = passport.authenticate('jwt', {session: false})

router.get('/', passportAuth, controller.getCategories)
router.get('/:id', passportAuth, controller.getCategory)
router.post('/', passportAuth, upload.single('image'), controller.create)
router.get('/products/:idCategory', passportAuth, controller.getProducts)
router.patch('/:id', passportAuth, upload.single('image'), controller.update)
router.delete('/:id', passportAuth, controller.remove)

module.exports = router