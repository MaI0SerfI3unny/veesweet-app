const { Collections, Product, GalleryProduct,Category } = require('@/models/')
const { Op } = require("sequelize");

const getAllCollections = async(_,res) => {
    try{
        const data = await Collections.findAll({ 
            include: [{ model:Product, include: [GalleryProduct,Category] }]    
        })
        res.status(200).json({ 
            status: 200, 
            data 
        })
    }catch(e){
        console.error(e)
        res.status(500).json({
            status: 500,
            message: 'Some wrong with server. Please try later',
        })
    }
}

const createCollections = async(req,res) => {
    try{
        const { arrProduct = [], title } = req.body
        if(!title)
        {
            return res
                .status(403)
                .json({
                    status: 403, 
                    message: 'Нема необхідних даних'
                })
        }
        const data = await Collections.create({ title })
        await Product.update(
            { collectionId: data.id }, 
            { where: { id: { [Op.in]: arrProduct } } }
        )
        res.status(200).json({ 
            status: 200, 
            message: "Колекція була успішно створена" 
        })
    }catch(e){
        console.error(e)
        res.status(500).json({
            status: 500,
            message: 'Some wrong with server. Please try later',
        })
    }
}

const updateCollections = async(req,res) => {
    try{
        const { arrProduct, id } = req.body
        if(!id ||
            !arrProduct || 
            !Array.isArray(arrProduct))
        {
            return res
                .status(403)
                .json({
                    status: 403, 
                    message: 'Нема необхідних даних або некоректні дані'
                }) 
        }
        await Product.update(
            { collectionId : null },
            { where: { collectionId : id } }
        )
        await Product.update(
            { collectionId: id },
            { where: { id: { [Op.in]: arrProduct } } }
        )
        res.status(200).json({ 
            status: 200, 
            message: "Колекція була успішно оновлена" 
        })
    }catch(e){
        console.error(e)
        res.status(500).json({
            status: 500,
            message: 'Some wrong with server. Please try later',
        })
    }
}

const deleteCollections = async(req,res) => {
    try{
        const { id } = req.body
        if(!id)
        {
            return res
            .status(403)
            .json({ 
                status: 403, 
                message: 'Нема необхідних даних' 
            })
        }
  
        await Collections.destroy({ where: { id } })
        res.status(200).json({
            status: 200, 
            message: "Колекція було видалено"
        })
    }catch(e){
        console.error(e)
        res.status(500).json({
            status: 500,
            message: 'Some wrong with server. Please try later',
        }) 
    }
}

module.exports = { 
    getAllCollections,
    deleteCollections,
    createCollections,
    updateCollections
}  