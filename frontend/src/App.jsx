import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import VolunteerDashboard from './components/VolunteerDashboard';
import DonorDashboard from './components/DonorDashboard';
import AffectedDashboard from './components/AffectedDashboard';
import AuthChoicePage from './components/AuthChoicePage';

import { AuthProvider, AuthContext } from './contexts/AuthContext'; // ✅ named import

function AppRoutes() {
  const { user } = useContext(AuthContext);

  console.log('Logged-in user:', user);

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          user ? (
            <Navigate to={`/${user.role}/dashboard`} replace />
          ) : (
            <AuthChoicePage />
          )
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Direct Access Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
      <Route path="/donor/dashboard" element={<DonorDashboard />} />
      <Route path="/affected/dashboard" element={<AffectedDashboard />} />

      {/* Shared Dashboard (if needed) */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
