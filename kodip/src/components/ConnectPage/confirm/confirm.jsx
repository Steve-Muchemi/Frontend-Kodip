// Confirm.js
import React from "react";
import './confirm.css';

const Confirm = ({ confirmation, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm(true); // Set confirmation to true and close modal
  };

  const handleClose = () => {
    onConfirm(false); // Close modal without setting confirmation
  };

  return (
    <div className="confirmation-modal">
      <h2>Set this as your desired location?</h2>
      <button onClick={handleConfirm}>Yes</button>
      <button onClick={handleClose}>No</button>
      {/* let the user know the location was set.*/}
    </div>
  );
};

export default Confirm;
