import { useState, useEffect } from "react";
import Person from "./component/Person";
import Filter from "./component/Filter";
import AddPeople from "./component/AddPeople";
import axios from "axios";
import personService from "./services/notes.js";
import Notification from "./component/Notification.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumb, setNewNumb] = useState("");
  const [newFilt, setNewFilt] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [colour, setColour] = useState("green");

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

    const exists = persons.find((person) => person.name === newName);

    if (exists) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(exists.id, nameObject)
          .then((upPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== upPerson.id ? person : upPerson
              )
            );
          })
          .catch((error) => {
            setColour("red");
            setErrorMessage(
              `Information of ${newName} has already been removed from the server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            setPersons(persons.filter((person) => person.id !== exists.id));
          });
      }
    } else {
      personService.create(nameObject).then((response) => {
        setPersons(persons.concat(response));

        setErrorMessage(`Added ${newName}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);

        setNewName("");
        setNewNumb("");
      });
    }
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
      .catch(() => {
        alert(`Person already deleted`);
        setPersons(persons.filter((person) => person.id !== id));
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={errorMessage}
        colour={colour}
      />
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
