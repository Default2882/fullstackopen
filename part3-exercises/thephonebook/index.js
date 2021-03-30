require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')
app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
morgan.token('content', (request , response) => {
    return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :content'))

app.get('/api/persons', (request, response) => {
    Person.find({})
    .then(persons => {
        // console.log(persons)
        response.json(persons)
    })
})

app.get('/', (request, response) => {
    response.send("<h1>Hello World from the phonebook app. YeeHaw!!!</h1>")
})

app.get('/info', (request, response) => {
    Person.find({})
    .then(persons => {
        const count = persons.length
        const date = new Date()
        response.send(`<h3>The phonebook has info for ${count} people </h3>
                    <h3>Date is : ${date}</h3>`)
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person.findById(id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    // console.log("Trying to delete "+id)
    Person.deleteOne({_id: id}).
    then(result =>{
        response.json(result)
    })
})

const generateID = () => {
    if (persons.length === 0) return 0
    let newId = 1
    while (persons.find(person => person.id === newId)){
        newId = Math.floor(Math.random()*Math.floor(2000))
    }
    return newId
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    // console.log("adding : ", body)

    if (!body.number){
        return response.status(400).json({
            error: "Contact number is missing"
        })
    }
    else if(!body.name){
        return response.status(400).json({
            error: "Contact name is missing"
        })
    }
    else{
        const newPerson = Person({...body})
        newPerson.save()
        .then(result => {
            console.log(`Added name: ${body.name}, number: ${body.number} to the database`)
        })
        .then(result => {
            response.json(result)
        })
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})