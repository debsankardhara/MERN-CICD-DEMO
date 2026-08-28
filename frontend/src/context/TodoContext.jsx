import { createContext, useContext, useEffect, useState } from "react";
import { todoApi } from "../api";

const TodoContext = createContext(null);

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTodos() {
    try {
      setLoading(true);
      setError("");
      const data = await todoApi.getAll();
      setTodos(data.todos);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTodos();
  }, []);

  async function addTodo(title) {
    const data = await todoApi.create(title);
    setTodos((current) => [data.todo, ...current]);
  }

  async function toggleTodo(todo) {
    const data = await todoApi.update(todo._id, !todo.completed);
    setTodos((current) =>
      current.map((item) => (item._id === todo._id ? data.todo : item))
    );
  }

  async function deleteTodo(id) {
    await todoApi.remove(id);
    setTodos((current) => current.filter((todo) => todo._id !== id));
  }

  return (
    <TodoContext.Provider
      value={{ todos, loading, error, addTodo, toggleTodo, deleteTodo, loadTodos }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodos must be used inside TodoProvider");
  }

  return context;
}
