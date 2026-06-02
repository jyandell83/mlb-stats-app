import { useState } from "react";

import "./FilterSection.css";

const FilterSection = ({ title = "Filter by", hint, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="filter">
      <div className="filters-header">
        <button
          type="button"
          className="filter-section-header"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
        >
          <h2>
            {title}
            <span className={`chevron ${isOpen ? "open" : ""}`}>›</span>
          </h2>
        </button>

        {hint && isOpen && <p className="filter-hint">{hint}</p>}
      </div>

      {isOpen && <div className="filters-content">{children}</div>}
    </div>
  );
};

export default FilterSection;
