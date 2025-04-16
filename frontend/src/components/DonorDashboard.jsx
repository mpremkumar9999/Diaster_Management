import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './css/DonorDashboard.css'; // Import the CSS file

function DonorDashboard() {
  const [selectedItem, setSelectedItem] = useState('food');
  const [quantity, setQuantity] = useState(1);
  const [donationHistory, setDonationHistory] = useState({
    food: 5,
    clothing: 3,
    medical: 2,
    monetary: 4
  });

  const handleDonate = () => {
    setDonationHistory(prev => ({
      ...prev,
      [selectedItem]: prev[selectedItem] + quantity
    }));
    alert(`Thank you for donating ${quantity} ${selectedItem} item(s)!`);
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>Donor Dashboard</h1>
          <p className="subtitle">Your generosity makes a world of difference</p>
        </header>

        <div className="dashboard-main">
          {/* Left Section - Donation Form */}
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
                    <input type="radio" name="delivery" defaultChecked /> 
                    <span>Drop-off</span>
                  </label>
                  <label>
                    <input type="radio" name="delivery" /> 
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

          {/* Right Section - Stats and History */}
          <div className="dashboard-section right-section">
            {/* Impact Stats */}
            <div className="card impact-card">
              <div className="card-header">
                <h2><span role="img" aria-label="impact">📈</span> Your Impact</h2>
              </div>
              <div className="impact-stats">
                <div className="stat">
                  <span className="stat-number">{donationHistory.food * 10}</span>
                  <span className="stat-label">Meals provided</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{donationHistory.clothing * 5}</span>
                  <span className="stat-label">People clothed</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{donationHistory.medical * 3}</span>
                  <span className="stat-label">Lives saved</span>
                </div>
              </div>
            </div>

            {/* Donation History */}
            <div className="card history-card">
              <div className="card-header">
                <h2><span role="img" aria-label="history">📋</span> Donation History</h2>
              </div>
              <div className="history-table">
                <div className="table-header">
                  <span>Type</span>
                  <span>Quantity</span>
                  <span>Date</span>
                </div>
                <div className="table-row">
                  <span>🍲 Food</span>
                  <span>{donationHistory.food}</span>
                  <span>Today</span>
                </div>
                <div className="table-row">
                  <span>👕 Clothing</span>
                  <span>{donationHistory.clothing}</span>
                  <span>This week</span>
                </div>
                <div className="table-row">
                  <span>🩹 Medical</span>
                  <span>{donationHistory.medical}</span>
                  <span>This month</span>
                </div>
                <div className="table-row">
                  <span>💰 Monetary</span>
                  <span>{donationHistory.monetary}</span>
                  <span>This year</span>
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