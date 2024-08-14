import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Users from './components/Users';
import UpdatePassword from './components/UpdatePassword';
import ResetPassword from './components/ResetPassword';
import Todo from './components/Todo';
import AddTodo from './components/AddTodo';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const users = localStorage.getItem('users');
    setIsLoggedIn(loggedInStatus === 'true');
    setIsRegistered(users !== null);
  }, []);

  const handleRegister = (newUser) => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    setIsRegistered(true);
    toast.success('Registration successful!');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    toast.success('Login successful!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    toast.info('Logged out successfully.');
  };

  return (
    <Router>
      <Routes>
        {/* Show Register page if not registered */}
        {!isLoggedIn && !isRegistered && (
          <Route path="/" element={<Navigate to="/register" />} />
        )}
        {/* Show Login page if registered but not logged in */}
        {isRegistered && !isLoggedIn && (
          <Route path="/" element={<Navigate to="/login" />} />
        )}
        {/* Show Home page if logged in */}
        {isLoggedIn && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/updatepassword" element={<UpdatePassword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/addtodo" element={<AddTodo />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        )}
        {/* Show Register and Login pages if not logged in */}
        {!isLoggedIn && (
          <>
            <Route path="/register" element={<Register onRegister={handleRegister} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/register" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
