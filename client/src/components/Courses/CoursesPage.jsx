import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Outlet,useNavigate } from 'react-router-dom';

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/courses');
            setCourses(response.data.courses);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const deleteCourse = async (id) => {
        if (role === 'admin') {
            try {
                await axios.delete(`/api/courses/${id}`);
                fetchData();
            } catch (error) {
                console.error('Error deleting course:', error);
            }
        }
    };

    return (
        <>
            <div
            >
                {courses.map(course => (
                    <div style={{
                        backgroundColor: 'rgb(190,190,190)', width: '250px',
                        paddingBottom: '20px', paddingLeft: '10px'
                    }} key={course._id}>
                        <h2>{course.name}</h2>
                        <button className="Add-Student-Submit" onClick={() => deleteCourse(course._id)}>Delete</button>
                        <Link to={`/courses/${course.name}`}>View Details</Link>
                    </div>
                ))}

            </div >
            <Outlet />

        </>
    );
};

export default CoursesPage;
