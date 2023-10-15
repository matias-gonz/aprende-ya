import React from 'react';
import {Route, Router, Routes} from 'react-router-dom';
import LoginForm from './login/LoginForm';
import RegistrationForm from './registration/RegistrationForm';


function App() {
  return (
    <Routes>
      <Route path="/registro" element={<RegistrationForm/>} />
      <Route path="/" element={<LoginForm/>} />
    </Routes>
  );
}

export default App;
