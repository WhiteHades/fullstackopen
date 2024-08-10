import { useState, useEffect } from "react";
import Person from "./component/Person";
import Filter from "./component/Filter";
import AddPeople from "./component/AddPeople";
import axios from "axios";

const App = () => {
  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumb, setNewNumb] = useState("");
  const [newFilt, setNewFilt] = useState("");

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
      id: persons.length + 1,
    };

    const exists = persons.some((person) => person.name === newName);

    exists
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(nameObject));

    setNewName("");
    setNewNumb("");
  };

  const namesToShow = persons.filter((single) =>
    single.name.toLowerCase().includes(newFilt.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilt={newFilt} handleFilterInput={handleFilterInput} />
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
        return <Person key={single.id} person={single} />;
      })}
      ;
    </div>
  );
};

export default App;
