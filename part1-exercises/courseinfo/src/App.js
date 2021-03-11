import React from 'react'

const Header = (prop) => {
    console.log("Header")
    console.log(prop)
    return (
        <>
            <h1>{prop.value}</h1>
        </>
    )
}

const Part = (prop) => {
    console.log("Part")
    console.log(prop.part)
    return (
        <>
            <p>
                {prop.part.name} {prop.part.exercises}
            </p>
        </>
    )
}
const Content = (prop) => {
    console.log("Content")
    console.log(prop)
    return (
        <>
            <Part part={prop.parts[0]} />
            <Part part={prop.parts[1]} />
            <Part part={prop.parts[2]} />
        </>
    )
}

const Total = (prop) => {
    console.log("Total")
    console.log(prop)
    const v1 = prop.parts[0].exercises
    const v2 = prop.parts[1].exercises
    const v3 = prop.parts[2].exercises

    return (
        <>
            <p>Number of exercises {v1 + v2 + v3} </p>
        </>
    )
}

const App = () => {
  const course = {
      name: 'Half Stack application development',
      parts: [
          {
              name: 'Fundamentals of React',
              exercises: 10
          },
          {
              name: 'Using props to pass data',
              exercises: 7
          },
          {
              name: 'State of a component',
              exercises: 14
          }
      ]
  }
  return (
    <div>
      <Header value={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
