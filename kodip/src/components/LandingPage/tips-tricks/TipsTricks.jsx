import React from "react";
import "./tip-tricks.css";
import pic1 from "../../../assets/images/pic1.png";
import pic2 from "../../../assets/images/pic2.png";
import pic3 from "../../../assets/images/pic3.png";
import thumb1 from "../../../assets/images/thumb1.png";
import thumb2 from "../../../assets/images/thumb2.png";
import thumb3 from "../../../assets/images/thumb3.png";
import thumb4 from "../../../assets/images/thumb4.png";
import detailedPic from "../../../assets/images/detailed-pic.png";
import { Clock } from "iconsax-react";

const TipsTricks = () => {
  const cardDetails = [
    {
      pic: pic1,
      thumbnail: thumb1,
      name: "Dianne Russell",
      text: "The things we need to check when we want to buy a house",
      time: "4 min read | 25 Apr 2021",
    },
    {
      pic: pic2,
      thumbnail: thumb2,
      name: "Courtney Henry",
      text: "7 Ways to distinguish the quality of the house we want to buy",
      time: "6 min read | 24 Apr 2021",
    },
    {
      pic: pic3,
      thumbnail: thumb3,
      name: "Darlene Robertson",
      text: "The best way to know the quality of the house we want to buy",
      time: "2 min read | 24 Apr 2021",
    },
  ];

  return (
    <div className="tips-tricks">
      <div className="tip-tricks_head">
        <div className="line"></div>
        <p>See tips and trick from our partnership</p>
        <h2>
          Find out more about <br /> selling and buying homes
        </h2>
        <div className="tip-btn_cont">
          <button className="btn">More Article</button>
        </div>
      </div>
      <div className="tips-tricks_body">
        <div className="tips-tricks_body-left">
          {cardDetails.map((item, idx) => {
            return (
              <div key={idx} className="tips-card">
                <img src={item.pic} alt="house-img" />
                <div className="tips-card_text">
                  <div className="cards-name">
                    <img src={item.thumbnail} alt="thumbnail" />
                    <p>{item.name}</p>
                  </div>
                  <h3>{item.text}</h3>
                  <p>
                    <Clock />
                    {item.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="tips-tricks_body-right">
          <img src={detailedPic} alt="house-img" />
          <div className="tips-card_text">
            <div className="cards-name">
              <img src={thumb4} alt="thumbnail" />
              <p>Cameron Williamson</p>
            </div>
            <h3>12 Things to know before buying a house</h3>
            <h4>Want to buy a house but are unsure about what we should know, here I will try to explain what we should know and check when we want to buy a house</h4>
            <p>
              <Clock />
              8 min read | 25 Apr 2021
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipsTricks;
