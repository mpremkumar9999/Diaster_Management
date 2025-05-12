import React, { useEffect, useState, useContext } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/api';
import './css/VolunteerDashboard.css'; // Ensure your CSS file is linked

function VolunteerDashboard() {
  const [availableTasks, setAvailableTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [stats, setStats] = useState({
    tasksCompleted: 0,
    hoursVolunteered: 0,
    peopleHelped: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('available');
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      fetchVolunteerData();
    }
  }, [token]);

  const fetchVolunteerData = async () => {
    try {
      setLoading(true);
      setError(null);

      const endpoints = [
        '/api/volunteer/available-tasks',
        '/api/volunteer/upcoming-tasks',
        '/api/volunteer/completed-tasks'
      ];

      const [availableRes, upcomingRes, completedRes] = await Promise.all(
        endpoints.map(endpoint =>
          api.get(endpoint, {
            headers: { Authorization: `Bearer ${token}` }
          })
        )
      );

      setAvailableTasks(availableRes.data?.tasks || []);
      setUpcomingTasks(upcomingRes.data?.tasks || []);
      setCompletedTasks(completedRes.data?.tasks || []);

      setStats({
        tasksCompleted: completedRes.data?.tasks?.length || 0,
        hoursVolunteered: completedRes.data?.totalHours || 0,
        peopleHelped: Math.floor((completedRes.data?.totalHours || 0) * 5)
      });

    } catch (error) {
      console.error('Error fetching volunteer data:', error);
      setError('Failed to load volunteer data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptTask = async (taskId) => {
    try {
      await api.post(
        '/api/volunteer/accept-task',
        { donationId: taskId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchVolunteerData();
      alert('Task accepted successfully!');
    } catch (error) {
      console.error('Error accepting task:', error);
      alert(error.response?.data?.error || 'Failed to accept task');
    }
  };

  const handleCompleteTask = async (taskId, hoursSpent = 2) => {
    try {
      await api.put(
        `/api/volunteer/complete-task/${taskId}`,
        { hoursSpent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchVolunteerData();
      alert('Task marked as completed successfully!');
    } catch (error) {
      console.error('Error completing task:', error);
      alert(error.response?.data?.error || 'Failed to complete task');
    }
  };

  const renderTaskCard = (task, isCompleted = false) => {
    if (!task) return null;

    const taskType = task.taskType || task.type || 'Task';
    const quantity = task.quantity || task.donationDetails?.quantity;
    const donor = task.donor || task.donationDetails?.userId || {};
    const isAssigned = upcomingTasks.some(t => t._id === task._id);

    return (
      <div key={task._id} className={`task-card elegant-card ${isCompleted ? 'completed' : ''}`}>
        <div className="task-header">
          <span className="task-category">{taskType}</span>
          <span className="task-time">
            <span role="img" aria-label="clock">⏱️</span>
            {task.hoursSpent ? `${task.hoursSpent} hrs` : 'Est. 2 hrs'}
          </span>
        </div>
        <h4 className="task-title">
          {isCompleted ? 'Completed' : isAssigned ? 'Assigned' : 'Available'}: <span className="highlight">{taskType}</span>
        </h4>

        {quantity && (
          <p className="task-description">
            <span role="img" aria-label="package">📦</span>
            Deliver {quantity} {taskType} items
          </p>
        )}

        <div className="task-details">
          {donor && (
            <div className="detail-item">
              <span role="img" aria-label="donor">👤</span>
              <span>{donor.username || 'Anonymous'}</span>
            </div>
          )}
          <div className="detail-item">
            <span role="img" aria-label="date">📅</span>
            <span>
              {isCompleted && task.completionDate
                ? new Date(task.completionDate).toLocaleDateString()
                : new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {!isCompleted && (
          <button
            className={activeTab === 'available' ? 'volunteer-button accept' : 'complete-button done'}
            onClick={() =>
              activeTab === 'available'
                ? handleAcceptTask(task._id)
                : handleCompleteTask(task._id)
            }
          >
            {activeTab === 'available' ? <><span role="img" aria-label="check">✅</span> Accept</> : <><span role="img" aria-label="flag">🚩</span> Complete</>}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>Volunteer Hub</h1>
          <p className="subtitle">Making a difference, one task at a time.</p>
        </header>

        <div className="dashboard-grid">
          <aside className="dashboard-sidebar">
            <div className="card elegant-card impact-card">
              <div className="card-header">
                <h2><span role="img" aria-label="impact">🌟</span> Your Impact</h2>
              </div>
              <div className="impact-stats">
                <div className="stat">
                  <span className="stat-number">{stats.tasksCompleted}</span>
                  <span className="stat-label">Tasks Done</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{stats.hoursVolunteered}</span>
                  <span className="stat-label">Hours Given</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{stats.peopleHelped}</span>
                  <span className="stat-label">Lives Touched</span>
                </div>
              </div>
            </div>

            <div className="card elegant-card navigation-card">
              <div className="card-header">
                <h2><span role="img" aria-label="tasks">Task Navigation</span></h2>
              </div>
              <div className="tabs-container">
                <button
                  className={`tab-button ${activeTab === 'available' ? 'active' : ''}`}
                  onClick={() => setActiveTab('available')}
                >
                  <span role="img" aria-label="open">🔓</span> Available
                </button>
                <button
                  className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
                  onClick={() => setActiveTab('upcoming')}
                >
                  <span role="img" aria-label="progress">⏳</span> Upcoming
                </button>
                <button
                  className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
                  onClick={() => setActiveTab('completed')}
                >
                  <span role="img" aria-label="done">✅</span> Completed
                </button>
              </div>
            </div>
          </aside>

          <main className="dashboard-main-content">
            <div className="card elegant-card task-list-card">
              <div className="card-header">
                <h2><span role="img" aria-label="list">📜</span> {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Tasks</h2>
              </div>
              <div className="tasks-grid scrollable-grid">
                {loading ? (
                  <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Fetching opportunities...</p>
                  </div>
                ) : error ? (
                  <div className="error-container">
                    <p className="error-message">{error}</p>
                    <button className="retry-button" onClick={fetchVolunteerData}>Try Again</button>
                  </div>
                ) : (
                  (activeTab === 'available' && availableTasks.length > 0 && availableTasks.map(renderTaskCard)) ||
                  (activeTab === 'upcoming' && upcomingTasks.length > 0 && upcomingTasks.map(renderTaskCard)) ||
                  (activeTab === 'completed' && completedTasks.length > 0 && completedTasks.map(task => renderTaskCard(task, true))) ||
                  <div className="empty-state">
                    <p><span role="img" aria-label="sad">😔</span> No tasks here yet.</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VolunteerDashboard;