import React from 'react'

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const sum = course.parts.reduce((total, val) => total + val.exercises , 0);
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

export default Course
