// AddCoursePage.js
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar'
const AddCoursePage = () => {
    const [newCourse, setNewCourse] = useState({
        name: '',
        description: ''
    });
    const role = localStorage.getItem('role');
    const token=localStorage.getItem('token')
    const navigate = useNavigate();
    useEffect(() => {
        // Check if token is present, navigate to login if not
        if (!token) {
            navigate('/login');
            return;
        }
        // Check if user is admin, navigate to unauthorized page if not
        if (role !== 'admin') {
            navigate('/unauthorized');  // Create an unauthorized page for non-admin users
            return;
        }
    })
    const addCourse = async () => {
        try {
            await axios.post('/api/courses', newCourse);
            navigate('/courses');
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    return (
        <div>
            <SideBar />
            <center>
                <h1>Add New Course</h1>
                <input
                    type="text"
                    placeholder="Course Name"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                />
                <button className="Add-Student-Submit" onClick={addCourse}>Add Course</button></center>
        </div>
    );
};

export default AddCoursePage;
