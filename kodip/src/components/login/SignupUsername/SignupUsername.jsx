import React, { useState } from 'react';
import './SignupUsername.css';

const StepThree = ({ name, setName, username, setUsername, email, setEmail,  handleSignupFunction, handlePrevStep }) => {
    const [usernameError, setUsernameError] = useState(''); // State to manage username error message

    const handleUsernameChange = (e) => {
        const enteredUsername = e.target.value;
        // Regular expression to validate username: only alphanumeric characters and underscores, between 3 and 20 characters long
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

        if (!usernameRegex.test(enteredUsername)) {
            setUsernameError('Username must be between 3 and 20 characters long and contain only alphanumeric characters and underscores.');
        } else {
            setUsernameError('');
        }

        setUsername(enteredUsername);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
            />
            <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={handleUsernameChange} // Use the handleUsernameChange function for input change
                className="input"
            />
            {usernameError && <p className="error-message">{usernameError}</p>} {/* Display username error message if there's an error */}
            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
            />
            

            <div className='signup-next-back-div'>
            <button onClick={handlePrevStep} className="signup-next-button">Back</button>
            <button onClick={ handleSignupFunction} className="signup-back-button">Sign Up</button>
            
            </div>
            
            
        </div>
    );
}

export default StepThree;
