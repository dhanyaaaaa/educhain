import React, { useState } from 'react';
import '../styles/dashboardd.css'; // Import CSS file for styling

const Dashboard = () => {
  const [user, setUser] = useState(null); // State to hold user info

  const handleLogin = () => {
    // Replace with actual login logic
    setUser({ username: 'admin', password: 'password' });
  };

  const handleLogout = () => {
    // Implement logout functionality here
    setUser(null); // Clear user state upon logout
  };

  return (
    <div className="dashboard">
      <div className="background-image"></div>
      <div className="content">
        <h1 className="overlay-text">EDUCHAIN</h1>
        <p className="overlay-text">School Administration</p>
        <div className="profile-section">
          {user ? (
            <div>
              <p>Welcome, {user.username}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button onClick={handleLogin}>Login</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
