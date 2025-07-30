// File: src/components/Doctor/DashboardDoctor.jsx
import  { Component } from 'react';
import './index.css';

class DashboardDoctor extends Component {
  state = {
    consultations: 18,
    totalEarnings: 7200,
    earningsByHospital: [
      { hospital: 'Apollo', earnings: 4200 },
      { hospital: 'Care Hospitals', earnings: 3000 },
    ],
  };

  render() {
    const { consultations, totalEarnings, earningsByHospital } = this.state;

    return (
      <div className="doctor-dashboard">
        <h2 className="dashboard-title">Doctor Dashboard</h2>

        <div className="dashboard-metrics">
          <div className="metric-box blue">
            <h3>{consultations}</h3>
            <p>Total Consultations</p>
          </div>
          <div className="metric-box green">
            <h3>₹{totalEarnings}</h3>
            <p>Total Earnings</p>
          </div>
        </div>

        <div className="earnings-breakdown">
          <h4>Earnings by Hospital</h4>
          <ul>
            {earningsByHospital.map((item, index) => (
              <li key={index}>
                {item.hospital}: ₹{item.earnings}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default DashboardDoctor;
