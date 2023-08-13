const fs = require("fs")
const uuid = require('uuid')

const createPhoto = (imgLink, images) => {
    let base64 =  images.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let format = images.substring("data:image/".length, images.indexOf(";base64"))
    
    var buffer = new Buffer.from(base64[2],'base64');
    try{
        const randomNum = uuid.v4()
        const linkImg = `${imgLink}${randomNum}.${format}`  
        fs.writeFileSync("./"+linkImg, buffer, 'base64');
        return linkImg
    }catch(e){
        throw new Error(JSON.stringify({ status: 401, message: "Incorrect reading file" }))
    }
}

const verifyPhoto = (req, _, next) => {
    const {photo} = req.body
    const arrImgLink = photo.map((images) => {
        if(~images.indexOf("http://") || 
           ~images.indexOf("https://")){
            return images
        }else{
            let base64 =  images.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            let format = images.substring("data:image/".length, images.indexOf(";base64"))
            
            var buffer = new Buffer.from(base64[2],'base64');
            try{
                const randomNum = uuid.v4()
                const linkImg = `mediafile/banner/${randomNum}.${format}`  
                fs.writeFileSync("./"+linkImg, buffer, 'base64');
                return linkImg
            }catch(e){
                throw new Error(JSON.stringify({ status: 401, message: "Incorrect reading file" }))
            }
        }
        })
        req.body.arrImgLink = arrImgLink
        next()
}

const verifyCategoryPhoto = (req, _, next) => {
    const {photo} = req.body
    const arrImgLink = photo.map((images) => {
        if(~images.indexOf("http://") || 
           ~images.indexOf("https://")){
            return images
        }else{
            return createPhoto("mediafile/category/", images)
        }
    })
    req.body.arrImgLink = arrImgLink
    next()
}

const verifyGalleryProduct = (req, _, next) => {
    const {photo} = req.body
    const arrImgLink = photo.map((images) => {
        if(~images.indexOf("http://") || 
           ~images.indexOf("https://")){
            return images
        }else{
            let base64 =  images.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            let format = images.substring("data:image/".length, images.indexOf(";base64"))
            
            var buffer = new Buffer.from(base64[2],'base64');
            try{
                const randomNum = uuid.v4()
                const linkImg = `mediafile/products/${randomNum}.${format}`  
                fs.writeFileSync("./"+linkImg, buffer, 'base64');
                return linkImg
            }catch(e){
                throw new Error(JSON.stringify({ status: 401, message: "Incorrect reading file" }))
            }
        }
        })
        req.body.imgArr = arrImgLink
        next()
}



module.exports = {
    verifyPhoto,
    verifyGalleryProduct,
    verifyCategoryPhoto
}