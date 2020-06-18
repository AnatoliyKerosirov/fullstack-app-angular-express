const express = require('express')
const controller = require('../controllers/order')
const router = express.Router()

router.get('/:id', controller.getOrder)
router.post('/', controller.create)
router.patch('/', controller.edit)
router.delete('/', controller.delete)

module.exports = router