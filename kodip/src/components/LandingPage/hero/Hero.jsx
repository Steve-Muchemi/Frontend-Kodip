import React from 'react';
import map from "../../../assets/images/hero-map.png";
import landlords from "../../../assets/images/landlords.png";
import houses from "../../../assets/images/houses.png";
import fans from "../../../assets/images/thumb1.png";
import locationImg from "../../../assets/images/location.png";
import { Link } from "react-router-dom";

import "./hero.css";
import { ArrowRight2 } from 'iconsax-react';

const Hero = () => {

  const thumbnails = [
    {
      pic: landlords,
      title: "1K+ Landlords",
      text: "Successfully Getting Homes"
    },
    {
      pic: houses,
      title: "56 Houses",
      text: "Sold Monthly"
    },
    {
      pic: fans,
      title: "4K+",
      text: "People Looking for New Homes"
    },
  ]

  return (
    <div className='hero'>
      <div className="hero-left">
        <div className="hero-left_gradient"></div>
        <h1>Your search for the perfect rental ends at <br /> <span>KodiSwift</span> </h1>
        <p>Search and connect with landlords and locals on our Map Interface. You can also choose to recieve rental suggetions via your KodiSwift inbox, WhatsApp or SMS.</p>
        
        <div className="hero-input">
            <img src={locationImg} alt="location-icon" />
            <input type="text" placeholder='Type your wishes away!' />

           <Link to='/map'> 
            <button className='btn'>Search <ArrowRight2 /></button>
            </Link>
        </div>
      </div>
      <div className="hero-right">
        <img src={map} alt="map" />
        <div className="hero-right_thumbnail">
          {thumbnails.map((item,idx) => {
            return(
              <div key={idx} className="each-thumb">
                <img src={item.pic} alt="thumbnail" />
                <div className="thumb-text">
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Hero