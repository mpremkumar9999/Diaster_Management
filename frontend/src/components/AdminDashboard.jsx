import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import DashboardLayout from './DashboardLayout';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import './css/AdminDashboard.css';

const AdminDashboard = () => {
    const { token, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const apiKey = "2d4af8986ab10d395f483e387301f009";
    const districts = [
        "Anantapur", "Chittoor", "East Godavari", "Guntur", "Kadapa", "Krishna",
        "Kurnool", "Nellore", "West Godavari", "Prakasam", "Srikakulam",
        "Visakhapatnam", "Vizianagaram", "Rayalaseema", "Amaravati",
        "Vijayawada", "Tirupati", "Nandyal"
    ];

    const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);
    const [weatherData, setWeatherData] = useState(null);
    const [loadingWeather, setLoadingWeather] = useState(false);
    const [errorWeather, setErrorWeather] = useState(null);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSentStatus, setAlertSentStatus] = useState(null);
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [errorUsers, setErrorUsers] = useState(null);

    useEffect(() => {
        if (!token || user?.role !== 'admin') {
            navigate('/login');
        } else {
            fetchUsers();
        }
    }, [token, user, navigate]);

    useEffect(() => {
        if (selectedDistrict) {
            fetchWeatherData(selectedDistrict);
        }
    }, [selectedDistrict]);

    const fetchWeatherData = async (district) => {
        setLoadingWeather(true);
        setErrorWeather(null);
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${district},IN&appid=${apiKey}&units=metric`
            );
            const data = await response.json();
            setWeatherData({
                temperature: data.main.temp,
                description: data.weather[0].description,
                iconCode: data.weather[0].icon,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                pressure: data.main.pressure,
                district: district,
            });
        } catch (err) {
            setErrorWeather("Failed to fetch weather data");
            console.error(err);
        } finally {
            setLoadingWeather(false);
        }
    };

    const handleSendAlert = async () => {
        if (!alertMessage.trim()) {
            setAlertSentStatus({ success: false, message: "Please enter an alert message" });
            return;
        }

        try {
            setAlertSentStatus({ success: null, message: "Sending alert..." });
            await api.post('/api/alerts/send-district', {
                district: selectedDistrict,
                message: alertMessage,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAlertSentStatus({ success: true, message: `Alert sent to ${selectedDistrict}` });
            setAlertMessage("");
        } catch (error) {
            setAlertSentStatus({ success: false, message: "Failed to send alert" });
            console.error(error);
        }
    };

    const fetchUsers = async () => {
        setLoadingUsers(true);
        setErrorUsers(null);
        try {
            const response = await api.get('/api/users', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Fetch users error:", error.response?.data || error.message);
            setErrorUsers("Failed to fetch user data");
            
            console.error(error);
        } finally {
            setLoadingUsers(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="admin-dashboard">
                {/* Header */}
                <header className="dashboard-header">
                    <div className="header-content">
                        <div className="logo-container">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/3/37/Emblem_of_Andhra_Pradesh.svg"
                                alt="AP Logo"
                                className="logo"
                            />
                            <h1>Andhra Pradesh Disaster Management</h1>
                        </div>
                        <div className="user-info">
                            <span className="welcome">Welcome, {user?.username}</span>
                            <span className="role-badge">{user?.role}</span>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="dashboard-content">
                    <section className="weather-section">
                        <h2>Weather Information</h2>
                        <div className="district-selector">
                            <label htmlFor="district-select">Select District:</label>
                            <select
                                id="district-select"
                                value={selectedDistrict}
                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                className="district-dropdown"
                            >
                                {districts.map(district => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>
                        </div>

                        {loadingWeather && <div className="loading-spinner"></div>}
                        {errorWeather && <div className="error-message">{errorWeather}</div>}

                        {weatherData && (
                            <div className="weather-card">
                                <div className="weather-header">
                                    <h3>{weatherData.district}</h3>
                                    <img
                                        src={`http://openweathermap.org/img/wn/${weatherData.iconCode}@2x.png`}
                                        alt="Weather icon"
                                        className="weather-icon"
                                    />
                                </div>
                                <div className="weather-details">
                                    <div className="weather-item">
                                        <span className="weather-label">Temperature:</span>
                                        <span className="weather-value">{weatherData.temperature}°C</span>
                                    </div>
                                    <div className="weather-item">
                                        <span className="weather-label">Condition:</span>
                                        <span className="weather-value">
                                            {weatherData.description.charAt(0).toUpperCase() + weatherData.description.slice(1)}
                                        </span>
                                    </div>
                                    <div className="weather-item">
                                        <span className="weather-label">Humidity:</span>
                                        <span className="weather-value">{weatherData.humidity}%</span>
                                    </div>
                                    <div className="weather-item">
                                        <span className="weather-label">Wind Speed:</span>
                                        <span className="weather-value">{weatherData.windSpeed} m/s</span>
                                    </div>
                                    <div className="weather-item">
                                        <span className="weather-label">Pressure:</span>
                                        <span className="weather-value">{weatherData.pressure} hPa</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>

                    <section className="alert-section">
                        <h2>Send Emergency Alert</h2>
                        <div className="alert-form">
                            <div className="alert-district">
                                <span>District: </span>
                                <span className="district-name">{selectedDistrict}</span>
                            </div>
                            <textarea
                                className="alert-textarea"
                                placeholder="Enter emergency alert message..."
                                value={alertMessage}
                                onChange={(e) => setAlertMessage(e.target.value)}
                                rows="4"
                            />
                            <button
                                className="alert-button"
                                onClick={handleSendAlert}
                                disabled={!alertMessage.trim()}
                            >
                                Send Alert
                            </button>
                            {alertSentStatus && (
                                <div className={`alert-status ${alertSentStatus.success ? 'success' : 'error'}`}>
                                    {alertSentStatus.message}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* User Management Section */}
                    <section className="user-management-section">
                        <h2>User Management</h2>

                        {loadingUsers && <div className="loading-spinner"></div>}
                        {errorUsers && <div className="error-message">{errorUsers}</div>}

                        {users.length > 0 && (
                            <div className="user-table-container">
                                <table className="user-table">
                                    <thead>
                                        <tr>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>District</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(user => (
                                            <tr key={user._id}>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td>{user.role}</td>
                                                <td>{user.district}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {users.length === 0 && !loadingUsers && !errorUsers && (
                            <div className="no-data-message">No users found.</div>
                        )}
                    </section>
                </main>

                {/* Footer */}
                <footer className="dashboard-footer">
                    <p>© {new Date().getFullYear()} Andhra Pradesh Disaster Management System</p>
                    <p className="api-credit">Weather data provided by OpenWeatherMap</p>
                </footer>
            </div>
        </DashboardLayout>
    );
};

export default AdminDashboard;