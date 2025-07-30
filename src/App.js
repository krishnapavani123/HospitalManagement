// App.js with React Router v6+
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Shared/Navbar';
import Footer from './components/Shared/Footer';

import LandingPage from './components/LandingPage';
import RegisterHospital from './components/Hospital/RegisterHospital';
import RegisterDoctor from './components/Doctor/RegisterDoctor';
import RegisterPatient from './components/Patient/RegisterPatient';
import DashboardHospital from './components/Hospital/DashboardHospital';
import DashboardDoctor from './components/Doctor/DashboardDoctor';
import PatientHistory from './components/Patient/PatientHistory';
import BookAppointment from './components/Patient/BookAppointment';


class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register/hospital" element={<RegisterHospital />} />
          <Route path="/register/doctor" element={<RegisterDoctor />} />
          <Route path="/register/patient" element={<RegisterPatient />} />
          <Route path="/dashboard/hospital" element={<DashboardHospital />} />
          <Route path="/dashboard/doctor" element={<DashboardDoctor />} />
          <Route path="/history/patient" element={<PatientHistory />} />
          <Route path="/bookappointment" element={<BookAppointment/>} />

        </Routes>
        <Footer />
      </Router>
    );
  }
}

export default App;
