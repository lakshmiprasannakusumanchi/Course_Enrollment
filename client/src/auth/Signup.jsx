import React, { useState } from 'react';
import './Signup.css';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import {baseUrl} from '../url.js'

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleRegistration = (e) => {
        e.preventDefault();
        console.log({ fullName, email, password, role });
        axios.post(`${baseUrl}/api/user/register`, { fullName, email, password, role })
            .then(res => {
                console.log(res.data);
                navigate('/login');
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="AddStudent-Wrapper">
            <h1>SignUp Page</h1>
            <form onSubmit={handleRegistration}>
                <label>
                    Full Name:
                    <input
                        className="Add-Student-Input"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </label>
                <br />
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
                <br /> <label>
                    Role:
                    <input
                        type="radio"
                        name="role"
                        value="student"
                        checked={role === "student"}
                        onChange={(e) => setRole(e.target.value)}
                    /> 
                    Student
                    <input
                        type="radio"
                        name="role"
                        value="admin"
                        checked={role === "admin"}
                        onChange={(e) => setRole(e.target.value)}
                    />
                    Admin
                </label>
                <br />
                <br />
                <button className="Add-Student-Submit" type="submit">
                    Register
                </button>
                <button className="Add-Student-Reset" type="reset">
                    Reset
                </button>
                <h5>Already have an account? <Link to="/login">Login </Link></h5>
            </form>
        </div>
    );
};

export default Signup;
