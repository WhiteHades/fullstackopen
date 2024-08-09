import { useState } from "react";
import Person from "./component/Person";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();

    const nameObject = {
      name: newName,
    };

    const exists = persons.some((person) => person.name === newName);

    exists
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(nameObject));
    setNewName("");
  };

  return (
    <div>
      {/* <div>debug: {newName}</div> */}
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((single) => {
        return <Person key={single.name} person={single} />;
      })}
      ;
    </div>
  );
};

export default App;
