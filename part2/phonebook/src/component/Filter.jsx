const Filter = ({ newFilt, handleFilterInput }) => {
  return (
    <p>
      filter shown with <input value={newFilt} onChange={handleFilterInput} />
    </p>
  );
};

export default Filter;
