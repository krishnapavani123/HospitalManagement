import React from 'react';
import './index.css';

const ViewDoctors = ({ doctors }) => {
  if (!doctors || doctors.length === 0) {
    return <p>No doctors registered yet.</p>;
  }

  return (
    <div className="doctor-list">
      <h2 className="form-title">Registered Doctors</h2>
      {doctors.map((doc, idx) => (
        <div key={idx} className="doctor-card">
          <h3>{doc.name}</h3>
          <p><strong>Qualifications:</strong> {doc.qualifications}</p>
          <p><strong>Experience:</strong> {doc.experience} years</p>
          <p><strong>Specializations:</strong> {doc.specializations.join(', ')}</p>
          {doc.associations.map((assoc, i) => (
            <div key={i} className="assoc-box">
              <p><strong>Hospital:</strong> {assoc.hospitalName}</p>
              <p><strong>Departments:</strong> {assoc.matchedDepartments.join(', ')}</p>
              <p><strong>Consultation Fee:</strong> ₹{assoc.fee}</p>
              <p><strong>Available Slots:</strong> {assoc.availableSlots.join(', ')}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ViewDoctors;
