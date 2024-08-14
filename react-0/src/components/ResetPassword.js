import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import './ResetPassword.css';

const initialState = {
    email: '',
    newPassword: '',
    confirmPassword: '',
    passwordError: '',
  }

const ResetPassword = ({ onResetPassword }) => {
  const [formState, setFormState] = useState(initialState);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Update form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
      passwordError: '',
    }));
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, newPassword, confirmPassword } = formState;

    if (!email || !newPassword || !confirmPassword) {
      showToast('All fields are required.');
      return;
    }

    if (newPassword.length < 6) {
      showToast('Password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match.');
      setFormState((prevState) => ({
        ...prevState,
        passwordError: 'Passwords do not match.',
      }));
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex((user) => user.email === email.trim().toLowerCase());

    if (userIndex === -1) {
      showToast('User not found.');
      return;
    }

    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    showToast('Password updated successfully!', 'success');

    onResetPassword();
  };

  // Show toast message
  const showToast = (message, type = 'error') => {
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'center',
      backgroundColor: type === 'success' ? '#4caf50' : '#ff0000',
    }).showToast();
  };

  // Toggle password visibility
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  return (
    <div className="background">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="form-container animated-container">
          <h2 className="text-center register">Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mt-3">
              <input
                type="email"
                name="email"
                className="form-control"
                value={formState.email}
                onChange={handleChange}
                placeholder="Email Address"
              />
            </div>
            <div className="form-group mt-3">
              <div className="password-container">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  name="newPassword"
                  className="form-control"
                  value={formState.newPassword}
                  onChange={handleChange}
                  placeholder="New Password"
                />
                <FontAwesomeIcon
                  icon={showNewPassword ? faEyeSlash : faEye}
                  onClick={toggleNewPasswordVisibility}
                  className="password-icon ml-2"
                />
              </div>
            </div>
            <div className="form-group mt-3">
              <div className="password-container">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  className={`form-control ${
                    formState.passwordError ? 'is-invalid' : ''
                  }`}
                  value={formState.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                />
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                  onClick={toggleConfirmPasswordVisibility}
                  className="password-icon ml-2"
                />
                {formState.passwordError && (
                  <div className="invalid-feedback">
                    {formState.passwordError}
                  </div>
                )}
              </div>
            </div>
            <div className="text-center mt-3">
              <button type="submit" className="btn-block">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
