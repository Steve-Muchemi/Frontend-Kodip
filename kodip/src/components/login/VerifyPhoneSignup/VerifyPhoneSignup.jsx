import React, { useState } from 'react';
import './VerifyPhoneSignup.css'

const StepOne = ({ phone, setPhone, handlePhoneSubmit, handleBackToModal, handleNextStep }) => {
    const countryCode = '+254';
    const [showVerification, setShowVerification] = useState(false); // State to toggle verification code input visibility
    const [verificationCode, setVerificationCode] = useState(''); // State to manage the verification code input
    const [verificationError, setVerificationError] = useState(''); // State to manage verification error message

    const handlePhoneChange = (e) => {
        let formattedPhone = e.target.value;
        // Remove any non-digit characters from the input
        formattedPhone = formattedPhone.replace(/\D/g, '');
        setPhone(formattedPhone);
    };

    const handleVerify = () => {
        // Perform phone verification logic here, e.g., sending a verification code to the user's phone number
        // For simulation, we'll directly show the verification input
        //axios call to send code to phone number
        
        setShowVerification(true);
    };

    const handleVerifyCode = () => {
        // Simulate verification code validation
        if (verificationCode === '0000') {
            // If verification code is correct, proceed to the next step
            handleNextStep();
        } else {
            // If verification code is incorrect, display an error message
            setVerificationError('Verification code is incorrect. Please try again.');
        }
    };

    return (
        <div>
            <input
                type="tel"
                placeholder="Enter Phone Number +254..."
                value={phone}
                onChange={handlePhoneChange}
                className="input"
            />

            {showVerification && (
                <div>
                    <input
                        type="text"
                        placeholder="Enter Verification Code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="input"
                    />
                    <button onClick={handleVerifyCode} className="signup-back-button">Verify Code</button>
                    {verificationError && <p className="error-message">{verificationError}</p>}
                </div>
            )}

            {!showVerification && (
                <button onClick={handleVerify} className="signup-verify-button">Verify</button>
            )}

            <div className='signup-next-back-div'>
                <button onClick={handleBackToModal} className="signup-back-button">Back</button>
                <button onClick={handleNextStep} className="signup-next-button">Next</button>
            </div>
        </div>
    );
}

export default StepOne;
