
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './connect.css'; // Import CSS file for styling
import { ReactBingmaps } from 'react-bingmaps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCoffee } from '@fortawesome/free-solid-svg-icons';
import SideBar from '../../MapPage_Components/sidebar/sidebar';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Confirm from '../confirm/confirm';


const Connect = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [priceRange, setPriceRange] = useState('');
  const [amenities, setAmenities] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [title, setTitle ] = useState('');
  const [receiveOwnerContacts, setReceiveOwnerContacts] = useState(false);
 const [clickLocation, setClickLocation] = useState('') 
  const [postCoordinates, setPostCoordinates] = useState([])
  const [postModal, setPostModal] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const handleConfirm = (confirm) => {
    setConfirmation(confirm);
    setPostModal(false); // Close the modal regardless of confirmation
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  const whatToSubmit= {
      postId: uuidv4(),
      title:title,
      location: selectedLocation,
      amenities: amenities,
      additionalInfo: additionalInfo,
      rewardsCoins: true,
      coins: 100,
      user:localStorage.userid,
      coordinates: [1,2],      
      budget: priceRange,
    }

    //axios call here to do the submission.
    axios.post('http://localhost:3002/api/connect/createpost', whatToSubmit)
    .then(response=>{
  //missing code?
    })
    .catch(error=>{
      //error handling?
    })
  };

  const handleMouseDown = (e) => {
    const latitude = e.latitude;
    const longitude = e.longitude;  
    const holdTimer = setTimeout(() => {
      setClickLocation({ latitude, longitude });
      setPostCoordinates([latitude, longitude])
      setPostModal(true)
    }, 1000); // Hold duration set to 2 seconds (2000 milliseconds)
  
    const handleMouseUp = () => {
      clearTimeout(holdTimer);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  
    document.addEventListener('mouseup', handleMouseUp);
  };  
  const getLocation = {
    addHandler: 'mousedown',
    callback: handleMouseDown
  };
  const mapOptions = {
    center: [-1.164194, 36.945139],
    credentials: "AimaoVvThYG5kUK8jG8Gya7X7Q1lHKXk54RztUw2UNUGJR9Bbkna4DDkYqOWeHjv",
  };

  return (
    <div className="connectPage">
<SideBar/>
      <div className="connectFormContainer">
      <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', padding: '10px' , margin:'40px'}}>
          <p style={{ fontSize: '18px', color: '#333', marginBottom: '10px' }}>Struggling to find the perfect property?</p>
          <h3 style={{ fontSize: '55px', padding: '40px', color: '#058533' }}>Connect with Locals!</h3>
          <p style={{ fontSize: '14px', padding: '10px',color: '#555', lineHeight: '1.5' }}>Discover hidden gems in your desired area with the help of locals! </p>
          <p style={{ fontSize: '14px', padding: '10px',color: '#555', lineHeight: '1.5' }}>We have a communit of dedicated locals who specialize in uncovering off-market properties, making your search effortless and efficient.</p>

          <div style={{  padding: '20px', marginTop: '20px', fontFamily: 'cursive', color: '#777' }}>
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

    <div className="connectForm">
          <h1>Discover Hidden Gems with Locals</h1>
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
            <div className="formGroup">
              <label htmlFor="priceRange"> Title</label>
              <input type="text" id="title" placeholder="What shoud the title of your post be?" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
              <label htmlFor="selectedLocation">PinPoint where youd like to rent on the map:</label>
              <div className="mapContainer" >
          <ReactBingmaps bingmapKey={mapOptions.credentials} center={mapOptions.center}  getLocation={getLocation}/>
          {postModal && (
        <div className="post-property-modal">
          <Confirm confirmation={confirmation} onConfirm={handleConfirm} />
        </div>
         )}
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
            <button type="submit" className="connectButton">Create Post</button>
      <Link to="/connectpage" ><button type="submit" className="connectButton" style={{marginLeft:'15px'}}>Checkout Similar Posts</button>
      </Link>
    </form>
        </div >
      </div>
      <p className="note">Note: Please note that while we strive to connect you with a local guide promptly, our service is currently in development, and as such, there may be a slight delay in matching you with a guide. Rest assured, we are actively recruiting new local guides to join our team and enhance your experience.</p>
    </div>
  );
};

export default Connect;
