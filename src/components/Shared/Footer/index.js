// File: src/components/Shared/Footer.jsx
import { Component } from 'react';
import './index.css';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <p>© {new Date().getFullYear()} HealthSync. All rights reserved.</p>
      </footer>
    );
  }
}

export default Footer;
