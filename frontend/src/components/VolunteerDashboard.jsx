import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './css/VolunteerDashboard.css'; // Import the CSS file

function VolunteerDashboard() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [volunteeredHours, setVolunteeredHours] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('available');

  useEffect(() => {
    // Mock data for demonstration
    const mockTasks = [
      {
        id: 1,
        title: 'Community Garden Maintenance',
        location: 'Central Park, New York',
        time: '3:00',
        date: '2023-06-15',
        description: 'Help maintain the community garden by planting new flowers and weeding existing beds.',
        category: 'Environment'
      },
      {
        id: 2,
        title: 'Food Bank Assistance',
        location: 'Downtown Shelter, 123 Main St',
        time: '5:00',
        date: '2023-06-17',
        description: 'Assist in sorting and packaging food donations for distribution to those in need.',
        category: 'Hunger Relief'
      },
      {
        id: 3,
        title: 'Senior Companion Program',
        location: 'Golden Years Retirement Home',
        time: '2:00',
        date: '2023-06-20',
        description: 'Spend time with seniors, read books, play games, and provide companionship.',
        category: 'Elderly Care'
      },
    ];

    setTimeout(() => {
      setTasks(mockTasks);
      setLoading(false);
    }, 1000);
  }, []);

  const handleVolunteer = (taskId, taskTime) => {
    console.log('Volunteering for task:', taskId);
    setCompletedTasks((prev) => prev + 1);
    setVolunteeredHours((prev) => prev + parseInt(taskTime.split(':')[0], 10));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading volunteer opportunities...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h2>Welcome to Your Volunteer Dashboard</h2>
          <p className="subtitle">Make a difference in your community today</p>
        </header>

        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon">
              <span role="img" aria-label="completed tasks">✅</span>
            </div>
            <div className="stat-info">
              <h3>Tasks Completed</h3>
              <p className="stat-value">{completedTasks}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <span role="img" aria-label="volunteer hours">⏱️</span>
            </div>
            <div className="stat-info">
              <h3>Hours Volunteered</h3>
              <p className="stat-value">{volunteeredHours}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <span role="img" aria-label="impact">🌟</span>
            </div>
            <div className="stat-info">
              <h3>Community Impact</h3>
              <p className="stat-value">{completedTasks * 10} people helped</p>
            </div>
          </div>
        </div>

        <div className="tabs-container">
          <button
            className={`tab-button ${activeTab === 'available' ? 'active' : ''}`}
            onClick={() => setActiveTab('available')}
          >
            Available Tasks
          </button>
          <button
            className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Commitments
          </button>
          <button
            className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed Tasks
          </button>
        </div>

        <div className="tasks-section">
          <h3 className="section-title">
            {activeTab === 'available' ? 'Available Volunteer Opportunities' :
             activeTab === 'upcoming' ? 'Your Upcoming Commitments' : 'Your Completed Tasks'}
          </h3>

          {activeTab === 'available' && (
            <div className="tasks-grid">
              {tasks.map((task) => (
                <div key={task.id} className="task-card">
                  <div className="task-header">
                    <span className="task-category">{task.category}</span>
                    <span className="task-time">{task.time} hours</span>
                  </div>
                  <h4 className="task-title">{task.title}</h4>
                  <p className="task-description">{task.description}</p>
                  <div className="task-details">
                    <div className="detail-item">
                      <span role="img" aria-label="location">📍</span>
                      <span>{task.location}</span>
                    </div>
                    <div className="detail-item">
                      <span role="img" aria-label="date">📅</span>
                      <span>{task.date}</span>
                    </div>
                  </div>
                  <button
                    className="volunteer-button"
                    onClick={() => handleVolunteer(task.id, task.time)}
                  >
                    Volunteer Now
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'upcoming' && (
            <div className="empty-state">
              <p>You don't have any upcoming commitments yet.</p>
              <p>Browse available tasks to get started!</p>
            </div>
          )}

          {activeTab === 'completed' && completedTasks === 0 && (
            <div className="empty-state">
              <p>You haven't completed any tasks yet.</p>
              <p>Your completed tasks will appear here.</p>
            </div>
          )}

          {activeTab === 'completed' && completedTasks > 0 && (
            <div className="tasks-grid">
              {/* This would display completed tasks */}
              <div className="completed-message">
                <p>You've made a difference in your community!</p>
                <p>Thank you for your service.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VolunteerDashboard;