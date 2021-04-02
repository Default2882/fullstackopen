require('dotenv').config()
const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const uri = process.env.MONGODB_URI

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(response => {
    console.log('Connected to atlas')
    // console.log(response)
  })
  .catch(err => {
    console.log('Error connecting to the database')
    console.log(err.message)
  })


const personSchema = new mongoose.Schema({
  name: {
    type : String,
    required: true,
    minlength: 3,
    unique: true
  },
  number: {
    type : String,
    required: true,
    minlength: 8,
    unique: true
  }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)

