
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faCoins } from '@fortawesome/free-solid-svg-icons';
import './styles.css';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const CommentForm = ({ postId }) => {
  const [comment, setComment] = useState('');
  const [image, setImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

console.log(localStorage)
/*
  const getuserslocation = () => {
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
         // console.log('got ', latitude, longitude)
        },
        (err) => {
          console.error("Error getting GPS location:", err);
          setError("Error getting GPS location");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  */

  const handleSubmit = (e) => {
    //getuserslocation();
    e.preventDefault();
    
    // Get user's location
    

    const saveComment = {
      commentId: uuidv4(), 
      postId: postId,
      replyTo: null,
      text: comment,
      username: localStorage.username,
      timestamp: 'Just now',
      reactions: { like: 0, superReact: 0 },
      userId: localStorage.userid,
      
    };

    console.log(saveComment);
    
    /// axios call here.

    axios.post('http://localhost:3002/api/connect/comment', saveComment)
    .then(response=>{
    console.log(response.data)
    })
    .catch(error=>{
    console.log(error);
    })

    

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
