const Person = ({ person, deletePerson }) => {
  const handleDelete = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      deletePerson();
    }
  };

  return (
    <p>
      {person.name} {person.number}{" "}
      <button
        type="submit"
        onClick={handleDelete}
      >
        delete
      </button>
    </p>
  );
};

export default Person;
