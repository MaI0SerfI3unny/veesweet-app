const { Category,TypeCategory } = require('@/models/')

const getCategoryTypes = async (_, res) => {
  try{
    const data = await TypeCategory.findAll({ include: [Category] })
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

const getAllCategory = async (_, res) => {
  try {
    const data = await Category.findAll({
        include: [{model:TypeCategory, attributes: ['title'] }]
    })
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

const createCategory = async(req,res) => {
  try{
    const { title, typeCategoryId, arrImgLink} = req.body
    if(!title || !typeCategoryId || !arrImgLink)
    {
      return res
        .status(400)
        .json({
            status: 400,
            description: "Нема необхідних даних"
        })
    }
    const findTypeCategoryExist = await TypeCategory.findByPk(typeCategoryId)
    if(!findTypeCategoryExist)
    {
      return res
        .status(404)
        .json({
            status: 404,
            description: "Тип категорії не було знайдено"
        })
    }
    await Category.create({title, typeCategoryId, photo: arrImgLink[0]})

    res.status(200).json({ 
      status: 200, message: "Категорію було успішно створено" 
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({
      status: 500,
      message: 'Some wrong with server. Please try later',
    })
  }
}

const deleteCategory = async(req,res) => {
  try{
    const {id} = req.body
    if(!id)
    {
      return res
        .status(403)
        .json({ status: 403, message: 'Нема необхідних даних' })
    }
  
    await Category.destroy({ where: { id } })
    res.status(200).json({
      status: 200, message: "Категорію було видалено"
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
  getAllCategory,
  getCategoryTypes,
  createCategory,
  deleteCategory
}
