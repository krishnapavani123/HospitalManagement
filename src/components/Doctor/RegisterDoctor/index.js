import React, { Component } from 'react';
import ViewDoctors from '../ViewDoctors';
import './index.css';

class RegisterDoctor extends Component {
  state = {
    name: '',
    qualifications: '',
    specializations: [],
    experience: '',
    hospital: '',
    availableSlots: [''],
    fee: '',
    hospitals: [],
    matchedDepartments: [],
    doctors: []
  };

  componentDidMount() {
    const hospitals = JSON.parse(localStorage.getItem('hospitals')) || [];
    this.setState({ hospitals });

    const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
    this.setState({ doctors });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSpecializationChange = (e) => {
    const options = [...e.target.options].filter(option => option.selected).map(option => option.value);
    this.setState({ specializations: options });
  };

  handleSlotChange = (index, value) => {
    const slots = [...this.state.availableSlots];
    slots[index] = value;
    this.setState({ availableSlots: slots });
  };

  addSlot = () => {
    this.setState(prev => ({ availableSlots: [...prev.availableSlots, ''] }));
  };

  validateDepartments = () => {
    const hospital = this.state.hospitals.find(h => h.name === this.state.hospital);
    if (!hospital) return false;
    const matched = hospital.departments.filter(dep => this.state.specializations.includes(dep));
    this.setState({ matchedDepartments: matched });
    return matched.length > 0;
  };

  hasConflictingSlot = (newSlots, currentHospital) => {
    const doctors = this.state.doctors;
    for (let doc of doctors) {
      for (let assoc of doc.associations || []) {
        if (assoc.hospitalName !== currentHospital) {
          for (let slot of assoc.availableSlots) {
            if (newSlots.includes(slot)) return true;
          }
        }
      }
    }
    return false;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      name, qualifications, specializations, experience,
      hospital, availableSlots, fee, matchedDepartments, doctors
    } = this.state;

    if (!this.validateDepartments()) {
      alert('Doctor specialization must match at least one department in the selected hospital.');
      return;
    }

    if (this.hasConflictingSlot(availableSlots, hospital)) {
      alert('Selected time slot conflicts with another hospital.');
      return;
    }

    const newDoctor = {
      name,
      qualifications,
      specializations,
      experience,
      associations: [
        {
          hospitalName: hospital,
          matchedDepartments,
          availableSlots,
          fee,
        },
      ],
    };

    const updatedDoctors = [...doctors, newDoctor];
    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));

    this.setState({
      name: '',
      qualifications: '',
      specializations: [],
      experience: '',
      hospital: '',
      availableSlots: [''],
      fee: '',
      doctors: updatedDoctors,
    });
  };

  render() {
    const {
      name, qualifications, specializations, experience, hospital,
      availableSlots, fee, hospitals, doctors
    } = this.state;

    return (
      <div className="form-container">
        <h2 className="form-title">Register Doctor</h2>
        <form onSubmit={this.handleSubmit}>
          <input name="name" placeholder="Doctor Name" value={name} onChange={this.handleChange} required />
          <input name="qualifications" placeholder="Qualifications" value={qualifications} onChange={this.handleChange} required />

          <label htmlFor="specializations">Select Specializations</label>
          <select
            id="specializations"
            name="specializations"
            value={specializations}
            onChange={this.handleSpecializationChange}
            multiple
            required
          >
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Dermatology">Dermatology</option>
          </select>

          <input
            name="experience"
            type="number"
            placeholder="Years of Experience"
            value={experience}
            onChange={this.handleChange}
            required
          />

          <label htmlFor="hospital">Select Hospital</label>
          <select name="hospital" id="hospital" value={hospital} onChange={this.handleChange} required>
            <option value="">-- Select Hospital --</option>
            {hospitals.map((hosp, idx) => (
              <option key={idx} value={hosp.name}>{hosp.name}</option>
            ))}
          </select>

          <label>Available Time Slots</label>
          {availableSlots.map((slot, idx) => (
            <input
              key={idx}
              type="datetime-local"
              value={slot}
              onChange={(e) => this.handleSlotChange(idx, e.target.value)}
              required
            />
          ))}
          <button type="button" onClick={this.addSlot}>+ Add Slot</button>

          <input
            name="fee"
            type="number"
            placeholder="Consultation Fee (₹)"
            value={fee}
            onChange={this.handleChange}
            required
          />

          <button type="submit" className="submit-btn">Register</button>
        </form>

        <hr />
        <ViewDoctors doctors={doctors} />
      </div>
    );
  }
}

export default RegisterDoctor;
