// File: src/components/Doctor/DoctorDashboard.jsx
import React, { Component } from 'react';
import DoctorNavbar from '../DoctorNavbar';
import './index.css';

class DoctorDashboard extends Component {
  state = {
    doctor: null,
    appointments: [],
  };

  componentDidMount() {
    const doctorId = parseInt(localStorage.getItem('loggedInDoctorId'));
    const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
    const doctor = doctors.find(d => d.id === doctorId);
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const doctorAppointments = appointments.filter(a => a.doctor === doctor?.name);
    this.setState({ doctor, appointments: doctorAppointments });
  }

  render() {
    const { doctor, appointments } = this.state;
    if (!doctor) return <p className="error">Doctor not logged in.</p>;

    const totalEarnings = appointments.reduce((acc, a) => acc + parseInt(a.fee || 0) * 0.6, 0);

    const earningsByHospital = {};
    appointments.forEach((a) => {
      if (!earningsByHospital[a.hospital]) earningsByHospital[a.hospital] = 0;
      earningsByHospital[a.hospital] += parseInt(a.fee || 0) * 0.6;
    });

    return (
      <div>
        <DoctorNavbar />
        <div className="dashboard-container">
          <h2>Doctor Dashboard</h2>
          <p><strong>Welcome Dr. {doctor.name}</strong></p>
          <p><strong>Total Consultations:</strong> {appointments.length}</p>
          <p><strong>Total Earnings:</strong> ₹{totalEarnings}</p>
          <h3>Earnings by Hospital:</h3>
          <ul>
            {Object.entries(earningsByHospital).map(([hospital, amt], i) => (
              <li key={i}>{hospital}: ₹{amt}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default DoctorDashboard;
