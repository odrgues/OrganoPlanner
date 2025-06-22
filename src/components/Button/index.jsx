import "./Button.css";

const Button = ({ type = "button", ...props }) => {
  return (
    <button type={type} className="button" {...props}>
      {props.children}
    </button>
  );
};

export default Button;
