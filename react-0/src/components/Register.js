import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, password } = formData;

    if (!fullName || !email || !password) {
      toast.error('All fields are required!');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (existingUsers.some(user => user.email === email)) {
      toast.error('Email is already registered.');
      return;
    }

    const newUser = { fullName, email, password };
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    toast.success('Registration successful!');
    navigate('/login');
  };

  return (
    <div className="background">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="form-container animated-container text-center">
          <h2 className="register">Registration Form</h2>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHvZ0pbf4bXvAJgVZVuRQqrNWnoWl96cV6wQ&s"
            alt="Profile"
            className="rounded-circle"
          />
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                type="text"
                name="fullName"
                className="form-control"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <div className="password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-icon"
                />
              </div>
            </div>
            <div className="text-center mt-3">
              <button type="submit" className="btn-block">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
