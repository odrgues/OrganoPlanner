import "./DropdownList.css";

const DropdownList = ({ label, value, onChange, required, items }) => {
  return (
    <div className="dropdown-list">
      <label>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      >
        <option value=""></option>
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownList;
