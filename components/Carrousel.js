import React, { useState } from 'react';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ImageCarousel = ({ images }) => {
  // State pour l'index de l'image actuelle
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fonction pour aller à l'image suivante
  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Fonction pour revenir à l'image précédente
  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // Rendu du carrousel
  return (
    <div className="carousel">
        <img className="img" src={images[currentIndex]}  />
        <div className="parentArrow">
          <FontAwesomeIcon icon={faArrowLeft} onClick={goToPrevious} className="arrow"/>
          <FontAwesomeIcon icon={faArrowRight} onClick={goToNext} className="arrow"/>
        </div>
    </div>
  );
};

export default ImageCarousel;