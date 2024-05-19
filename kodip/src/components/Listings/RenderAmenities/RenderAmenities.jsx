import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSnowflake, faBolt, faDumbbell, faParking, faUserFriends,
  faTree, faSwimmingPool, faWater, faCouch, faWifi, faShieldAlt,
  faArrowUp, faDog, faTshirt, faWheelchair, faPeopleArrows, faTools, faLightbulb
} from '@fortawesome/free-solid-svg-icons';
import './RenderAmenities.css';

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

export default RenderAmenities;
