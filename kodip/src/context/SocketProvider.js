
import React, { useRef, memo, createContext, useContext, useEffect, useState } from 'react';

import socket from './socket.js';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from './AuthProvider.js';

export const SocketContext = createContext();


export const SocketProvider = ({children}) =>{
    const [messages, setMessages] = useState([]);
    //const [newMessage, setNewMessage] = useState('');
    const [userName, setUserName] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [contactsHistory, setContactsHistory] = useState([]); //users with a chat history with a particular user
    const [email, setEmail] = useState('');
    const [password, setPassword] =useState('');
    const [openEnvelope, setOpenEnvelope ] = useState(false);
    const [usersmatching, setUsersMatching] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);
    const [isMessageModalOpen, setMessageModalOpen] = useState(false);
    const [userfrompin ,SetUserFromPin] = useState([])
    const [login, setLogin] = useState(false);
    const isFirstMount = useRef(true);




useEffect(()=>{ 
  
 
    socket.on('connect', () => {

      console.log('Socket connected');
      console.log('is this page running?', localStorage, login)
        
        if(login){ 
          const userobj = {
            email: localStorage.email,
            username: localStorage.username,
            userid: localStorage.userid,
            profilepic: localStorage.profilepic,
          };
       
         socket.emit('user login', userobj);
          console.log("sent login details", userobj)
        }
       
        });
      
      },[])

socket.on('online users', (users) => {
  setOnlineUsers(users);
 //console.log('online users recieved', users)
  });


  socket.on('contactsHistory', (contactsHistory) => {
    // Check if contactsHistory is an object and not null or undefined
    if (typeof contactsHistory === 'object' && contactsHistory !== null) {
        //console.log('contactHistory received', contactsHistory);
        // Handle contactsHistory as an object here
        //const filteredContacts = contactsHistory.filter(contact=>contact !== null)
        setContactsHistory(contactsHistory);
    } else {
        console.warn('contactsHistory is not an object or is null/undefined:', contactsHistory);
    }
});





socket.on('chatHistory', (messages)=>{
    setMessages([...messages])
    //console.log('chatHistory', messages)
   

  })



    // Handle receiving private messages from the server

  const privateMessageHandler = ({ sender, reciever, content, status, messageid }) => {
    console.log('Private message received:', sender, reciever, content);
    
    const newReceivedMessage = {
      sender,
      reciever,
      content,
      timestamp: new Date().toLocaleTimeString(),
      status,
      messageid,
    };
    setMessages((prevMessages) => [...prevMessages, newReceivedMessage]);
    console.log('Message received:', newReceivedMessage);


   //Letting the server know the message was received
    socket.emit('A new Message recieved', newReceivedMessage)
    console.log('Letting the server know the message was received sent a notification for New Message recieved', newReceivedMessage)
    
  };

  socket.on('A private message', privateMessageHandler);

  //return function will run during unmounting to clean up the listener.
  

//Handle notification for the messages we sent to a user
socket.on('Your message was recieved', (newReceivedMessage)=>{
  console.log('Your message recieved', newReceivedMessage )
    setMessages(previousMessages=>{
return  previousMessages.map(message=>{
   
   if(newReceivedMessage.messageid === message.messageid){
    
    return {...message, status: { recieved: true, read: false}}
   } 
   return message;
  })
})

})



// once the message is read we call a function to send out the acknowledgement that it was read
function readnotification(readmessageobj){
  socket.emit('We read your message', readmessageobj)
  console.log('sending notification to sever that the message was read');

  //To do: clear notifications badge on the user.
}


// now set up double ticks on your messages
socket.on('Your message was read', (readmessageobj)=>{

//To do: set up double ticks
//console.log('we will set up double ticks now for this message', readmessageobj)

setMessages(previousMessages=>{
  return  previousMessages.map(message=>{
     
     if(readmessageobj.messageid === message.messageid){
      
      return {...message, status: { recieved: true, read: true}}
     } 
     return message;
    })
  })

}); 




const sendMessage = (userSelected, textMessage) => {
  //console.log('called send message with', userSelected, textMessage);
//first have a selected user
    if (userSelected) {

      const sender = localStorage.userid
      

      
      const  receiver = userSelected._id; // this needs to be passed in
      const  content = textMessage; // this needs to be passed in
      const messageid = uuidv4() //unique id for each message

      const status ={
        received:false,
        read: false
      } 
      

      socket.emit('private message', {receiver, content, sender, status, messageid });
      console.log('reciever, message , sender', receiver,content, sender, status)
     
      //setSentMessage(newMessage);

     // setNewMessage('');
      //console.log('After calling send function', selectedUser, newMessage);
      
      setMessages(previousMessages=>{ return [...previousMessages, {receiver, content, sender, status, messageid } ] })

      
    }
  console.log('all messages now', messages);
 };


//handling when a user clicks
  function selectingUser (user, email) {
    setChatHistory('');
    SetUserFromPin(user.data.userobj);
    
    console.log("selecting user how many times called? ", user.data.userobj);
  }


//takes in a bool : true or false for openieng or closing message modal and a pins email
const messmodalfunction = async (bool, pinId) =>{
  console.log('messdmodal function email and bool', pinId, bool);
  if (pinId) {
  const user = await axios.post('http://localhost:3002/api/auth/usersobjfromid', {id: pinId})
  
  console.log('what is pin userobj', user, bool);
  setMessageModalOpen(bool)
  const emaill = user.email
  
  setSelectedUser(user.data.userobj)
 
//we need to use the usersemail to identify the user object and call the onclick function while passing it
//so that we simulate when a user selects a particular user

//
selectingUser(user, email);
console.log('how many time is messmodalfunction getting called/running', user.data.userobj, email);

}
}



const searchForUser = (usertosearch) =>{
  socket.emit('search user', usertosearch)

}

socket.on('users matching search', (usersmatching)=>{
  setUsersMatching([...usersmatching])
})


// Handling Notifications 



/*
function sendMessage(){}
function readnotification(){}
function searchForUser(){}
*/

  const values = {
    openEnvelope, setOpenEnvelope ,
    messages, setMessages,
    //newMessage, setNewMessage,
    userName, setUserName,
    users, setUsers,
    selectedUser, setSelectedUser,
    onlineUsers, setOnlineUsers,
    contactsHistory, setContactsHistory,
    searchForUser, usersmatching,
    email, setEmail,
    password, setPassword,
    //sentMessage, setSentMessage,
    chatHistory, setChatHistory,
    isMessageModalOpen, setMessageModalOpen,
    userfrompin ,SetUserFromPin,
    login, setLogin,
    sendMessage,
    readnotification, 
    socket
    }

    return (
    <SocketContext.Provider value = {values}>
    {children}
    </SocketContext.Provider>
    )

}



