import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Filter from './components/Filter'
import PhoneBook from './components/PhoneBook'
import phoneService from './services/phone'

const App = () => {
  
  const [persons, setPersons] = useState([])

  useEffect(() => {
    phoneService.initialFetch()
    .then(response => {
      //console.log(response)
      //console.log(response.data)
      setPersons(response)
      setdisplay(response)
    })
  }, [])

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
        phoneService.addContact(newobject)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(newobject))
          setdisplay(persons.concat(newobject))
          setNewName("")
          setNewNumber("")
        })
        
    }
    else {window.alert(`The name "${contains.name}"  is already in the phone book`)}
  }

  function filterbook(event){
    //console.log(event.target.value)
    const s = event.target.value.toLowerCase()
    if (s === "") setdisplay([...persons])
    else{
        const newdisplay = persons.filter(person => person.name.toLowerCase().startsWith(s))
        console.log(newdisplay)
        setdisplay(newdisplay)
    }
  }

  function deleteContact(event){
    const id = event.target.id
    //const id = 69
    //console.log(id)
    const name = persons.find(person => person.id.toString() === id).name
    //console.log(name)
    const result = window.confirm("Do you want to delete "+name)
    if (result){
      phoneService.deleteContact(id)
      .then(phoneService.initialFetch)
      .then(response => {
        console.log("Reloading")
        console.log(response)
        //console.log(response.data)
        setPersons(response)
        setdisplay(response)
      })
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
      <PhoneBook todisplay={todisplay} deleteContact={deleteContact}/>
    </div>
    </>
  )
}

export default App
