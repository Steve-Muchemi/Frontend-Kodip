import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCoins } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <div className="post-header">
        <h2>{post.title}</h2>
        <p className="location">
          <FontAwesomeIcon icon={faMapMarkerAlt} /> {post.location}
        </p>
      </div>
      <div className="post-body">
        <p className="amenities">Amenities: {post.amenities}</p>
        {post.budget && (
          <p className="amenities">Budget: {post.budget}</p>
        )}
      </div>
      <div className="post-footer">
        {post.rewardsCoins && (
          <p className="rewards">
            <FontAwesomeIcon icon={faCoins} /> ksh {post.coins}!
          </p>
        )}
        <Link to={`/posts/${post.postId}`} className="view-details">View Details</Link>
      </div>
    </div>
  );
};

export default PostCard;
