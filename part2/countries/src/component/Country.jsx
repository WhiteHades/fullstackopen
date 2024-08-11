import { useState } from "react";
import CountryOne from "./CountryOne";

const Country = ({ countries }) => {
  const [countryOne, setCountry] = useState(null);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const handleClick = (country) => {
    setCountry(country);
    setLat(country.latlng[0]);
    setLng(country.latlng[1]);
  };

  return (
    <>
      {countryOne ? (
        <CountryOne
          country={countryOne}
          lat={lat}
          lng={lng}
        />
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
