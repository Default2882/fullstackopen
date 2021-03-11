import React, { useState } from 'react'

const App = () => {
  const [ counter, setCounter ] = useState(0)

  console.log(counter, setCounter)

  const handleclick = () => {
    console.log("clicked")
    setCounter(counter+1);
  }

  return (
    <div>
    <div>{counter}</div>
    <button onClick={handleclick}>
      plus
    </button>
    <button onClick={() => setCounter(counter - 1)}>
      minus
    </button>
    </div>
  )
}

export default App
