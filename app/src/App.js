import React from 'react';
import {Route, Routes} from 'react-router-dom';
import LoginForm from './pages/login/LoginForm';
import RegistrationForm from './pages/registration/RegistrationForm';
import PaymentForm from "./components/PaymentForm/PaymentForm";
import CourseDescription from "./components/CourseDescription/CourseDescription";
import UserProfile from "./pages/userProfile/UserProfile"
import {StyledEngineProvider, ThemeProvider} from "@mui/material";
import appTheme from "./appTheme";
import Home from "./pages/Home/Home";
import CourseCreation from "./components/CourseCreation/CourseCreation";

class App extends React.Component {
  constructor(props) {
    super(props);
    const isUserLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true';
    this.state = {
      isUserLoggedIn
    };
  }

  handleLoginState = () => {
    this.setState({isUserLoggedIn: true});
    localStorage.setItem('isUserLoggedIn', 'true');
  };

  handleLogoutState = () => {
    this.setState({ isUserLoggedIn: false });
    localStorage.setItem('isUserLoggedIn', 'false');
  };

  render() {
    const {isUserLoggedIn} = this.state;

    return (
      <ThemeProvider theme={appTheme}>
        <StyledEngineProvider injectFirst>
          <Routes>
            <Route path="/pago" element={<PaymentForm/>}/>
            <Route path="/nuevo-curso" element={<CourseCreation isUserLoggedIn={isUserLoggedIn}/>}/>
            <Route path="/registro" element={<RegistrationForm/>}/>
            <Route path="/login" element={<LoginForm handleLoginState={this.handleLoginState}/>}/>
            <Route path="/curso/:course_id" element={<CourseDescription isUserLoggedIn={isUserLoggedIn}/>}/>
            <Route path="/perfil" element={<UserProfile isUserLoggedIn={isUserLoggedIn} handleLogoutState={this.handleLogoutState}/>}/>
            <Route path="/" element={<Home isUserLoggedIn={isUserLoggedIn}/>}/>
          </Routes>
        </StyledEngineProvider>
      </ThemeProvider>
    );
  }
}

export default App;
