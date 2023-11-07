import React from 'react';
import {Route, Routes} from 'react-router-dom';
import LoginForm from './login/LoginForm';
import RegistrationForm from './registration/RegistrationForm';
import CourseData from "./coursesList/CourseData";
import CourseForm from "./courseForm/CourseForm";
import PaymentForm from "./paymentForm/PaymentForm";
import CourseDescription from "./courseDescription/CourseDescription";
import UserProfile from "./userProfile/UserProfile"


function App() {
  return (
    <Routes>
      <Route path="/pago" element={<PaymentForm/>}/>
      <Route path="/nuevo-curso" element={<CourseForm/>}/>
      <Route path="/registro" element={<RegistrationForm/>}/>
      <Route path="/login" element={<LoginForm/>}/>
      <Route path="/curso/:id" element={<CourseDescription/>} />
      <Route path="/perfil" element={<UserProfile/>} />
      <Route path="/" element={<CourseData/>}/>
    </Routes>
  );
}

export default App;
