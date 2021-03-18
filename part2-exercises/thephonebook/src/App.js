import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas'}
  ]) 
  const [ newName, setNewName ] = useState('')

  function handlename(event){
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  function handlesubmit(event){
    event.preventDefault()
    const contains = persons.find(person => person.name === newName)
    console.log("contains??? ", contains)
    if(!contains){
        const newobject = {name: newName}
        setPersons(persons.concat(newobject))
        setNewName("")
    }
    else {window.alert(`The name "${contains.name}"  is already in the phone book`)}
  }

  return (
    <>
    <div> Debug: {newName} </div>
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input 
                value={newName}
                onChange={handlename}
            />
        </div>
        <div>
          <button type="submit" onClick={handlesubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>{persons.map(person => <li key={person.name}>{person.name}</li>)}</ul>
    </div>
    </>
  )
}

export default App
