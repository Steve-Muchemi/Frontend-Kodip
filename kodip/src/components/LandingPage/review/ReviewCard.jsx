import React from 'react';
import "./review.css";
import review from "../../../assets/images/review-img.png";
import thumb from "../../../assets/images/thumb1.png";

const ReviewCard = () => {
  return (
    <div className='review-card_cont'>
        <img src={review} alt="houses" />
        <div className="card-details">
            <h2>Best! I got the house I wanted through Hounter</h2>
            <p>Through this website I can got a house with the type and specifications I want very easily, without a complicated process to be able to find information on the house we want.</p>
            <div className="card-profile">
                <img src={thumb} alt="thumbnail" />
                <div className="card-profile_text">
                    <h4>Dianne Russell</h4>
                    <p>Lives in Nairobi</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ReviewCard