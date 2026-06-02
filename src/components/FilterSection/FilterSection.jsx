const FilterSection = ({ title, hint, children }) => {
  return (
    <div className="filter">
      <div className="filters-header">
        <h2>{title}</h2>

        {hint && <p className="filter-hint">{hint}</p>}
      </div>

      <div className="filters-content">{children}</div>
    </div>
  );
};

export default FilterSection;
