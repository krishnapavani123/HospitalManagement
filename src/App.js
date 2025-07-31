// File: src/App.js
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import DoctorAssociation from './components/Doctor/DoctorAssociation';
import RegisterPatient from './components/Patient/RegisterPatient';
import BookAppointment from './components/Patient/BookAppointment';
import PatientHistory from './components/Patient/PatientHistory';

import RegisterDoctor from './components/Doctor/RegisterDoctor';
import DashboardDoctor from './components/Doctor/DashboardDoctor';

import RegisterHospital from './components/Hospital/RegisterHospital';
import DashboardHospital from './components/Hospital/DashboardHospital';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Patient Flow */}
          <Route path="/register/patient" element={<RegisterPatient />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/patient-history" element={<PatientHistory />} />

          {/* Doctor Flow */}
          <Route path="/register/doctor" element={<RegisterDoctor />} />
          <Route path="/dashboard/doctor" element={<DashboardDoctor />} />
          <Route path="/doctor/associate" element={<DoctorAssociation />} />

          {/* Hospital Admin Flow */}
          <Route path="/register/hospital" element={<RegisterHospital />} />
          <Route path="/dashboard/hospital" element={<DashboardHospital />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
