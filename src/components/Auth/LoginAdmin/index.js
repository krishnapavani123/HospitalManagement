import  { Component } from 'react';
import './index.css';

class LoginAdmin extends Component {
  state = { username: '', password: '', error: '', success: '' };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value, error: '', success: '' });

  handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('activeUser', JSON.stringify({ role: 'admin' }));
      this.setState({ success: 'Admin logged in!' });
      setTimeout(() => (window.location.href = '/admin/dashboard'), 1000);
    } else {
      this.setState({ error: 'Invalid admin credentials' });
    }
  };

  render() {
    const { username, password, error, success } = this.state;
    return (
      <div className="login-container">
        <h2>Admin Login</h2>
        <form onSubmit={this.handleLogin}>
          <input type="text" name="username" value={username} onChange={this.handleChange} placeholder="Username" required />
          <input type="password" name="password" value={password} onChange={this.handleChange} placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}
      </div>
    );
  }
}

export default LoginAdmin;
