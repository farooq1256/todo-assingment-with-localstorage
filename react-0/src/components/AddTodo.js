import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import './AddTodo.css'; // Import the CSS file

const AddTodo = () => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState({
    task: '',
    description: '',
    location: '',
    date: '',
    status: 'active',
    dateCreated: new Date().toISOString(),
    user_id: 'user-1'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo(prevTodo => ({ ...prevTodo, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.task || !todo.description || !todo.location || !todo.date) {
      showToastify("Please fill all fields", "error");
      return;
    }
    
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const newTodo = { ...todo, id: Math.random().toString(32).slice(2) };
    const updatedTodos = [...storedTodos, newTodo];
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    showToastify("Todo added successfully!", "success");
    navigate('/todos');
  };

  const showToastify = (msg, type) => {
    let bgColor = type === "success" ? "green" : "red";
    Toastify({
      text: msg,
      duration: 2000,
      gravity: "top",
      position: "left",
      style: {
        background: bgColor,
      }
    }).showToast();
  };
  
  return (
    <div className="addtodo-container">
      <h1 className='addtodo-title'>Add Todo</h1>
      <div className="addtodo-card">
        <form onSubmit={handleSubmit}>
          <div className="addtodo-form-group">
            <label htmlFor="task" className="addtodo-form-label">Task</label>
            <input
              type="text"
              className="addtodo-form-control"
              id="task"
              name="task"
              placeholder="Enter task title"
              value={todo.task}
              onChange={handleChange}
            />
          </div>
          <div className="addtodo-form-group">
            <label htmlFor="description" className="addtodo-form-label">Description</label>
            <textarea
              className="addtodo-form-control"
              id="description"
              name="description"
              rows="3"
              placeholder="Enter task description"
              value={todo.description}
              onChange={handleChange}
            />
          </div>
          <div className="addtodo-form-group">
            <label htmlFor="location" className="addtodo-form-label">Location</label>
            <input
              type="text"
              className="addtodo-form-control"
              id="location"
              name="location"
              placeholder="Enter location"
              value={todo.location}
              onChange={handleChange}
            />
          </div>
          <div className="addtodo-form-group">
            <label htmlFor="date" className="addtodo-form-label">Date</label>
            <input
              type="date"
              className="addtodo-form-control"
              id="date"
              name="date"
              value={todo.date}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="addtodo-btn">Add Todo</button>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
