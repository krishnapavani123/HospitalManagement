// File: src/components/Patient/PatientHistory.jsx
import  { Component } from 'react';
import './index.css';

class PatientHistory extends Component {
  state = {
    history: [
      {
        doctor: 'Dr. Meera Sharma',
        hospital: 'Yashoda Hospitals',
        specialization: 'Dermatology',
        date: '2025-06-20',
        fee: 500,
      },
      {
        doctor: 'Dr. Amit Rao',
        hospital: 'Apollo',
        specialization: 'Cardiology',
        date: '2025-05-11',
        fee: 750,
      },
    ],
  };

  render() {
    const { history } = this.state;

    return (
      <div className="patient-history-container">
        <h2 className="history-title">Consultation History</h2>

        {history.length === 0 ? (
          <p>No consultation records found.</p>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Doctor</th>
                <th>Hospital</th>
                <th>Specialization</th>
                <th>Fee Paid</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td>{entry.doctor}</td>
                  <td>{entry.hospital}</td>
                  <td>{entry.specialization}</td>
                  <td>₹{entry.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default PatientHistory;
