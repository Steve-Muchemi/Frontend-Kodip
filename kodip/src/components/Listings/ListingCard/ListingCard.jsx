import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './ListingCard.css';

const ListingCard = ({ listing, isLiked, onLike, onClick }) => {
  return (
    <div className='listingCard'>
      <img
        src={listing.images[0]}
        alt={listing.title}
        className='listingImage'
        onClick={onClick}
      />
      <div className='heart-icon' onClick={onLike}>
        <FontAwesomeIcon icon={faHeart} color={isLiked ? 'red' : 'grey'} className='heart-icon-fontAwesome' />
      </div>
      <div className='listingImagedescription'>
        <p>{listing.propertyName}</p>
        <div className='listingDetails'>
          <div>
            <p className='propertyPrice'>ksh {listing.price}</p>
          </div>
          <div>
            <p className='propertyLocation'>
              <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#469af3bd' }} />
              Kasarani, Nairobi, Kenya
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
