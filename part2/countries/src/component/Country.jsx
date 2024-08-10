import { useState } from "react";
import CountryOne from "./CountryOne";

const Country = ({ countries }) => {
  const [countryOne, setCountry] = useState(null);

  const handleClick = (country) => {
    setCountry(country);
  };

  return (
    <>
      {countryOne ? (
        <CountryOne country={countryOne} />
      ) : (
        countries.map((country) => (
          <p key={country.name.common}>
            {country.name.common}
            <button
              onClick={() => {
                handleClick(country);
              }}
            >
              show
            </button>
          </p>
        ))
      )}
    </>
  );
};

export default Country;
