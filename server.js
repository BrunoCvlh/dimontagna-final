const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const employeeRoute = require('./routes/employee')

mongoose.connect('mongodb+srv://bruno:gJDRvIJxZL1TntWm@dimontagna.qrrsmct.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', (err) => {
  console.log(err)
})

db.once('open', () => {
  console.log('Database connection ready!')
})

const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('Server is running on port 3000')
})

app.use('/api/employee', employeeRoute)