import React from 'react';
import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <nav className="NavBar-Wrapper">
      <div>
        <h3 className="NavBar-Title">Course Enrollment System</h3>
      </div>
      <div className="NavBar-Links">
        <Link to="/courses" className="NavBar-Link">Courses</Link>
        <Link to="/add" className="NavBar-Link">Enroll</Link>
        <Link style={{ 'marginLeft': '60px' }} to="/login" className="NavBar-Link">Login</Link>
        <Link to="/" className="NavBar-Link">Signup</Link>
        <Link to='#' className="NavBar-Link" onClick={handleLogout}>Logout</Link>
      </div>
    </nav>
  );
};

export default NavBar;
