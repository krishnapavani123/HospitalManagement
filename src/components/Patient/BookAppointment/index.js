// File: src/components/Patient/BookAppointment.jsx
import React, { Component } from 'react';
import PatientNavbar from '../PatientNavbar';
import './index.css';

class BookAppointment extends Component {
  state = {
    doctors: [],
    selectedDoctor: null,
    selectedSlot: '',
    amount: '',
    successMessage: '',
    specializationFilter: '',
    hospitalFilter: ''
  };

  componentDidMount() {
    const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
    this.setState({ doctors });
  }

  filterDoctors = () => {
    const { doctors, specializationFilter, hospitalFilter } = this.state;
    return doctors.filter((doctor) =>
      doctor.associations.some((assoc) =>
        (!specializationFilter || doctor.specializations.includes(specializationFilter)) &&
        (!hospitalFilter || assoc.hospitalName === hospitalFilter)
      )
    );
  };

  selectDoctor = (doctor, assoc) => {
    this.setState({
      selectedDoctor: doctor,
      selectedAssoc: assoc,
      selectedSlot: '',
      amount: '',
      successMessage: ''
    });
  };

  handleBooking = (e) => {
    e.preventDefault();
    const { selectedDoctor, selectedAssoc, selectedSlot, amount } = this.state;

    const appointment = {
      doctorName: selectedDoctor.name,
      hospital: selectedAssoc.hospitalName,
      slot: selectedSlot,
      fee: amount
    };

    const history = JSON.parse(localStorage.getItem('appointments')) || [];
    history.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(history));

    // Update localStorage to remove booked slot
    const updatedDoctors = this.state.doctors.map((doc) => {
      if (doc.name === selectedDoctor.name) {
        return {
          ...doc,
          associations: doc.associations.map((assoc) =>
            assoc.hospitalName === selectedAssoc.hospitalName
              ? {
                  ...assoc,
                  availableSlots: assoc.availableSlots.filter((s) => s !== selectedSlot)
                }
              : assoc
          )
        };
      }
      return doc;
    });

    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
    this.setState({
      doctors: updatedDoctors,
      selectedDoctor: null,
      selectedAssoc: null,
      selectedSlot: '',
      amount: '',
      successMessage: `✅ Appointment booked with ${selectedDoctor.name} at ${selectedSlot}`
    });
  };

  render() {
    const {
      selectedDoctor,
      selectedAssoc,
      selectedSlot,
      amount,
      successMessage,
      specializationFilter,
      hospitalFilter
    } = this.state;

    const filteredDoctors = this.filterDoctors();

    return (
      <div>
        <PatientNavbar />
        <div className="appointment-wrapper">
          <h2>Book Appointment</h2>

          <div className="filters">
            <select
              value={specializationFilter}
              onChange={(e) => this.setState({ specializationFilter: e.target.value })}
            >
              <option value="">All Specializations</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Dermatology">Dermatology</option>
            </select>

            <select
              value={hospitalFilter}
              onChange={(e) => this.setState({ hospitalFilter: e.target.value })}
            >
              <option value="">All Hospitals</option>
              {(JSON.parse(localStorage.getItem('hospitals')) || []).map((h, i) => (
                <option key={i} value={h.name}>{h.name}</option>
              ))}
            </select>
          </div>

          <div className="doctor-list">
            {filteredDoctors.map((doctor, i) =>
              doctor.associations.map((assoc, j) => (
                <div key={`${i}-${j}`} className="doctor-card">
                  <h3>{doctor.name}</h3>
                  <p><strong>Specializations:</strong> {doctor.specializations.join(', ')}</p>
                  <p><strong>Hospital:</strong> {assoc.hospitalName}</p>
                  <p><strong>Fee:</strong> ₹{assoc.fee}</p>
                  <button onClick={() => this.selectDoctor(doctor, assoc)}>View Slots</button>
                </div>
              ))
            )}
          </div>

          {selectedDoctor && selectedAssoc && (
            <form className="booking-form" onSubmit={this.handleBooking}>
              <h3>Select Slot for {selectedDoctor.name}</h3>
              <select value={selectedSlot} onChange={(e) => this.setState({ selectedSlot: e.target.value })} required>
                <option value="">Choose slot</option>
                {selectedAssoc.availableSlots.map((slot, i) => (
                  <option key={i} value={slot}>{slot}</option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Enter consultation amount"
                value={amount}
                onChange={(e) => this.setState({ amount: e.target.value })}
                required
              />

              <button type="submit" className="submit-btn">Confirm Booking</button>
            </form>
          )}

          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
      </div>
    );
  }
}

export default BookAppointment;
