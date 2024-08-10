import { useState, useEffect } from "react";
import axios from "axios";
import Message from "./component/Message";
import Country from "./component/Country";
import CountryOne from "./component/CountryOne";

function App() {
  const [name, setName] = useState("");
  const [countries, setCountries] = useState([]);
  const [message, setMessage] = useState("");
  let content;

  useEffect(() => {
    if (name) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then((response) => {
          const filteredCountries = response.data.filter((country) =>
            country.name.common.toLowerCase().includes(name.toLowerCase())
          );
          setCountries(filteredCountries);
          filteredCountries.length > 10
            ? setMessage("Too many matches, specify another filter")
            : setMessage("");
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [name]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <>
      <div>
        find countires{" "}
        <input
          value={name}
          onChange={handleNameChange}
        ></input>
        {message ? (
          <Message message={message} />
        ) : countries.length === 1 ? (
          <CountryOne country={countries[0]} />
        ) : (
          <Country countries={countries} />
        )}
      </div>
    </>
  );
}

export default App;
