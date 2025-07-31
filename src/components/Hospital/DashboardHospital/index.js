// File: src/components/Hospital/DashboardHospital.jsx
import React, { Component } from 'react';
import './index.css';

class DashboardHospital extends Component {
  state = {
    hospital: null,
    doctors: [],
    appointments: [],
    totalConsultations: 0,
    totalRevenue: 0,
    doctorRevenue: [],
    departmentRevenue: [],
  };

  componentDidMount() {
    const hospitalId = parseInt(localStorage.getItem('loggedInHospitalId'));
    const hospitals = JSON.parse(localStorage.getItem('hospitals')) || [];
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const doctors = JSON.parse(localStorage.getItem('doctors')) || [];

    const hospital = hospitals.find(h => h.id === hospitalId);
    if (!hospital) return;

    const hospitalAppointments = appointments.filter(a => a.hospital === hospital.name);
    const associatedDoctors = doctors.filter(doc =>
      doc.associations.some(assoc => assoc.hospital === hospital.name)
    );

    const totalRevenue = hospitalAppointments.reduce((acc, a) => acc + parseInt(a.fee || 0), 0);
    const totalConsultations = hospitalAppointments.length;

    const doctorRevenue = associatedDoctors.map(doc => {
      const docAppointments = hospitalAppointments.filter(a => a.doctor === doc.name);
      const revenue = docAppointments.reduce((acc, a) => acc + parseInt(a.fee || 0), 0);
      return {
        name: doc.name,
        department: doc.specializations[0] || 'N/A',
        revenue,
      };
    });

    const departmentMap = {};
    hospitalAppointments.forEach(a => {
      if (!departmentMap[a.department]) departmentMap[a.department] = 0;
      departmentMap[a.department] += parseInt(a.fee || 0);
    });

    const departmentRevenue = Object.entries(departmentMap).map(([name, revenue]) => ({
      name,
      revenue,
    }));

    this.setState({
      hospital,
      doctors: associatedDoctors,
      appointments: hospitalAppointments,
      totalConsultations,
      totalRevenue,
      doctorRevenue,
      departmentRevenue,
    });
  }

  render() {
    const {
      hospital,
      totalConsultations,
      totalRevenue,
      doctorRevenue,
      departmentRevenue,
    } = this.state;

    if (!hospital) return <p className="error">No hospital found.</p>;

    return (
      <div className="dashboard-container">
        <h1 className="dashboard-title">{hospital.name} Admin Dashboard</h1>

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
            <p className="card-value">{doctorRevenue.length}</p>
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
              {doctorRevenue.map((doc, idx) => (
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
              {departmentRevenue.map((dep, idx) => (
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
