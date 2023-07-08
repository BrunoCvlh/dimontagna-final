const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
  name: {type: String},
  sobrenome: {type: String},
  email: {type: String},
  celular: {type: String},
  cep: {type: String},
  rua: {type: String},
  bairro: {type: String},
  numeroComplemento: {type: String},
  cidade: {type: String},
  estado: {type: String},
}, {timestamps: true})

const Employee = mongoose.model('Employee', employeeSchema)
module.exports = Employee