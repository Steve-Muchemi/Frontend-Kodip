import React from "react";
import "./review.css";
import ReviewCard from "./ReviewCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

const Review = () => {
    const mobileWidth = window.innerWidth <= 900;
  return (
    <div className="review">
      <div className="tip-tricks_head review-head">
        <div className="line review-line"></div>
        <p>See Our Review</p>
        <h2>What Our User Say About Kodip</h2>
      </div>
      <div className="review-cards">
        <Swiper
        // effect={'coverflow'}
        grabCursor={true}
        // centeredSlides={true}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        spaceBetween={20}
        slidesPerView={mobileWidth ? 1 : 2.5}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
        //   slideShadows: true,
        }}
        pagination={true}
        modules={[Autoplay, EffectCoverflow, Pagination]}
        className="mySwiper"
        style={{"--swiper-pagination-color": "#02411B", "--swiper-pagination-bullet-inactive-color": "white", "--swiper-pagination-bullet-inactive-opacity": "1",}}
        >
          <SwiperSlide>
            <ReviewCard />
          </SwiperSlide>
          <SwiperSlide>
            <ReviewCard />
          </SwiperSlide>
          <SwiperSlide>
            <ReviewCard />
          </SwiperSlide>
          <SwiperSlide>
            <ReviewCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Review;
