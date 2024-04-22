import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user details from backend
    axios.get('/api/users/profile')
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditClick = () => {
    setEditMode(true);
    setFormData({
      username: user.username,
      whatsappNumber: user.whatsappNumber,
      email: user.email || ''
    });
  };

  const handleSaveClick = () => {
    // Update user profile with formData
    axios.put('/api/users/profile', formData)
      .then(response => {
        setUser(response.data);
        setEditMode(false);
      })
      .catch(error => {
        console.error('Error updating user profile:', error);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dashboard-container">
      <h2>Profile Overview</h2>
      <div className="profile-overview">
        <img src={user.profilePicture} alt="Profile" />
        
        {editMode ? (
          <div className="edit-mode">
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Whatsapp Number:
              <input
                type="text"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Email:
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </label>

            <button onClick={handleSaveClick}>Save</button>
          </div>
        ) : (
          <div className="profile-details">
            <p>Username: {user.username}</p>
            <p>Whatsapp Number: {user.whatsappNumber}</p>
            {user.email && <p>Email: {user.email}</p>}
            <button onClick={handleEditClick}>Edit</button>
          </div>
        )}
      </div>

      <h2>Help & Support</h2>
      <div className="help-support">
        <button>FAQs</button>
        <button>Contact Support</button>
        <button>Report an Issue</button>
        <button>Feedback Form</button>
      </div>
    </div>
  );
};

export default Dashboard;
