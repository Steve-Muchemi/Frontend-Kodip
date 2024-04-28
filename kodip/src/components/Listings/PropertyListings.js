import React, { useState, useEffect } from 'react';
import './PropertyListing.css';
import Modal from 'react-modal';
import Imageapp from './Imageapp';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'qrcode.react';

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


  








  return (
    <div className='PropertyListingCss'>
        
      {/* Render the property listings */}
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


            {/* <div className={styles.Modalimages}>
              <img src={selectedImagePropertyUrl} alt={selectedImage.title} className={styles.imagepop1} />
              <div className={styles.imagepopgroup}>
                <img src={selectedImagePropertyUrl} alt={selectedImage.title} className={styles.imagepop2} />
                <img src={selectedImagePropertyUrl} alt={selectedImage.title} className={styles.imagepop2} />
              </div>
            </div>
             */}
            <div className='ModalDescription'>
              <div className='ModalDescriptionbox'>
                <h3 className='description'>Description</h3>
                <p>{selectedImage.description}</p>
                <h3>Amenities</h3>
                {/* Render selected image's amenities */}
                <p>{selectedImagePropertyAmenities[0]}</p>
                <p>{selectedImagePropertyAmenities[1]}</p>
                <p>{selectedImagePropertyAmenities[2]}</p>
                <p>{selectedImagePropertyAmenities[3]}</p>
                <p>{selectedImagePropertyAmenities[4]}</p>
                <p>{selectedImagePropertyAmenities[5]}</p>
                <h3>Price</h3>
                <p>${selectedImage.price}</p>
              </div>
              <div className='ModalMap'>
                <p>Map</p>
                {/* MapContainer and related components are currently commented out */}
              </div>
            </div>
            <div className='ModalDescriptioncontact'>
              <h3>Contact</h3>
              {/* Render selected image's contact information */}
              <p>Phone Number: {selectedImagePropertyContact[0]}</p>
              <p>Email: {selectedImagePropertyContact[1]}</p>
                {/* QR Code */}
      <div className="qr-code-container">
        <QRCode value="https://www.example.com" size={128} />
      </div>
            </div>
            <div className='ModalUsercomments'>
              <h3>More features coming :) </h3>
              
             
            </div>
          </div>
        )}
      </Modal>
   
    </div>
  );
}

export default PropertyListing;
