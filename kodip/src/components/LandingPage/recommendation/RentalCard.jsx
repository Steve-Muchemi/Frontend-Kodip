import React from 'react';
import "./recom.css";

const RentalCard = ({image, houseName, amount, rentImg, proName, proAddress}) => {
  return (
    <div className='rental-card'>
        <img src={image} alt="rent-pic" />
        <h3>{houseName}</h3>
        <p>{amount}</p>
        <div className="rent-details">
            <img src={rentImg} alt="thumbnail" />
            <div className="rent-details_text">
                <h4>{proName}</h4>
                <p>{proAddress}</p>
            </div>
        </div>
    </div>
  )
}

export default RentalCard