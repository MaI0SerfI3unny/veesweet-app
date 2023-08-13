const router = require('express-promise-router')()
const { 
    createOrder,
    getOrder,
    getOrderProducts
} = require('@/controller/OrderController')

router.get('/orders', getOrder)
router.post('/order/my', getOrderProducts)
router.post('/orders/create', createOrder)

module.exports = router