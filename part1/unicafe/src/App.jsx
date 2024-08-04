import { useState } from "react";

const Header = ({ header }) => {
  return <h1>{header}</h1>;
};

const Header2 = ({ header2 }) => {
  return <h1>{header2}</h1>;
};

const Button = ({ onClick1, onClick2, onClick3 }) => {
  return (
    <div>
      <button onClick={onClick1}>good</button>
      <button onClick={onClick2}>neutral</button>
      <button onClick={onClick3}>bad</button>
    </div>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const goodScore = 1;
  const neutralScore = 0;
  const badScore = -1;
  const all = good + neutral + bad;
  const average = all
    ? (
        (goodScore * good + neutralScore * neutral + badScore * bad) /
        all
      ).toFixed(2)
    : 0;
  const positive = all ? ((goodScore * good) / all).toFixed(2) : 0;

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <StatisticLine text="good" value={good} />
          </tr>
          <tr>
            <StatisticLine text="neutral" value={neutral} />
          </tr>
          <tr>
            <StatisticLine text="bad" value={bad} />
          </tr>
          <tr>
            <StatisticLine text="all" value={all} />
          </tr>
          <tr>
            <StatisticLine text="average" value={average} />
          </tr>
          <tr>
            <StatisticLine text="positive" value={positive} percent={true} />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const StatisticLine = (props) => {
  return (
    <>
      <td>{props.text}</td>
      <td>
        {props.value} {props.percent && "%"}
      </td>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const header = "give feedback";
  const header2 = "statistics";

  const onGoodClick = () => {
    setGood(good + 1);
  };
  const onNuetralClick = () => {
    setNeutral(neutral + 1);
  };
  const onBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header header={header} />
      <Button
        onClick1={onGoodClick}
        onClick2={onNuetralClick}
        onClick3={onBadClick}
      />
      <Header2 header2={header2} />
      {good || neutral || bad ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        "No feedback given"
      )}
    </div>
  );
};

export default App;
