import React, { useState, useEffect } from 'react';
import './ProfileForm.css'; // Import CSS file for styling
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ProfileForm = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    profilePic: '', // Default profile picture
  });

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Fetch user details from the API
    const fetchUserDetails = async () => {
      try {
        const userId = localStorage.userid;
        const response = await axios.get(`http://localhost:3002/api/user/${userId}`);
        const user = response.data.user;
        setUserData({
          name: user.username || '',
          email: user.email || '',
          phoneNumber: user.phoneNumber || '',
          profilePic: user.profilepic || '', // Default profile picture
        });
       // console.log('User details:', user);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    setUserData({ ...userData, profilePic: URL.createObjectURL(file) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userid');
      await axios.post(`http://localhost:3002/api/user/update`, {
        userId: userId,
        username: userData.name,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        profilePic: userData.profilePic,
        password: password,
      });
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseEnter = () => {
    setShowPrompt(true);
  };

  const handleMouseLeave = () => {
    setShowPrompt(false);
  };

  const handleClickProfilePic = () => {
    document.getElementById('profilePicInput').click();
  };

  return (
    
    
    <div className="profile-form-container">
      
      <form className='profile-form' onSubmit={handleSubmit}>
        <div className="profilepic-name">
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative' }}
          >
            <img
              src={localStorage.profilepic}
              alt="Profile"
              className="profile-pic-preview"
              style={{ height: '100px', width: '100px', borderRadius: '50%', margin: '20px', cursor: 'pointer' }}
              onClick={handleClickProfilePic}
            />
            {console.log('localstorageprofilepic', userData.profilepic)}
            {showPrompt && (
              <div className='changepic'>
                <p>Change <FontAwesomeIcon icon={faPencil} className= 'changepic-icon' /></p>
              </div>
            )}
          </div>

          <input type="file" id="profilePicInput" accept="image/*" onChange={handleProfilePicUpload} style={{ display: 'none' }} />
          <input type="text" id="name" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
        </div>
        
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="tel" id="phoneNumber" value={userData.phoneNumber} onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="toggle-password-icon"
              onClick={togglePasswordVisibility}
            />
          </div>
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
    
  );
};

export default ProfileForm;
