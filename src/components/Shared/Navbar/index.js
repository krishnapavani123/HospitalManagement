import { Link } from 'react-router-dom';
import './index.css';

const Navbar = ({ role, logout }) => {
  return (
    <nav className="navbar">
      <img
        src="https://i.pinimg.com/736x/f2/75/56/f275568548f963f2d178be9dcd187da7.jpg"
        alt="HealthCare Logo"
        className="navbar-logo-img"
      />
      <ul className="navbar-links">
        {role === 'patient' && (
          <>
            <li><Link to="/patient/book">Book</Link></li>
            <li><Link to="/patient/history">History</Link></li>
          </>
        )}
        {role === 'doctor' && (
          <>
            <li><Link to="/doctor/dashboard">Appointments</Link></li>
          </>
        )}
        {role === 'admin' && (
          <>
            <li><Link to="/admin/register-hospital">Register Hospital</Link></li>
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
          </>
        )}
        {role && <li><button onClick={logout}>Logout</button></li>}
      </ul>
    </nav>
  );
};

export default Navbar;
