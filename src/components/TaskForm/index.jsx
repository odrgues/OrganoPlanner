import { useState, useEffect } from "react";
import TextField from "../TextField";
import DropdownList from "../DropdownList";
import Button from "../Button";
import "./TaskForm.css";

const TaskForm = ({
  onSubmit,
  onClose,
  dropdownItems,
  initialData,
  onDelete,
  onConclude,
  editMode,
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [image, setImage] = useState(initialData?.image || "");
  const [category, setCategory] = useState(initialData?.category || "");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setImage(initialData.image || "");
      setCategory(initialData.category || "");
    } else {
      setTitle("");
      setDescription("");
      setImage("");
      setCategory("");
    }
  }, [initialData, editMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, image, category });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>
        {editMode ? "Editar tarefa" : "Preencha os campos para criar tarefas"}
      </h2>
      <TextField
        label="Título"
        value={title}
        onChange={setTitle}
        required
        placeholder="Digite o título da tarefa"
      />
      <TextField
        label="Descrição"
        value={description}
        onChange={setDescription}
        required
        placeholder="Digite a descrição da tarefa"
      />
      <TextField
        label="Imagem"
        value={image}
        onChange={setImage}
        required
        placeholder="Digite o endereço da imagem"
      />
      <DropdownList
        label="Dia da Semana"
        value={category}
        onChange={setCategory}
        required
        items={dropdownItems}
      />
      <div className="button-group">
        <Button type="submit">{editMode ? "Salvar" : "Adicionar"}</Button>
        <Button type="button" onClick={onClose}>
          Cancelar
        </Button>
        {editMode && onDelete && (
          <Button type="button" onClick={onDelete}>
            Excluir
          </Button>
        )}
        {editMode && onConclude && (
          <Button type="button" onClick={onConclude}>
            Concluir
          </Button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
