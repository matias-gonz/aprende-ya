import React from 'react';
import {Route, Router, Routes} from 'react-router-dom';
import LoginForm from './login/LoginForm';
import RegistrationForm from './registration/RegistrationForm';
import CourseData from "./coursesList/CourseData";
import CourseForm from "./courseForm/CourseForm";


function App() {
  return (
    <Routes>
      <Route path="/nuevo-curso" element={<CourseForm/>} />
      <Route path="/cursos" element={<CourseData/>} />
      <Route path="/registro" element={<RegistrationForm/>} />
      <Route path="/" element={<LoginForm/>} />
    </Routes>
  );
}

export default App;
