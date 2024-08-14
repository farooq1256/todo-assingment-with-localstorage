import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './login.css';

const initialState = {
  email: '',
  password: '',
};

const Login = ({ onLogin }) => {
  const [login, setLogin] = useState(initialState);
  const { email, password } = login;
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter email and password.', { position: 'top-center' });
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email.trim().toLowerCase() && user.password === password);

    if (user) {
      onLogin();
      navigate('/home');
    } else {
      toast.error('Invalid email or password.', { position: 'top-center' });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="background">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="form-container animated-container">
          <h2 className="text-center register">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mt-3">
              <input
                type="email"
                name="email"
                className="form-control"
                value={email}
                onChange={handleChange}
                placeholder="Email Address"
              />
            </div>
            <div className="form-group mt-3">
              <div className="password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="form-control"
                  value={password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  className="password-icon ml-2"
                />
              </div>
            </div>
            <div className="text-center mt-3">
              <button type="submit" className="btn-block">
                Login
              </button>
            </div>
          </form>
          <div className="text-center mt-3">
            <button className="btn btn-link" onClick={() => navigate('/resetpassword')}>
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;
