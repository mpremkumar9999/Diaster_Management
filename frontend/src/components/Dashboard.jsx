import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext, useAuth } from "../contexts/AuthContext.jsx";
import AffectedDashboard from './AffectedDashboard';
import DonorDashboard from './DonorDashboard';
import VolunteerDashboard from './VolunteerDashboard';
import AdminDashboard from './AdminDashboard';


function Dashboard() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  switch (user.role) {
    case 'affected':
      return <AffectedDashboard />;
    case 'donor':
      return <DonorDashboard />;
    case 'volunteer':
      return <VolunteerDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <Navigate to="/login" />;
  }
}

export default Dashboard;