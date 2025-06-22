import axios from "axios";

const API_URL = "http://localhost:3000/api/tasks"; // ajuste para sua URL real

export const fetchTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const updateTask = async (id, task) => {
  const response = await axios.put(`${API_URL}/${id}`, task);
  return response.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const toggleTask = async (id) => {
  const response = await axios.patch(`${API_URL}/${id}/toggle`);
  return response.data;
};
