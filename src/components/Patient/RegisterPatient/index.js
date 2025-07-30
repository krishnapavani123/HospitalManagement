// File: src/components/Patient/RegisterPatient.jsx
import { Component } from 'react';
import './index.css';

class RegisterPatient extends Component {
  state = {
    name: '',
    gender: '',
    dob: '',
    idNumber: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, gender, dob, idNumber } = this.state;

    // Replace with actual backend integration
    console.log('Patient Registered:', {
      name,
      gender,
      dob,
      idNumber,
    });

    this.setState({
      name: '',
      gender: '',
      dob: '',
      idNumber: '',
    });
  };

  render() {
    const { name, gender, dob, idNumber } = this.state;

    return (
      <div className="register-patient-container">
        <h2 className="form-title">Register Patient</h2>
        <form className="patient-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              placeholder="e.g., Kavya Reddy"
              required
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={gender}
              onChange={this.handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={dob}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Unique ID (e.g., Aadhar, Passport)</label>
            <input
              type="text"
              name="idNumber"
              value={idNumber}
              onChange={this.handleChange}
              placeholder="e.g., 1234-5678-9012"
              required
            />
          </div>

          <button type="submit" className="submit-btn">Register</button>
        </form>
      </div>
    );
  }
}

export default RegisterPatient;
