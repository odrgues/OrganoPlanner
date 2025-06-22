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
    } catch (err) {
      console.error("Erro ao adicionar tarefa:", err);
      alert(
        "Erro ao adicionar tarefa. Verifique a conexão com o backend.\n" +
          (err?.response?.data?.error || err.message)
      );
    }
    setShowForm(false);
    setEditMode(false);
    setEditTaskIndex(null);
  };

  const handleEditTask = (index) => {
    setEditTaskIndex(index);
    setEditMode(true);
    setShowForm(true);
  };

  const handleSaveEdit = async (taskData) => {
    try {
      // Sempre use o _id real
      const id =
        taskData._id ||
        taskData.id ||
        taskscards[editTaskIndex]?._id ||
        taskscards[editTaskIndex]?.id;
      const payload = {
        ...taskData,
        _id: id,
      };
      console.log(
        "PUT id:",
        id,
        "payload:",
        payload,
        "campos enviados:",
        Object.keys(payload)
      );
      const updated = await updateTask(id, payload);
      const updatedTasks = await fetchTasks();
      setTaskscards(updatedTasks.map(mapTask));
    } catch (err) {
      console.error("Erro ao editar tarefa:", err);
      alert(
        "Erro ao editar tarefa.\n" + (err?.response?.data?.error || err.message)
      );
    }
    setEditTaskIndex(null);
    setEditMode(false);
    setShowForm(false);
  };

  const handleDeleteTask = async (idx, id) => {
    try {
      const taskId =
        id || taskscards[editTaskIndex]?._id || taskscards[editTaskIndex]?.id;
      console.log("DELETE id:", taskId);
      await deleteTask(taskId);
      const updatedTasks = await fetchTasks();
      setTaskscards(updatedTasks.map(mapTask));
    } catch (err) {
      console.error("Erro ao deletar tarefa:", err);
      alert(
        "Erro ao deletar tarefa.\n" +
          (err?.response?.data?.error || err.message)
      );
    }
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
      console.log(
        "TOGGLE id:",
        taskId,
        "payload:",
        payload,
        "campos enviados:",
        Object.keys(payload)
      );
      await updateTask(taskId, payload);
      const updatedTasks = await fetchTasks();
      setTaskscards(updatedTasks.map(mapTask));
    } catch (err) {
      console.error("Erro ao concluir tarefa:", err);
      alert(
        "Erro ao concluir tarefa.\n" +
          (err?.response?.data?.error || err.message)
      );
    }
    setEditTaskIndex(null);
    setEditMode(false);
    setShowForm(false);
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
          onSubmit={(...args) => {
            console.log("TaskForm onSubmit chamado", ...args);
            (editMode ? handleSaveEdit : handleAddTask)(...args);
          }}
          onClose={() => {
            console.log("TaskForm onClose chamado");
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
                  console.log("TaskForm onDelete chamado", ...args);
                  handleDeleteTask(...args);
                }
              : undefined
          }
          onConclude={
            editMode
              ? (...args) => {
                  console.log("TaskForm onConclude chamado", ...args);
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
                    onSaveEdit={(data, taskIdx) => {
                      // Chama o update no backend ao editar pelo TaskList
                      handleSaveEdit({ ...data, _id: data._id || data.id });
                    }}
                    onDelete={(taskIdx) => {
                      // Chama o delete no backend ao deletar pelo TaskList
                      const globalIdx = taskscards.findIndex(
                        (t, i) => t.categoria === item.nome && i === taskIdx
                      );
                      const task = taskscards[globalIdx];
                      if (task) {
                        console.log(
                          "DELETE pelo TaskList",
                          globalIdx,
                          task._id,
                          task
                        );
                        handleDeleteTask(globalIdx, task._id || task.id);
                      }
                    }}
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
