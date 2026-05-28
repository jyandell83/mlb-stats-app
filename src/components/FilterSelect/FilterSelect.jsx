const FilterSelect = ({ id, label, options, value, onChange }) => {
  const handleSelectChange = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );

    onChange(values);
  };

  return (
    <div className="filter-group">
      <label htmlFor={id}>{label}</label>

      <select id={id} multiple value={value} onChange={handleSelectChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
export default FilterSelect;
