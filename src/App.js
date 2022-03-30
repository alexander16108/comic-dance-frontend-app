import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import DanceClasses from './pages/DanceClass';
import EnrollmentForm from './pages/EnrollmentForm';
import EnrolledClasses from './pages/EnrolledClasses';
import DeleteClasses from './pages/DeleteClasses';

const App = () => (
  <Router>
    <NavBar />
    <Routes>
      <Route exact path="/" element={<DanceClasses />} />
    </Routes>
    <Routes>
      <Route exact path="/Enrollment_Form" element={<EnrollmentForm />} />
    </Routes>
    <Routes>
      <Route exact path="/Enrolled_Classes" element={<EnrolledClasses />} />
    </Routes>
    <Routes>
      <Route exact path="/Delete_Classes" element={<DeleteClasses />} />
    </Routes>
  </Router>
);

export default App;
