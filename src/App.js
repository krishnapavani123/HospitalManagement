// File: src/App.js
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Shared/Navbar';
import Footer from './components/Shared/Footer';

import LandingPage from './components/LandingPage';
import RegisterHospital from './components/Hospital/RegisterHospital';
import RegisterDoctor from './components/Doctor/RegisterDoctor';
import ViewDoctors from './components/Doctor/ViewDoctors';
import RegisterPatient from './components/Patient/RegisterPatient';
import DashboardHospital from './components/Hospital/DashboardHospital';
import DashboardDoctor from './components/Doctor/DashboardDoctor';
import PatientHistory from './components/Patient/PatientHistory';
import BookAppointment from './components/Patient/BookAppointment';

class App extends Component {
  state = {
    appointments: JSON.parse(localStorage.getItem('appointments')) || [],
  };

  addAppointment = (appointment) => {
    this.setState(
      (prevState) => ({
        appointments: [...prevState.appointments, appointment],
      }),
      () => {
        localStorage.setItem('appointments', JSON.stringify(this.state.appointments));
      }
    );
  };

  render() {
    const { appointments } = this.state;

    return (
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register/hospital" element={<RegisterHospital />} />
          <Route path="/register/doctor" element={<RegisterDoctor />} />
          <Route path="/view/doctors" element={<ViewDoctors />} />
          <Route path="/register/patient" element={<RegisterPatient />} />
          <Route path="/dashboard/hospital" element={<DashboardHospital />} />
          <Route path="/dashboard/doctor" element={<DashboardDoctor />} />
          <Route path="/bookappointment" element={<BookAppointment addAppointment={this.addAppointment} />} />
          <Route path="/history/patient" element={<PatientHistory appointments={appointments} />} />
        </Routes>

        <Footer />
      </Router>
    );
  }
}

export default App;
