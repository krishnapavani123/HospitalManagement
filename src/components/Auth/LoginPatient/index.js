import  { Component } from 'react';
import './index.css';

class LoginPatient extends Component {
  state = { id: '', password: '', error: '', success: '' };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value, error: '', success: '' });

  handleLogin = (e) => {
    e.preventDefault();
    const { id, password } = this.state;
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const match = patients.find((p) => p.id === id && p.password === password);

    if (match) {
      localStorage.setItem('activeUser', JSON.stringify({ role: 'patient', id }));
      this.setState({ success: 'Logged in successfully!' });
      setTimeout(() => (window.location.href = '/patient/book'), 1000);
    } else {
      this.setState({ error: 'Invalid ID or password' });
    }
  };

  render() {
    const { id, password, error, success } = this.state;
    return (
      <div className="login-container">
        <h2>Patient Login</h2>
        <form onSubmit={this.handleLogin}>
          <input type="text" name="id" value={id} onChange={this.handleChange} placeholder="Patient ID" required />
          <input type="password" name="password" value={password} onChange={this.handleChange} placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}
      </div>
    );
  }
}

export default LoginPatient;
