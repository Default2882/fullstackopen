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
          // console.log(response)
          newobject.id = response.id
          setPersons(persons.concat(newobject))
          setdisplay(persons.concat(newobject))
          setNewName("")
          setNewNumber("")
        })
    }
    else if (newNumber !== contains.number){
      const result = window.confirm(`
                    The name "${contains.name}" is already in the phone book. 
                    Do you want to update it??
                    `)
      if (result){
          const newobject = {name: newName, number: newNumber, id: contains.id}
          phoneService.updateContact(contains.id , newobject)
          .then(response => {
            setPersons(persons.map((person) => {
              if (person.name === newName) {
                  person.number = newNumber
                  return person
                }
              else return person
            }))
            setdisplay(persons.map((person) => {
              if (person.name === newName) {
                  person.number = newNumber
                  return person
                }
              else return person
            }))
            setNewName("")
            setNewNumber("")
          })
      }
    }
    else {window.alert(`The contact with the same name "${newName}" and number "${newNumber}" exists.`)}
  }

  function filterbook(event){
    //console.log(event.target.value)
    const s = event.target.value.toLowerCase()
    if (s === "") setdisplay([...persons])
    else{
        const newdisplay = persons.filter(person => person.name.toLowerCase().startsWith(s))
        // console.log(newdisplay)
        setdisplay(newdisplay)
    }
  }

  function deleteContact(event){
    const id = event.target.id
    // console.log("Before deleting : ", persons)
    const todelete = persons.find((person) => person.id.toString() === id)
    let name;
    if (todelete) name = todelete.name
    else return // if the id does not exist in out array, simply return
    const result = window.confirm(`Do you want to delete ${name}`)
    if (result && name){
      phoneService.deleteContactapi(id)
      .then(phoneService.initialFetch)
      .then(response => {
        console.log("Reloading")
        console.log(response)
        //console.log(response.data)
        setPersons(response)
        setdisplay(response)
        // console.log("Should be deleted ", persons)
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
