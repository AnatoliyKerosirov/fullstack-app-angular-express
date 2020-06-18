const express = require('express')
const controller = require('../controllers/product')
const router = express.Router()

router.get('/:id', controller.getProduct)
router.post('/', controller.create)
router.patch('/:id', controller.edit)
router.delete('/:id', controller.delete)

module.exports = router