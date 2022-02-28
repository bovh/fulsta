import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName, number: newNumber
    }
    const existingPerson = persons.find(person => person.name === newName)
    if (!existingPerson) {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setSuccessMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => { setSuccessMessage(null) }, 5000)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
    else {
      if (window.confirm(`${newName} already listed, update number?`)) {
        personService
          .update(existingPerson.id, personObject)
          .then(returnedPerson => {
            setSuccessMessage(`Updated ${returnedPerson.name}'s number`)
            setTimeout(() => { setSuccessMessage(null) }, 5000)
            setPersons(persons.map(person =>
              person.id !== existingPerson.id ? person : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
          })
      }
    }
  }

  const removePerson = id => {
    const personName = persons.find(person => person.id === id).name
    if (window.confirm(`Delete ${personName}?`)) {
      personService
        .remove(id)
        .then(() => {
          setSuccessMessage(`Deleted ${personName}`)
          setTimeout(() => { setSuccessMessage(null) }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setErrorMessage(`${personName} was already deleted from server`)
          setTimeout(() => { setErrorMessage(null) }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const personsToShow = nameFilter === '' ? persons : persons.filter(
    person => person.name.toLowerCase().includes(nameFilter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type="error" message={errorMessage} />
      <Notification type="success" message={successMessage} />
      <Filter name={nameFilter} handleChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        name={newName} handleNameChange={handleNameChange}
        number={newNumber} handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleClick={removePerson} />
    </div>
  )
}

export default App