// File: src/components/Patient/PatientHistory.jsx
import React, { Component } from 'react';
import './index.css';

class PatientHistory extends Component {
  render() {
    const appointments = this.props.appointments || [];

    return (
      <div className="history-container">
        <h2 className="form-title">Your Appointment History</h2>

        {appointments.length === 0 ? (
          <p className="no-history">No appointments found.</p>
        ) : (
          <div className="history-list">
            {appointments.map((entry, idx) => (
              <div key={idx} className="history-card">
                <p><strong>Doctor:</strong> {entry.doctor}</p>
                <p><strong>Hospital:</strong> {entry.hospital}</p>
                <p><strong>Time:</strong> {entry.slot}</p>
                <p><strong>Fee:</strong> ₹{entry.fee}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default PatientHistory;
