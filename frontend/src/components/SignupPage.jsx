import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './css/SignupPage.css'; // Create this CSS file

function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'affected',
    district: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const districts = [
    { name: "Alluri Sitharama Raju", coordinates: [82.875, 17.333] },
    { name: "Anakapalli", coordinates: [83.008, 17.681] },
    { name: "Anantapur", coordinates: [77.430, 14.724] },
    { name: "Bapatla", coordinates: [80.467, 15.900] },
    { name: "Chittoor", coordinates: [79.100, 13.200] },
    { name: "Dr. B.R. Ambedkar Konaseema", coordinates: [81.800, 16.550] },
    { name: "East Godavari", coordinates: [81.900, 17.000] },
    { name: "Eluru", coordinates: [81.100, 16.700] },
    { name: "Guntur", coordinates: [80.450, 16.300] },
    { name: "Kadapa", coordinates: [78.823, 14.467] },
    { name: "Kakinada", coordinates: [82.238, 16.960] },
    { name: "Krishna", coordinates: [81.000, 16.500] },
    { name: "Kurnool", coordinates: [78.050, 15.830] },
    { name: "Manyam", coordinates: [82.550, 17.850] },
    { name: "Nandyal", coordinates: [78.483, 15.480] },
    { name: "NTR", coordinates: [80.650, 16.200] },
    { name: "Palnadu", coordinates: [80.083, 16.250] },
    { name: "Prakasam", coordinates: [80.100, 15.500] },
    { name: "Sri Potti Sriramulu Nellore", coordinates: [80.050, 14.450] },
    { name: "Srikakulam", coordinates: [83.900, 18.300] },
    { name: "Tirupati", coordinates: [79.420, 13.650] },
    { name: "Visakhapatnam", coordinates: [83.300, 17.700] },
    { name: "Vizianagaram", coordinates: [83.417, 18.117] },
    { name: "West Godavari", coordinates: [81.300, 16.900] }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedDistrict = districts.find(d => d.name === formData.district);
      const location = selectedDistrict ? {
        type: "Point",
        coordinates: selectedDistrict.coordinates
      } : null;

      const response = await api.post('/api/users/signup', {
        ...formData,
        location
      });

      console.log('Signup successful:', response);
      setSuccessMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-choice-container">
      {/* Wave animation background */}
      <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
      
      {/* Main content */}
      <div className="container">
        <div className="form-container signup-container">
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            
            <div className="input-box">
              <FontAwesomeIcon icon={faUser} className="icon" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="input-box">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="input-box">
              <FontAwesomeIcon icon={faLock} className="icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="input-box">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
              >
                <option value="">Select District</option>
                {districts.map(district => (
                  <option key={district.name} value={district.name}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="input-box">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="affected">Affected Individual</option>
                <option value="donor">Donor</option>
                <option value="volunteer">Volunteer</option>
              </select>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            
            <button type="submit" className="auth-button">Sign Up</button>
            
            <div className="text sign-in-text">
              Already have an account? <a href="/login">Sign in</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;