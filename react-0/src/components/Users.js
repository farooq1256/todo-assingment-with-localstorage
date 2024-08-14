import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Users.css'; // Import the CSS file

const Users = ({ userData, onNavigateToUpdatePassword, onLogoutUser }) => {
  const navigate = useNavigate();

  // Handle navigation to the home page
  const handleNavigateHome = (event) => {
    event.preventDefault();
    navigate('/');
  };

  // Handle updating password
  const handleUpdatePassword = (user) => {
    onNavigateToUpdatePassword(user);
    navigate('/update-password');
  };

  // Handle user logout
  const handleLogout = (user) => {
    onLogoutUser(user.email);
    navigate('/register'); // Navigate to the register page after logout
  };

  return (
    <div className="users-container">
      <nav className="navbar">
        <div className="container-fluid justify-content-center">
          <a className="navbar-brand home-link" href="#" onClick={handleNavigateHome}>Home</a>
        </div>
      </nav>

      <h2 className="title mt-5">Registered Users</h2>

      <table className="table users-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={index}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <div className="button-container">
                  <button
                    className="btn btn-success update-password-button"
                    onClick={() => handleUpdatePassword(user)}
                  >
                    Update Password
                  </button>
                  <button
                    className="btn btn-danger logout-button"
                    onClick={() => handleLogout(user)}
                  >
                    Logout
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
