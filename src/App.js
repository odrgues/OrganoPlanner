import Banner from "./components/Banner";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import Button from "./components/Button";
import TaskCard from "./components/TaskCard";
import TaskList from "./components/TaskList";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import { fetchTasks, addTask, updateTask, deleteTask } from "./api";

function mapTask(task) {
  return {
    ...task,
    id: task._id,
    _id: task._id,
  };
}

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
      categoria: "Segunda-feira",
    },
    {
      nome: "Terça-feira",
      corPrimaria: "#82CFFA",
      corSecundaria: "#E8F8FF",
      categoria: "Terça-feira",
    },
    {
      nome: "Quarta-feira",
      corPrimaria: "#A6D157",
      corSecundaria: "#F0F8E2",
      categoria: "Quarta-feira",
    },
    {
      nome: "Quinta-feira",
      corPrimaria: "#E06B69",
      corSecundaria: "#FDE7E8",
      categoria: "Quinta-feira",
    },
    {
      nome: "Sexta-feira",
      corPrimaria: "#DB6EBF",
      corSecundaria: "#FAE9F5",
      categoria: "Sexta-feira",
    },
    {
      nome: "Sábado",
      corPrimaria: "#FFBA05",
      corSecundaria: "#FFF5D9",
      categoria: "Sábado",
    },
    {
      nome: "Domingo",
      corPrimaria: "#FF8A29",
      corSecundaria: "#FFEEDF",
      categoria: "Domingo",
    },
  ];

  useEffect(() => {
    fetchTasks()
      .then((tasks) => setTaskscards(tasks.map(mapTask)))
      .catch(() => setTaskscards([]));
  }, []);

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await addTask(taskData);
      setTaskscards((prev) => [...prev, mapTask(newTask)]);
    } catch (err) {}
    setShowForm(false);
    setEditMode(false);
    setEditTaskIndex(null);
  };

  const handleDeleteTask = async (idx, id) => {
    try {
      const taskId =
        id || taskscards[editTaskIndex]?._id || taskscards[editTaskIndex]?.id;
      await deleteTask(taskId);
      const updatedTasks = await fetchTasks();
      setTaskscards(updatedTasks.map(mapTask));
    } catch (err) {}
    setEditTaskIndex(null);
    setEditMode(false);
    setShowForm(false);
  };

  const handleToggleConcluir = async (idx, id) => {
    try {
      const taskId =
        id || taskscards[editTaskIndex]?._id || taskscards[editTaskIndex]?.id;
      const current = taskscards.find(
        (task) => task.id === taskId || task._id === taskId
      );
      const payload = {
        ...current,
        concluida: !current.concluida,
        _id: taskId,
      };
      await updateTask(taskId, payload);
      const updatedTasks = await fetchTasks();
      setTaskscards(updatedTasks.map(mapTask));
    } catch (err) {}
    setEditTaskIndex(null);
    setEditMode(false);
    setShowForm(false);
  };

  const handleSaveEdit = async (taskData) => {
    try {
      const id =
        taskData._id ||
        taskData.id ||
        taskscards[editTaskIndex]?._id ||
        taskscards[editTaskIndex]?.id;
      const payload = {
        ...taskData,
        _id: id,
      };
      await updateTask(id, payload);
      const updatedTasks = await fetchTasks();
      setTaskscards(updatedTasks.map(mapTask));
    } catch (err) {}
    setEditTaskIndex(null);
    setEditMode(false);
    setShowForm(false);
  };

  const handleToggleConcludeIdx = (idx) => {
    setTaskscards((prev) =>
      prev.map((task, i) =>
        i === idx ? { ...task, concluida: !task.concluida } : task
      )
    );
  };

  useEffect(() => {
    if (location.pathname === "/about") {
      setShowForm(false);
      setEditMode(false);
      setEditTaskIndex(null);
    }
  }, [location.pathname]);

  return (
    <div className="App">
      <Banner />
      {location.pathname === "/" && !showForm && (
        <h1 className="app-title">Minha Organização</h1>
      )}
      <div className="add-task-btn-container">
        {!showForm && (
          <Button
            className="add-task-btn"
            aria-label="Adicionar Tarefa"
            onClick={() => {
              setShowForm(true);
              setEditMode(false);
              if (location.pathname !== "/") {
                navigate("/");
              }
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="16" fill="none" />
              <rect x="9" y="15" width="14" height="2" rx="1" fill="#fff" />
              <rect x="15" y="9" width="2" height="14" rx="1" fill="#fff" />
            </svg>
          </Button>
        )}
      </div>
      {showForm && (
        <TaskForm
          onSubmit={(...args) => {
            (editMode ? handleSaveEdit : handleAddTask)(...args);
          }}
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
          onDelete={
            editMode
              ? (...args) => {
                  handleDeleteTask(...args);
                }
              : undefined
          }
          onConclude={
            editMode
              ? (...args) => {
                  handleToggleConcluir(...args);
                }
              : undefined
          }
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
                  (task) => task.categoria === item.nome
                );
                return (
                  <TaskList
                    key={item.nome}
                    tasks={tasks}
                    primaryColor={item.corPrimaria}
                    secondaryColor={item.corSecundaria}
                    dayName={item.nome}
                    allDays={dropdownItems.map((d) => d.nome)}
                    onSaveEdit={(data, taskIdx) => {
                      handleSaveEdit({ ...data, _id: data._id || data.id });
                    }}
                    onDelete={handleDeleteTask}
                    onConclude={(taskIdx) => {
                      const globalIdx = taskscards.findIndex(
                        (t, i) => t.categoria === item.nome && i === taskIdx
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
