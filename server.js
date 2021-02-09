const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./config/connectDB')
require('dotenv').config()

const app = express()

//connect mongoDB database
connectDB()
app.use(bodyParser.json())
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Your app is running');
})
