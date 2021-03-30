require('dotenv').config()
const mongoose = require('mongoose')

const uri = process.env.MONGODB_URI 

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    useCreateIndex: true 
})
.then(response => {
    console.log("Connected to atlas")
    // console.log(response)
})
.catch(err => {
    console.log("Error connecting to the database")
    console.log(err.message)
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  module.exports = mongoose.model('Person', personSchema)

