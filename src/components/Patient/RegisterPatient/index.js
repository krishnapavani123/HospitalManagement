import React, { Component } from 'react';
import './index.css';

class RegisterPatient extends Component {
  state = {
    name: '',
    gender: '',
    dob: '',
    uniqueId: '',
    successMessage: ''
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, gender, dob, uniqueId } = this.state;

    const patient = { name, gender, dob, uniqueId };

    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    patients.push(patient);
    localStorage.setItem('patients', JSON.stringify(patients));

    this.setState({
      name: '',
      gender: '',
      dob: '',
      uniqueId: '',
      successMessage: '✅ Patient registered successfully!'
    });
  };

  render() {
    const { name, gender, dob, uniqueId, successMessage } = this.state;

    return (
      <div className="form-container">
        <h2 className="form-title">Register Patient</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Patient Name"
            value={name}
            onChange={this.handleChange}
            required
          />
          <select name="gender" value={gender} onChange={this.handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={dob}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="uniqueId"
            placeholder="Aadhar / Passport ID"
            value={uniqueId}
            onChange={this.handleChange}
            required
          />

          <button type="submit" className="submit-btn">Register</button>
        </form>

        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    );
  }
}

export default RegisterPatient;
