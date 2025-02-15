import { useState, useEffect } from "react";
import "./index.css";

function ToDoList() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="todo-container">
        <h1>ToDo List</h1>
        <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task..."
        />
        <button onClick={addTask}>Add</button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              className={task.completed ? "completed" : ""}
            >
              {task.text} {}
              <button onClick={() => toggleTask(index)}>✔</button>
              <button onClick={() => deleteTask(index)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ToDoList;
