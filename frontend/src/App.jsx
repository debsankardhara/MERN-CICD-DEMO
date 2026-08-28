import { useState } from "react";
import { useTodos } from "./context/TodoContext";

function App() {
  const [title, setTitle] = useState("");
  const { todos, loading, error, addTodo, toggleTodo, deleteTodo } = useTodos();

  async function handleSubmit(event) {
    event.preventDefault();

    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    try {
      await addTodo(cleanTitle);
      setTitle("");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <main className="page">
      <section className="card">
        <div className="header">
          <p className="eyebrow">MERN + CI/CD PRACTICE</p>
          <h1>Todo Manager</h1>
          <p className="subtitle">
            React + Context API communicating with Node, Express and MongoDB.
          </p>
        </div>

        <form className="todo-form" onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter a new todo..."
            aria-label="Todo title"
          />
          <button type="submit">Add Todo</button>
        </form>

        {error && (
          <div className="error">
            {error}
            <small>
              Check that your backend is running and your VITE_API_URL is correct.
            </small>
          </div>
        )}

        {loading ? (
          <p className="status">Loading todos...</p>
        ) : todos.length === 0 ? (
          <p className="status">No todos yet. Add your first one!</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li className="todo-item" key={todo._id}>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo)}
                  />
                  <span className={todo.completed ? "completed" : ""}>
                    {todo.title}
                  </span>
                </label>
                <button
                  className="delete-button"
                  onClick={() => deleteTodo(todo._id)}
                  type="button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

        <footer>
          <span>Frontend: Vite + React</span>
          <span>Backend: Express</span>
          <span>Database: MongoDB</span>
        </footer>
      </section>
    </main>
  );
}

export default App;
