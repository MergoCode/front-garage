import React, { useState } from 'react';
import "../css/Carousel.css"
const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    { src: 'src/assets/slide1.jpg', alt: 'Slide 1' },
    { src: 'src/assets/slide2.jpg', alt: 'Slide 2' },
    { src: 'src/assets/slide3.jpg', alt: 'Slide 3' },
    { src: 'src/assets/slide4.jpg', alt: 'Slide 4' },
    { src: 'src/assets/slide5.jpg', alt: 'Slide 5' }
  ];

  const calculatePosition = (index) => {
    const screenWidth = window.innerWidth;
    const positions = images.map((_, i) => {
      const distance = (i - activeIndex + images.length) % images.length;
      let translateZ = 0;
      let translateX = 0;
      let opacity = 1;
      let scale = 1;
      let zIndex = 1;

      if (distance === 0) { // центр
        translateZ = 0;
        translateX = 0;
        scale = 1;
        zIndex = 4;
      } else if (distance === 1) {  //справ а  
        translateZ = -100;
        translateX = screenWidth * 0.35;
        scale = 0.9;
        opacity = 0.5;
        zIndex = 3;
      } else if (distance === images.length - 1) { // зліва
        translateZ = -100;
        translateX = -screenWidth * 0.35;
        opacity = 0.5;
        scale = 0.9;
        zIndex = 3;
      } else if (distance === 2){
        translateZ = -200;
        translateX = screenWidth * 0.3;
        scale = 0.8;
        opacity = 0;
        zIndex = 2;
      } else {
        translateZ = -200;
        translateX =  - screenWidth * 0.3;
        scale = 0.8;
        opacity = 0;
        zIndex = 2;
      }

      return {
        transform: `translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale})`,
        opacity,
        zIndex
      };
    });

    return positions[index];
  };

  const handleImageClick = (clickedIndex) => {
    const distance = (clickedIndex - activeIndex + images.length) % images.length;
    if (distance === 1 || distance === images.length - 1) {
      setActiveIndex(clickedIndex);
    }
    
  };
  const handleMouseEnter = (clickedIndex) => {
    if (clickedIndex === 0) {
      return 
    }
  }
  return (
    <div className='carousel'>
      <div className='carousel__container' >
        {images.map((image, index) => (
          <div
            className='carousel__item'
            key={index}
            onClick={() => handleImageClick(index)}
            onMouseEnter={handleMouseEnter(index)}
            style={{
              ...calculatePosition(index),
            }}
          >
            <img
              className='carousel__image'  
              src={image.src}
              alt={image.alt}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

  
export default Carousel;