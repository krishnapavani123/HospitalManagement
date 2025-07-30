// File: src/components/Doctor/RegisterDoctor.jsx
import React, { Component } from 'react';
import './index.css';

class RegisterDoctor extends Component {
  state = {
    name: '',
    qualifications: '',
    specializations: '',
    experience: '',
    associatedHospital: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, qualifications, specializations, experience, associatedHospital } = this.state;

    // Log or send to backend
    console.log('Doctor Registered:', {
      name,
      qualifications,
      specializations: specializations.split(',').map(s => s.trim()),
      experience,
      associatedHospital,
    });

    // Reset
    this.setState({
      name: '',
      qualifications: '',
      specializations: '',
      experience: '',
      associatedHospital: '',
    });
  };

  render() {
    const { name, qualifications, specializations, experience, associatedHospital } = this.state;

    return (
      <div className="register-doctor-container">
        <h2 className="form-title">Register Doctor</h2>
        <form className="doctor-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              placeholder="e.g., Dr. Ramesh Kumar"
              required
            />
          </div>

          <div className="form-group">
            <label>Qualifications</label>
            <input
              type="text"
              name="qualifications"
              value={qualifications}
              onChange={this.handleChange}
              placeholder="e.g., MBBS, MD"
              required
            />
          </div>

          <div className="form-group">
            <label>Specializations (comma-separated)</label>
            <input
              type="text"
              name="specializations"
              value={specializations}
              onChange={this.handleChange}
              placeholder="e.g., Cardiology, Pediatrics"
              required
            />
          </div>

          <div className="form-group">
            <label>Years of Experience</label>
            <input
              type="number"
              name="experience"
              value={experience}
              onChange={this.handleChange}
              placeholder="e.g., 10"
              required
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Associated Hospital</label>
            <input
              type="text"
              name="associatedHospital"
              value={associatedHospital}
              onChange={this.handleChange}
              placeholder="e.g., Apollo Hospitals"
              required
            />
          </div>

          <button type="submit" className="submit-btn">Register</button>
        </form>
      </div>
    );
  }
}

export default RegisterDoctor;
