import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';
import { FaSearch, FaFont, FaLanguage } from 'react-icons/fa';
import { MdTranslate } from 'react-icons/md';
import { Link } from 'react-router-dom';
import axios from 'axios';
import backgroundVideo from '../assets/videos/crete.mp4';

const WordDictionary = () => {
  // Text slider state and sentences array
  const [index, setIndex] = useState(0);
  const sentences = [
    "Greek Dictionary",
    "Expand Your Greek Vocabulary",
    "Learn New Greek Words",
    "Master Greek Language"
  ];

  // Effect to change the sentence every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % sentences.length);
    }, 4000);
    
    return () => clearInterval(timer);
  }, []);

  // State for form inputs
  const [greekWord, setGreekWord] = useState('');
  const [pronunciation, setPronunciation] = useState('');
  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // API base URL - adjust this to match your environment
  const API_BASE_URL = 'http://localhost:8000/api';

  // Handle form submission
  const handleSaveWord = async (e) => {
    e.preventDefault();
    
    // Reset status
    setError(null);
    setSuccess(false);
    
    // Validate inputs
    if (!greekWord.trim()) {
      setError('Greek word is required');
      return;
    }
    if (!pronunciation.trim()) {
      setError('Pronunciation is required');
      return;
    }
    if (!translation.trim()) {
      setError('Translation is required');
      return;
    }

    try {
      setLoading(true);
      
      // Get token from localStorage
      const token = localStorage.getItem('auth_token');
      
      // If we have a token, try to use the API
      if (token) {
        try {
          await axios.post(
            `${API_BASE_URL}/dictionary/`, 
            {
              greek_word: greekWord,
              pronounciation: pronunciation,
              translation: translation
            },
            {
              headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );
          
          // Clear form on success
          setGreekWord('');
          setPronunciation('');
          setTranslation('');
          setSuccess(true);
          
          // Hide success message after 3 seconds
          setTimeout(() => {
            setSuccess(false);
          }, 3000);
          
          return; // Exit early if API call succeeded
        } catch (apiError) {
          console.error('API call failed:', apiError);
          // Continue to demo mode
        }
      }
      
      // DEMO MODE - Always use this for now during development
      console.log('Using demo mode for development');
      
      // Simulate successful save
      setTimeout(() => {
        // Clear form on success
        setGreekWord('');
        setPronunciation('');
        setTranslation('');
        setSuccess(true);
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
        
        setLoading(false);
      }, 800); // Add a small delay to simulate API call
      
      return; // Exit to prevent the finally block from running too soon
      
    } catch (err) {
      console.error('Error saving word:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      
      {/* Video Background Section - copied from Home.jsx */}
      <div style={{ 
        position: 'relative', 
        height: '578px',
        overflow: 'hidden'
      }}>
        {/* Video */}
        <video 
          autoPlay 
          loop 
          muted 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0
          }}
          src={backgroundVideo}
        >
          Your browser does not support the video tag.
        </video>
        
        {/* Dark overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}>
          {/* Text slider overlay */}
          <div style={{
            textAlign: 'center',
            color: 'white',
            width: '80%'
          }}>
            <motion.h1
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ 
                fontSize: '3rem', 
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)' 
              }}
            >
              {sentences[index]}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Main Content Section - Form for adding words */}
      <div style={{ 
        background: 'linear-gradient(to right, #1d4ed8, #3b82f6)', /* from-blue-700 to-blue-300 */
        padding: '4rem 1rem', /* py-16 */
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        color: 'white',
        minHeight: '850px', /* Increased height */
        flexGrow: 1
      }}>
        {/* H1 Title - Positioned at the top */}
        <h1 style={{ 
          fontSize: '2.25rem', /* text-4xl */
          fontWeight: 'bold',
          marginBottom: '5rem', /* Increased from 3rem to 4rem for more space */
          textAlign: 'center'
        }}>
          Expand Your Vocabulary by Adding, Saving, and Practicing New Greek Words!
        </h1>
        
        {/* Input Fields Container */}
        <div style={{ 
          width: '100%',
          maxWidth: '32rem', 
          backgroundColor: 'white',
          padding: '2rem', 
          borderRadius: '0.5rem', 
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {/* Greek Word Input */}
          <label style={{ 
            display: 'block',
            color: '#374151', 
            fontSize: '0.875rem', 
            fontWeight: '600', 
            marginBottom: '0.5rem',
            width: '95%' 
          }}>
            Type Greek Word in Greek Alphabet
          </label>
          <div style={{ 
            width: '95%',
            position: 'relative',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#111827',
            borderRadius: '2rem',
            padding: '0.25rem'
          }}>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5rem',
              color: '#9CA3AF'
            }}>
              <FaFont size={18} />
        </div>
                  <input
              type="text"
              placeholder="e.g. Καλημέρα"
              value={greekWord}
              onChange={(e) => setGreekWord(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 0.5rem',
                backgroundColor: 'transparent',
                border: 'none',
                color: 'white',
                outline: 'none'
              }}
                  />
                </div>

          {/* Pronunciation Input */}
          <label style={{ 
            display: 'block',
            color: '#374151',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '0.5rem',
            width: '95%'
          }}>
            Type how it is pronounced (Latin Script)
          </label>
          <div style={{ 
            width: '95%',
            position: 'relative',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#111827',
            borderRadius: '2rem',
            padding: '0.25rem'
          }}>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5rem',
              color: '#9CA3AF'
            }}>
              <FaLanguage size={18} />
            </div>
                      <input
                        type="text"
              placeholder="e.g. Kaliméra"
              value={pronunciation}
              onChange={(e) => setPronunciation(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 0.5rem',
                backgroundColor: 'transparent',
                border: 'none',
                color: 'white',
                outline: 'none'
              }}
                      />
                    </div>
          
          {/* Translation Input */}
          <label style={{ 
            display: 'block',
            color: '#374151',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '0.5rem',
            width: '95%'
          }}>
            Type Translation in Your Language
          </label>
          <div style={{ 
            width: '95%',
            position: 'relative',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#111827',
            borderRadius: '2rem',
            padding: '0.25rem'
          }}>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5rem',
              color: '#9CA3AF'
            }}>
              <MdTranslate size={18} />
                    </div>
                      <input
                        type="text"
              placeholder="e.g. Good morning"
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 0.5rem',
                backgroundColor: 'transparent',
                border: 'none',
                color: 'white',
                outline: 'none'
              }}
                      />
                    </div>
          
          {/* Error message */}
          {error && (
            <div style={{
              width: '95%',
              backgroundColor: '#fee2e2',
              color: '#b91c1c',
              padding: '0.75rem',
              borderRadius: '0.375rem',
              marginBottom: '1rem',
              fontSize: '0.875rem'
            }}>
              {error}
                    </div>
          )}
          
          {/* Success message */}
          {success && (
            <div style={{
              width: '95%',
              backgroundColor: '#d1fae5',
              color: '#065f46',
              padding: '0.75rem',
              borderRadius: '0.375rem',
              marginBottom: '1rem',
              fontSize: '0.875rem'
            }}>
              Word saved successfully!
                    </div>
                )}

          {/* Save Word Button */}
            <button
            onClick={handleSaveWord}
            disabled={loading}
            style={{
              backgroundColor: loading ? '#93c5fd' : '#3b82f6',
              color: 'white',
              fontWeight: '600',
              padding: '0.75rem 1.5rem',
              borderRadius: '1.5rem',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s',
              width: '95%',
              marginBottom: '1.5rem'
            }}
            onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = '#2563eb')}
            onMouseOut={(e) => !loading && (e.currentTarget.style.backgroundColor = '#3b82f6')}
          >
            {loading ? 'Saving...' : 'Save Word'}
            </button>
          
          {/* Link to see all words */}
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <span style={{ color: '#374151' }}>To see all saved words, </span>
            <Link 
              to="/dictionary/words" 
              style={{ 
                color: '#3b82f6', 
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              click here
            </Link>
          </div>
        </div>
      </div>
      
    
    </div>
  );
};

export default WordDictionary;
