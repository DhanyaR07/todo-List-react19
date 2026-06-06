import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [todoText, setTodoText] = useState('')
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos')

    if (savedTodos === null) {
      return []
    }

    try {
      return JSON.parse(savedTodos)
    } catch {
      return []
    }
  })

  const totalTodos = todos.length
  const completedTodos = todos.filter((todo) => todo.completed).length

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  function handleAddTodo(event) {
    event.preventDefault()

    const trimmedText = todoText.trim()

    if (trimmedText === '') {
      return
    }

    const newTodo = {
      id: Date.now(),
      text: trimmedText,
      completed: false,
    }

    setTodos([...todos, newTodo])
    setTodoText('')
  }

  function handleToggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    )
  }

  function handleDeleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  function handleClearCompleted() {
    setTodos(todos.filter((todo) => !todo.completed))
  }

  return (
    <main className="app">
      <section className="todo-panel">
        <h1>Todo List</h1>
        <p className="subtitle">Plan your tasks for today.</p>
        <p className="todo-count">
          {completedTodos} of {totalTodos} completed
        </p>

        {completedTodos > 0 && (
          <button
            type="button"
            className="clear-button"
            onClick={handleClearCompleted}
          >
            Clear completed
          </button>
        )}

        <form className="todo-form" onSubmit={handleAddTodo}>
          <input
            type="text"
            value={todoText}
            onChange={(event) => setTodoText(event.target.value)}
            placeholder="Add a new task"
          />
          <button type="submit">Add</button>
        </form>

        {todos.length === 0 ? (
          <p className="empty-message">No todos yet. Add your first task above.</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`todo-item ${todo.completed ? 'completed' : ''}`}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                  />
                  <span>{todo.text}</span>
                </label>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App