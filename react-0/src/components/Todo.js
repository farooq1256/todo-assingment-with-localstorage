import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import './Todo.css'; // Import the Todos styles

const Todos = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = () => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    showToastify('Todo deleted successfully!', 'success');
  };

  const showToastify = (msg, type) => {
    let bgColor = type === 'success' ? 'green' : 'red';
    Toastify({
      text: msg,
      duration: 2000,
      gravity: 'top',
      position: 'left',
      style: {
        background: bgColor,
      },
    }).showToast();
  };

  const handleAddTodo = () => {
    navigate('/add-todo');
  };

  const openEditModal = (todo) => {
    setCurrentTodo(todo);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setCurrentTodo(null);
  };

  const openDeleteModal = (todo) => {
    setCurrentTodo(todo);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setCurrentTodo(null);
  };

  const handleUpdateTodo = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === currentTodo.id ? currentTodo : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    showToastify('Todo updated successfully!', 'success');
    closeEditModal();
  };

  const handleConfirmDelete = () => {
    deleteTodo(currentTodo.id);
    closeDeleteModal();
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCurrentTodo((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div id='todos' className='todos py-5 fade-in'>
      <nav className="navbar">
        <div className="container-fluid justify-content-center">
          <a className="navbar-brand home-link" href="#" onClick={() => navigate('/')}>Home</a>
        </div>
      </nav>
      <div className="add-todo-btn-container">
        <button className='btn add' onClick={handleAddTodo}>
          <FontAwesomeIcon icon={faPlus} /> Add Todo
        </button>
      </div>
      <div className="container">
        <div className="table-container">
          <div className="table-responsive">
            <table className="table todos-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Location</th>
                  <th scope="col">Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {todos.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">No todos in the list</td>
                  </tr>
                ) : (
                  todos.map((todo, i) => {
                    const { id, task, description, location, date } = todo;
                    return (
                      <tr key={id}>
                        <th scope="row">{i + 1}</th>
                        <td>{task}</td>
                        <td>{description}</td>
                        <td>{location}</td>
                        <td>{date}</td>
                        <td>
                          <button
                            className='btn btn-info btn-icon mb-2'
                            onClick={() => openEditModal(todo)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            className='btn btn-danger btn-icon mb-2'
                            onClick={() => openDeleteModal(todo)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Todo Modal */}
      {isEditModalOpen && (
        <div className="modal show fade-in" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Todo</h5>
                <button type="button" className="btn-close" onClick={closeEditModal}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="task" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="task"
                    value={currentTodo?.task || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={currentTodo?.description || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    value={currentTodo?.location || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={currentTodo?.date || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeEditModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleUpdateTodo}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Todo Modal */}
      {isDeleteModalOpen && (
        <div className="modal show fade-in" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={closeDeleteModal}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this todo?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todos;
