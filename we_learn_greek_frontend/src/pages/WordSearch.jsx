import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const WordSearch = () => {
  const [index, setIndex] = useState(0);
  const sentences = [
    "Master Greek grammar with ease!",
    "Learn Greek nouns and cases!",
    "Explore Greek declensions!"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % sentences.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    },
    heroSection: {
      position: 'relative',
      height: '572px',
      width: '100%',
    },
    heroVideo: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Dark overlay
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    heroText: {
      fontSize: '3.75rem',
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      zIndex: 1
    },
    searchSection: {
      background: 'linear-gradient(to right, #1d4ed8, #3b82f6)',
      color: 'white',
      padding: '3rem 1.5rem',
      minHeight: '600px',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'column'
    },
    contentWrapper: {
      maxWidth: '56rem',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '2rem'
    },
    title: {
      fontSize: '2.25rem',
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginBottom: '3rem'
    },
    searchContainer: {
      position: 'relative',
      width: '100%',
      maxWidth: '32rem',
      display: 'flex',
      justifyContent: 'center'
    },
    searchInput: {
      width: '100%',
      padding: '1rem',
      paddingLeft: '3rem',
      paddingRight: '5rem',
      borderRadius: '9999px',
      backgroundColor: '#1a1a1a',
      color: 'white',
      border: 'none',
      outline: 'none'
    },
    searchIcon: {
      position: 'absolute',
      left: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#6b7280'
    },
    searchButton: {
      position: 'absolute',
      right: '0.5rem',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '9999px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    helperText: {
      marginTop: '1.5rem',
      fontSize: '0.875rem',
      color: 'white'
    },
    link: {
      color: 'white',
      fontWeight: 'bold',
      textDecoration: 'underline',
      cursor: 'pointer'
    },
    resultsArea: {
      marginTop: '2rem',
      minHeight: '400px',
      width: '100%'
    }
  };

  return (
    <div style={styles.container}>
      {/* Hero Section with Video Background */}
      <div style={styles.heroSection}>
        <video
          src="/src/assets/videos/athens.mp4"
          style={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
        />
        <div style={styles.overlay}>
          <motion.h1
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={styles.heroText}
          >
            {sentences[index]}
          </motion.h1>
        </div>
      </div>

      {/* Search Section */}
      <section style={styles.searchSection}>
        <div style={styles.contentWrapper}>
          <h2 style={styles.title}>Find Any Greek Noun and Explore Its Forms</h2>
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Type a Greek noun..."
              style={styles.searchInput}
            />
            <FaSearch style={styles.searchIcon} size={20} />
            <button 
              style={styles.searchButton}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            >
              Search
            </button>
          </div>
          <p style={styles.helperText}>
            To see all Greek nouns,{' '}
            <Link to="/declinator/nouns" style={styles.link}>
              click here
            </Link>
          </p>
          
          <div style={styles.resultsArea}>
            {/* Search results will appear here */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WordSearch;
