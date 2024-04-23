import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import { PropagateLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import Student from "../../components/Student/Student";
import SearchStudents from "../../components/SearchStudent/SearchStudents";
import SideBar from '../../components/Courses/SideBar.jsx'
const Home = () => {
  const [data, setData] = useState(null);
  const [allStudents, setAllStudents] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // Fetch the user's role
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    navigate('/courses');
  }
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

    const fetchData = async () => {
      try {
        const students = await axios("/api/students/");
        setData(students.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [token, role, navigate]);

  const removeStudent = async (id) => {
    try {
      await axios.delete(`/api/students/${id}`);
      const students = await axios("/api/students/");
      setData(students.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const searchStudents = (username) => {
    let students;
    if (allStudents === null) setAllStudents(data.students);

    if (username.trim() === "") {
      setData({ students: allStudents });
    } else {
      students = data.students.filter(({ name }) =>
        name.toLowerCase().includes(username.toLowerCase())
      );
      setData({ students });
    }
  };

  let studentsComponent;

  if (data) {
    studentsComponent =
      data.students &&
      data.students.map((student) => (
        <Student key={student._id} {...student} removeStudent={removeStudent} />
      ));
  } else {
    return <div className="Spinner-Wrapper"> <PropagateLoader color={'#333'} /> </div>;
  }

  if (error) return <h1>{error}</h1>;
  if (data !== null && !data.students.length) return <h1 className="No-Students">No students!</h1>;

  return (
    <>
      <SideBar />
      <div >
        <div className="Table-Wrapper">
          <h1>Enrolled Students:</h1>
          <SearchStudents searchStudents={searchStudents} />
          <table className="Table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{studentsComponent}</tbody>
          </table>
        </div>
        {/* <button onClick={handleLogin}  style={{ float: "right" }} className="Add-Student-Submit" type="submit">
      courses
    </button>*/}
      </div>
    </>
  );
};

export default Home;
