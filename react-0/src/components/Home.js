import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  const handleUsersClick = () => {
    navigate("/users");
  };

  const handleTodosClick = () => {
    navigate("/todo");
  };

  return (
    <div className="container">
      <h2 className="text-center mt-5">Dashboard</h2>
      <div className="row mt-5">
        <div className="col-md-6">
          <div className="card" onClick={handleUsersClick}>
            <div className="card-body">
              <h3 className="card-title">Registered Users</h3>
              <p className="card-text">{users.length} users</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card" onClick={handleTodosClick}>
            <div className="card-body">
              <h3 className="card-title">Total Todos</h3>
              <p className="card-text">{todos.length} todos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
