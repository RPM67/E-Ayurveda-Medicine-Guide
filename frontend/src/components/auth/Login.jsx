import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = ({ setUser, setIsAdmin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [authType, setAuthType] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (authType === 'signup') {
        const response = await axios.post('http://localhost:5000/api/users/signup', formData);
        setUser(response.data.user);
        setIsAdmin(false);
        navigate('/');
      } else if (authType === 'user') {
        const response = await axios.post('http://localhost:5000/api/users/login', {
          username: formData.username,
          password: formData.password
        });
        setUser(response.data.user);
        setIsAdmin(false);
        navigate('/');
      } else if (authType === 'admin') {
        const response = await axios.post('http://localhost:5000/api/admin/login', {
            username: formData.username,
            password: formData.password
        });
        if (response.data.message === 'Login successful') {
            setIsAdmin(true);
            setUser({ username: response.data.username });
            navigate('/dashboard'); // Changed from /admin to /dashboard
        }
    }
    } catch (error) {
      setError(error.response?.data?.error || 'Authentication failed');
    }
  };

  return (
    <div className="login-container">
      <div className="auth-options">
        <button 
          className={authType === 'user' ? 'active' : ''}
          onClick={() => setAuthType('user')}
        >
          User Login
        </button>
        <button 
          className={authType === 'admin' ? 'active' : ''}
          onClick={() => setAuthType('admin')}
        >
          Admin Login
        </button>
        <button 
          className={authType === 'signup' ? 'active' : ''}
          onClick={() => setAuthType('signup')}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <h2>
          {authType === 'signup' ? 'Create Account' : 
           authType === 'admin' ? 'Admin Login' : 'User Login'}
        </h2>
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required
          />
        </div>

        {authType === 'signup' && (
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
        )}

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
        </div>

        <button type="submit">
          {authType === 'signup' ? 'Sign Up' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;