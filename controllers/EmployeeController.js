const Employee = require('../models/Employee')


//Show the list of Employees
/*const index = (req, res, next) => {
  Employee.find()
    .then(response => {
      res.json({
        response
      })
    })
    .catch(error => {
      res.json({
        message: 'An error occorred!'
      })
    })
}
*/


//Show single employee
const show = (req, res, next) => {
  let employeeID = req.body.employeeID
  Employee.findById(employeeID)
    .then(response => {
      res.json({
        response
      })
    })
    .catch(error => {
      message: 'An error occurred!'
    })
}

//add new employee
const store = (req, res, next) => {
  let employee = new Employee({
    name: req.body.name,
    sobrenome: req.body.sobrenome,
    email: req.body.email,
    celular: req.body.celular,
    cep: req.body.cep,
    rua: req.body.rua,
    bairro: req.body.bairro,
    numero: req.body.numero,
    cidade: req.body.cidade,
    estado: req.body.estado
  })
  employee.save()
    .then(response => {
      res.render('pagamento.ejs')
    })
    .catch(error => {
      res.send('Houve um erro em nosso servidor. Recarregue a página e tente novamente.')
    })
}

//update an employee
const update = (req, res, next) => {
  let employeeID = req.body.employeeID

  let updatedData = {
    name: req.body.name,
    sobrenome: req.body.sobrenome,
    celular: req.body.celular,
    cep: req.body.cep,
    rua: req.body.rua,
    bairro: req.body.bairro,
    numero: req.body.numero,
    cidade: req.body.cidade,
    estado: req.body.estado
  }

  Employee.findByIdAndUpdate(employeeID, { $set: updatedData })
    .then(() => {
      res.json({
        message: 'Employee added sucessfully!'
      })
    })
    .catch(error => {
      res.json({
        message: 'An error occured'
      })
    })
}

// delete an employee
const destroy = (req, res, next) => {
  let employeeID = req.body.employeeID
  Employee.findOneAndRemove(employeeID)
    .then(() => {
      res.json({
        message: 'Destroyed sucessfully!'
      })
    })
    .catch(error => {
      res.json({
        message: 'An error occured'
      })

    })
}

module.exports = {
  show, store, update, destroy
}