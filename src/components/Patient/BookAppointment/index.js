// File: src/components/Patient/BookAppointment.jsx
import { Component } from 'react';
import './index.css';

class BookAppointment extends Component {
  state = {
    doctors: [
      {
        id: 1,
        name: 'Dr. Anjali Rao',
        specialization: 'Cardiology',
        hospital: 'Apollo',
        availableSlots: ['2025-08-01 10:00', '2025-08-01 14:00'],
        fee: 700,
      },
      {
        id: 2,
        name: 'Dr. Vinay Mehta',
        specialization: 'Pediatrics',
        hospital: 'Yashoda',
        availableSlots: ['2025-08-01 09:00', '2025-08-01 11:30'],
        fee: 500,
      },
    ],
    selectedSpecialization: '',
    selectedHospital: '',
    selectedDoctor: null,
    selectedSlot: '',
    amount: '',
    successMessage: '',
  };

  handleFilterChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      selectedDoctor: null,
      selectedSlot: '',
      amount: '',
      successMessage: '',
    });
  };

  selectDoctor = (doctor) => {
    this.setState({
      selectedDoctor: doctor,
      selectedSlot: '',
      amount: '',
      successMessage: '',
    });
  };

  handleSlotChange = (e) => {
    this.setState({ selectedSlot: e.target.value });
  };

  handleAmountChange = (e) => {
    this.setState({ amount: e.target.value });
  };

  handleBooking = (e) => {
    e.preventDefault();
    const { selectedDoctor, selectedSlot, amount } = this.state;

    const updatedDoctors = this.state.doctors.map((doc) =>
      doc.id === selectedDoctor.id
        ? {
            ...doc,
            availableSlots: doc.availableSlots.filter((slot) => slot !== selectedSlot),
          }
        : doc
    );

    const newBooking = {
      doctor: selectedDoctor.name,
      hospital: selectedDoctor.hospital,
      slot: selectedSlot,
      fee: amount,
    };

    const history = JSON.parse(localStorage.getItem('appointments') || '[]');
    history.push(newBooking);
    localStorage.setItem('appointments', JSON.stringify(history));

    this.setState({
      doctors: updatedDoctors,
      selectedDoctor: null,
      selectedSlot: '',
      amount: '',
      successMessage: `✅ Appointment booked with ${selectedDoctor.name} at ${selectedSlot}`,
    });
  };

  render() {
    const {
      doctors,
      selectedSpecialization,
      selectedHospital,
      selectedDoctor,
      selectedSlot,
      amount,
      successMessage,
    } = this.state;

    const filteredDoctors = doctors.filter(
      (doc) =>
        (selectedSpecialization === '' || doc.specialization === selectedSpecialization) &&
        (selectedHospital === '' || doc.hospital === selectedHospital)
    );

    return (
      <div className="appointment-wrapper">
        <h2 className="appointment-heading">Book Your Appointment</h2>

        <div className="filters">
          <select name="selectedSpecialization" value={selectedSpecialization} onChange={this.handleFilterChange}>
            <option value="">All Specializations</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Pediatrics">Pediatrics</option>
          </select>

          <select name="selectedHospital" value={selectedHospital} onChange={this.handleFilterChange}>
            <option value="">All Hospitals</option>
            <option value="Apollo">Apollo</option>
            <option value="Yashoda">Yashoda</option>
          </select>
        </div>

        <div className="doctor-list">
          {filteredDoctors.length === 0 && <p className="no-doctors">No doctors available for selected filters.</p>}
          {filteredDoctors.map((doc) => (
            <div className="doctor-card" key={doc.id}>
              <h3>{doc.name}</h3>
              <p><strong>Specialization:</strong> {doc.specialization}</p>
              <p><strong>Hospital:</strong> {doc.hospital}</p>
              <p><strong>Fee:</strong> ₹{doc.fee}</p>
              <button onClick={() => this.selectDoctor(doc)}>View Slots</button>
            </div>
          ))}
        </div>

        {selectedDoctor && (
          <form className="booking-form" onSubmit={this.handleBooking}>
            <h3>Select Slot for {selectedDoctor.name}</h3>
            <select value={selectedSlot} onChange={this.handleSlotChange} required>
              <option value="">Choose time slot</option>
              {selectedDoctor.availableSlots.map((slot, idx) => (
                <option key={idx} value={slot}>{slot}</option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Enter consultation amount"
              value={amount}
              onChange={this.handleAmountChange}
              min="0"
              required
            />

            <button type="submit" className="submit-btn">Confirm Booking</button>
          </form>
        )}

        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    );
  }
}

export default BookAppointment;
