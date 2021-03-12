import React, { useState } from 'react'

const Button = ({text, onclick}) => {
    return (
        <>
            <button onClick={onclick}> {text} </button>
        </>
    )
}

const checkanecdote = (votes, previndex, statefunc, popanec, anecdotes) => {
    let mx = -1; // max
    let maxind = -1;
    console.log(votes, previndex, popanec)
    for(let index = 0; index < votes.length; index++){
        if (mx < votes[index]){
            mx = votes[index]
            maxind = index
        }
    }
    if (maxind !== previndex){
        let newobj = {
            popanecdote: anecdotes[maxind],
            previndex: maxind
        }
        return newobj
     }
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
  const [votes, setVote] = useState(Array(len).fill(0))
  const [previous, setPop] = useState({ 
      popanecdote : anecdotes[0],
      previndex : 0
  })

  const getrandom = (statefunc) => {
    let rand = Math.round(Math.random() * (len - 1))
    //console.log("click", rand)
    statefunc(rand)
  }

  //console.log(selected, anecdotes[selected])

  const castvote = (index, statefunc) => {
    let newarr = [...votes]
    newarr[index] += 1
    //console.log("Casting vote")
    //console.log(votes)
    //console.log(index)
    //console.log(newarr)
    statefunc(newarr)
  }

  let objectt = checkanecdote(votes, previous.previndex, setPop, previous.popanecdote, anecdotes)

  if(objectt) setPop(objectt)

  return (
    <div>
        <h1> Daily anecdote: </h1>
        <p>{anecdotes[selected]}</p>
        <p>Votes: {votes[selected]}</p>
        <div>
          <Button text="Random anecdote" onclick={() => getrandom(setSelected)} />
          <Button text="Cast Vote" onclick={() => castvote(selected, setVote)} />
        </div>
        <h1> Most Voted anecdote is: </h1>
        <p>{previous.popanecdote}</p>
    </div>
  )
}
export default App;
