const express = require('express')
const controller = require('../controllers/category')
const router = express.Router()

router.get('/:id', controller.getCategory)
router.post('/', controller.create)
router.get('/products/:id', controller.getProducts)
router.patch('/:id', controller.edit)
router.delete('/:id', controller.delete)

module.exports = router