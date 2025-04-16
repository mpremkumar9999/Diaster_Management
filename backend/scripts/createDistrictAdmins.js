// src/components/LoginPage.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import AuthContext from '../contexts/AuthContext';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', { username, password });
      login(response.data.token, response.data.user);

      // --- Debugging additions ---
      console.log("Login API Response:", response);
      console.log("User Data:", response.data.user);

      // Assuming your API response has the district in response.data.user.district
      localStorage.setItem('userDistrict', response.data.user.district);

      // --- Debugging additions ---
      console.log("District stored in localStorage:", localStorage.getItem('userDistrict'));

      if (response.data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (response.data.user.role === 'volunteer') {
        navigate('/volunteer');
      } else if (response.data.user.role === 'donor') {
        navigate('/donor');
      } else {
        navigate('/affected');
      }

    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f4f4f4', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h2 style={{ color: '#333', marginBottom: '20px', fontSize: '2em' }}>Login</h2>
      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1em' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1em' }}
        />
        <button type="submit" style={{ padding: '12px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1em', transition: 'background-color 0.3s ease' }} onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'} onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;