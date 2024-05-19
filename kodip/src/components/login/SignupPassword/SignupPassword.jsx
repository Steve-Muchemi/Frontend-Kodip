import React, { useState } from 'react';
import './SignupPassword.css'

const SignupPassword = ({ handlePrevStep, handleNextStep, confirmPassword, setConfirmPassword }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validatePassword = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError(''); // Clear password error when password changes
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setConfirmPasswordError(''); // Clear confirm password error when confirm password changes
    };

    const handleNext = () => {
        if (!validatePassword()) {
            setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
        } else {
            // Password and confirm password are valid
            handleNextStep();
        }
    };

    return (
        <div>
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={handlePasswordChange}
                className="input"
            />
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="input"
            />
            <button onClick={togglePasswordVisibility} className="signup-next-button">{showPassword ? "Hide" : "Show"} Password</button>
            <p className="error-message">{passwordError}</p>
            <p className="error-message">{confirmPasswordError}</p>
            <div className='signup-next-back-div'>

            <button onClick={handlePrevStep} className="signup-back-button">Back</button>
            <button onClick={handleNext} className="signup-next-button">Next</button>
            </div>
            
         
        </div>
    );
}

export default SignupPassword;
