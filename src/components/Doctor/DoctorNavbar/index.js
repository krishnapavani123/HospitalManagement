// File: src/components/Doctor/DoctorNavbar.jsx
import { Link } from 'react-router-dom';
import './index.css';

const DoctorNavbar = () => (
  <nav className="doctor-navbar">
    <ul>
      <li><Link to="/doctor/associate">Doctor Association</Link></li>
      <li><Link to="/dashboard/doctor">Doctor Dashboard</Link></li>
      <li><Link to="/">Logout</Link></li>
    </ul>
  </nav>
);

export default DoctorNavbar;
