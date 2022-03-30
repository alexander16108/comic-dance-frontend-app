import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import DanceClasses from './pages/EnrolledClasses';
import EnrollmentForm from './pages/EnrollmentForm';
import EnrolledForm from './pages/EnrolledForm';
import DeleteClasses from './pages/DeleteClasses';

const App = () => (
  <Router>
    <NavBar />
    <Routes>
      <Route exact path="/" element={<DanceClasses />} />
    </Routes>
    <Routes>
      <Route exact path="/lease_form" element={<EnrollmentForm />} />
    </Routes>
    <Routes>
      <Route exact path="/my_leases" element={<EnrolledForm />} />
    </Routes>
    <Routes>
      <Route exact path="/delete_leases" element={<DeleteClasses />} />
    </Routes>
  </Router>
);

export default App;
