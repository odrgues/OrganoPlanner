import Banner from "./components/Banner";
import Footer from "./components/Footer";
import { useState } from "react";
import TaskForm from "./components/TaskForm";
import Button from "./components/Button";
import TaskCard from "./components/TaskCard";
import TaskList from "./components/TaskList";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AboutUs from "./components/AboutUs";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [taskscards, setTaskscards] = useState([]);
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const dropdownItems = [
    {
      nome: "Segunda-feira",
      corPrimaria: "#57C278",
      corSecundaria: "#D9F7E9",
    },
    {
      nome: "Terça-feira",
      corPrimaria: "#82CFFA",
      corSecundaria: "#E8F8FF",
    },
    {
      nome: "Quarta-feira",
      corPrimaria: "#A6D157",
      corSecundaria: "#F0F8E2",
    },
    {
      nome: "Quinta-feira",
      corPrimaria: "#E06B69",
      corSecundaria: "#FDE7E8",
    },
    {
      nome: "Sexta-feira",
      corPrimaria: "#DB6EBF",
      corSecundaria: "#FAE9F5",
    },
    {
      nome: "Sábado",
      corPrimaria: "#FFBA05",
      corSecundaria: "#FFF5D9",
    },
    {
      nome: "Domingo",
      corPrimaria: "#FF8A29",
      corSecundaria: "#FFEEDF",
    },
  ];

  const handleAddTask = (taskData) => {
    const dia = dropdownItems.find((item) => item.nome === taskData.category);
    setTaskscards((prev) => [
      ...prev,
      {
        ...taskData,
        corPrimaria: dia ? dia.corPrimaria : "#ccc",
        corSecundaria: dia ? dia.corSecundaria : "#eee",
        concluida: false,
      },
    ]);
    setShowForm(false);
    setEditMode(false);
    setEditTaskIndex(null);
  };

  const handleEditTask = (index) => {
    setEditTaskIndex(index);
    setEditMode(true);
    setShowForm(true);
  };

  const handleSaveEdit = (taskData) => {
    const dia = dropdownItems.find((item) => item.nome === taskData.category);
    setTaskscards((prev) =>
      prev.map((task, idx) =>
        idx === editTaskIndex
          ? {
              ...taskData,
              corPrimaria: dia ? dia.corPrimaria : "#ccc",
              corSecundaria: dia ? dia.corSecundaria : "#eee",
              concluida: task.concluida || false,
            }
          : task
      )
    );
    setEditTaskIndex(null);
    setEditMode(false);
    setShowForm(false);
  };

  const handleDeleteTask = () => {
    setTaskscards((prev) => prev.filter((_, idx) => idx !== editTaskIndex));
    setEditTaskIndex(null);
    setEditMode(false);
    setShowForm(false);
  };

  const handleToggleConcluir = () => {
    setTaskscards((prev) =>
      prev.map((task, idx) =>
        idx === editTaskIndex ? { ...task, concluida: !task.concluida } : task
      )
    );
    setEditTaskIndex(null);
    setEditMode(false);
    setShowForm(false);
  };

  const handleSaveEditIdx = (taskData, idx) => {
    const dia = dropdownItems.find((item) => item.nome === taskData.category);
    setTaskscards((prev) =>
      prev.map((task, i) =>
        i === idx
          ? {
              ...taskData,
              corPrimaria: dia ? dia.corPrimaria : "#ccc",
              corSecundaria: dia ? dia.corSecundaria : "#eee",
              concluida: task.concluida || false,
            }
          : task
      )
    );
  };

  const handleDeleteTaskIdx = (idx) => {
    setTaskscards((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleToggleConcludeIdx = (idx) => {
    setTaskscards((prev) =>
      prev.map((task, i) =>
        i === idx ? { ...task, concluida: !task.concluida } : task
      )
    );
  };

  return (
    <div className="App">
      <Banner />
      <div className="add-task-btn-container">
        {!showForm && (
          <Button
            onClick={() => {
              setShowForm(true);
              setEditMode(false);
              if (location.pathname !== "/") {
                navigate("/");
              }
            }}
          >
            Adicionar Tarefa
          </Button>
        )}
      </div>
      {showForm && (
        <TaskForm
          onSubmit={editMode ? handleSaveEdit : handleAddTask}
          onClose={() => {
            setShowForm(false);
            setEditMode(false);
            setEditTaskIndex(null);
          }}
          dropdownItems={dropdownItems.map((item) => item.nome)}
          initialData={
            editMode && editTaskIndex !== null
              ? taskscards[editTaskIndex]
              : null
          }
          onDelete={editMode ? handleDeleteTask : undefined}
          onConcluir={editMode ? handleToggleConcluir : undefined}
          editMode={editMode}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <>
              {dropdownItems.map((item) => {
                const tasks = taskscards.filter(
                  (task) => task.category === item.nome
                );
                return (
                  <TaskList
                    key={item.nome}
                    tasks={tasks}
                    primaryColor={item.corPrimaria}
                    secondaryColor={item.corSecundaria}
                    dayName={item.nome}
                    onSaveEdit={(data, taskIdx) => {
                      const globalIdx = taskscards.findIndex(
                        (t, i) => t.category === item.nome && i === taskIdx
                      );
                      handleSaveEditIdx(data, globalIdx);
                    }}
                    onDelete={(taskIdx) => {
                      const globalIdx = taskscards.findIndex(
                        (t, i) => t.category === item.nome && i === taskIdx
                      );
                      handleDeleteTaskIdx(globalIdx);
                    }}
                    onConclude={(taskIdx) => {
                      const globalIdx = taskscards.findIndex(
                        (t, i) => t.category === item.nome && i === taskIdx
                      );
                      handleToggleConcludeIdx(globalIdx);
                    }}
                  />
                );
              })}
            </>
          }
        />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
