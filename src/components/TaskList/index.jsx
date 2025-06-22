import "./TaskList.css";
import TaskCard from "../TaskCard";
import TaskForm from "../TaskForm";
import { useState } from "react";

const TaskList = ({
  tasks,
  primaryColor,
  secondaryColor,
  dayName,
  onSaveEdit,
  onDelete,
  onConclude,
}) => {
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  if (!tasks || tasks.length === 0) return null;
  return (
    <section
      className="task-list"
      style={{
        backgroundColor: secondaryColor,
        "--primary-color": primaryColor,
        "--secondary-color": secondaryColor,
      }}
    >
      <h3 className="task-list-title" style={{ borderColor: primaryColor }}>
        {dayName}
      </h3>
      <div className="task-list-cards">
        {tasks.map((task, idx) => (
          <div
            key={task.titulo + task.categoria + idx}
            className="task-list-card-wrapper"
            style={{ cursor: "pointer" }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget.querySelector(".edit-icon-btn");
              if (btn) btn.style.opacity = 1;
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget.querySelector(".edit-icon-btn");
              if (btn && editingTaskIndex !== idx) btn.style.opacity = 0;
            }}
          >
            <div className="task-card-edit-wrapper">
              <TaskCard
                titulo={task.titulo}
                descricao={task.descricao}
                imagemUrl={task.imagemUrl}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                concluida={task.concluida}
                id={task.id}
                // Adiciona classe para visual acinzentado se concluída
                className={task.concluida ? "concluida" : ""}
              />
              <button
                className="edit-icon-btn"
                title="Edit task"
                style={{
                  opacity: editingTaskIndex === idx ? 1 : 0,
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Clicou em editar", idx, task.id, task);
                  setEditingTaskIndex(idx);
                }}
                data-id={task.id}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#555"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
              </button>
              {/* Só mostra o container do formulário se este card está em edição */}
              {editingTaskIndex === idx && (
                <div className="task-edit-form-wrapper">
                  <TaskForm
                    onSubmit={(data) => {
                      console.log(
                        "onSubmit edição disparado",
                        data,
                        idx,
                        task.id,
                        task
                      );
                      if (onSaveEdit)
                        onSaveEdit(
                          { ...data, id: task.id, _id: task._id },
                          idx
                        );
                      setEditingTaskIndex(null);
                    }}
                    onClose={() => setEditingTaskIndex(null)}
                    dropdownItems={
                      dayName
                        ? [
                            dayName,
                            ...tasks
                              .map((t) => t.categoria)
                              .filter(
                                (c, i, arr) =>
                                  arr.indexOf(c) === i && c !== dayName
                              ),
                          ]
                        : []
                    }
                    initialData={task}
                    onDelete={() => {
                      console.log(
                        "onDelete disparado (TaskList)",
                        idx,
                        task.id,
                        task
                      );
                      if (onDelete) onDelete(idx, task.id);
                      setEditingTaskIndex(null);
                    }}
                    onConclude={() => {
                      console.log("onConclude disparado", idx, task.id, task);
                      if (onConclude) onConclude(idx, task.id);
                      setEditingTaskIndex(null);
                    }}
                    editMode={true}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TaskList;
