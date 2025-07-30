// File: src/components/Hospital/DashboardHospital.jsx
import  { Component } from 'react';
import './index.css';

class DashboardHospital extends Component {
  state = {
    totalConsultations: 243,
    totalRevenue: 168900,
    doctors: [
      { name: 'Dr. Anita Sharma', department: 'Cardiology', revenue: 48000 },
      { name: 'Dr. Ravi Kumar', department: 'Orthopedics', revenue: 39000 },
      { name: 'Dr. Farah Sheikh', department: 'Dermatology', revenue: 27000 }
    ],
    departments: [
      { name: 'Cardiology', revenue: 50000 },
      { name: 'Orthopedics', revenue: 45000 },
      { name: 'Dermatology', revenue: 30000 },
      { name: 'Pediatrics', revenue: 23700 }
    ]
  };

  render() {
    const { totalConsultations, totalRevenue, doctors, departments } = this.state;

    return (
      <div className="dashboard-container">
        <h1 className="dashboard-title">Hospital Dashboard</h1>

        <div className="stat-cards">
          <div className="card">
            <p className="card-title">Total Consultations</p>
            <p className="card-value">{totalConsultations}</p>
          </div>
          <div className="card">
            <p className="card-title">Total Revenue</p>
            <p className="card-value">₹{totalRevenue}</p>
          </div>
          <div className="card">
            <p className="card-title">Total Doctors</p>
            <p className="card-value">{doctors.length}</p>
          </div>
        </div>

        <div className="analytics-section">
          <h3>Doctor-wise Revenue</h3>
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Department</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc, idx) => (
                <tr key={idx}>
                  <td>{doc.name}</td>
                  <td>{doc.department}</td>
                  <td className="amount">₹{doc.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="analytics-section" style={{ marginTop: '2rem' }}>
          <h3>Department-wise Revenue</h3>
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dep, idx) => (
                <tr key={idx}>
                  <td>{dep.name}</td>
                  <td className="amount">₹{dep.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default DashboardHospital;
