import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ImageSlider({ imageUrls }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings}>
      {imageUrls.map((imageUrl, index) => (
        <div key={index}>
          <img src={imageUrl} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </Slider>
  );
}

export default ImageSlider;
