import React from 'react'

const PhoneBook = ({todisplay, deleteContact}) => {
    return( 
        <ul>
            {
                todisplay.map(
                    (person) => <li key={person.name} id={person.id}>
                                    {person.name} : {person.number} 
                                    <button id={person.id} type="button" onClick={deleteContact}>Delete</button>
                                </li>
                )
            }
        </ul>
    )
}

export default PhoneBook
