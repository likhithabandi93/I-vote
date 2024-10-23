// src/components/ImageSlider.jsx
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  const images = [
    '/home2.png',
    '/home3.png',
    '/home4.png',
    '/home5.png',
  ];

  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Loop the slides
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll on each action
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Autoplay speed in milliseconds
    arrows: true, // Show next and prev arrows
    responsive: [
      {
        breakpoint: 1024, // Screen width <= 1024px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600, // Screen width <= 600px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480, // Screen width <= 480px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (

    <div className='w-full bg-blue-950 p-4 mt-3'>
      <div className="w-full max-w-4xl mx-auto py-8">
        <Slider {...settings}>
          {images.map((imgSrc, index) => (
            <div key={index} className="px-2">
              <img 
                src={imgSrc} 
                alt={`Slide ${index + 1}`} 
                className="w-full h-80 object-cover rounded-lg shadow-md" 
              />
            </div>
          ))}
        </Slider>
      </div>

        <div className="text-center text-white">
            <h1 className="text-2xl font-bold">Welcome to iVote</h1>
            <p className="text-lg">Vote for your favorite candidate</p>
            </div>
    </div>

 
  );
};

export default ImageSlider;
