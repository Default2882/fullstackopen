import React, { useState } from 'react'

const Butt = ({text, onclick, score}) => {
    return (
        <>
            <p>{text}: {score}</p>
            <button onClick={onclick}>{text}</button>
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
        </div>

    )
}


export default App;
