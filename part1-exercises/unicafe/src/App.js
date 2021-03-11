import React, { useState } from 'react'

const Butt = ({text, onclick, score}) => {
    return (
        <>
            <p>{text}: {score}</p>
            <button onClick={onclick}>{text}</button>
        </>
    )
}

const Statistics = ({good, bad, neutral}) => {
    let total = good + bad + neutral
    let average = (good*1 + bad*-1 + neutral*0)/total
    let positive = good/total * 100
    if (!total) total = 0
    if (!average) average = 0
    if (!positive) positive = 0
    return (
        <>
        <p> Total: {total}</p>
        <p> Average: {average}</p>
        <p> positive Rating: {positive}%</p>
        </>
    )
}

const App = () => {

    const [ good, setGood ] = useState(0)
    const [ neutral, setNeutral ] = useState(0)
    const [ bad, setBad ] = useState(0)

    const updatescore = (score, setfunc) => setfunc(score + 1)
    
    return (
        <div>
            <h1>Give feedback, Please!</h1>
            <Butt text="Good" onclick={() => updatescore(good, setGood)} score={good}/>
            <Butt text="Neutral" onclick={() => updatescore(neutral, setNeutral)} score={neutral}/>
            <Butt text="Bad" onclick={() => updatescore(bad, setBad)} score={bad}/>
            <Statistics good={good} bad={bad} neutral={neutral}/>
        </div>

    )
}


export default App;
