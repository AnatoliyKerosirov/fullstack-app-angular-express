const express = require('express')
const controller = require('../controllers/product')
const router = express.Router()

router.get('/:id', controller.getProduct)
router.post('/', controller.create)
router.patch('/:id', controller.update)
router.delete('/:id', controller.remove)

module.exports = router