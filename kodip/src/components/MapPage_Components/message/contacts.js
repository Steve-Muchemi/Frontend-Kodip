import React, { useEffect, useState } from 'react';
import './contacts.css';
import ContactItem from './contactItem';

import { useSocketContext } from '../../../hooks/useSocketContext';


/**
 * Todo: Rewrite this entire code to make it maintenable 
 * @param {*} param0 
 * @returns 
 */


function Contacts() {
const { usersmatching, searchForUser ,contactsHistory,onlineUsers, sendMessage, setMessages, messages, readnotification, selectedUser, setSelectedUser } = useSocketContext()
const [unreadMessages, setUnreadMessages] = useState([]);

 //sets unread messages when the message variable changes
  useEffect(() => {
    let newUnreadMessages = messages  
    .filter(message => message.status.read === false)
      .map(message => ({ message, userId: message.sender }));

    setUnreadMessages(newUnreadMessages);
  }, [messages]);

  //console.log('unread messages after before a use is selected', unreadMessages);

  //when a particular user is selected then it means their message is read so update the status of the message
  useEffect(() => {
    if (selectedUser) {
      //select the selectedusers messages and update them in the unreadmessages
      setUnreadMessages(prevUnreadMessages =>
        prevUnreadMessages.map(message =>
          message.userId === selectedUser.userid ? { ...message, status: { received: true, read: true } } : message
        )
      );

     // console.log('unread messages after selected user', unreadMessages);

      // updatereplace the read messages in messages
      //select the selectedusers messages and update them in the messages
      setMessages( messages => {
        return  messages.map(message => message.sender === selectedUser.userid ? { ...message, status: { received: true, read: true } } : message )
    })


      // Communicate to the server that all unread messages from the selected user have been read
      const selectedUserMessages = unreadMessages.filter(message => message.userId === selectedUser.userid);

      selectedUserMessages.forEach(message => readnotification(message.message));

      // Update the unread count in the state
      setUnreadMessages(prevUnreadMessages => 
        prevUnreadMessages.filter(message => message.userId !== selectedUser.userid)
      );
      //console.log('unread messages after selected user and after updating', unreadMessages,'and now messages', messages);
    }
  }, [selectedUser]);

 

  const getContactsWithUnreadMessages = () => {
    
//console.log('usersmatching', usersmatching)
let contactsHistory2 = [];
    if (usersmatching ){ contactsHistory2 = [ ...contactsHistory, ...usersmatching]}
//console.log('contactHistory on getconta', contactsHistory2)
    return contactsHistory2.map(user => {


      if (user.length !== 0){   

        //console.log('contactHistory user', user)
      const userUnreadMessages = unreadMessages.filter(message => message.userId === user._userid);
      const unreadCount = userUnreadMessages.length;
      const latestMessage = userUnreadMessages[unreadCount - 1]?.content;

      const latestMessageSnippet = latestMessage ? `${latestMessage.content}` : null;
      const torender = { ...user, unreadCount, latestMessageSnippet }
      //console.log('torender', torender)
      return torender;
    }
    });
  };

  const sortedContacts = getContactsWithUnreadMessages().sort((a, b) => (b.unreadCount ? 1 : 0) - (a.unreadCount ? 1 : 0));
 //console.log('sortedcontatcs', sortedContacts)


//console.log(typeof(searchForUser), 'what is search fo user')





  return (
< div className="entire-contacts">

<div className="search">

<div className="notifications">
Inbox  {unreadMessages.count > 0 && <div className="notification-badge">{unreadMessages.count}</div>}
</div>

<div >
        <input
          type="text"
          placeholder=" 🔍  Search..."
          className="search_contacts"
          onChange={(e) => searchForUser(e.target.value)}
        />
</div>


</div>
    
    <div className="contacts">
      <div>
                        
        <ul id="contact-list">
          {sortedContacts.map(user => (
            
            <ContactItem 
              key={user.email}
              user={user}
              onClick={setSelectedUser}
              unreadCount={user.unreadCount}
              latestMessageSnippet={user.latestMessageSnippet}
            />
          ))}
        </ul>
      </div>
    </div>
 </div>
  );
}

export default Contacts;
