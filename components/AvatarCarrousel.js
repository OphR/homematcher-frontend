import React, { useState } from 'react';
import styles from '../styles/CarrouselAvatar.module.css';

function AvatarCarrousel() {

  const avatars = [
    'avatar1.png',
    'avatar2.png',
    'avatar3.png',
    'avatar4.png',
    'avatar5.png',
  ];

  const AvatarCarousel = ({ onSelect }) => {
    const [selectedAvatar, setSelectedAvatar] = useState('');

    const handleAvatarClick = (avatar) => {
      setSelectedAvatar(avatar);
      onSelect(avatar);
    };

    return (
      <div className={styles.avatar-carousel}>
        <h2>Choisissez votre avatar</h2>
        <div className={styles.avatar-container}>
          {avatars.map((avatar, index) => (
            <img
              key={index}
              src={require(`../public/avatars/${avatar}`).default} 
              alt={`Avatar ${index + 1}`}
              className={`avatar ${selectedAvatar === avatar ? 'selected' : ''}`}
              onClick={() => handleAvatarClick(avatar)}
            />
          ))}
        </div>
        <div className={styles.arrow-container}>
          <button
            onClick={() => handleAvatarClick(avatars[(avatars.indexOf(selectedAvatar) - 1 + avatars.length) % avatars.length])}
            className={styles.left-arrow}
          >
            &#10094;
          </button>
          <button
            onClick={() => handleAvatarClick(avatars[(avatars.indexOf(selectedAvatar) + 1) % avatars.length])}
            className={styles.right-arrow}
          >
            &#10095;
          </button>
        </div>
      </div>
    );
  };
}

export default AvatarCarrousel;