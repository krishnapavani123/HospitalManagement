// File: src/components/Shared/PatientNavbar.jsx
import { Link } from 'react-router-dom';
import './index.css';

const PatientNavbar = () => (
  <nav className="navbar">
    <div className="navbar-brand">🩺 Patient Portal</div>
    <ul className="navbar-links">
      <li><Link to="/book-appointment">Book Appointment</Link></li>
      <li><Link to="/patient-history">Patient History</Link></li>
      <li><Link to="/">Logout</Link></li>
    </ul>
  </nav>
);

export default PatientNavbar;
