import React from 'react';
import { ReactBingmaps } from 'react-bingmaps';
import './BingMapPin.css';
import { Link } from 'react-router-dom';

const BingMapPin = ({ coordinates }) => {
  const mapOptions = {
    credentials: "AimaoVvThYG5kUK8jG8Gya7X7Q1lHKXk54RztUw2UNUGJR9Bbkna4DDkYqOWeHjv",
  };

  const pushpins = [
    {
      location: coordinates,
      option: { color: 'black' } // Customize pin color if needed
    }
  ];

  return (
    <div className='BingMapPin'>
      <ReactBingmaps
        bingmapKey={mapOptions.credentials}
        center={coordinates}
        pushPins={pushpins}
        style={{ width: "100%", height: "100%" }}
      />
      <div className="property-on-maps-button-container">
      <Link to="/map" className="property-on-maps-button">See Property on Maps?</Link>
    </div>
    </div>
  );
}

export default BingMapPin;
