const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ parts }) => {
  const exArr = parts.map((part) => part.exercises);
  const sum = exArr.reduce((a, b) => a + b, 0);
  return (
    <p>
      <strong>total of {sum} exercises</strong>
    </p>
  );
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
