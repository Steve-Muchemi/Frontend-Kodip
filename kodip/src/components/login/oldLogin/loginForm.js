import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
//import "./login.css";
import { useSocketContext } from '../../../hooks/useSocketContext.js';





function LoginForm(prop) {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username1, setUserName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [loginerror, setloginerror] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const { login, setLogin, setLogout } = useSocketContext()
  const handleClick = () => {setModalOpen(true);};
  const handleClose = () => {setModalOpen(false);};

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

      setUserName(username)
      // will check if token is invalid later etc...
      console.log('Logged In');
      setLogin(true); // socket IO provider context for indicating you've logged in
      setLoggedIn(true);
      setName(name);
      setModalOpen(false); // Close the modal after successful login

      })
      .catch((error)=>{console.error('login fail:', error, loginData)})
      
    } catch (error) {
      console.log(error);
      setloginerror(error.message);
    }    
  };


  const handleSignUp = async (e) => {
    e.preventDefault();
    try {

      const reigsterdata = {
        username: name,
        email: email,
    password: password,
    UserType: 'not set',
    }
    console.log("registering", reigsterdata)
    
    axios.post('http://localhost:3002/api/user/register', reigsterdata)
    .then((response) =>{
    console.log('register successful')
    console.log(response.data)

    localStorage.setItem('userid', response.data.user.id);
    localStorage.setItem('username', response.data.user.username);
    localStorage.setItem('email', response.data.user.email);
    localStorage.setItem('profilepic', response.data.user.profilepic)
    localStorage.setItem('token', response.data.user.token);
    
    console.log('Signed Up', name);
    setLoggedIn(true);
    setUserName(name);
    setModalOpen(false); // Close the modal after successful sign up
    setLogin(true); // socket IO provider context for indicating you've logged in
    }).catch((error)=>{
      console.error('failed to send to backend. Error:', error)
  })

    } catch (error) {
      console.log(error);

      setloginerror(error.message);
    }
  };



  const handleLogout = async () => {
    try {

      setLogout(true);
      console.log('Logged Out');

      setLogin(false); // socket IO provider context for indicating you've logged in
      console.log("local delete", localStorage );
      setShowDropdown(true);
    } catch (error) {
      console.log(error);
    }

  };

  console.log('isLoggedIn?', isLoggedIn)
const toggleDropdownTrue = () => {setShowDropdown(true);};

const toggleDropdownFalse = () =>{setShowDropdown(false);}



  return (
    <div >
      {!isLoggedIn && (
        <button onClick={handleClick} className="button1">Login</button>
      )}
      {
        isLoggedIn && (

                <div>
          {/* Dropdown Menu */}
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



        )
      }
    
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

