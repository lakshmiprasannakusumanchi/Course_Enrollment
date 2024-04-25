import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
import {baseUrl} from '../url.js'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/api/user/login`, { email, password });

      console.log(response.data);

      // Assuming the server sends a token and user role upon successful login
      const { token, userId, role } = response.data;

      if (token) {
        // Store the token, user ID, and role in local storage or a secure storage mechanism
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('role', role);

        // Redirect or perform any other necessary actions based on the user role
        if (role === 'admin') {
          navigate('/home');
        } else {
          navigate('/add');
        }
      } else {
        // Handle other responses as needed
        console.error('Login failed:', response.data);
      }
    } catch (error) {
      // Handle errors
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="AddStudent-Wrapper">
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            className="Add-Student-Input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            className="Add-Student-Input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button className="Add-Student-Submit" type="submit">
          Login
        </button>
        <button className="Add-Student-Reset" type="reset">
          Reset
        </button>
      </form>
    </div>
  );
};

export default Login;
