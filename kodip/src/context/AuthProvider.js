import React, { useState, useEffect, useContext, createContext } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import { useSocketContext } from '../hooks/useSocketContext.js';

export const AuthContext = createContext()


export const AuthProvider = ({children}) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [displayName, setDisplayName] = useState('');
 const [setUserName, username] =useState('');
  const [name, setName] = useState('');
  const [loginerror, setloginerror] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const { socket, login, setLogin } = useSocketContext();
/**
 * Set up cookies and mananage the auth token with cookies
 * 
 */

/** manage loged in states even during reloads.
 * This is temporary. we will use cookies to track and manage the token 
 * and ensure it is still valid before setting the login variable to true.
 */

useEffect(()=>{
  console.log('localStorage looks like this', localStorage.token);
if (localStorage.token){
 console.log("done checking if localStorage.token !== ''", login);
 
  setLogin(true);
} 
},[])


//console.log('when socket provider loads login:', login)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
     
    // send request to API to create a users jwt token 
    const loginData ={
      email: email,
      password: password,
      
      };
    
      axios.post('http://localhost:3002/api/user/login', loginData)
      .then((response) =>{
            
      const {username, token, userid, profilepic} = response.data;
     
      localStorage.setItem('userid', userid);
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      localStorage.setItem('profilepic', profilepic);
      localStorage.setItem('token', token);

      /*
      // Setting cookies
      setCookie(null, 'token', token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: true, //Cookie can only be transmitted over HTTPS
        sameSite: 'strict', // Ensures cookie is only sent on same-site requests
      });
*/
      // will check if token is invalid later etc...
      //console.log('Logged In', response.data);
      setLogin(true); // socket IO provider context for indicating you've logged in
     
      setName(name);
      setModalOpen(false); // Close the modal after successful login

      })
      .catch((error)=>{console.error('login fail:', error, loginData)})
      
    } catch (error) {
      //console.log(error);
      setloginerror(error.message);
    }    
  };



  useEffect(()=>{
   
  //  console.log('what is login',login)
        //trigger login after a reload and when actually logging in
      if (login) {
        
      const userobj = {
          email: localStorage.email,
          username: localStorage.username,
          userid: localStorage.userid,
          profilepic: localStorage.profilepic,
        };
    
       socket.emit('user login', userobj);
      console.log("we'll trigger login", userobj);
          } 
      
        }, [login])


  const handleSignUp = async (e) => {
    e.preventDefault();
    try {

      const reigsterdata = {
        username: name,
        email: email,
    password: password,
    UserType: 'not set',
    }
    //console.log("registering", reigsterdata)
    
    axios.post('http://localhost:3002/api/user/register', reigsterdata)
    .then((response) =>{
    //console.log('register successful')
    //console.log(response.data)

    localStorage.setItem('userid', response.data.user.id);
    localStorage.setItem('username', response.data.user.username);
    localStorage.setItem('email', response.data.user.email);
    localStorage.setItem('profilepic', response.data.user.profilepic)
    localStorage.setItem('token', response.data.user.token);
    
    //console.log('Signed Up', name);
    //setLoggedIn(true);
    setUserName(name);
    setModalOpen(false); // Close the modal after successful sign up
    setLogin(true); // socket IO provider context for indicating you've logged in
    }).catch((error)=>{
      console.error('failed to send to backend. Error:', error)
  })

    } catch (error) {
     // console.log(error);

      setloginerror(error.message);
    }
  };

  const handleLogout = async (e) => {
   e.preventDefault();
    try {
      setLogin(false); // socket IO provider context for indicating you've logged in
     
      socket.emit('logout', localStorage.userid)
      //console.log("we'll trigger logout");

      localStorage.setItem('token', '')
      localStorage.setItem('userid', '')
      localStorage.setItem('username', '');
      localStorage.setItem('email', '');
      localStorage.setItem('profilepic', '');

      //console.log("local delete", localStorage );
      setShowDropdown(true);
    } catch (error) {
      //console.log(error);
    }

  };



//function handleLogin (){} 
//const handleSignUp = ()=>{} 
//const handleLogout = ()=>{}

  const values = {
    modalOpen, setModalOpen,
      
    displayName, setDisplayName,
       
    email, setEmail,
    password, setPassword,
  
    loginerror, setloginerror,
    showDropdown, setShowDropdown,
    handleLogin, handleSignUp, handleLogout,
    
  };
  
  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );

}



