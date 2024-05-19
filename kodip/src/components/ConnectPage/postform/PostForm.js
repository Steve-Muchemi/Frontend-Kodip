import React, { useState } from 'react';
import './styles.css';
const PostForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    location: '',
    budget: '',
    bedrooms: '',
    amenities: '',
    // Add more fields as needed
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
      <input type="text" name="budget" value={formData.budget} onChange={handleChange} placeholder="Budget" />
      <input type="text" name="bedrooms" value={formData.bedrooms} onChange={handleChange} placeholder="Bedrooms" />
      <input type="text" name="amenities" value={formData.amenities} onChange={handleChange} placeholder="Amenities" />
      {/* Add more input fields for other preferences */}
      <button type="submit">Post Request</button>
    </form>
  );
};

export default PostForm;
