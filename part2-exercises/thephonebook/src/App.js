import React, { useState } from 'react'
import Form from './components/Form'
import Filter from './components/Filter'
import PhoneBook from './components/PhoneBook'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ todisplay, setdisplay ] = useState([...persons])
  function handlename(event){
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  function handlenumber(event){
    setNewNumber(event.target.value)
  }

  function handlesubmit(event){
    event.preventDefault()
    const contains = persons.find(person => person.name === newName)
    //console.log("contains??? ", contains)
    if(!contains){
        const newobject = {name: newName, number: newNumber}
        setPersons(persons.concat(newobject))
        setdisplay(persons.concat(newobject))
        setNewName("")
        setNewNumber("")
    }
    else {window.alert(`The name "${contains.name}"  is already in the phone book`)}
  }

  function filterbook(event){
    console.log(event.target.value)
    const s = event.target.value.toLowerCase()
    if (s === "") setdisplay([...persons])
    else{
        const newdisplay = persons.filter(person => person.name.toLowerCase().startsWith(s))
        console.log(newdisplay)
        setdisplay(newdisplay)
    }
  }

  return (
    <>
    <div>
      <h2>Filter</h2>
      <Filter filterbook={filterbook}/>
      <h2>Phonebook</h2>
      <Form newName={newName} handlesubmit={handlesubmit} newNumber={newNumber}
            handlenumber={handlenumber} handlename={handlename}
      />
      <h2>Numbers</h2>
      <PhoneBook todisplay={todisplay}/>
    </div>
    </>
  )
}

export default App
