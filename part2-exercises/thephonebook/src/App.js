import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Filter from './components/Filter'
import PhoneBook from './components/PhoneBook'
import phoneService from './services/phone'
import Notification from './components/Notification'
import './index.css'

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
    .catch(reason => {
      console.log("HTTP GET failed!")
      console.log(reason)
      setNotif(reason.response.data)
      setStatus(false)
      setTimeout(() => {setNotif(null)}, 2000)
    })
  }, [])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ todisplay, setdisplay ] = useState([...persons])
  const [ notifDisplay, setNotif ] = useState(null)
  const [ status, setStatus ] = useState(true)

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
          newobject.id = response.id
          setPersons(persons.concat(newobject))
          setdisplay(persons.concat(newobject))
          setNewName("")
          setNewNumber("")
          setNotif(`${response.name} has been added to the phone book!`)
          setStatus(true)
          setTimeout(() => {setNotif(null)}, 2000)
        })
        .catch(err => {
          setNotif(err.response.data.error)
          setStatus(false)
          setTimeout(() => {setNotif(null)}, 2000)
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
            setNotif(`${response.name} has been updated`)
            setStatus(true)
            setTimeout(() => {setNotif(null)}, 2000)
          })
          .catch(err => {
            setNotif(err.response.data.error)
            setStatus(false)
            setTimeout(() => {setNotif(null)}, 2000)
          })
          
      }
    }
    else {
      setNotif(`The contact with the same name "${newName}" and number "${newNumber}" exists.`)
      setStatus(false)
      setTimeout(() => {setNotif(null)}, 2000)
    }
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
      phoneService.deleteContactapi(id, status, setNotif, notifDisplay, setStatus, name)
      .then(phoneService.initialFetch)
      .then(response => {
        console.log("Reloading")
        console.log(response)
        //console.log(response.data)
        setPersons(response)
        setdisplay(response)
        // console.log("Should be deleted ", persons)
      })
      .catch(reason => {
        console.log("Delete failed")
        // console.log(reason)
        setNotif(`${name} has already been removed from the database`)
        setStatus(false)
        setTimeout(() => {setNotif(null)} , 10000)
    })
    }
  }

  return (
    <>
    <Notification message={notifDisplay} isok={status}/>
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
