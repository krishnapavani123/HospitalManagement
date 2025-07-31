import  { Component } from 'react';
import { Link } from 'react-router-dom';

import './index.css';

class LandingPage extends Component {
  render() {
    return (
      <div className="landing-container">
        <div className="overlay">
          <h1 className="landing-title">Welcome to HealthCare Portal</h1>
          <p className="landing-subtitle">Efficiently manage hospitals, doctors, and patient appointments</p>
          <div className="landing-buttons">
            <Link to="/register/patient" className="landing-btn">Register as Patient</Link>
            <Link to="/register/doctor" className="landing-btn">Register as Doctor</Link>
            <Link to="/register/hospital" className="landing-btn">Register Hospital</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;