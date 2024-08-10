import { useState, useEffect } from "react";
import Person from "./component/Person";
import Filter from "./component/Filter";
import AddPeople from "./component/AddPeople";
import axios from "axios";
import personService from "./services/notes.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumb, setNewNumb] = useState("");
  const [newFilt, setNewFilt] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => setPersons(response));
  }, []);

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNumb = (event) => {
    setNewNumb(event.target.value);
  };

  const handleFilterInput = (event) => {
    setNewFilt(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();

    const nameObject = {
      name: newName,
      number: newNumb,
      id: `${persons.length + 1}`,
    };

    const exists = persons.some((person) => person.name === newName);

    personService.create(nameObject).then((response) => {
      exists
        ? alert(`${newName} is already added to phonebook`)
        : setPersons(persons.concat(response));
      setNewName("");
      setNewNumb("");
    });
  };

  const namesToShow = persons.filter((single) =>
    single.name.toLowerCase().includes(newFilt.toLowerCase())
  );

  const deletePerson = (id) => {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => {
        alert(`Person already deleted`);
        setPersons(persons.filter((person) => person.id !== id));
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        newFilt={newFilt}
        handleFilterInput={handleFilterInput}
      />
      <h2>add a new</h2>
      <AddPeople
        addName={addName}
        newName={newName}
        newNumb={newNumb}
        handleChangeName={handleChangeName}
        handleChangeNumb={handleChangeNumb}
      />
      <h2>Numbers</h2>
      {namesToShow.map((single) => {
        return (
          <Person
            key={single.id}
            person={single}
            deletePerson={() => deletePerson(single.id)}
          />
        );
      })}
      ;
    </div>
  );
};

export default App;
