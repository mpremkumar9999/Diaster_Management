// src/components/DashboardLayout.jsx
import React from 'react';
import Navbar from './Navbar'; // Import the Navbar component
import Footer from './Footer'; // Import the Footer component (optional)

const DashboardLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: 1, fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f4f4' }}>
        {children} {/* Render the children (dashboard content) here */}
      </div>
      <Footer /> {/* Optional footer */}
    </div>
  );
};

export default DashboardLayout;
