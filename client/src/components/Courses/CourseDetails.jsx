import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {baseUrl} from '../../url.js'
const CourseDetails = () => {
    const [course, setCourse] = useState(null);
    const { name } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/courses/${name}`); 
                setCourse(response.data.course);
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };
        fetchCourse();
    }, [name]);

    if (!course) {
        return <div>Loading...</div>;
    }

    const handleEnrollClick = () => {
        // Perform any enrollment logic here
        // For example, you might want to send a request to enroll the user in the course
        // After enrollment logic, navigate to the desired page with the course name as a query parameter
        navigate(`/add?coursename=${encodeURIComponent(course.name)}`);
    };

    return (
        <div style={{ position: 'absolute', top: '50px', left: '300px', padding: '20px' }}>
            <u><h2>{course.name}</h2></u>
            <p>{course.description}</p>
            <button className="Add-Student-Submit" onClick={() => navigate(-1)}>Prev</button>
            <button className="Add-Student-Submit" onClick={handleEnrollClick}>Enroll</button>
        </div>
    );
};

export default CourseDetails;
