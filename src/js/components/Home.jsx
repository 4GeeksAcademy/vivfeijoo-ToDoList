import React, { useState, useEffect } from 'react';
import '../../styles/index.css';

const API_URL = "https://playground.4geeks.com/todo/users/vivfeijoo";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const getTasks = async () => {
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        setTasks(data); // 👈 Aquí podría estar el problema, dependiendo del formato que devuelve
      } else if (res.status === 404) {
        await createUser();
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const createUser = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify([]),
        headers: { "Content-Type": "application/json" }
      });
      if (res.ok) getTasks();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const updateTasks = async (newTasks) => {
    try {
      const res = await fetch(API_URL, {
        method: "PUT",
        body: JSON.stringify(newTasks),
        headers: { "Content-Type": "application/json" }
      });
      if (res.ok) setTasks(newTasks);
    } catch (error) {
      console.error("Error updating tasks:", error);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      const newTasks = [...tasks, { label: inputValue.trim(), done: false }];
      await updateTasks(newTasks);
      setInputValue('');
    }
  };

  const removeTask = async (indexToRemove) => {
    const newTasks = tasks.filter((_, index) => index !== indexToRemove);
    await updateTasks(newTasks);
  };

  const clearAllTasks = async () => {
    await updateTasks([]);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="page-wrapper">
      <h1 className="app-title">todos</h1>
      <div className="paper-stack">
        <div className="sheet-3"></div>
        <div className="sheet-2"></div>
        <div className="sheet-1">
          <div className="todo-container">
            <input
              className="todo-input"
              type="text"
              placeholder="What needs to be done?"
              onKeyDown={handleKeyDown}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            <ul className="task-list">
              {tasks.map((task, index) => (
                <li key={index}>
                  {task.label}
                  <button onClick={() => removeTask(index)}>✖</button>
                </li>
              ))}
            </ul>

            <div className="task-counter">
              {tasks.length} item{tasks.length !== 1 ? 's' : ''} left
            </div>

            <button className="clear-btn" onClick={clearAllTasks}>
              Clear All Tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
