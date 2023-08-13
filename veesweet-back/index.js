
require('module-alias/register')
require('dotenv').config({ path: "./.env" })

// Requires
const express = require('express')
const cors = require('cors')
const session = require('express-session');
const bodyParser = require('body-parser')
const router = require('./routes')
const YAML = require('yamljs')
const swaggerUI = require('swagger-ui-express')

// App
const app = express()

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.JWT_SECRET
}));

// Cors
app.use(
  cors({
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  })
)
// Middleware
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static(__dirname));

// swagger
const swaggerJsDocs = YAML.load('./api.yaml')
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs))

// api routes
app.use('/api', router)

app.listen(process.env.PORT_APP, async () => {
  console.log(
    `App has been started on ${process.env.HOST_APP}. Port: ${process.env.PORT_APP}`
  )
})