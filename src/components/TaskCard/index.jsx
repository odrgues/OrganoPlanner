import "./TaskCard.css";

const TaskCard = ({
  titulo,
  descricao,
  imagemUrl,
  primaryColor,
  secondaryColor,
  concluida,
  onClick,
  onConclude,
}) => {
  return (
    <div
      className={`task-card${concluida ? " concluida acinzentado" : ""}`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="cabecalho" style={{ backgroundColor: primaryColor }}>
        <img src={imagemUrl} alt={titulo} className="task-image" />
      </div>
      <div className="rodape">
        <h4>{titulo}</h4>
        <h5>{descricao}</h5>
        {concluida && <span className="concluida-label">Concluída</span>}
        {!concluida && onConclude && (
          <button
            className="concluir-btn"
            onClick={(e) => {
              e.stopPropagation();
              onConclude();
            }}
            style={{
              marginTop: 8,
              background: primaryColor,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "4px 12px",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Concluir
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
