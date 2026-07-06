import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import backgroundVideo from '../assets/videos/sea.mp4';

// Import flag images
import ukFlag from '../assets/images/flags/uk.png';
import frFlag from '../assets/images/flags/france.png';
import deFlag from '../assets/images/flags/germany.png';
import esFlag from '../assets/images/flags/spain.png';
import ruFlag from '../assets/images/flags/russia.png';
import itFlag from '../assets/images/flags/italy.png';

const TransparentLanguageSelect = () => {
  const navigate = useNavigate();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  // Text slider content
  const sliderTexts = [
    "Discover Greek Roots in Other Languages",
    "Explore how Greek shaped English, French, German, Spanish, and more",
    "Learn the etymology of words derived from Greek",
    "See the influence of Greek across modern languages",
    "Uncover the hidden Greek origins in everyday vocabulary"
  ];
  
  // Text slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % sliderTexts.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Languages with flag images
  const languages = [
    { code: 'en', name: 'English', countryCode: 'GB', flag: ukFlag },
    { code: 'fr', name: 'French', countryCode: 'FR', flag: frFlag },
    { code: 'de', name: 'German', countryCode: 'DE', flag: deFlag },
    { code: 'es', name: 'Spanish', countryCode: 'ES', flag: esFlag },
    { code: 'ru', name: 'Russian', countryCode: 'RU', flag: ruFlag },
    { code: 'it', name: 'Italian', countryCode: 'IT', flag: itFlag }
  ];

  const handleSelect = (code) => {
    navigate(`/transparent-words/${code}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Video Header Section */}
      <div style={{ 
        position: 'relative', 
        width: '100%',
        height: '578px',
        maxWidth: '1840px',
        overflow: 'hidden'
      }}>
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          style={{ 
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark Overlay */}
        <div style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}></div>
        
        {/* Title on Video with Text Slider */}
        <div style={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '80%'
        }}>
          <motion.h1
            key={currentTextIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold',
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)' 
            }}
          >
            {sliderTexts[currentTextIndex]}
          </motion.h1>
        </div>
      </div>
      
      {/* Language Selection Section (Below Video) */}
      <div style={{ 
        padding: '60px 20px',
        width: '100%',
        background: 'linear-gradient(to right, #1d4ed8, #3b82f6)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '40px',
          color: 'white',
          fontSize: '1.8rem'
        }}>
          Choose Your Language
        </h2>
        
        {/* Language Cards with Flag Images */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          maxWidth: '1000px'
        }}>
          {languages.map((lang) => (
            <div
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '30px 20px',
                width: '170px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '15px',
                overflow: 'hidden'
              }}>
                {/* Use actual flag image instead of country code */}
                <img 
                  src={lang.flag} 
                  alt={`${lang.name} flag`} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <div style={{
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold'
              }}>
                {lang.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransparentLanguageSelect;
