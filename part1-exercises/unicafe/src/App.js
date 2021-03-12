import React, { useState } from 'react'

const Buttons = ({text, onclick, score}) => {
    return (
        <>
            <button onClick={onclick}>{text}</button>
        </>
    )
}

const Statistic = ({text, value}) => {
    return (
        <>
            <p> {text}: {value} </p>
        </>
    )
}

const Statistics = ({good, bad, neutral}) => {
    let total = good + bad + neutral
    let average = (good*1 + bad*-1 + neutral*0)/total
    let positive = good/total * 100
    if ((!total) && (!average) && (!positive)) return (
        <>
            <p> No Stats available yet!!</p>
        </>
    )
    return (
        <>
        <table>
        <tbody>
            <tr><td><Statistic text="Good: " value={good} /></td></tr>
            <tr><td><Statistic text="Neutral: " value={neutral} /></td></tr>
            <tr><td><Statistic text="Bad: " value={bad} /></td></tr>
            <tr><td><Statistic text="Total" value={total} /></td></tr>
            <tr><td><Statistic text="Average" value={average} /></td></tr>
            <tr><td><Statistic text="positive Rating" value={positive} /></td></tr>
        </tbody>
        </table>
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
            <Buttons text="Good" onclick={() => updatescore(good, setGood)} score={good}/>
            <Buttons text="Neutral" onclick={() => updatescore(neutral, setNeutral)} score={neutral}/>
            <Buttons text="Bad" onclick={() => updatescore(bad, setBad)} score={bad}/>
            <h1> Statistics! </h1>
            <Statistics good={good} bad={bad} neutral={neutral}/>
        </div>

    )
}


export default App;
