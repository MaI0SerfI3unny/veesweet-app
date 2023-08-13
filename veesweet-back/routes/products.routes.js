const router = require('express-promise-router')()
const { 
    getAllProduct,
    createProduct,
    deleteProduct,
    getInterestProduct
} = require('@/controller/ProductController')
const { verifyGalleryProduct } = require("@/middleware/verifyPhoto")

router.get('/products', getAllProduct)
router.get('/products/interest', getInterestProduct)
router.post('/products/create', verifyGalleryProduct, createProduct)
router.delete('/product/delete', deleteProduct)

module.exports = router