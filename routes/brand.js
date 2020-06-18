const express = require('express')
const controller = require('../controllers/brand')
const router = express.Router()

router.get('/:id', controller.getBrand)
router.post('/', controller.create)
router.get('/products/:id', controller.getProducts)
router.patch('/:id', controller.edit)
router.delete('/:id', controller.delete)

module.exports = router