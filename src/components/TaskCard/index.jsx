import "./TaskCard.css";

const TaskCard = ({
  titulo,
  descricao,
  imagemUrl,
  primaryColor,
  secondaryColor,
  concluida,
  onClick,
}) => {
  return (
    <div
      className={`task-card${concluida ? " concluida" : ""}`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="cabecalho" style={{ backgroundColor: primaryColor }}>
        <img src={imagemUrl} alt={titulo} className="task-image" />
      </div>
      <div className="rodape" style={{ backgroundColor: secondaryColor }}>
        <h4>{titulo}</h4>
        <h5>{descricao}</h5>
        {concluida && <span className="concluida-label">Concluída</span>}
      </div>
    </div>
  );
};

export default TaskCard;
