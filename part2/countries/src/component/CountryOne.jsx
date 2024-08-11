import { useState, useEffect } from "react";
import axios from "axios";

const CountryOne = ({ country, lat, lng }) => {
  const api_key = import.meta.env.VITE_SOME_KEY;
  const [temp, setTemp] = useState(0);
  const [iconn, setIcon] = useState("");
  const [wind, setWind] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,wind_speed_10m&forecast_days=1`
      )
      .then((response) => {
        setTemp(response.data.hourly.temperature_2m[0]);
        setWind(response.data.hourly.wind_speed_10m[0]);
      });

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lat}&appid=${api_key}`
      )
      .then((response) => setIcon(response.data.weather[0].icon));
  }, []);

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h4>languages</h4>
      <ul>
        {Object.values(country.languages).map((language, index) => {
          return <li key={index}>{language}</li>;
        })}
      </ul>
      <img
        src={country.flags.png}
        width="150"
      />
      <h3>Weather in {country.name.common}</h3>
      <p>temperature {temp} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${iconn}@2x.png`}
        width="100"
      />
      <p>wind {wind} m/s</p>
    </>
  );
};

export default CountryOne;
