const API_URL = "https://organoplanner-backend.onrender.com";

export async function fetchTasks() {
  const response = await fetch(API_URL);
  return response.json();
}

export async function addTask(task) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return response.json();
}

export async function updateTask(id, task) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return response.json();
}

export async function deleteTask(id) {
  if (!id) return;
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
