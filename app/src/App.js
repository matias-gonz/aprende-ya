import React from 'react';
import {Route, Routes} from 'react-router-dom';
import LoginForm from './login/LoginForm';
import RegistrationForm from './registration/RegistrationForm';
import CourseData from "./CourseList/CourseList";
import CourseForm from "./courseForm/CourseForm";
import PaymentForm from "./paymentForm/PaymentForm";
import CourseDescription from "./courseDescription/CourseDescription";
import UserProfile from "./userProfile/UserProfile"
import {StyledEngineProvider, ThemeProvider} from "@mui/material";
import appTheme from "./appTheme";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <StyledEngineProvider injectFirst>
        <Routes>
          <Route path="/pago" element={<PaymentForm/>}/>
          <Route path="/nuevo-curso" element={<CourseForm/>}/>
          <Route path="/registro" element={<RegistrationForm/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/curso/:id" element={<CourseDescription/>}/>
          <Route path="/perfil" element={<UserProfile/>}/>
          <Route path="/" element={<CourseData/>}/>
        </Routes>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
