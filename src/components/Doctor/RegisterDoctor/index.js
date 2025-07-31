// File: src/components/Doctor/RegisterDoctor.jsx
import React, { Component } from 'react';

import DoctorAssociation from '../DoctorAssociation';
import './index.css';

class RegisterDoctor extends Component {
  state = {
    name: '',
    qualifications: '',
    specializations: [],
    experience: '',
    success: false,
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSpecializationChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map(o => o.value);
    this.setState({ specializations: selected });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, qualifications, specializations, experience } = this.state;
    const newDoctor = {
      id: Date.now(),
      name,
      qualifications,
      specializations,
      experience,
      associations: [],
    };
    const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
    doctors.push(newDoctor);
    localStorage.setItem('doctors', JSON.stringify(doctors));
    localStorage.setItem('loggedInDoctorId', newDoctor.id); // Simulate login
    this.setState({ success: true });
  };

  render() {
    const { name, qualifications, specializations, experience, success } = this.state;

    if (success) {
      return (
        <div>
       
          <DoctorAssociation />
        </div>
      );
    }

    return (
      <div className="doctor-register-container">
        <h2>Register Doctor</h2>
        <form onSubmit={this.handleSubmit}>
          <input name="name" value={name} placeholder="Doctor Name" onChange={this.handleChange} required />
          <input name="qualifications" value={qualifications} placeholder="Qualifications" onChange={this.handleChange} required />
          <label>Select Specializations</label>
          <select multiple onChange={this.handleSpecializationChange} value={specializations}>
            <option>Cardiology</option>
            <option>Neurology</option>
            <option>Orthopedics</option>
            <option>Pediatrics</option>
            <option>Dermatology</option>
          </select>
          <input name="experience" value={experience} placeholder="Experience in years" type="number" onChange={this.handleChange} required />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default RegisterDoctor;
