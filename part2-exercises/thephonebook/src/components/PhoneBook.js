import React from 'react'

const PhoneBook = ({todisplay}) => {
    return <ul>{todisplay.map(person => <li key={person.name}>{person.name} : {person.number}</li>)}</ul>
}

export default PhoneBook
