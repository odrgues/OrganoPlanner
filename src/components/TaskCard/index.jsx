import "./TaskCard.css";

const TaskCard = ({
  title,
  description,
  image,
  primaryColor,
  secondaryColor,
  completed,
  onClick,
}) => {
  return (
    <div
      className={`task-card${completed ? " completed" : ""}`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="header" style={{ backgroundColor: primaryColor }}>
        <img src={image} alt={title} className="task-image" />
      </div>
      <div className="footer" style={{ backgroundColor: secondaryColor }}>
        <h4>{title}</h4>
        <h5>{description}</h5>
        {completed && <span className="completed-label">Completed</span>}
      </div>
    </div>
  );
};

export default TaskCard;
