import "./TextField.css";

const TextField = ({
  label,
  placeholder,
  value,
  onChange,
  required,
  type = "text",
}) => {
  return (
    <div className="text-field">
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={`${placeholder}`}
      ></input>
    </div>
  );
};

export default TextField;
