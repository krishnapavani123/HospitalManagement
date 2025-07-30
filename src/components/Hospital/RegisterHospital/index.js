import React, { Component } from 'react';
import './index.css';

class RegisterHospital extends Component {
  state = {
    name: '',
    location: '',
    departments: [],
    departmentInput: '',
    hospitals: [],
    successMessage: '',
  };

  componentDidMount() {
    const stored = JSON.parse(localStorage.getItem('hospitals')) || [];
    this.setState({ hospitals: stored });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAddDepartment = () => {
    const { departmentInput, departments } = this.state;
    if (departmentInput && !departments.includes(departmentInput)) {
      this.setState({
        departments: [...departments, departmentInput],
        departmentInput: '',
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, location, departments } = this.state;
    const newHospital = { name, location, departments };

    const hospitals = JSON.parse(localStorage.getItem('hospitals')) || [];
    hospitals.push(newHospital);
    localStorage.setItem('hospitals', JSON.stringify(hospitals));

    this.setState({
      name: '',
      location: '',
      departments: [],
      departmentInput: '',
      hospitals,
      successMessage: '✅ Hospital registered successfully!',
    });
  };

  render() {
    const {
      name,
      location,
      departments,
      departmentInput,
      hospitals,
      successMessage,
    } = this.state;

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
          <button type="submit" className="submit-btn">Register</button>
        </form>

        {successMessage && <p className="success-message">{successMessage}</p>}

        <h3 className="view-heading">Registered Hospitals</h3>
        <div className="hospital-list">
          {hospitals.map((hosp, idx) => (
            <div className="hospital-card" key={idx}>
              <h4>{hosp.name}</h4>
              <p><strong>Location:</strong> {hosp.location}</p>
              <p><strong>Departments:</strong> {hosp.departments.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default RegisterHospital;
