import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Update the path as needed

const Sidebar = () => {
  return (
    <div id="sidebar" className="sidebar">
      <button className="closebtn">×</button> {/* This should have an onClick handler to close the sidebar */}
      <Link to="/login">Log In</Link>
      <Link to="/register">Register</Link>
      <div style={{ margin: '40px 0' }}></div>
      <Link to="/">Home</Link>
      <Link to="/game">Play</Link>
      <Link to="/history">History</Link>
      <Link to="/request">Request</Link>
      <Link to="/info">Instructions</Link>
      <Link to="/leaderboards">Leaderboards</Link>
    </div>
  );
};

export default Sidebar;
