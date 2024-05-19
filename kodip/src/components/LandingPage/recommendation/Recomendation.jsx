import React, { useState } from "react";
import "./recom.css";
import { House } from "iconsax-react";
import thumb from "../../../assets/images/thumb1.png";
import house1 from "../../../assets/images/house1.png";
import house3 from "../../../assets/images/house3.png";
import house2 from "../../../assets/images/house2.png";
import house4 from "../../../assets/images/house4.png";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import RentalCard from "./RentalCard";

const Recomendation = () => {
    const mobileWidth = window.innerWidth <= 900;
  const [active, setActive] = useState("Rental units");

  const clickTab = (item) => {
    setActive(item.text);
  };

  const rentals = [
    {
      icon: "",
      text: "Rental units",
    },
    {
      icon: "",
      text: "Studio apartment",
    },
    {
      icon: "",
      text: "One bedroom",
    },
    {
      icon: "",
      text: "Two Bedroom",
    },
  ];

  const rentalCard = [
    {
      image: house1,
      houseName: "Roselands House",
      amount: "$ 20.000.000",
      rentImg: thumb,
      proName: "Ronald Richards",
      proAddress: "Manchester, Kentucky",
    },
    {
      image: house2,
      houseName: "Westland House",
      amount: "$ 20.000.000",
      rentImg: thumb,
      proName: "Greg Immaculate",
      proAddress: "Manchester, Kentucky",
    },
    {
      image: house3,
      houseName: "Eastlands House",
      amount: "$ 20.000.000",
      rentImg: thumb,
      proName: "Blessing Ibe",
      proAddress: "Manchester, Kentucky",
    },
    {
      image: house4,
      houseName: "Greenlands House",
      amount: "$ 20.000.000",
      rentImg: thumb,
      proName: "Lakeside Annette",
      proAddress: "Manchester, Kentucky",
    },
    {
      image: house1,
      houseName: "Roselands House",
      amount: "$ 20.000.000",
      rentImg: thumb,
      proName: "Ronald Richards",
      proAddress: "Manchester, Kentucky",
    },
    {
      image: house2,
      houseName: "Westland House",
      amount: "$ 20.000.000",
      rentImg: thumb,
      proName: "Greg Immaculate",
      proAddress: "Manchester, Kentucky",
    },
    {
      image: house3,
      houseName: "Eastlands House",
      amount: "$ 20.000.000",
      rentImg: thumb,
      proName: "Blessing Ibe",
      proAddress: "Manchester, Kentucky",
    },
    {
      image: house4,
      houseName: "Greenlands House",
      amount: "$ 20.000.000",
      rentImg: thumb,
      proName: "Lakeside Annette",
      proAddress: "Manchester, Kentucky",
    },
  ];

  return (
    <div className="recom">
      <div className="recom-line_head">
        <div className="recom-line"></div>
        <p>Our Recommendation</p>
      </div>
      <div className="featured-rentals">
        <h3>Featured Rentals</h3>
        <div className="rentals-div">
          {rentals.map((item, idx) => {
            return (
              <div
                onClick={() => clickTab(item)}
                className={
                  item.text === active
                    ? "each-rental active-rent"
                    : "each-rental"
                }
                key={idx}
              >
                <House color={item.text === active ? "#10B981" : "#888B97"} />
                <p>{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Autoplay]}
        style={{
          "--swiper-navigation-size": "20px",
        }}
        spaceBetween={30}
        slidesPerView={mobileWidth ? 1 : 4}
        // loop={true}
        className="my-swiper"
        navigation
      >
      {rentalCard.map(({ image, houseName, amount, rentImg, proName, proAddress }, idx) => (
        <SwiperSlide key={idx}>
          <RentalCard
            image={image}
            houseName={houseName}
            amount={amount}
            rentImg={rentImg}
            proAddress={proAddress}
            proName={proName}
          />
        </SwiperSlide>
      ))}
      </Swiper>
    </div>
  );
};

export default Recomendation;
