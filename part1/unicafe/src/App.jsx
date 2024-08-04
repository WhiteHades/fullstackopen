import { useState } from "react";

const Header = ({ header }) => {
  return <h1>{header}</h1>;
};

const Header2 = ({ header2 }) => {
  return <h1>{header2}</h1>;
};

const Button = ({ button1, button2, button3 }) => {
  return (
    <div>
      <button>{button1}</button>
      <button>{button2}</button>
      <button>{button3}</button>
    </div>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  return (
    <div>
      <p> good {good}</p>
      <p> bad {bad}</p>
      <p> neutral {neutral}</p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const header = "give feedback";
  const header2 = "statistics";

  return (
    <div>
      <Header header={header} />
      <Button button1={good} button2={neutral} button3={bad} />
      <Header2 header2={header2} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
