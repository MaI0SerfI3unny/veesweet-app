const router = require('express-promise-router')()
const { 
    getAllCollections,
    deleteCollections,
    createCollections,
    updateCollections
} = require('@/controller/CollectionController')

router.get('/collections', getAllCollections)
router.delete('/collections/delete', deleteCollections)
router.post('/collection/create', createCollections)
router.put('/collection/update', updateCollections)

module.exports = router