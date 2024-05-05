import React, { useState, useEffect } from 'react';
import './PropertyListing.css';
import Modal from 'react-modal';
import Imageapp from './Imageapp';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'qrcode.react';
import BingMapPin from './BingMapPin';


//import { faSwimmingPool, faWifi, faParking, faHome, faBath, faHotTub, faUtensils, faTv, faCouch, faWrench, faDoorOpen, faRunning, faBed, faChair, faDumbbell, faLeaf } from '@fortawesome/free-solid-svg-icons';

import { 
  faSwimmingPool, 
  faWifi, 
  faParking, 
  faHome, 
  faBath, 
  faHotTub, 
  faUtensils, 
  faTv, 
  faCouch, 
  faWrench, 
  faDoorOpen, 
  faRunning, 
  faBed, 
  faChair, 
  faDumbbell, 
  faLeaf,
  faBolt,
  faUserFriends,
  faTree,
  faWater,
  faShieldAlt,
  faArrowUp,
  faDog,
  faTshirt,
  faWheelchair,
  faPeopleArrows,
  faTools,
  faLightbulb,
  faSlideshare,
  faSnowflake
} from '@fortawesome/free-solid-svg-icons';




function PropertyListing({ listings }) {
  // State variables for managing selected image and its details

  

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImagePropertyName, setSelectedImagePropertyName] = useState('');
  const [selectedImagePropertyType, setSelectedImagePropertyType] = useState('');
  const [selectedImagePropertyPrice, setSelectedImagePropertyPrice] = useState('');
  const [selectedImagePropertyContact, setSelectedImagePropertyContact] = useState('');
  const [selectedImagePropertyUrl, setSelectedImagePropertyUrl] = useState('');
  const [selectedImagePropertyAmenities, setselectedImagePropertyAmenities] = useState('');
  const [likedImages, setLikedImages] = useState([]);
  const [propertylistings, setPropertylistings] = useState([])
  const navigate = useNavigate();  
  const {propertyId} = useParams()
  const [currentPropertyId, setCurrentPropertyId] = useState(propertyId);





  console.log('outofseff', propertyId, selectedImage)

  useEffect(()=>{
  axios.get(`http://localhost:3002/api/property/get/all`)
    .then(response=>{
    console.log(response.data)

    setPropertylistings(response.data)
    })
    .catch(error=>{
    console.log(error);
    })

  },[])
 
  

  const handleLike = (index) => {
    const newLikedImages = [...likedImages];
    newLikedImages[index] = !newLikedImages[index];
    setLikedImages(newLikedImages);
  };


  useEffect(() => {
    // Find the selected property based on propertyId
    console.log('useff', propertyId, selectedImage)
    if (propertyId) {
      const selectedProperty = propertylistings.find(property => property._id.toString() === propertyId)
       if (selectedProperty) {
        setSelectedImage(selectedProperty);
        console.log('selected image changed in if propid', selectedImage)
        } }

    if(selectedImage){

      const selectedProperty = propertylistings.find(property => property._id.toString() === selectedImage._id);

      if (selectedProperty) {
        setSelectedImage(selectedProperty);
  
        navigate(`/listings/${selectedProperty._id}`); // Update URL when opening modal
      } else {
        // Navigate back to listings if property not found
       
      }
    }    
  }, [selectedImage, navigate]);


  const openModal = (listing) => {
    setSelectedImage(listing);   
    console.log('modal open1',listing) 
    console.log('modal open',selectedImage) 
  };
  



  useEffect(() => {
    
    // Update the selected image details when the selectedImage state changes
    if (selectedImage) {
      setSelectedImagePropertyName(selectedImage.propertyName);
      setSelectedImagePropertyType(selectedImage.propertyType);
      setSelectedImagePropertyContact(selectedImage.contactInfo);
      setSelectedImagePropertyUrl(selectedImage.images);
      setSelectedImagePropertyPrice(selectedImage.Price);
      setselectedImagePropertyAmenities(selectedImage.amenities);
      setSelectedImagePropertyContact(selectedImage.contactInfo);
    }
  }, [selectedImage]);

  const closeModal = () => {
    setSelectedImage(null);
    navigate('/listings')
  };


  

