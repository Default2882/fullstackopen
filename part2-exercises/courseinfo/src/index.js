//code taken from model solution of part 1

import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
  return(
    <p>Number of exercises {sum}</p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
       {course.parts.map(onepart => <Part key={onepart.id} part={onepart}/>)}
    </div>
  )
}

const Course = ({course}) => {
    console.log(course, "in course rn")
    return (
        <>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
        </>
    )
} 

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: "Random Part which i added to see if everything is working fine",
        exercises: 19,
        id: 4
      }
    ]
  }

  return <div><Course course={course} /></div>
}

ReactDOM.render(<App />, document.getElementById('root'))
