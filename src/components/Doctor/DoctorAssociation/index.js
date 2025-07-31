// File: src/components/Doctor/DoctorAssociation.jsx
import React, { Component } from 'react';
import DoctorNavbar from '../DoctorNavbar';
import './index.css';

class DoctorAssociation extends Component {
  state = {
    hospitals: [],
    selectedHospital: '',
    slots: [''],
    fee: '',
    message: '',
  };

  componentDidMount() {
    const hospitals = JSON.parse(localStorage.getItem('hospitals')) || [];
    this.setState({ hospitals });
  }

  handleSlotChange = (i, val) => {
    const slots = [...this.state.slots];
    slots[i] = val;
    this.setState({ slots });
  };

  addSlot = () => this.setState({ slots: [...this.state.slots, ''] });

  handleAssociation = (e) => {
    e.preventDefault();
    const doctorId = parseInt(localStorage.getItem('loggedInDoctorId'));
    const { selectedHospital, slots, fee } = this.state;
    const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
    const updated = doctors.map(doc => {
      if (doc.id === doctorId) {
        const newAssoc = {
          hospital: selectedHospital,
          slots,
          fee: parseInt(fee),
        };
        doc.associations.push(newAssoc);
      }
      return doc;
    });
    localStorage.setItem('doctors', JSON.stringify(updated));
    this.setState({ message: 'Hospital associated successfully!' });
  };

  render() {
    const { hospitals, selectedHospital, slots, fee, message } = this.state;

    return (
      <div>
        <DoctorNavbar />
        <div className="associate-container">
          <h2>Associate Hospital</h2>
          <form onSubmit={this.handleAssociation}>
            <select required value={selectedHospital} onChange={e => this.setState({ selectedHospital: e.target.value })}>
              <option value="">Select Hospital</option>
              {hospitals.map((h, i) => (
                <option key={i} value={h.name}>{h.name}</option>
              ))}
            </select>

            <label>Available Time Slots</label>
            {slots.map((slot, i) => (
              <input
                key={i}
                type="datetime-local"
                value={slot}
                onChange={e => this.handleSlotChange(i, e.target.value)}
                required
              />
            ))}
            <button type="button" onClick={this.addSlot}>+ Add Slot</button>

            <input
              type="number"
              placeholder="Consultation Fee"
              value={fee}
              onChange={e => this.setState({ fee: e.target.value })}
              required
            />
            <button type="submit">Associate</button>
          </form>
          {message && <p className="success">{message}</p>}
        </div>
      </div>
    );
  }
}

export default DoctorAssociation;
