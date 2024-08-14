import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdatePassword.css'; // Import the CSS file

const UpdatePassword = ({ user, onUpdateUser }) => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = formData;

    // Validate passwords
    if (oldPassword !== user.password) {
      alert('Old password is incorrect');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    // Update password
    onUpdateUser(user, newPassword);
    navigate('/users');
  };

  return (
    <div className="update-password-container">
      <h2 className="title">Update Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Old Password</label>
          <input
            type="password"
            name="oldPassword"
            className="form-input"
            value={formData.oldPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">New Password</label>
          <input
            type="password"
            name="newPassword"
            className="form-input"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="form-input"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Password</button>
      </form>
    </div>
  );
};

export default UpdatePassword;
