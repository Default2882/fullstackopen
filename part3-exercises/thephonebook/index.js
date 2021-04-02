require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')
app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

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

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findById(id).then(person => {
        if (person) response.json(person)
        else response.status(404).end()
    })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    // console.log("Trying to delete "+id)
    Person.findByIdAndRemove(id)
    .then(result => {
        console.log(result)
        response.status(204).end()
    })
    .catch(err => next(err))
})

// useless function
// const generateID = () => {
//     if (persons.length === 0) return 0
//     let newId = 1
//     while (persons.find(person => person.id === newId)){
//         newId = Math.floor(Math.random()*Math.floor(2000))
//     }
//     return newId
// }

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    const newPerson = Person({...body})
    newPerson.save()
    .then(result => {
        console.log(`Added name: ${body.name}, number: ${body.number} to the database`)
        // console.log("here", result)
        response.json(result.toJSON())
    })
    .catch(err => next(err))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const id = request.params.id
    
    const updatedPerson = {
        name: body.name,
        number: body.number
    }
    console.log(updatedPerson, id)
    Person.findById(id).then(person => {
        console.log("found: ",person)
    })

    Person.findByIdAndUpdate(id, updatedPerson , { new : true })
    .then(result => {
        console.log(result)
        response.json(result.toJSON())
    })
    .catch(err => next(err))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') return response.status(400).send({ error: 'malformatted id' }) 
    else if(error.name === 'ValidationError') return response.status(400).send({ error: error.message })
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})