const amenityIcons = {
  Aircon: faSnowflake,
  "Backup Generator": faBolt,
  Balcony: faBolt,
  Gym: faDumbbell,
  Parking: faParking,
  "Staff Quarters": faUserFriends,
  Garden: faTree,
  "Swimming Pool": faSwimmingPool,
  Borehole: faWater,
  Furnished: faCouch,
  "High-speed Internet/Wi-Fi": faWifi,
  "Security System": faShieldAlt,
  "Elevator/Lift": faArrowUp,
  "Pet-friendly Policies": faDog,
  "Laundry Facilities": faTshirt,
  "Wheelchair Accessibility": faWheelchair,
  "Community/Recreation Room": faPeopleArrows,
  "On-site Maintenance": faTools,
  "Smart Home Features": faLightbulb,
  Playground: faTools,
};



const RenderAmenities = ({ amenities }) => {
  return (
    <div className="amenities">
      {amenities.map((amenity, index) => (
        <div key={index} className="amenity-item">
          <FontAwesomeIcon icon={amenityIcons[amenity]} />
          <span className="amenity-label">{amenity}</span>
        </div>
      ))}
    </div>
  );
};




const amenitiesList = [
  "Aircon",
  "Backup Generator",
  "Balcony",
  "Gym",
  "Parking",
  "Staff Quarters",
  "Garden",
  "Swimming Pool",
  "Borehole"];







  return (
    <div className='PropertyListingCss'>
        
   <div className='render-listings'> 
      {propertylistings.map((listing, index) => (
  <div key={index} className='listingCard'>
    {
      //console.log("image urls look like this", listing.imageUrls[0])
    }
    <img
      src={listing.images[0]}
      alt={listing.title}
      className='listingImage'
      onClick={() => openModal(listing)}
    />
    
    <div key={index} className='heart-icon' onClick={() => handleLike(index)}>
      <FontAwesomeIcon icon={faHeart} color={likedImages[index] ? 'red' : 'grey'} />
    </div>
    
    <div className='listingImagedescription'>
      <p>{listing.propertyName}</p>
      
      <div className='listingImagedescriptioncity'>
        <p>{listing.location}</p>
        <p>ksh {listing.price}</p>
      </div>
    </div>
  </div>
))}

 </div>

      <Modal
        isOpen={selectedImage !== null}
        onRequestClose={closeModal}
        contentLabel="image Modal"
        className='Modal'
      >
        {selectedImage && (
          <div className='popup'>
            <div className='Modalheader'>
              <p className='Modalheadertitle'>{selectedImagePropertyName}</p>
              <img className='UserImage' src={selectedImagePropertyUrl} />
              <button className='closeselected' onClick= {closeModal}> close </button>
            </div>
            
            <Imageapp selected = {selectedImage.images} />
            <div className='ModalDescription'>
              <div className='ModalDescriptionbox'>

              <div className='propertyprice'>ksh {selectedImage.price}/mo</div>
             <br/>
             <br/>

              <div className="amenities">
                
              <RenderAmenities amenities={amenitiesList} />;
</div>



              <hr></hr>

                <h3 className='description'>Property details</h3>
                
                
                 <p>{selectedImage.description}</p>
               
                
              </div>
              <div className='ModalMap'>
                <p>Map</p>
                {/* MapContainer and related components are currently commented out */}
                <BingMapPin coordinates={selectedImage.pushpin.location}/>

              </div>
            </div>
            <h3>Similar houses</h3>
            <div className='similar'>
              
              




              {propertylistings.slice(2,5).map((listing, index) => (
  <div key={index} className='listingCard'>
    {
      //console.log("image urls look like this", listing.imageUrls[0])
    }
    <img
      src={listing.images[0]}
      alt={listing.title}
      className='listingImage'
      onClick={() => openModal(listing)}
    />
    
    <div key={index} className='heart-icon' onClick={() => handleLike(index)}>
      <FontAwesomeIcon icon={faHeart} color={likedImages[index] ? 'red' : 'grey'} />
    </div>
    
    <div className='listingImagedescription'>
      <p>{listing.propertyName}</p>
      
      <div className='listingImagedescriptioncity'>
        <p>{listing.location}</p>
        <p>ksh {listing.price}</p>
      </div>
    </div>
  </div>
))}



              
             
            </div>
          </div>
        )}
      </Modal>
   
    </div>
  );
}

export default PropertyListing;
