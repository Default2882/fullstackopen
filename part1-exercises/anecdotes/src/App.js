import React, { useState } from 'react'

const Button = ({text, onclick}) => {
    return (
        <>
            <button onClick={onclick}> {text} </button>
        </>
    )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const len = anecdotes.length
  const getrandom = (statefunc) => {
    let rand = Math.round(Math.random() * (len - 1))
    console.log("click", rand)
    statefunc(rand)
  }

  console.log(selected, anecdotes[selected])

  return (
    <div>
      {anecdotes[selected]}
      <div>
          <Button text="Random anecdote" onclick={() => getrandom(setSelected)} />
      </div>
    </div>
  )
}
export default App;
