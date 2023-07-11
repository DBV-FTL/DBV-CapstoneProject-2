const express = require('express')
require('dotenv').config()
const app = express()
const morgan = require('morgan')
const cors = require('cors')


app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))



app.get('/', (req,res) => {
  res.status(200).json({ping:'pong'})
})




module.exports = app;