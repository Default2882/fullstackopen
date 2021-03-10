import React from 'react'


const Cock = (props) => {
    console.log(props.name)
    return (
    <div>
        <p>bruh {props.name}</p>
    </div>
    )
}

const App = () => {
    const now = new Date();
    const a = 10;
    const b = 20;

    return (
    <>
        <p> Hello world, it is now {now.toString()} </p>
        <p> I hate CBT!! HAHA!! </p>
        <p> {a} plus {b} is {a+b} </p>
        <Cock name="Deez"/>
        <Cock name="nutss"/>
        <Cock name="ecsdee"/>
        <Cock name="lololololol"/>
    </>
    );
}

export default App
