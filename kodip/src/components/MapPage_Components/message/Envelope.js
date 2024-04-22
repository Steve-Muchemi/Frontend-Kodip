import React, { memo, useEffect, useState, useRef } from 'react';
import Thirdrow from './Thirdrow.js';
import Contacts from './contacts.js';
import './messageapp.css';
import Chats from './chats.js';
//import {useSocketIO} from "../Socket_IO/socketIO";
import { useSocketContext } from '../../../hooks/useSocketContext.js';


function MessageApp() {
const { contactsHistory,onlineUsers, sendMessage, setMessages, messages, readnotification, selectedUser, setSelectedUser } = useSocketContext()


//console.log(onlineUsers, 'online users')

const [selectMessages, setSelectMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  
  const [userfrompin ,SetUserFromPin] = useState([])
 

// Get the viewport width and height
var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

// Log the viewport dimensions to the console
//console.log('Viewport Width: ' + viewportWidth);
//console.log('Viewport Height: ' + viewportHeight);


//console.log('how do messages look', messages)

  const handleclicksend = () => {
    //console.log('Before calling send function');


  console.log('selectedUser',selectedUser,'newMessage', newMessage);

  sendMessage(selectedUser, newMessage);


    
}

useEffect(() => {

  let newselectMessages = [];

if (selectedUser){
    messages.map((message)=> {
       
   if (message.receiver === selectedUser._id || message.sender === selectedUser._id){
    newselectMessages.push(message)
    }
       
           
      
    })
}
console.log('message and selected user', selectedUser, newselectMessages)
setSelectMessages(newselectMessages);
},[selectedUser, messages])


//console.log('profile pic from local storage', localStorage)

useEffect(()=>{
//console.log('All messages', messages, 'Select messages', selectMessages)
}, [selectMessages, messages])

//console.log('selected messages after clicking select', selectMessages) 

return (        
         

        <div className="message-app">
             {// This is the contacts column

            }
            <Contacts selectedUser = {selectedUser}  contactsHistory ={contactsHistory} setSelectedUser={setSelectedUser} Online = { onlineUsers } userfrompin = {userfrompin} messages={messages} setMessages={setMessages}
            readnotification={readnotification}
            />

            {// This is the messages column. Shows previous messages and messages being sent
            }
            <Chats selectedUser={selectedUser} contactsHistory ={contactsHistory} selectMessages={selectMessages} newMessage={newMessage} setNewMessage={setNewMessage} handleclicksend={handleclicksend}
            Online = { onlineUsers }
            />


            {// This is the selected users info. It shows the information about the user selected.
           /*
            <div > 
            <Thirdrow selectedUser = {selectedUser}/>             
                
            </div>
            */
 }
        </div>


);


}

export default memo(MessageApp);
