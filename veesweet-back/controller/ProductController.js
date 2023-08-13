const { Product, Category, GalleryProduct } = require('@/models/')
const { Op } = require("sequelize");
const db = require('@/services/db')

const getAllProduct = async (req, res) => {
  try {
    const { search, id, page = '0', pageSize = '15', sort, categoryId, priceRange, size=[] } = req.query
    const offset = parseInt(page) * parseInt(pageSize)
    const limit = parseInt(pageSize)
    let whereAttr = { }
    let order = []

    if(sort)
      order.push(['price', sort])

    if(categoryId)
      whereAttr.categoryId = categoryId
      
    if(search)
        whereAttr.title = { [Op.like]: '%' + search + '%' }

    if(id)
        whereAttr.id = id

    if(priceRange && 
       Array.isArray(priceRange) && 
       priceRange.length === 2)
      whereAttr.price = { [Op.between] : priceRange }

    if(size && Array.isArray(size) && size.length !== 0)
    {
      const newSize = size.map((e) => {
        return { param: { [Op.substring]: e } }
      })
      const sizeObj = { [Op.or]: newSize }
      whereAttr = Object.assign({}, whereAttr, sizeObj);
    }

    const data = await Product.findAndCountAll({
        order,
        where: whereAttr,
        include: [Category, GalleryProduct],
        offset: offset,
        limit,
        distinct: true
      })

    res.status(200).json({ 
        status: 200, 
        data,
        page: parseInt(page),
        pageSize: parseInt(pageSize) 
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({
      status: 500,
      message: 'Some wrong with server. Please try later',
    })
  }
}

const getInterestProduct = async (req,res) => {
  try{
    const data = await Product.findAll({
      include: [Category, GalleryProduct],
      order: db.random(),
      limit: 4,
    });
    res.status(200).json({ 
      status: 200, 
      data,
    })
  }catch(e){
    console.error(e)
    res.status(500).json({
      status: 500,
      message: 'Some wrong with server. Please try later',
    })
  }
}

const createProduct = async(req,res) => {
    try {
        const { title, description, discount = 0, price, categoryId, collectionId, param, vendorCode, imgArr } = req.body
        if(!title || !description || !price || !param || !vendorCode)
        {
            return res
                .status(403)
                .json({ status: 403, message: 'Нема необхідних даних' })
        }

        if(typeof price !== 'number' || price <= 0)
        {
          return res
            .status(400)
            .json({ status: 400, message: 'Некоректна ціна' })
        }

        if(typeof vendorCode !== 'number')
        {
          return res
            .status(400)
            .json({ status: 400, message: 'Некоректний код' })
        }

        const createdData = await Product.create({
            title, 
            description, 
            discount, 
            price, 
            categoryId, 
            collectionId, 
            param,
            vendorCode
        })
        const pictureArr = imgArr.map((el) => {
          return {
            url: el,
            productId: createdData.id
          }
        })
        GalleryProduct.bulkCreate(pictureArr)
        res.status(200).json({
            status: 200, message: "Продукт успішно створено"
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({
        status: 500,
        message: 'Some wrong with server. Please try later',
        })
    }
}

const deleteProduct = async (req, res) => {
  try{
    const { id } = req.body
    if(!id)
    {
      return res
        .status(403)
        .json({ status: 403, message: 'Нема необхідних даних' })
    }

    await Product.destroy({ where: { id } })
    res.status(200).json({
      status: 200, message: "Продукт було видалено"
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
    getAllProduct,
    createProduct,
    deleteProduct,
    getInterestProduct
}
