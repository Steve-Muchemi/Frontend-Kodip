import React from 'react';
import './chat.css';

const ContactItem = ({ user, onClick, unreadCount, latestMessageSnippet }) => {
  //console.log('user??', user); // Move console.log to the function body if needed

  return (
    <li onClick={() => onClick(user)}>
      <div className={`contact-item ${unreadCount > 0 ? 'has-unread' : ''}`}>
        <div className="contact-details">
          <img src={user.profilepic} alt={user.username} className="profile-pix" /> {/* Added alt attribute */}
          <div className="info">
            <div className="name">
              <h4>{user.username}</h4>
              {unreadCount > 0 && <div className="notification-badge">{unreadCount}</div>}
            </div>
            {latestMessageSnippet && <p className="latest-message">{latestMessageSnippet}</p>}
          </div>
        </div>
      </div>
    </li>
  );
};

export default ContactItem;
