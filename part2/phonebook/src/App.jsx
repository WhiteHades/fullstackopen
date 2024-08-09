import { useState } from "react";
import Person from "./component/Person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "123456" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumb, setNewNumb] = useState("");

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNumb = (event) => {
    setNewNumb(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();

    const nameObject = {
      name: newName,
      number: newNumb,
    };

    const exists = persons.some((person) => person.name === newName);

    exists
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(nameObject));

    setNewName("");
    setNewNumb("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
          number: <input value={newNumb} onChange={handleChangeNumb} />
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
