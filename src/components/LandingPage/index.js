// File: src/components/LandingPage.jsx
import  { Component } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './index.css';

class LandingPage extends Component {
  render() {
    return (
      <div className="landing-wrapper">
        <motion.div
          className="landing-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="landing-heading">Welcome to <span>HealthCare</span></h1>
          <p className="landing-description">
            Streamlined Hospital & Appointment Management System for Admins, Doctors & Patients.
          </p>

          <div className="landing-grid">
            <Link to="/register/hospital" className="landing-card purple">Register Hospital</Link>
            <Link to="/register/doctor" className="landing-card blue">Register Doctor</Link>
            <Link to="/register/patient" className="landing-card green">Register Patient</Link>
            <Link to="/dashboard/hospital" className="landing-card yellow">Hospital Dashboard</Link>
            <Link to="/dashboard/doctor" className="landing-card pink">Doctor Dashboard</Link>
            <Link to="/history/patient" className="landing-card gray">Patient History</Link>
              <Link to="/bookappointment" className="landing-card purple">Book Appointment</Link>
          </div>
        </motion.div>
      </div>
    );
  }
}

export default LandingPage;
