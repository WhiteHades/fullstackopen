const AddPeople = ({
  addName,
  newName,
  newNumb,
  handleChangeName,
  handleChangeNumb,
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleChangeName} />
      </div>
      <div>
        number: <input value={newNumb} onChange={handleChangeNumb} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default AddPeople;
