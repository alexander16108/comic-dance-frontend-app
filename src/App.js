import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Logout from './pages/Logout';
import SignupPage from './pages/SignupPage';
import Login from './pages/Login';
import store from './redux/configureStore';
import NavBar from './components/navbar/NavBar';
import EnrollmentForm from './pages/EnrollmentForm';
import EnrolledClasses from './pages/EnrolledClasses';
import Home from './components/home/homepage';

const App = () => (
  <Provider store={store}>
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Enrollment_Form" element={<EnrollmentForm />} />
        <Route exact path="/Enrolled_Classes" element={<EnrolledClasses />} />
        <Route exact path="/sign_up" element={<SignupPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  </Provider>
);

export default App;
