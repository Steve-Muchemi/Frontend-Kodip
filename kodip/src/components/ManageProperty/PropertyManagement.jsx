import React, { useState } from 'react';
import './PropertyManagement.css';

const PropertyManagement = () => {
  // Static data for properties
  const [properties, setProperties] = useState([
    {
      _id: 1,
      owner: 'user_id_1',
      propertyType: 'Villa',
      price: 500000,
      description: 'Beautiful villa with scenic views',
      propertyName: 'Beautiful Villa',
      location: 'City, Country',
      amenities: ['Swimming pool', 'Garden'],
      contactInfo: ['email@example.com', '+1234567890'],
      imageUrls: [
        'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1600'
      ],
      pushpin: {
        location: [12.3456, 78.9101],
        infoboxOption: {
          title: 'Beautiful Villa',
          description: 'Luxury villa with stunning views',
          propertyType: 'Villa'
        }
      }
    },
    // Add more properties here
  ]);

  const handleUpdateProperty = (id, updatedData) => {
    // Handle updating property data here
    console.log(`Updating property with ID ${id}`, updatedData);
    // Find the property with the given id and update its data
    const updatedProperties = properties.map(property =>
      property._id === id ? { ...property, ...updatedData } : property
    );
    setProperties(updatedProperties);
  };

  const handleDeleteProperty = (id) => {
    // Handle deleting property here
    console.log(`Deleting property with ID ${id}`);
    // Update the state to remove the deleted property
    setProperties(properties.filter(property => property._id !== id));
  };

  return (
    <div className="property-management-container">
      <h2>Manage Your Properties</h2>
      <div className="property-list">
        {properties.map((property) => (
          <div key={property._id} className="property-item">
            <h3>{property.propertyName}</h3>

            <h4>Available? </h4>
            <p> Only properties marked as available will be listed on the listings page </p>
            <p>
              <strong>Property Type:</strong> 
              <input type="text" value={property.propertyType} onChange={(e) => handleUpdateProperty(property._id, { propertyType: e.target.value })} />
            </p>
            <p>
              <strong>Price:</strong> 
              <input type="number" value={property.price} onChange={(e) => handleUpdateProperty(property._id, { price: e.target.value })} />
            </p>
            <p>
              <strong>Description:</strong> 
              <textarea value={property.description} onChange={(e) => handleUpdateProperty(property._id, { description: e.target.value })} />
            </p>
            <p>
              <strong>Location:</strong> 
              <input type="text" value={property.location} onChange={(e) => handleUpdateProperty(property._id, { location: e.target.value })} />
            </p>
            <p>
              <strong>Amenities:</strong> 
              <textarea value={property.amenities.join(', ')} onChange={(e) => handleUpdateProperty(property._id, { amenities: e.target.value.split(',').map(item => item.trim()) })} />
            </p>
            <p>
              <strong>Contact Info:</strong> 
              <textarea value={property.contactInfo.join(', ')} onChange={(e) => handleUpdateProperty(property._id, { contactInfo: e.target.value.split(',').map(item => item.trim()) })} />
            </p>
            {/* Display images */}
            <div className="property-images">
              {property.imageUrls.map((imageUrl, index) => (
                <img key={index} src={imageUrl} alt={`Property ${index + 1}`} />
              ))}
            </div>
            {/* Add image upload */}
            <input type="file" multiple />
            <div className="action-buttons">
              <button onClick={() => handleUpdateProperty(property._id, {/* Updated property data */})}>Submit</button>
              <button onClick={() => handleDeleteProperty(property._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyManagement;
