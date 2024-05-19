import React from 'react';
import Modal from 'react-modal';
import Imageapp from '../ImageApp/Imageapp';
import RenderAmenities from '../RenderAmenities/RenderAmenities';
import BingMapPin from '../BingMapPin/BingMapPin';
import ListingCard from '../ListingCard/ListingCard';
import './PropertyModal.css';

const PropertyModal = ({ isOpen, selectedImage, closeModal, propertylistings, likedImages, handleLike, openModal }) => {
  if (!selectedImage) return null;

  const amenitiesList = [
    "Aircon",
    "Backup Generator",
    "Balcony",
    "Gym",
    "Parking",
    "Staff Quarters",
    "Garden",
    "Swimming Pool",
    "Borehole"
  ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Image Modal"
      className='Modal'
    >
      <div className='popup'>
        <div className='Modalheader'>
          <p className='Modalheadertitle'>{selectedImage.propertyName}</p>
          <img className='UserImage' src={selectedImage.images[0]} />
          <button className='closeselected' onClick={closeModal}>Close</button>
        </div>
        <Imageapp selected={selectedImage.images} />
        <div className='ModalDescription'>
          <div className='ModalDescriptionbox'>
            <div className='propertyprice'>ksh {selectedImage.price}/mo</div>
            <RenderAmenities amenities={amenitiesList} />
            <hr />
            <h3 className='description'>Property details</h3>
            <p>{selectedImage.description}</p>
          </div>
          <div className='ModalMap'>
            <p>Map</p>
            <BingMapPin coordinates={selectedImage.pushpin.location} />
          </div>
        </div>
       
        <div className='similar'>
        <h3>Similar houses</h3>
        <div className='similar-flex'> 
          {propertylistings.slice(2, 5).map((listing, index) => (
            <ListingCard
              key={index}
              listing={listing}
              isLiked={likedImages[index]}
              onLike={() => handleLike(index)}
              onClick={() => openModal(listing)}
            />
          ))}
        </div>

        </div>
      </div>
    </Modal>
  );
};

export default PropertyModal;
