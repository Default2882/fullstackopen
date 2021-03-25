const { response } = require('express')
const express = require('express')

app = express()

persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "040-023568"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "040-190222"
    },
    {
        id: 4,
        name: "Marry Poppendick",
        number: "040-098467"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/', (request, response) => {
    response.send("<h1>Hello World from the phonebook app. YeeHaw!!!</h1>")
})

app.get('/info', (request, response) => {
    const count = persons.length
    const date = new Date()
    response.send(`<h3>The phonebook has info for ${count} people </h3>
                  <h3>Date is : ${date}</h3>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id.toString() === id)
    if(!person) return response.status(404).end()
    else return response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    console.log("Trying to delete "+id)
    const person = persons.find(person => person.id.toString() === id)
    if (person){
        console.log("Deleting contact")
        console.log(person)
        persons = persons.filter(person => person.id.toString() !== id)
        return response.status(200).end()
    }
    else{
        console.log("Contact not found")
        return response.status(400).end()
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})