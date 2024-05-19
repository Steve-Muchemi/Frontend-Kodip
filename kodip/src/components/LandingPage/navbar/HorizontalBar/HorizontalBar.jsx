import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faMoneyBillAlt,
  faSwimmingPool,
  faCalendarAlt,
  faHome,
  faCity,
  faCar,
  faDog,
  faSnowflake,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import './HorizontalBar.css'; 

const HorizontalBar = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [showSubOptions, setShowSubOptions] = useState(false);
  const [selectedSubOption, setSelectedSubOption] = useState('');
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowSubOptions(true);
  };
  const handleSubOptionClick = (subOption) => {
    setSelectedSubOption(subOption);
    setShowSubOptions(false);
  };
  const options = [
    {
      name: 'House',
      icon: faBuilding,
      subOptions: [
        { name: 'Apartment', icon: faBuilding },
        { name: 'Condo', icon: faHome },
        { name: 'Townhouse', icon: faBuilding },
        { name: 'Villa', icon: faCity },
        { name: 'Bungalow', icon: faHome },
      ],
    },
    {
      name: 'Price',
      icon: faMoneyBillAlt,
      subOptions: [
        { name: 'Less than $1000', icon: faMoneyBillAlt },
        { name: '$1000 - $2000', icon: faMoneyBillAlt },
        { name: '$2000 - $3000', icon: faMoneyBillAlt },
        { name: 'More than $3000', icon: faMoneyBillAlt },
      ],
    },
    {
      name: 'Amenities',
      icon: faSwimmingPool,
      subOptions: [
        { name: 'Swimming Pool', icon: faSwimmingPool },
        { name: 'Gym', icon: faSnowflake },
        { name: 'Parking', icon: faCar },
        { name: 'Security', icon: faBuilding },
        { name: 'Pet Friendly', icon: faDog },
      ],
    },
    {
      name: 'Rent',
      icon: faCalendarAlt,
      subOptions: [
        { name: 'Monthly', icon: faCalendarAlt },
        { name: 'Yearly', icon: faCalendarAlt },
      ],
    },
  ];

  //const ShowHorizontalbar = ? 'horizontal-bar-special' : 'horizontal-bar';
  return (
    <div className="horizontal-bar">
      {options.map((option, index) => (
        <div key={index} className="option" onClick={() => handleOptionClick(option.name)}>
          <div className="option-tile">
            <FontAwesomeIcon icon={option.icon} className="option-icon" />
            <span className="option-name">{option.name}</span>
          </div>
        </div>
      ))}
      {showSubOptions && (
        <div className="sub-options">
          {options
            .find((option) => option.name === selectedOption)
            .subOptions.map((subOption, index) => (
              <div
                key={index}
                className="sub-option"
                onClick={() => handleSubOptionClick(subOption.name)}
              >
                <div className="sub-option-tile">
                  <FontAwesomeIcon icon={subOption.icon} className="sub-option-icon" />
                  <span className="sub-option-name">{subOption.name}</span>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default HorizontalBar;
