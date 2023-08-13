const { Order, Product, GalleryProduct, Category } = require('@/models/')
const { Op } = require("sequelize");

const getOrder = async(req,res) => {
    try {
        const { page = '0', pageSize = '15' } = req.query
        const offset = parseInt(page) * parseInt(pageSize)
        const limit = parseInt(pageSize)

        const data = await Order.findAll({ offset, limit })

        res.status(200).json({ 
            status: 200, data 
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({
        status: 500,
        message: 'Some wrong with server. Please try later',
        })
    }
}

const getOrderProducts = async(req,res) => {
    try{
        const { arrProduct = [] } = req.body
        const data = await Product.findAll({
            include: [GalleryProduct, Category],
            where: { id: { [Op.in]: arrProduct } }
        })
        res.status(200).json({ 
            status: 200, data 
        })
    }catch(e){
        console.error(e)
        res.status(500).json({
            status: 500,
            message: 'Some wrong with server. Please try later',
        })
    }
}

const createOrder = async(req,res) => {
    try {
        const { first_name, middle_name, last_name, email, phone, payment, deliveryType } = req.body

        if(!first_name || !middle_name || 
            !last_name || !email || !phone || 
            !payment || !deliveryType)
        {
            return res
                .status(403)
                .json({ status: 403, message: 'Нема необхідний даних' })
        }

        await Order.create({
            first_name, 
            middle_name, 
            last_name, 
            email, 
            phone, 
            payment, 
            deliveryType,
            address: "-"
          })

        res.status(200).json({
            status: 200, message: "Ордер був успішно створено"
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({
        status: 500,
        message: 'Some wrong with server. Please try later',
        })
    }
}

module.exports = { 
    createOrder,
    getOrder,
    getOrderProducts
}
