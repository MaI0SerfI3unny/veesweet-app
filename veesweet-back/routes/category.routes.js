const router = require('express-promise-router')()
const { 
    getAllCategory,
    getCategoryTypes,
    createCategory,
    deleteCategory
} = require('@/controller/CategoryController')
const { verifyCategoryPhoto } = require("@/middleware/verifyPhoto")


router.get('/category', getAllCategory)
router.get('/type/category', getCategoryTypes)
router.post('/category/create', verifyCategoryPhoto, createCategory)
router.delete('/category/delete', deleteCategory)

module.exports = router