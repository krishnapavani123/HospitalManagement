// File: src/components/Patient/PatientHistory.jsx
import React, { Component } from 'react';
import PatientNavbar from '../PatientNavbar';
import './index.css';

class PatientHistory extends Component {
  state = {
    appointments: []
  };

  componentDidMount() {
    const history = JSON.parse(localStorage.getItem('appointments')) || [];
    this.setState({ appointments: history });
  }

  render() {
    const { appointments } = this.state;

    return (
      <div>
        <PatientNavbar />
        <div className="history-wrapper">
          <h2>Patient History</h2>
          {appointments.length === 0 ? (
            <p>No appointments yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Hospital</th>
                  <th>Slot</th>
                  <th>Fee</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt, index) => (
                  <tr key={index}>
                    <td>{appt.doctorName}</td>
                    <td>{appt.hospital}</td>
                    <td>{appt.slot}</td>
                    <td>₹{appt.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}

export default PatientHistory;
