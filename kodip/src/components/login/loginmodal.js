// Loginmodal.js
import React, { useState } from 'react';
import SignupStep from './SignUpSteps/SignupStep';
import LoginStep from './LoginStep/LoginStep';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import './loginModal.css';


function Loginmodal(props) {
  const [ loginInstead, setLoginInstead ] = useState(false)
  const [ signupInstead, setSignupInstead] = useState(false)
 
  const handleLogin = () => {
    setLoginInstead(true)
    setSignupInstead(false)
  }

  const handleSignup = () => {
    setSignupInstead(true)
    setLoginInstead(false)
  }
  
  return (
    <div className="container">
      {!loginInstead && !signupInstead && (
        <div className="box">
          <h2>Welcome to KodiSwift!</h2>
          <p>Please select an option:</p>
          <div className="buttons">
            <button className="login-button " onClick={handleLogin}>
              <FontAwesomeIcon icon={faSignInAlt} className="icon" />
              Login 
            </button>
            <button className="signup-button" onClick={handleSignup}>
              <FontAwesomeIcon icon={faUserPlus} className="icon" />
              Sign Up
            </button>
          </div>
        </div>
      )}
      
      {loginInstead && (
        <LoginStep setSignupInstead={setSignupInstead}  setLoginInstead={setLoginInstead}/>
      )}

      {signupInstead && (
        <SignupStep setSignupInstead={setSignupInstead}  setLoginInstead={setLoginInstead} />
      )}
    </div>
  );
}

export default Loginmodal;
