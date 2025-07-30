// File: src/components/Shared/Navbar.jsx
import  { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class Navbar extends Component {
  state = {
    isMenuOpen: false,
  };

  toggleMenu = () => {
    this.setState((prev) => ({ isMenuOpen: !prev.isMenuOpen }));
  };

  render() {
    const { isMenuOpen } = this.state;

    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <img
            src="https://i.pinimg.com/736x/1b/01/da/1b01daababe520b9430425a3ed6a75c9.jpg"
            alt="Logo"
            className="navbar-logo"
          />
        </div>

        <button className="menu-toggle" onClick={this.toggleMenu}>
          ☰
        </button>

        <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/register/hospital">Hospital</Link></li>
          <li><Link to="/register/doctor">Doctor</Link></li>
          <li><Link to="/register/patient">Patient</Link></li>
          <li><Link to="/bookappointment">Book</Link></li>

          <li><Link to="/dashboard/hospital">Admin</Link></li>
          <li><Link to="/dashboard/doctor">Doctor Dashboard</Link></li>
          <li><Link to="/history/patient">History</Link></li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
