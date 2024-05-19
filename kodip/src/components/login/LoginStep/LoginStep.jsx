// LoginStep.js
import React, { useState, useContext  } from 'react';
import './LoginStep.css'
import { AuthContext } from '../../../context/AuthProvider.js';


const LoginStep = ({ setSignupInstead, setLoginInstead }) => {
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
const { handleLogin } =  useContext(AuthContext);

    const handlePrevStep = () => {
        // Implement logic to navigate to the previous step
        setSignupInstead(false)
        setLoginInstead(false)
    };
    
 


    return (
        <div>
            <div>
               
                <input
                    type="tel"
                    placeholder="Enter Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input"
                />
                Or
               
                <br/>
                <input
                    type="text"
                    placeholder="Enter email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input"
                />
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                />
                <button onClick={() => handleLogin(phone, username, password)} className="login-button">Login</button>
                <button onClick={handlePrevStep} className="login-button">Back</button>
            </div>
        </div>
    );
}

export default LoginStep;
