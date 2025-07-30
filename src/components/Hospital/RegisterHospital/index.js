// File: src/components/Hospital/RegisterHospital.jsx
import  { Component } from 'react';
import './index.css';

class RegisterHospital extends Component {
  state = {
    name: '',
    location: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, location } = this.state;

    // Replace this with actual API call or backend logic
    console.log('Registering hospital:', { name, location });

    // Reset form
    this.setState({ name: '', location: '' });
  };

  render() {
    const { name, location } = this.state;

    return (
      <div className="register-hospital-container">
        <h2 className="form-title">Register Hospital</h2>
        <form className="hospital-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Hospital Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              placeholder="e.g., Apollo Hospitals"
              required
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={location}
              onChange={this.handleChange}
              placeholder="e.g., Hyderabad"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default RegisterHospital;
