// src/components/AffectedDashboard.js
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function AffectedDashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f4faff' }}>
      <Navbar />
      <div style={{ 
        flex: 1, 
        fontFamily: 'Arial, sans-serif', 
        padding: '20px', 
        backgroundColor: '#ffffff', 
        borderRadius: '8px', 
        margin: '20px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
      }}>
        <h2 style={{ 
          color: '#1b3a57', 
          marginBottom: '20px', 
          borderBottom: '2px solid #63b3ed', 
          paddingBottom: '10px' 
        }}>
          Affected Dashboard
        </h2>
        <div style={{ 
          backgroundColor: '#e6f2ff', 
          padding: '20px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', 
          marginBottom: '20px' 
        }}>
          <h3 style={{ 
            marginBottom: '15px', 
            color: '#0f62fe', 
            fontWeight: '600' 
          }}>
            Your Needs
          </h3>
          <p style={{ color: '#333' }}>Food: <span style={{ fontWeight: 'bold' }}>Requested</span></p>
          <p style={{ color: '#333' }}>Shelter: <span style={{ fontWeight: 'bold' }}>Provided</span></p>
          <p style={{ color: '#333' }}>Medical Aid: <span style={{ fontWeight: 'bold' }}>Pending</span></p>
        </div>
        <div style={{ 
          backgroundColor: '#f0f9ff', 
          padding: '20px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' 
        }}>
          <h3 style={{ 
            marginBottom: '15px', 
            color: '#007bff', 
            fontWeight: '600' 
          }}>
            Available Resources
          </h3>
          <p style={{ color: '#333' }}>Nearest Shelter: <span style={{ fontWeight: 'bold' }}>Community Center</span></p>
          <p style={{ color: '#333' }}>Food Distribution: <span style={{ fontWeight: 'bold' }}>City Hall</span></p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AffectedDashboard;
