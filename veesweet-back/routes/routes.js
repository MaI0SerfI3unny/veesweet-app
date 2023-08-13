const router = require('express-promise-router')()
const category = require('./category.routes.js')
const banner = require('./banner.routes.js')
const products = require('./products.routes.js')
const collection = require('./collection.routes.js')
const order = require('./order.routes.js')

router.use('/', category)
router.use('/', banner)
router.use('/', products)
router.use('/', collection)
router.use('/', order)

module.exports = router