const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const fs = require('fs')
const { Console } = require('console')
require('dotenv').config()

const app = express()

mongoose.connect(process.env.REACT_APP_DB_URL)
.then(() => console.log('CONNECTION TO DB SUCCESSFUL'))
.catch((err) => console.log("ERROR CONNECTING TO DB -> ", err))

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())

fs.readdirSync('./routes').map((r)=> app.use("/api", require('./routes/'+r)))
const port = process.env.REACT_APP_DB_PORT || 8000

app.listen(port, console.log("App is listening on port", port))