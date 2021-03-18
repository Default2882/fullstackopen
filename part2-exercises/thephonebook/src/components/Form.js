import React from 'react'

const Form = ({newName, handlename, newNumber, handlenumber, handlesubmit}) => {
return(
    <form>
        <div>
          <p>name: <input value={newName} onChange={handlename} /></p>
          <p>number: <input value={newNumber} onChange={handlenumber} /></p>
        </div>
        <div>
          <button type="submit" onClick={handlesubmit}>add</button>
        </div>
      </form>
    )
}

export default Form
