const router = require('express-promise-router')()
const { 
    getBanner,
    createBannerNews,
    deleteBanner
} = require('@/controller/BannerController')
const { verifyPhoto } = require("@/middleware/verifyPhoto")

router.get('/banner', getBanner)
router.delete('/banner/delete', deleteBanner)
router.post('/banner/create', verifyPhoto, createBannerNews)

module.exports = router