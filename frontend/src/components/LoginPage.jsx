import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import './css/login.css';
import frontImg from './pictures/frontImg.jpg';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/api/users/login', { username, password });
      const responseData = response.data;

      if (responseData.token && responseData.user) {
        login(responseData.token, responseData.user);
        localStorage.setItem('userDistrict', responseData.user.district);

        // ✅ Navigate to correct route matching defined dashboard paths
        switch (responseData.user.role) {
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'volunteer':
            navigate('/volunteer/dashboard');
            break;
          case 'donor':
            navigate('/donor/dashboard');
            break;
          case 'affected':
            navigate('/affected/dashboard');
            break;
          default:
            navigate('/dashboard');
        }
      } else {
        setError('Invalid login credentials. Token or user data missing.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid username or password');
    }
  };

  return (
    <div className="container">
      <div className="cover">
        <div className="front">
          <img src={frontImg} alt="Welcome" />
          <div className="text">
            <span className="text-1">Every new friend is a <br /> new adventure</span>
            <span className="text-2">Let's get connected</span>
          </div>
        </div>
      </div>
      <div className="forms">
        <div className="form-content">
          <div className="login-form">
            <div className="title">Login</div>
            <form onSubmit={handleLoginSubmit}>
              <div className="input-boxes">
                {error && <div className="error-message">{error}</div>}
                <div className="input-box">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text"><a href="#">Forgot password?</a></div>
                <div className="button input-box">
                  <input type="submit" value="Submit" />
                </div>
                <div className="text sign-up-text">
                  Don't have an account?{' '}
                  <a href="/signup" className="signup-link">
                    Signup now
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default LoginPage;
