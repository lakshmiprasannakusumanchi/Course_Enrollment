import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Home from "./Layout/Home/Home";
import NavBar from "./Layout/NavBar/NavBar";
import Add from "./components/AddStudent/Add";
import Edit from "./components/EditStudent/Edit";
import Login from "./auth/Login"
import Signup from "./auth/Signup"
import Courses from "./components/Courses/CoursesPage.jsx"
import AddCourses from "./components/Courses/AddCourses.jsx"
import CourseDetails from './components/Courses/CourseDetails.jsx'

const App = () => {
  return (
    <Fragment>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} >
          <Route path="/:name" element={<CourseDetails />} />
        </Route>
        <Route path="/addcourses" element={<AddCourses />} />
        <Route path="/" element={<Signup />} />
        <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
      </Routes>
    </Fragment>
  );
};

export default App;
