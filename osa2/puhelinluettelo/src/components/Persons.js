const Person = ({ person, handleClick }) => (
  <div>
    {person.name} {person.number} <button
      onClick={handleClick}>delete</button>
  </div>
)

const Persons = ({ persons, handleClick }) => (
  <div>
    {persons.map(person =>
      <Person key={person.id} person={person}
        handleClick={() => handleClick(person.id)} />
    )}
  </div>
)

export default Persons