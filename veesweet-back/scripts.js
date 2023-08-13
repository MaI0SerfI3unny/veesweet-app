const fs = require('fs/promises')
const path = require('path')
require('module-alias/register')
require('dotenv').config({ path: "./.env" })
require('module-alias/register')
require('@/models')
const db = require('@/services/db')
const { readFileSync } = require('fs');
const { XMLParser } = require('fast-xml-parser');
const Product = require('@/models/Product')
const GalleryProduct = require("@/models/GalleryProduct")
const script = process.env.script


const config = {
  seeders_folder: 'seeders',
}

const stripHtmlFunc = (offerContainer, i) => {
  const stripCDATA = offerContainer[i].description.slice(9, offerContainer[i].description.length - 3)
  const stripN = stripCDATA.replace("\n", " ");
  return stripN
}

async function loadvikamoda(){
  const blackList = [ 42, 58, 123 ]
  const xmlFile = readFileSync(`${process.cwd()}/clothes.xml`, 'utf8');
  const parser = new XMLParser();
  const json = parser.parse(xmlFile);

  const offerContainer = json.yml_catalog.shop.offers.offer
  for (let i = 0; i < offerContainer.length; i++) {
    if(!blackList.filter((e) => e === i).length){
      const resultDescription = stripHtmlFunc(offerContainer, i)
      const createdData = await Product.create({
        title: offerContainer[i].model,
        description: resultDescription, 
        discount: 0,
        price: offerContainer[i].oldprice ? offerContainer[i].oldprice + 200 : offerContainer[i].price + 200,
        param: offerContainer[i].param,
        vendorCode: offerContainer[i].vendorCode
      })
      const pictureArr = offerContainer[i].picture.map((el) => {
        return {
          url: el,
          productId: createdData.id
        }
      })
      GalleryProduct.bulkCreate(pictureArr)
    }
  }
  console.log("Loaded products from Vikamoda")
}

async function migrate() {
  await db.sync({ alter: true })
  console.log('All models were synchronized successfully.')
}

async function seed() {
  await Promise.all(
    Object.values(db.models).map(async (model) => {
      const filePath = path.join(
        __dirname,
        config.seeders_folder,
        `${model.name}.json`
      )
      try {
        const file = await fs.readFile(filePath)
        const data = JSON.parse(file)
        await db.queryInterface.bulkInsert(model.tableName, data)
      } catch (e) {}
    })
  )
}

const scripts = {
  migrate,
  seed,
  loadvikamoda
}

scripts[script]?.()