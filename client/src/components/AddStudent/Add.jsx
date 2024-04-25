import React, { useState, useEffect } from "react";
import './AddStudent.css';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {baseUrl} from '../../url.js'
const Add = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: ""
  });

  const [error, setError] = useState("");
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token is present, navigate to login if not
    if (!token) {
      navigate('/login');  // Redirect to your login route
    }
  }, [token, navigate]);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addStudent = async (e) => {
    e.preventDefault();
    try {
      const newStudent = await axios.post(`${baseUrl}/api/students/`, {
        name: formData.name,
        email: formData.email,
        course: formData.course
      });

      toast(`Student ${newStudent.data.newStudent.name} created successfully`, { type: toast.TYPE.SUCCESS, autoClose: 3000 });
    } catch (err) {
      toast(err.message, { type: toast.TYPE.ERROR, autoClose: 3000 });
    }
    navigate('/home'); 
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", course: "" });
  };

  return (
    <div className="AddStudent-Wrapper">
      <h1>Student Enrollment</h1>
      <form onSubmit={addStudent}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          placeholder="Enter the name of the students here"
          name="name"
          value={formData.name}
          onChange={onChangeHandler}
          className="Add-Student-Input"
          required
          minLength="3"
          maxLength="33"
          id="name"
        />
        <label htmlFor="email">Email: <b>(must be a valid email)</b></label>
        <input
          type="text"
          placeholder="Enter your email here"
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          className="Add-Student-Input"
          required
          id="email"
        />
        <label htmlFor="course">Course: </label>
        <input
          type="text"
          placeholder="Enter the name of the course here"
          name="course"
          value={formData.course}
          onChange={onChangeHandler}
          className="Add-Student-Input"
          required
          minLength="3"
          maxLength="33"
          id="course"
        />
        <button type="submit" className="Add-Student-Submit fa fa-plus"></button>
        <button type="button" onClick={resetForm} className="Add-Student-Reset fa fa-refresh"></button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Add;
