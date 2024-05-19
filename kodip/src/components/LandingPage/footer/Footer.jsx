import React from 'react';
import logo from "../../../assets/images/logo.png";
import facebook from "../../../assets/images/facebook.png";
import twitter from "../../../assets/images/twitter.png";
import instagram from "../../../assets/images/instagram.png";

import "./footer.css";

const Footer = () => {

  const property = [
    {
      title: "House",
      link: ""
    },
    {
      title: "Apartment",
      link: ""
    },
    {
      title: "Villa",
      link: ""
    },
  ]

  const article = [
    {
      title: "New Article",
      link: ""
    },
    {
      title: "Popular Article",
      link: ""
    },
    {
      title: "Most Read",
      link: ""
    },
    {
      title: "Tips & Tricks",
      link: ""
    },
  ]

  const contact = [
    {
      title: "Kasarani, Nairobi",
      link: ""
    },
    {
      title: "+254 7623 8181 3",
      link: ""
    },
    {
      title: "info@kodiswift.com",
      link: ""
    },
  ]

  return (
    <div className='footer'>
      <div className="footer-left">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <p>We provide information about properties such as houses, villas and apartments to help people find their dream home</p>
        <div className="footer-social_links">
          <img src={facebook} alt="facebook" />
          <img src={twitter} alt="twitter" />
          <img src={instagram} alt="instagram" />
        </div>
      </div>
      <div className="footer-right">
        <div className="footer-right_gradient"></div>
        <div className="footer-right_gradient2"></div>
        <div className="footer-links">
          <h3>Property</h3>
          {property.map((item,idx) => {
            return (
              <ul key={idx}>
                <li>{item.title}</li>
              </ul>
            )
          })}
        </div>
        <div className="footer-links">
          <h3>Article</h3>
          {article.map((item,idx) => {
            return (
              <ul key={idx}>
                <li>{item.title}</li>
              </ul>
            )
          })}
        </div>
        <div className="footer-links">
          <h3>Contact</h3>
          {contact.map((item,idx) => {
            return (
              <ul key={idx}>
                <li>{item.title}</li>
              </ul>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Footer