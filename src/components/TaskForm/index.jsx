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
  const [titulo, setTitulo] = useState(initialData?.titulo || "");
  const [descricao, setDescricao] = useState(initialData?.descricao || "");
  const [imagemUrl, setImagemUrl] = useState(initialData?.imagemUrl || "");
  const [categoria, setCategoria] = useState(initialData?.categoria || "");

  useEffect(() => {
    if (initialData) {
      setTitulo(initialData.titulo || "");
      setDescricao(initialData.descricao || "");
      setImagemUrl(initialData.imagemUrl || "");
      setCategoria(initialData.categoria || "");
    } else {
      setTitulo("");
      setDescricao("");
      setImagemUrl("");
      setCategoria("");
    }
  }, [initialData, editMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !descricao || !imagemUrl || !categoria) {
      alert("Preencha todos os campos do formulário.");
      return;
    }
    onSubmit({ titulo, descricao, imagemUrl, categoria });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>
        {editMode ? "Editar tarefa" : "Preencha os campos para criar tarefas"}
      </h2>
      <TextField
        label="Título"
        value={titulo}
        onChange={setTitulo}
        required
        placeholder="Digite o título da tarefa"
      />
      <TextField
        label="Descrição"
        value={descricao}
        onChange={setDescricao}
        required
        placeholder="Digite a descrição da tarefa"
      />
      <TextField
        label="Imagem"
        value={imagemUrl}
        onChange={setImagemUrl}
        required
        placeholder="Digite o endereço da imagem"
      />
      <DropdownList
        label="Dia da Semana"
        value={categoria}
        onChange={setCategoria}
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
