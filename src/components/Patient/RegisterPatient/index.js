// File: src/components/Patient/RegisterPatient.jsx
import { Component } from 'react';
import './index.css';

class RegisterPatient extends Component {
  state = {
    name: '',
    gender: '',
    dob: '',
    uniqueId: '',
    successMessage: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, gender, dob, uniqueId } = this.state;
    const patient = { name, gender, dob, uniqueId };
    localStorage.setItem('loggedInPatient', JSON.stringify(patient));
    this.setState({ successMessage: '✅ Registered successfully!' });
    setTimeout(() => {
      window.location.href = '/book-appointment';
    }, 1500);
  };

  render() {
    const { name, gender, dob, uniqueId, successMessage } = this.state;

    return (
      <div className="form-container">
        <h2 className="form-title">Register as Patient</h2>
        <form onSubmit={this.handleSubmit}>
          <input name="name" value={name} onChange={this.handleChange} placeholder="Full Name" required />
          <select name="gender" value={gender} onChange={this.handleChange} required>
            <option value="">Select Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
          <input type="date" name="dob" value={dob} onChange={this.handleChange} required />
          <input name="uniqueId" value={uniqueId} onChange={this.handleChange} placeholder="Aadhar or Passport Number" required />
          <button type="submit" className="submit-btn">Register</button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    );
  }
}

export default RegisterPatient;
