import React from 'react'

const Header = ({ hline }) => (
  <h2>{hline}</h2>
)

const Part = ({ part }) => (
  <p>{part.name} {part.exercises}</p>
)

const Content = ({ parts }) => (
  <div>
    {parts.map(part =>
      <Part key={part.id} part={part} />
    )}
  </div>
)

const Total = ({ parts }) => (
  <p>Total of {
    parts.reduce((s, p) => s + p.exercises, 0)
  } exercises</p>
)

const Course = ({ course }) => (
  <div>
    <Header hline={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course