import React, { useState } from 'react'

const Anecdote = ({ willRender, anecdotes, votes, anecdote, headline }) => {
  if (willRender > 0) {
    return (
      <div>
        <h1>{headline}</h1>
        <p>{anecdotes[anecdote]}</p>
        <p>has {votes[anecdote]} votes</p>
      </div>
    )
  }
  return (
    <div>
      <h1>{headline}</h1>
      <p>no votes yet</p>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState(0)
  const [mostVotesIndex, setMostVotesIndex] = useState(0)

  const handleNextClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  const handleVoteClick = () => {
    const index = selected
    const newVotes = [...votes]
    newVotes[index] += 1
    if (newVotes[index] > mostVotes) {
      setMostVotes(newVotes[index])
      setMostVotesIndex(index)
    }
    setVotes(newVotes)
  }

  return (
    <div>
      <Anecdote willRender={1} anecdotes={anecdotes} votes={votes} anecdote={selected} headline="Anecdote of the day" />
      <Button handleClick={handleVoteClick} text="vote" />
      <Button handleClick={handleNextClick} text="next anecdote" />
      <Anecdote willRender={mostVotes} anecdotes={anecdotes} votes={votes} anecdote={mostVotesIndex} headline="Anecdote with most votes" />
    </div>
  )
}

export default App