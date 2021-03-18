import React, { useState } from 'react'

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
    <div> DebugName: {newName} DebugNumber: {newNumber}</div>
    <div>
      <h2>Filter</h2>
      Filter Phonebook: <input onChange={filterbook} />
      <h2>Phonebook</h2>
      <form>
        <div>
          <p>name: <input value={newName} onChange={handlename} /></p>
          <p>number: <input value={newNumber} onChange={handlenumber} /></p>
        </div>
        <div>
          <button type="submit" onClick={handlesubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>{todisplay.map(person => <li key={person.name}>{person.name} : {person.number}</li>)}</ul>
    </div>
    </>
  )
}

export default App
