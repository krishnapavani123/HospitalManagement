// File: src/components/Hospital/RegisterHospital.jsx
import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

class RegisterHospital extends Component {
  state = {
    name: '',
    location: '',
    departmentInput: '',
    departments: [],
    successMessage: '',
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleAddDepartment = () => {
    const { departmentInput, departments } = this.state;
    const trimmed = departmentInput.trim();
    if (trimmed && !departments.includes(trimmed)) {
      this.setState({
        departments: [...departments, trimmed],
        departmentInput: '',
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, location, departments } = this.state;
    const hospitals = JSON.parse(localStorage.getItem('hospitals')) || [];

    if (hospitals.some(h => h.name.toLowerCase() === name.toLowerCase())) {
      alert('Hospital name must be unique.');
      return;
    }

    const newHospital = {
      id: Date.now(),
      name,
      location,
      departments,
      associatedDoctors: [],
    };

    hospitals.push(newHospital);
    localStorage.setItem('hospitals', JSON.stringify(hospitals));
    localStorage.setItem('loggedInHospitalId', newHospital.id); // ✅ Track current hospital

    this.setState({
      name: '',
      location: '',
      departments: [],
      departmentInput: '',
      successMessage: '✅ Hospital registered successfully!',
    });

    setTimeout(() => this.props.navigate('/dashboard/hospital'), 1000);
  };

  render() {
    const { name, location, departmentInput, departments, successMessage } = this.state;

    return (
      <div className="form-container">
        <h2 className="form-title">Register Hospital</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Hospital Name"
            value={name}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={location}
            onChange={this.handleChange}
            required
          />
          <div className="departments-section">
            <input
              type="text"
              name="departmentInput"
              placeholder="Add Department (e.g., Cardiology)"
              value={departmentInput}
              onChange={this.handleChange}
            />
            <button type="button" onClick={this.handleAddDepartment}>+ Add Dept</button>
          </div>
          <div className="dept-list">
            {departments.map((dep, i) => (
              <span key={i} className="dept-tag">{dep}</span>
            ))}
          </div>
          <button type="submit" className="submit-btn">Register Hospital</button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    );
  }
}

const RegisterHospitalWithNav = (props) => {
  const navigate = useNavigate();
  return <RegisterHospital {...props} navigate={navigate} />;
};

export default RegisterHospitalWithNav;
