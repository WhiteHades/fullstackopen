const CountryOne = ({ country }) => {
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
    </>
  );
};

export default CountryOne;
