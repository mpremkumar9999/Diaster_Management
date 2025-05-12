import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard'; // Potentially a shared layout
import AdminDashboard from './components/AdminDashboard';
import VolunteerDashboard from './components/VolunteerDashboard';
import DonorDashboard from './components/DonorDashboard';
import AffectedDashboard from './components/AffectedDashboard';
import AuthChoicePage from './components/AuthChoicePage';
import AboutUs from './components/AboutUs'; // Import the AboutUs component
import Services from './components/Services'; // Import the Services component
import Contact from './components/Contact'; // Import the Contact component

import { AuthProvider, AuthContext } from './contexts/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to a forbidden page or a generic dashboard if role is not allowed
    return <Navigate to="/forbidden" replace />; // You'll need a Forbidden component
  }

  return children;
};

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
      <Route path="/forbidden" element={<div>Forbidden - You do not have access to this page.</div>} />

      {/* Public Static Pages */}
      <Route path="/about" element={<AboutUs />} /> {/* Add route for About Us */}
      <Route path="/services" element={<Services />} /> {/* Add route for Services */}
      <Route path="/contact" element={<Contact />} /> {/* Add route for Contact */}

      {/* Protected Dashboard Routes */}
      <Route
        path="/admin/dashboard/*" // Use /* for nested routes within the dashboard
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/volunteer/dashboard/*"
        element={
          <ProtectedRoute allowedRoles={['volunteer']}>
            <VolunteerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/donor/dashboard/*"
        element={
          <ProtectedRoute allowedRoles={['donor']}>
            <DonorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/affected/dashboard/*"
        element={
          <ProtectedRoute allowedRoles={['affected']}>
            <AffectedDashboard />
          </ProtectedRoute>
        }
      />

      {/* Remove the generic /dashboard route unless it serves a specific purpose */}
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
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