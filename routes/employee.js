const express = require('express')
const router = express.Router()
const EmployeeModel = require('../models/Employee')
const EmployeeController = require('../controllers/EmployeeController')



router.get('/', (req, res) => {
    res.render('index.ejs')
})

router.get('/carrinho', (req, res) => {
    res.render('produtos.ejs')
})

router.get('/contate', (req, res)=> {
    res.render('contate.ejs')
})

router.post('/show', EmployeeController.show)

router.post('/store', EmployeeController.store)

router.get('/store', (req, res) => {
    res.render('formUser.ejs')
})

router.post('/update', EmployeeController.update)

router.post('/delete', EmployeeController.destroy)

module.exports = router