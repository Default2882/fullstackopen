import React from 'react'

const Header = (prop) => {
    return (
        <>
            <h1>{prop.value}</h1>
        </>
    )
}

const Part = (prop) => {
    return (
        <>
            <p>
                {prop.part} {prop.v}
            </p>
        </>
    )
}
const Content = (prop) => {
    return (
        <>
            <Part part={prop.part1} v={prop.exercises1}/>
            <Part part={prop.part2} v={prop.exercises2}/>
            <Part part={prop.part3} v={prop.exercises3}/>
        </>
    )
}

const Total = (prop) => {
    return (
        <>
            <p>Number of exercises {prop.v1 + prop.v2 + prop.v3} </p>
        </>
    )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header value={course}/>
      <Content 
        part1={part1} 
        part2={part2} 
        part3={part3} 
        exercises1={exercises1} 
        exercises2={exercises2} 
        exercises3={exercises3}
      />
      <Total v1={exercises1} v2={exercises2} v3={exercises3} />
    </div>
  )
}

export default App
