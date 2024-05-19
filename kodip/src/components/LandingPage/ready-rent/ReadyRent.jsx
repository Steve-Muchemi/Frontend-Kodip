import React from "react";
import "./ready-rent.css";
import rentImg from "../../../assets/images/thumb3.png";
import { Call } from "iconsax-react";
import star from "../../../assets/images/star.png";
import bed from "../../../assets/images/bed.png";
import bath from "../../../assets/images/bath.png";
import car from "../../../assets/images/car-garage.png";
import stairs from "../../../assets/images/stairs.png";

const ReadyRent = () => {
    const mobileWidth = window.innerWidth <= 900;
  return (
    <div className="ready-rent">
      <div className="recom-line_head">
        <div className="recom-line"></div>
        <p>Ready rent!</p>
      </div>
      <div className="ready-rent-body">
        <div className="ready-rent_left">
          <h2>
            Let’s Make a search and
            {!mobileWidth && <br />} Find our dream rental!
          </h2>
          <p>
            You can easily search through our interactive map and connect with a
            Landlord instantly via our chat interface!
          </p>
          <div className="house-details">
            <h4>House Detail</h4>
            <div className="house-spec">
              <h5>
                <span><img src={bed} alt="icons" /> 4 Bedrooms</span><span><img src={bath} alt="icons" /> 2 Bathrooms</span>
              </h5>
              <div className="rent-left_line"></div>
              <h5>
                <span><img src={car} alt="icons" /> 1 Carport</span><span><img src={stairs} alt="icons" /> 2 Floors</span>
              </h5>
            </div>
            <div className="rent-details">
              <img src={rentImg} alt="thumbnail" />
              <div className="rent-details_text">
                <h4>Dianne Russell</h4>
                <p>Manager Director</p>
              </div>
            </div>
            <div className="btn rent-btn" style={{width: "150px"}}><Call /> Send an <br /> Iquiery</div>
            {!mobileWidth && <div className="rating"><img src={star} alt="star" /><p>4.6</p></div>}
          </div>
        </div>
        <div className="ready-rent_right"></div>
      </div>
    </div>
  );
};

export default ReadyRent;
