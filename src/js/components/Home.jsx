import React, { useState } from 'react';
import '../../styles/index.css';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      setTasks([...tasks, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeTask = (indexToRemove) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToRemove);
    setTasks(updatedTasks);
  };

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
                  {task}
                  <button onClick={() => removeTask(index)}>✖</button>
                </li>
              ))}
            </ul>
            <div className="task-counter">
              {tasks.length} item{tasks.length !== 1 ? 's' : ''} left
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
