import React, { useEffect, useState } from 'react';
import './chat.css';
import SendMessage from './sendMessage';

function Chats({ 
  selectedUser, 
  contactsHistory, 
  selectMessages, 
  newMessage, 
  setNewMessage, 
  handleclicksend, 
  Online 
}) {
  const [messages, setMessages] = useState([]);

  // Update messages when selectMessages changes
  useEffect(() => {
    setMessages(selectMessages);
  }, [selectMessages]);

  // Render component
  return (
    <div className="entire-container">
      
      {/* Selected User Section */}
      <div className="selected-User">
        {selectedUser.username && (
          <>
            {selectedUser.profilepic && <img src={selectedUser.profilepic} className="profile-pix" alt="Profile" />}
            <h3>{selectedUser.username}</h3>
          </>
        )}
      </div>

      {/* Chat Container */}
      <div className="chat-container">
        
        {/* Chat Messages */}
        <div className="chat-messages">
          <div className='chatdiv' style={{ paddingLeft: '20px', overflow: 'auto' }}></div>
          
          {/* Combine and sort messages */}
          {messages.concat(contactsHistory)
            .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
            .map((message, index) => {

              if (selectedUser.length !== 0){ 
                //console.log('selected user', selectedUser)
              if ( message.sender === localStorage.userid) {
                // Render user's sent messages
                return renderUserMessage(message, index);
              } else {
                // Render received messages
                return renderReceivedMessage(message, index, contactsHistory);
              }
              }
            })}
        </div>

        {/* Send Message Component */}
        <SendMessage 
          setNewMessage={setNewMessage} 
          newMessage={newMessage} 
          handleclicksend={handleclicksend} 
        />
      </div>
    </div>
  );
}

// Render user's sent messages
const renderUserMessage = (message, index) => (
  <div key={index} className="user-message">
   
    <div className='message&timestamp'>
      <div className='message'>{message.content}</div>
      <div className='timestamp-doubleticks'>
        <div className='timestamp'>{message.timestamp}</div>
        <div className='doubleticks'></div>
        {message.status.read ? <p className='blueticks'>✓✓ </p> : <p className='grayticks'>✓✓ </p>}
      </div>
    </div>
  </div>
);

// Render received messages
const renderReceivedMessage = (message, index, contactsHistory) => {
  const contactUser = contactsHistory.find(user => user._id === message.sender);
  if (contactUser) {
    return (
      <div className='sender-message' key={message._id}>
        
        <div className='message'>{message.content}</div>
        <div className='timestamp'>{message.timestamp}</div>
      </div>
    );
  } else {
    return null;
  }
};

export default Chats;
