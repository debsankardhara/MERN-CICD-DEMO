const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const todoApi = {
  getAll: () => request("/todos"),
  create: (title) =>
    request("/todos", {
      method: "POST",
      body: JSON.stringify({ title })
    }),
  update: (id, completed) =>
    request(`/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ completed })
    }),
  remove: (id) =>
    request(`/todos/${id}`, {
      method: "DELETE"
    })
};
