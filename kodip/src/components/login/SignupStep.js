import React, { useState, useContext } from 'react';
import StepOne from './VerifyPhoneSignup';
import SignupPassword from './SignupPassword';
import StepThree from './SignupUsername';

import { AuthContext } from '../../context/AuthProvider.js';

const SignupStep = ({ setSignupInstead, setLoginInstead }) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const [confirmPassword, setConfirmPassword] = useState(''); // Define confirmPassword state

    const { handleSignUp } =  useContext(AuthContext);

    const handleBackToModal = () => {
        setSignupInstead(false);
        setLoginInstead(false);
    };

    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleSignupFunction = () => {
        // Perform signup logic here
        console.log("Signing up with:", name, username, email, phone, confirmPassword);
        // Example: call an external function passed as prop for further processing
        // handleSignupExternal(name, username, email);
        handleSignUp(name, username, email, phone, confirmPassword);
    };

    const handlePhoneSubmit = () => {
        // Perform phone verification logic here
        // Assuming phone verification is successful, proceed to the next step
        handleNextStep();
    };

    return (
        <div>
            {currentStep === 1 && (
                <StepOne
                    phone={phone}
                    setPhone={setPhone}
                    handlePhoneSubmit={handlePhoneSubmit}
                    handleBackToModal={handleBackToModal}
                    handleNextStep={handleNextStep}
                />
            )}

            {currentStep === 2 && (
                <SignupPassword
                    handlePrevStep={handlePrevStep}
                    handleNextStep={handleNextStep}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword} 
                />
            )}

            {currentStep === 3 && (
                <StepThree
                    name={name}
                    setName={setName}
                    username={username}
                    setUsername={setUsername}
                    email={email}
                    setEmail={setEmail}
                    handleSignupFunction={ handleSignupFunction}
                    handlePrevStep={handlePrevStep}
                />
            )}
        </div>
    );
}

export default SignupStep;
