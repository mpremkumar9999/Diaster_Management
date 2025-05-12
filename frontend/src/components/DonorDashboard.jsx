import React, { useState, useContext, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './css/DonorDashboard.css';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/api';

function DonorDashboard() {
  const [selectedItem, setSelectedItem] = useState('food');
  const [quantity, setQuantity] = useState(1);
  const [delivery, setDelivery] = useState('drop-off');
  const [donationHistory, setDonationHistory] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      fetchDonationHistory();
    }
  }, [token]);

  const fetchDonationHistory = async () => {
    try {
      const response = await api.get('/api/donations/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const sortedHistory = response.data.sort((a, b) => new Date(b.donationDate) - new Date(a.donationDate));
        setDonationHistory(sortedHistory);
      } else {
        console.error('Failed to fetch donation history');
      }
    } catch (error) {
      console.error('Error fetching donation history:', error);
    }
  };

  const handleDonate = async () => {
    if (!token) {
      alert('You must be logged in to donate.');
      return;
    }

    try {
      const response = await api.post(
        '/api/donations',
        {
          type: selectedItem,
          quantity: quantity,
          delivery: delivery,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert(`Thank you for donating ${quantity} ${selectedItem} item(s)!`);
        setQuantity(1);
        fetchDonationHistory();
      } else {
        alert('Failed to submit donation.');
      }
    } catch (error) {
      console.error('Error submitting donation:', error);
      alert('Failed to submit donation. Please try again.');
    }
  };

  const impactStats = donationHistory.reduce(
    (acc, donation) => {
      switch (donation.type) {
        case 'food':
          acc.food += donation.quantity;
          break;
        case 'clothing':
          acc.clothing += donation.quantity;
          break;
        case 'medical':
          acc.medical += donation.quantity;
          break;
        case 'monetary':
          acc.monetary += donation.quantity;
          break;
        default:
          break;
      }
      return acc;
    },
    { food: 0, clothing: 0, medical: 0, monetary: 0 }
  );

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>Donor Dashboard</h1>
          <p className="subtitle">Your generosity makes a world of difference</p>
        </header>

        <div className="dashboard-main">
          <div className="dashboard-section left-section">
            <div className="card donation-form">
              <div className="card-header">
                <h2><span role="img" aria-label="donate">💝</span> New Donation</h2>
              </div>
              <div className="form-group">
                <label htmlFor="donation-type">Donation Type:</label>
                <select
                  id="donation-type"
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                  className="form-select"
                >
                  <option value="food">🍲 Food Supplies</option>
                  <option value="clothing">👕 Clothing Items</option>
                  <option value="medical">🩹 Medical Equipment</option>
                  <option value="monetary">💰 Monetary Donation</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity/Amount:</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Delivery Method:</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="delivery"
                      value="drop-off"
                      checked={delivery === 'drop-off'}
                      onChange={(e) => setDelivery(e.target.value)}
                    />
                    <span>Drop-off</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="delivery"
                      value="pick-up"
                      onChange={(e) => setDelivery(e.target.value)}
                    />
                    <span>Pick-up</span>
                  </label>
                </div>
              </div>
              <button
                onClick={handleDonate}
                className="donate-button"
              >
                <span role="img" aria-label="donate">✨</span> Submit Donation
              </button>
            </div>
          </div>

          <div className="dashboard-section right-section">
            <div className="card impact-card">
              <div className="card-header">
                <h2><span role="img" aria-label="impact">📈</span> Your Impact</h2>
              </div>
              <div className="impact-stats">
                <div className="stat">
                  <span className="stat-number">{impactStats.food * 1}</span>
                  <span className="stat-label">Meals provided</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{impactStats.clothing * 1}</span>
                  <span className="stat-label">People clothed</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{impactStats.medical * 1}</span>
                  <span className="stat-label">Lives saved</span>
                </div>
              </div>
            </div>

            <div className="card history-card">
              <div className="card-header">
                <h2><span role="img" aria-label="history">📋</span> Donation History</h2>
              </div>
              <div className="history-table-scrollable"> {/* Added this div */}
                <div className="history-table">
                  <div className="table-header">
                    <span>Type</span>
                    <span>Quantity</span>
                    <span>Date</span>
                  </div>
                  {donationHistory.map((donation) => (
                    <div className="table-row" key={donation._id}>
                      <span>{donation.type.charAt(0).toUpperCase() + donation.type.slice(1)}</span>
                      <span>{donation.quantity}</span>
                      <span>{new Date(donation.donationDate).toLocaleDateString()}</span>
                    </div>
                  ))}
                  {donationHistory.length === 0 && (
                    <div className="table-row">
                      <span colSpan="3">No donation history yet.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DonorDashboard;