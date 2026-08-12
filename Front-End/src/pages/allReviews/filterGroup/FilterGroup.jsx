function FilterGroup({ title, options, activeOption, getLabel, onChange }) {
  return (
    <>
      <p className="all-reviews__content--sidebar--filter--group-title">{title}</p>

      <div className="all-reviews__content--sidebar--filter--container">
        {options.map((option) => {
          const isActive = activeOption === option;

          return (
            <button key={option} className={`all-reviews__content--sidebar--filter--options ${isActive ? "is-active" : ""}`} onClick={() => onChange(option)}>
              {getLabel(option)}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default FilterGroup;
