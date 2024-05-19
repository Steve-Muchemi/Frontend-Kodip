import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import "./login.css";
import { useSocketContext } from '../../../hooks/useSocketContext.js';





function LoginForm(prop) {
  const [modalOpen, setModalOpen] = useState(false);


//for signing up
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

 const [loginerror, setloginerror] = useState('');

  //const [username1, setUserName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  
  


  const { login, setLogin, setLogout } = useSocketContext()
  

  //controlling the behaviour of the modal 
const [showDropdown, setShowDropdown] = useState(false);
const toggleDropdownTrue = () => {setShowDropdown(true);};
const toggleDropdownFalse = () =>{setShowDropdown(false);}
const handleClick = () => {setModalOpen(true);};
const handleClose = () => {setModalOpen(false);};

console.log('isLoggedIn?', isLoggedIn)
  return (
    <div >
        {/* If user is not logged in activitate the modal using handleclick */}
      {!isLoggedIn && (
        <button onClick={handleClick} className="button1">Login</button>
      )}

        {/* If user is logged show a button with the users name 
        if the button is clicked show the same button and another button below promptin gfor a logout 
        
        */}
      {isLoggedIn && (

                <div>
          <div className="dropdownContainer">
            {!showDropdown && <button onClick={toggleDropdownTrue} className="text" style={{fontSize: '18px'}}>
              Welcome {localStorage.username} 😊!
            </button>}

            {showDropdown && <button onClick={toggleDropdownFalse} className="text" style={{fontSize: '18px'}}>
              Welcome {localStorage.username} 😊!
            </button>}

            {showDropdown && (
              <div className="dropdownMenu">
                <button onClick={handleLogout} className="text" style={{fontSize: '12px'}}>
                  Logout?
                </button>
              </div>
            )}
          </div>
        </div>
        )}
    
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleClose}
        className="modal"
       
      >
        {!displayName && (
          <form onSubmit={handleLogin} className="form">
          <p style = {{fontWeight: 'bold'}}> Welcome back! Login with your details below 😊! </p>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
            <button type="submit" className="button" onClick = {toggleDropdownFalse}>Log in</button>
            <button onClick={() => setDisplayName(true)} className="button">Sign Up</button>
          {loginerror && (
          <p style={{ color: '#ff6b6b', fontStyle: 'italic', fontWeight: 'bold', padding : '0 px', margin: '50px 0' }}>{loginerror}</p>
          )}

          </form>
        )}
        {displayName && (
          <form onSubmit={handleSignUp} className="form">
          <p style = {{fontWeight : 'bold'}}> New to Kodip? Sign up today 😊! </p>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
            <input
              type="text"
              placeholder="How should we call you?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
            />


            <button type="submit" className="button" style = {{padding : '0 px', margin : '4px 0'}}>Sign up</button>

            <p style = {{padding : '0 px', margin: '4px 0'}}> Or </p>

            <button onClick={() => setDisplayName(false)} className="button" style = {{padding : '0 px', margin : '0 px'}}>Login</button>
            {loginerror && (
            <p style={{ color: '#ff6b6b', fontStyle: 'italic', fontWeight: 'bold', padding : '0 px', margin: '4px 0' }}>{loginerror}</p>
              )}



          </form>
        )}
            </Modal>
      
    </div>
  );
}

export default LoginForm;

