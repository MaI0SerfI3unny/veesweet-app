const { Banner } = require('@/models/')

const getBanner = async(_, res) => {
    try{
        const data = await Banner.findAll()
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

const createBannerNews = async(req,res) => {
    try{
        const { title, description, bottom_description, link, discount = 0, arrImgLink } = req.body
        if(!title || !description || !bottom_description || !link || !arrImgLink)
        {
            return res
                .status(400)
                .json({
                    status: 400,
                    description: "Нема необхідних даних"
                })
        }
        if(discount > 100 || discount < 0)
        {
            return res 
                .status(400)
                .json({
                    status: 400,
                    description: "Некоректна знижка"
                })
        }
        await Banner.create({
            title, 
            description, 
            bottom_description, 
            link, 
            discount, 
            photo: arrImgLink[0]
        })
        res.status(200).json({ 
            status: 200, 
            message: "Новини для банера були успішно створені" 
        })
    }catch(e){
        console.error(e)
        res.status(500).json({
          status: 500,
          message: 'Some wrong with server. Please try later',
        })
    }
}

const deleteBanner = async (req, res) => {
    try{
      const { id } = req.body
      if(!id)
      {
        return res
          .status(403)
          .json({ status: 403, message: 'Нема необхідних даних' })
      }
  
      await Banner.destroy({ where: { id } })
      res.status(200).json({
        status: 200, message: "Новину було видалено"
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
    getBanner,
    createBannerNews,
    deleteBanner
}