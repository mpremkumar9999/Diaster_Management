import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import './css/AffectedDashboard.css';

function AffectedDashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    type: 'food',
    description: '',
    urgency: 'medium',
    quantity: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/requests/history');
      setRequests(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await api.post('/api/requests', formData);
      setFormData({ type: 'food', description: '', urgency: 'medium', quantity: 1 });
      fetchRequests();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit request');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value
    }));
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>Affected Dashboard</h1>
          <p className="subtitle">Request the help you need. We are here for you.</p>
        </header>

        <div className="dashboard-main">
          {/* Left Section - Request Form */}
          <div className="dashboard-section left-section">
            <div className="card request-form">
              <div className="card-header">
                <h2><span role="img" aria-label="help">🆘</span> New Relief Request</h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Type:</label>
                  <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="food">🍲 Food</option>
                    <option value="clothing">👕 Clothing</option>
                    <option value="medical">🩹 Medical</option>
                    <option value="other">📦 Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Quantity:</label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Urgency:</label>
                  <select name="urgency" value={formData.urgency} onChange={handleChange}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Description:</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="submit-button" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>

                {error && <div className="error-message">{error}</div>}
              </form>
            </div>
          </div>

          {/* Right Section - Request History */}
          <div className="dashboard-section right-section">
            <div className="card history-card">
              <div className="card-header">
                <h2><span role="img" aria-label="history">📋</span> Request History</h2>
              </div>
              <div className="history-table">
                <div className="table-header">
                  <span>Type</span>
                  <span>Quantity</span>
                  <span>Urgency</span>
                  <span>Date</span>
                </div>
                {requests.map((request) => (
                  <div className="table-row" key={request._id}>
                    <span>{request.type.charAt(0).toUpperCase() + request.type.slice(1)}</span>
                    <span>{request.quantity}</span>
                    <span>{request.urgency}</span>
                    <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                  </div>
                ))}
                {requests.length === 0 && (
                  <div className="table-row">
                    <span colSpan="4">No requests submitted yet.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AffectedDashboard;
