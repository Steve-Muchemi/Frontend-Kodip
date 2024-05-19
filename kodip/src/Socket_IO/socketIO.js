import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';



function useSocketIO() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sentMessage, setSentMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isMessageModalOpen, setMessageModalOpen] = useState(false);
  const [userFromPin, setUserFromPin] = useState([]);

  const openMessageModal = () => {
    setMessageModalOpen((prev) => !prev);
  };

  const serverURL = 'http://localhost:3002';
  const socket = io(serverURL);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket.io connection established');
    });

    // if user logs in trigger user login event to add user details to server

    
  }, []);
  

  console.log('length of token', localStorage.token.length )

  useEffect(()=>{
    
    //trigger login event when the login token changes
    if (localStorage.token.length > 0) {
      setEmail(localStorage.email);
      setUserName(localStorage.username);

      const userobj = {
        email: localStorage.email,
        username: localStorage.username,
        userid: localStorage.userid,
        profilepic: localStorage.profilepic,
      };

      socket.emit('user login', userobj);
      console.log("we'll trigger login");

    } else{
      // if the localstorage.token changes and is no longer there, means user has logout and therfore we trigger logout
      socket.emit('user logout');
      console.log("we'll trigger logout");
  }

    //get online users
    /**
    * To do, diffrenciate between users who have been messed in the past and the online users
    * so you only send users that have a message history with the current one
    * and if they are currently logined in you show that on the chat
    */

    socket.on('online users', (users) => {
      setOnlineUsers(users);
      console.log('online users recieved', users)
    });

  }, [localStorage.token.length])



  useEffect(() => {
    if (localStorage.userid) {
      setEmail(localStorage.email);
      setUserName(localStorage.username);

      const userobj = {
        email: localStorage.email,
        username: localStorage.username,
        userid: localStorage.userid,
        profilepic: localStorage.profilepic,
      };

      socket.emit('user login', userobj);
    }
  }, [localStorage.userid]);

  useEffect(() => {
    const privateMessageHandler = ({ sender, reciever, message, status, messageid }) => {
      const newReceivedMessage = {
        sender,
        reciever,
        message,
        timestamp: new Date().toLocaleTimeString(),
        status,
        messageid,
      };
      setMessages((prevMessages) => [...prevMessages, newReceivedMessage]);

      const unreadmessagesbadge = {
        unread: 10,
        senderId: newReceivedMessage.sender.senderId,
      };

      socket.emit('A new Message recieved', newReceivedMessage);
    };

    socket.on('A private message', privateMessageHandler);

    return () => {
      socket.off('A private message', privateMessageHandler);
    };
  }, []);

  socket.on('Your message was recieved', (newReceivedMessage) => {
    setMessages((previousMessages) =>
      previousMessages.map((message) => {
        if (newReceivedMessage.messageid === message.messageid) {
          return { ...message, status: { recieved: true, read: false } };
        }
        return message;
      })
    );
  });

  function readNotification(readmessageobj) {
    socket.emit('We read your message', readmessageobj);
    console.log('sending notification to sever that the message was read');
  }

  socket.on('Your message was read', (readmessageobj) => {
    setMessages((previousMessages) =>
      previousMessages.map((message) => {
        if (readmessageobj.messageid === message.messageid) {
          return { ...message, status: { recieved: true, read: true } };
        }
        return message;
      })
    );
  });

  const sendMessage = (userSelected, textMessage) => {
    if (userSelected) {
      const sender = {
        senderUserName: localStorage.username,
        senderEmail: localStorage.email,
        senderId: localStorage.userid,
        profilepic: localStorage.profilepic,
      };

      const reciever = userSelected;
      const message = textMessage;
      const messageid = uuidv4();

      const status = {
        received: false,
        read: false,
      };

      socket.emit('private message', { reciever, message, sender, status, messageid });
      setSentMessage(newMessage);
      setNewMessage('');
    }
  };

  function selectingUser(user, email) {
    setChatHistory('');
    setUserFromPin(user.data.userobj);
  }

  const messmodalfunction = async (bool, pinId) => {
    if (pinId) {
      const user = await axios.post('http://localhost:3002/api/auth/usersobjfromid', { id: pinId });
      setMessageModalOpen(bool);
      const emaill = user.email;
      setSelectedUser(user.data.userobj);
      selectingUser(user, email);
    }
  }

  return (
    <>
    </>
    
  );
}


export default useSocketIO;
