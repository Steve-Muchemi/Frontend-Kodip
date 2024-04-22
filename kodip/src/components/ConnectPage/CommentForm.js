import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faCoins } from '@fortawesome/free-solid-svg-icons';
import './styles.css';


const CommentForm = ({ postId }) => {
  const [comment, setComment] = useState('');
  const [image, setImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit comment logic
    console.log(`Comment submitted for post ${postId}: ${comment}`);
    // Clear comment and image fields after submission
    setComment('');
    setImage(null);
    setSubmitted(true);
    // Animate coin icon to indicate earning coins
    setTimeout(() => setSubmitted(false), 2000); // Reset animation after 2 seconds
  };

  const handleImageChange = (e) => {
    // Handle image upload
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea 
        value={comment} 
        onChange={(e) => setComment(e.target.value)} 
        placeholder="Write your comment..." 
        className="comment-textarea"
      />
      <div className="form-actions">
        <div className="image-upload">
          <label htmlFor="image-upload-input">
            <FontAwesomeIcon icon={faImage} className="image-icon" />
          </label>
          <input 
            type="file" 
            id="image-upload-input" 
            accept="image/*" 
            onChange={handleImageChange} 
            className="image-upload-input" 
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
          <FontAwesomeIcon icon={faCoins} className={submitted ? "coin-icon animated" : "coin-icon"} />
        </button>
      </div>
      {submitted && <p className="reward-message animated">You earned 10 coins!</p>}
    </form>
  );
};

export default CommentForm;
