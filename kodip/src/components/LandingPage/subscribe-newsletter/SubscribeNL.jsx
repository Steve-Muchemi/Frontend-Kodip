import React from 'react';
import "./subscribe.css";
import email from "../../../assets/images/email-icon.png";

const SubscribeNL = () => {
  return (
    <div className='subscribe'>
        <h2>Subscribe For More Info and update from Hounter</h2>
        <div className="subscribe-input">
            <img src={email} alt="email-icon" />
            <input type="email" placeholder='Your email here' />
            <button className='btn'>Subscribe Now</button>
        </div>
    </div>
  )
}

export default SubscribeNL