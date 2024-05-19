// components/PostList.js

import React from 'react';
import './styles.css';

const PostList = ({ posts }) => {
  return (
    <div>
      {posts.map(post => (
        <div key={post._id}>
          <h2>{post.location}</h2>
          <p>Budget: {post.budget}</p>
          <p>Bedrooms: {post.bedrooms}</p>
          <p>Amenities: {post.amenities}</p>
          {/* Display other post details*/ }
        </div>
      ))}
    </div>
  );
};

export default PostList;
