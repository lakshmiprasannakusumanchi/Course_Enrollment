import React, { useState, useEffect } from "react";
import './EditStudent.css';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from 'react-router-dom';
import {baseUrl} from '../../url.js'
const EditStudent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [id, setId] = useState('');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [response, setResponse] = useState("");
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');  // Redirect to your login route
    }
    const fetchData = async () => {
      try {
        const search = location.search;
        const id = search.substring(1, search.length);
        const updateStudent = await axios.get(`${baseUrl}/api/students/${id}`);
        const { name, email, course } = updateStudent.data.student;
        setId(id);
        setName(name);
        setEmail(email);
        setCourse(course);
      } catch (err) {
        setResponse("Student not found!");
      }
    };

    fetchData();
  }, [location.search, token, navigate]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "course":
        setCourse(value);
        break;
      default:
        break;
    }
  };

  const updateStudentHandler = async (e) => {
    e.preventDefault();
    try {
      const student = await axios.put(`${baseUrl}/api/students/${id}`, {
        name,
        email,
        course 
      });
      toast(student.data.message, { type: toast.TYPE.INFO, autoClose: 3000 });
      navigate('/home'); // Redirect to home page after successful update
    } catch (err) {
      toast.error(err.message, { autoClose: 3000 });
    }
  };
  

  if (response === "Student not found!") {
    return <h1>Student not found!</h1>;
  }

  return (
    <div className="Edit-Student-Wrapper">
      <h1>Edit page</h1>
      <form onSubmit={updateStudentHandler}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          placeholder="Name..."
          value={name}
          name="name"
          onChange={onChangeHandler}
          required
          className="Edit-Student-Input"
          id="name"
        />
        <label htmlFor="email">Email: <b>(must be a valid email)</b></label>
        <input
          type="email"
          placeholder="Enter your email here"
          value={email}
          name="email"
          required
          onChange={onChangeHandler}
          className="Edit-Student-Input"
          id="email"
        />
        <label htmlFor="course">Course: </label>
        <input
          type="text"
          placeholder="Course Name"
          value={course}
          name="course"
          onChange={onChangeHandler}
          required
          className="Edit-Student-Input"
          id="course"
        />
        <button type="submit" className="Edit-Student-Submit fa fa-pencil"></button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditStudent;
