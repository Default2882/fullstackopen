// URI : mongodb+srv://fullstack:<password>@cluster0.j30ge.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const mongoose = require('mongoose')

if (process.argv.length < 3){
  console.log('Please provide the password to the MongoDB')
  process.exit(1)
}

const password = process.argv[2]
const uri = `mongodb+srv://fullstack:${password}@cluster0.j30ge.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

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
  .then(response => {
    // if we have enough arguments add it to the database server.
    if (process.argv.length == 5){
      const newPerson = new Person({
        name: process.argv[3],
        number: process.argv[4]
      })
      // console.log(newPerson)
      newPerson.save()
        .then(result => {
          console.log(`Added name: ${process.argv[3]}, number: ${process.argv[4]} to the database`)
          // console.log(result)
          mongoose.connection.close()
        })
        .catch(response => {
          console.log(response)
        })
    }
    else{
      Person.find((err, persons) => {
        if (err) return console.log(response)
        else {
          console.log('Phonebook: ')
          for(let i = 0; i < persons.length; i++){
            console.log(persons[i].name, persons[i].number)
          }
        }
        mongoose.connection.close()
      })
    }
  })




