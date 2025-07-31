import { Component } from 'react';
import './index.css';

class LoginDoctor extends Component {
  state = { name: '', password: '', error: '', success: '' };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value, error: '', success: '' });

  handleLogin = (e) => {
    e.preventDefault();
    const { name, password } = this.state;
    const doctors = JSON.parse(localStorage.getItem('doctors') || '[]');
    const match = doctors.find((d) => d.name === name && d.password === password);

    if (match) {
      localStorage.setItem('activeUser', JSON.stringify({ role: 'doctor', name }));
      this.setState({ success: 'Logged in successfully!' });
      setTimeout(() => (window.location.href = '/doctor/dashboard'), 1000);
    } else {
      this.setState({ error: 'Invalid name or password' });
    }
  };

  render() {
    const { name, password, error, success } = this.state;
    return (
      <div className="login-container">
        <h2>Doctor Login</h2>
        <form onSubmit={this.handleLogin}>
          <input type="text" name="name" value={name} onChange={this.handleChange} placeholder="Doctor Name" required />
          <input type="password" name="password" value={password} onChange={this.handleChange} placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}
      </div>
    );
  }
}

export default LoginDoctor;
