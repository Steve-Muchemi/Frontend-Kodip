import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './connect.css'; // Import CSS file for styling
import { ReactBingmaps } from 'react-bingmaps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCoffee } from '@fortawesome/free-solid-svg-icons';
import SideBar from '../MapPage_Components/sidebar/sidebar';

const Connect = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [priceRange, setPriceRange] = useState('');
  const [amenities, setAmenities] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [receiveOwnerContacts, setReceiveOwnerContacts] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    console.log('Selected Location:', selectedLocation);
    console.log('Price Range:', priceRange);
    console.log('Amenities:', amenities);
    console.log('Additional Info:', additionalInfo);
    console.log('Receive Owner Contacts:', receiveOwnerContacts);
  };

  const mapOptions = {
    center: [-1.164194, 36.945139],
    credentials: "AimaoVvThYG5kUK8jG8Gya7X7Q1lHKXk54RztUw2UNUGJR9Bbkna4DDkYqOWeHjv",
  };

  return (
    <div className="connectPage">
<SideBar/>
      <div className="connectFormContainer">
        <div className="connectForm">
          <h1>Discover Hidden Gems with Locals</h1>
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="selectedLocation">Select Your Desired Location:</label>

              <div className="mapContainer" >
          <ReactBingmaps bingmapKey={mapOptions.credentials} center={mapOptions.center}  />
        </div>
              <div className="locationInput">
                <input type="text" id="selectedLocation" placeholder="Or manually type in the desired location" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} />
                <FontAwesomeIcon icon={faMapMarkerAlt} className="locationIcon" />
              </div>
            </div>
            <div className="formGroup">
              <label htmlFor="priceRange">Price Range:</label>
              <input type="text" id="priceRange" placeholder="Whats the price range of your desired property?" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} />
            </div>
            <div className="formGroup">
              <label htmlFor="amenities">Amenities:</label>
              <input type="text" id="amenities" placeholder="Enter desired amenities" value={amenities} onChange={(e) => setAmenities(e.target.value)} />
            </div>
            <div className="formGroup">
              <label htmlFor="additionalInfo">Additional Info:</label>
              <textarea id="additionalInfo" placeholder="Anything else you'd like to include in your request?" value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} />
            </div>
            <div className="formGroup">
              

              <div className="appreciationSection">
        <h2>Appreciate the Local</h2>
        <div className="buyCoffee">
          <button className="coffeeButton">
            <FontAwesomeIcon icon={faCoffee} className="coffeeIcon" />
            Buy a Coffee - Ksh 100 (Selected)
          </button>
        </div>
        <p>Buying the local guides a coffee is a small gesture that goes a long way in showing appreciation for their hard work and dedication. It helps support them and shows gratitude for their assistance in finding your perfect property!</p>
      </div>

            </div>
            <Link to="/connectpage" ><button type="submit" className="connectButton">Create Post</button>
           
      </Link>

      <Link to="/connectpage" ><button type="submit" className="connectButton" style={{marginLeft:'15px'}}>Checkout Similar Posts</button>
           
      </Link>
      
          </form>
        </div >
      
        

        <div style={{ fontFamily: 'Arial, sans-serif', width: "40%",textAlign: 'center', padding: '10px' }}>
          <p style={{ fontSize: '18px', color: '#333', marginBottom: '10px' }}>Struggling to find the perfect property?</p>
          <h3 style={{ fontSize: '55px', padding: '40px', color: '#058533' }}>Connect with Locals!</h3>
          <p style={{ fontSize: '14px', padding: '10px',color: '#555', lineHeight: '1.5' }}>Discover hidden gems in your desired area with the help of locals! </p>
          <p style={{ fontSize: '14px', padding: '10px',color: '#555', lineHeight: '1.5' }}>We have a communit of dedicated locals who specialize in uncovering off-market properties, making your search effortless and efficient.</p>
          <p style={{ fontSize: '14px', padding: '10px',color: '#555', lineHeight: '1.5' }}>They'll go the extra mile by scouting your preferred neighborhood, contacting landlords, sharing exclusive photos and contact details, and assisting you throughout the entire process!</p>
          <p style={{ fontSize: '14px', padding: '10px',color: '#555', lineHeight: '1.5' }}>Gain invaluable insights and insider tips about your future home directly from those who know it best.</p>
          <p style={{ fontSize: '14px',padding: '14px', padding: '14px', fontStyle: 'italic', color: 'black', lineHeight: '1.5' }}> Its a seamless, fast and personalized property search journey!</p>
          <p style={{ fontSize: '14px', fontStyle: 'italic', color: 'black', lineHeight: '1.5' }}> Its KodiSwift!</p>
          

{/* Instructions */}
<div style={{ border: '1px solid #ccc', padding: '20px', marginTop: '20px', fontFamily: 'cursive', color: '#777' }}>
  <h4 style={{ fontSize: '18px', marginBottom: '10px', fontFamily: 'cursive' }}>How it works</h4>
  <ol style={{ fontSize: '14px', lineHeight: '1.5', paddingLeft: '20px', textAlign: 'left' }}>
    <li>Select an area on the map where you want to receive recommendations.</li>
    <li>Choose the price range of the house and desired amenities.</li>
    <li>Enter any other preferences for your desired rental.</li>
    <li>Finally, click "Post".</li>
  </ol>
  <p style={{ fontSize: '14px', lineHeight: '1.5', marginTop: '20px', paddingBottom: '14px' }}>
    Locals in the specific geolocation you've selected will be notified. If any of them have information about the type of rental unit you're looking for, they'll post it in the comments section. Only locals in the geographical region you've selected will be allowed to comment on your post.
  </p>
  <p style={{ fontSize: '14px', lineHeight: '1.5', paddingBottom: '14px' }}>
    You can engage with the locals in the inbox, where sharing images of houses or other private information such as phone numbers is required.
  </p>
  <p style={{ fontSize: '14px', lineHeight: '1.5', paddingBottom: '14px' }}>
    To ensure you get help, we recommend buying the locals coffee. This way, you can compensate them for the time they took to help you find your ideal location.
  </p>
</div>



        </div>









      </div>

      <p className="note">Note: Please note that while we strive to connect you with a local guide promptly, our service is currently in development, and as such, there may be a slight delay in matching you with a guide. Rest assured, we are actively recruiting new local guides to join our team and enhance your experience.</p>
    </div>
  );
};

export default Connect;
