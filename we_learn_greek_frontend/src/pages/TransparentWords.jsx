import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaSearch, FaVolumeUp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';

const TransparentWords = () => {
  const { language } = useParams(); // Get language from URL parameter
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredWords, setFilteredWords] = useState([]);
  const [expandedWord, setExpandedWord] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(''); // Add category filter state
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // API base URL - adjust this to match your environment
  const API_BASE_URL = 'http://localhost:8000/api';

  // Language display names
  const languageNames = {
    'en': 'English',
    'fr': 'French',
    'de': 'German',
    'es': 'Spanish',
    'ru': 'Russian',
    'it': 'Italian'
  };

  // Fetch transparent words from API
  useEffect(() => {
  const fetchWords = async () => {
    try {
      setLoading(true);
        
        // For development, use demo data
        // In production, uncomment the API call below
        /*
        const response = await axios.get(`${API_BASE_URL}/transparent-words/language/${language}/`);
        const data = response.data;
        setWords(data);
        setFilteredWords(data);
        */
        
        // DEMO DATA - Always load this for now during development
        console.log('Loading demo data for development');
        const demoWords = [
          { 
            id: 1, 
            greek_word: 'δημοκρατία',
            language_word: 'democracy',
            pronunciation: 'dimokratía',
            etymology: 'From Greek "demos" (people) and "kratos" (power)',
            example_greek: 'Η δημοκρατία είναι σημαντική.',
            example_translation: 'Democracy is important.',
            category: 'politics'
          },
          { 
            id: 2, 
            greek_word: 'φιλοσοφία',
            language_word: 'philosophy',
            pronunciation: 'filosofía',
            etymology: 'From Greek "philo" (love) and "sophia" (wisdom)',
            example_greek: 'Η φιλοσοφία μας βοηθά να καταλάβουμε τη ζωή.',
            example_translation: 'Philosophy helps us understand life.',
            category: 'academics'
          },
          { 
            id: 3, 
            greek_word: 'τηλέφωνο',
            language_word: 'telephone',
            pronunciation: 'tiléfono',
            etymology: 'From Greek "tele" (far) and "phone" (voice)',
            example_greek: 'Το τηλέφωνό μου χτυπάει.',
            example_translation: 'My telephone is ringing.',
            category: 'technology'
          },
          { 
            id: 4, 
            greek_word: 'γεωγραφία',
            language_word: 'geography',
            pronunciation: 'geografía',
            etymology: 'From Greek "geo" (earth) and "graphia" (writing)',
            example_greek: 'Μου αρέσει η γεωγραφία.',
            example_translation: 'I like geography.',
            category: 'academics'
          },
          { 
            id: 5, 
            greek_word: 'μουσική',
            language_word: 'music',
            pronunciation: 'mousikí',
            etymology: 'From Greek "mousike" (art of the Muses)',
            example_greek: 'Η μουσική είναι η γλώσσα της ψυχής.',
            example_translation: 'Music is the language of the soul.',
            category: 'arts'
          },
          { 
            id: 6, 
            greek_word: 'αστρονομία',
            language_word: 'astronomy',
            pronunciation: 'astronomía',
            etymology: 'From Greek "astron" (star) and "nomos" (law)',
            example_greek: 'Η αστρονομία είναι η μελέτη των ουράνιων σωμάτων.',
            example_translation: 'Astronomy is the study of celestial bodies.',
            category: 'science'
          },
          { 
            id: 7, 
            greek_word: 'βιολογία',
            language_word: 'biology',
            pronunciation: 'viología',
            etymology: 'From Greek "bios" (life) and "logia" (study)',
            example_greek: 'Η βιολογία είναι η επιστήμη της ζωής.',
            example_translation: 'Biology is the science of life.',
            category: 'science'
          }
        ];
        
        // Adjust demo data based on selected language
        const localizedDemoWords = demoWords.map(word => {
          // Adjust language_word based on selected language
          // This is just for demo purposes - in production, the API would return the correct words
          let localizedWord = {...word}; // Create a copy to avoid mutating the original
          
          if (language === 'fr') {
            if (word.greek_word === 'δημοκρατία') localizedWord.language_word = 'démocratie';
            if (word.greek_word === 'φιλοσοφία') localizedWord.language_word = 'philosophie';
            if (word.greek_word === 'τηλέφωνο') localizedWord.language_word = 'téléphone';
            if (word.greek_word === 'γεωγραφία') localizedWord.language_word = 'géographie';
            if (word.greek_word === 'μουσική') localizedWord.language_word = 'musique';
            if (word.greek_word === 'αστρονομία') localizedWord.language_word = 'astronomie';
            if (word.greek_word === 'βιολογία') localizedWord.language_word = 'biologie';
          } else if (language === 'de') {
            if (word.greek_word === 'δημοκρατία') localizedWord.language_word = 'Demokratie';
            if (word.greek_word === 'φιλοσοφία') localizedWord.language_word = 'Philosophie';
            if (word.greek_word === 'τηλέφωνο') localizedWord.language_word = 'Telefon';
            if (word.greek_word === 'γεωγραφία') localizedWord.language_word = 'Geographie';
            if (word.greek_word === 'μουσική') localizedWord.language_word = 'Musik';
            if (word.greek_word === 'αστρονομία') localizedWord.language_word = 'Astronomie';
            if (word.greek_word === 'βιολογία') localizedWord.language_word = 'Biologie';
          } else if (language === 'es') {
            if (word.greek_word === 'δημοκρατία') localizedWord.language_word = 'democracia';
            if (word.greek_word === 'φιλοσοφία') localizedWord.language_word = 'filosofía';
            if (word.greek_word === 'τηλέφωνο') localizedWord.language_word = 'teléfono';
            if (word.greek_word === 'γεωγραφία') localizedWord.language_word = 'geografía';
            if (word.greek_word === 'μουσική') localizedWord.language_word = 'música';
            if (word.greek_word === 'αστρονομία') localizedWord.language_word = 'astronomía';
            if (word.greek_word === 'βιολογία') localizedWord.language_word = 'biología';
          }
          
          return localizedWord;
        });
        
        setWords(localizedDemoWords);
        setFilteredWords(localizedDemoWords);
        
        setLoading(false);
    } catch (err) {
        console.error('Error fetching transparent words:', err);
        setError('Failed to load words. Please try again later.');
      setLoading(false);
    }
  };

    fetchWords();
  }, [language]);

  // Filter words based on search term and category
  useEffect(() => {
    let result = words;
    
    // Apply category filter
    if (categoryFilter) {
      result = result.filter(word => word.category === categoryFilter);
    }
    
    // Apply search term
    if (searchTerm.trim() !== '') {
      result = result.filter(word => 
        word.greek_word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.language_word.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredWords(result);
  }, [searchTerm, categoryFilter, words]);

  // Get unique categories for filter
  const categories = [...new Set(words.map(word => word.category))];

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Toggle expanded word
  const toggleExpandWord = (id) => {
    if (expandedWord === id) {
      setExpandedWord(null);
    } else {
      setExpandedWord(id);
    }
  };

  // Handle text-to-speech
  const speakWord = (text, isGreek = true) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = isGreek ? 'el-GR' : language === 'en' ? 'en-GB' : 
                      language === 'fr' ? 'fr-FR' : 
                      language === 'de' ? 'de-DE' : 
                      language === 'es' ? 'es-ES' : 
                      language === 'ru' ? 'ru-RU' : 
                      language === 'it' ? 'it-IT' : 'en-GB';
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser.');
    }
  };

  // Get current words for pagination
  const indexOfLastWord = currentPage * itemsPerPage;
  const indexOfFirstWord = indexOfLastWord - itemsPerPage;
  const currentWords = filteredWords.slice(indexOfFirstWord, indexOfLastWord);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Go to next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredWords.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '60px', // For fixed navbar
      backgroundColor: '#f3f4f6'
    },
    content: {
      padding: '2rem 1.5rem',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%'
    },
    titleSection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem'
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      color: '#1f2937'
    },
    searchContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginBottom: '2rem',
      '@media (min-width: 768px)': {
        flexDirection: 'row'
      }
    },
    searchWrapper: {
      position: 'relative',
      flex: '1',
      maxWidth: '500px'
    },
    searchInput: {
      width: '100%',
      padding: '0.75rem 1rem 0.75rem 3rem',
      borderRadius: '9999px',
      backgroundColor: '#1a1a1a',
      color: 'white',
      border: 'none',
      outline: 'none',
      '::placeholder': {
        color: '#FFFFFF',
        opacity: 0.7
      }
    },
    searchIcon: {
      position: 'absolute',
      left: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#6b7280'
    },
    filterSelect: {
      padding: '0.75rem 1rem',
      borderRadius: '9999px',
      backgroundColor: '#1a1a1a',
      color: 'white',
      border: 'none',
      outline: 'none',
      minWidth: '200px',
      appearance: 'none',
      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'white\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 1rem center',
      backgroundSize: '1.5em 1.5em',
    },
    wordCard: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      marginBottom: '1.5rem',
      overflow: 'hidden'
    },
    wordHeader: {
      padding: '1.25rem',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer'
    },
    wordTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    greekWord: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1f2937'
    },
    languageWord: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#4b5563'
    },
    wordCategory: {
      display: 'inline-block',
      padding: '0.25rem 0.75rem',
      backgroundColor: '#e5e7eb',
      color: '#4b5563',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      fontWeight: '500'
    },
    wordContent: {
      padding: '1.5rem'
    },
    contentSection: {
      marginBottom: '1.5rem'
    },
    sectionTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    sectionText: {
      color: '#4b5563',
      lineHeight: '1.5'
    },
    exampleBox: {
      backgroundColor: '#f3f4f6',
      padding: '1rem',
      borderRadius: '0.375rem',
      marginTop: '0.5rem'
    },
    speakButton: {
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: '#3b82f6',
      display: 'flex',
      alignItems: 'center',
      padding: '0.25rem'
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '3rem',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    },
    errorContainer: {
      padding: '2rem',
      backgroundColor: '#fee2e2',
      color: '#b91c1c',
      borderRadius: '0.5rem',
      textAlign: 'center'
    },
    emptyContainer: {
      padding: '3rem',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      textAlign: 'center'
    },
    emptyText: {
      fontSize: '1.125rem',
      color: '#4b5563',
      marginBottom: '1rem'
    },
    backLink: {
      display: 'inline-block',
      padding: '0.75rem 1.5rem',
      backgroundColor: '#3b82f6',
      color: 'white',
      textDecoration: 'none',
      fontWeight: '500',
      borderRadius: '0.375rem',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      transition: 'background-color 0.2s',
      cursor: 'pointer'
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '2rem',
      gap: '0.5rem'
    },
    pageButton: {
      padding: '0.5rem 0.75rem',
      backgroundColor: '#f3f4f6',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      color: '#4b5563',
      transition: 'all 0.2s'
    },
    activePageButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
      border: '1px solid #3b82f6'
    },
    pageNavButton: {
      padding: '0.5rem 0.75rem',
      backgroundColor: 'white',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#4b5563',
      transition: 'all 0.2s'
    },
    disabledNavButton: {
      opacity: 0.5,
      cursor: 'not-allowed'
    }
  };

  return (
    <div style={styles.container}>
      {/* Content Section */}
      <main style={styles.content}>
        {/* Title Section */}
        <div style={styles.titleSection}>
          <h2 style={styles.title}>Greek Words in {languageNames[language] || 'Other Languages'}</h2>
          <Link to="/transparent-language-select" style={styles.backLink}>
            Return to language selection
          </Link>
        </div>

        {/* Search */}
        <div style={styles.searchContainer}>
          <div style={styles.searchWrapper}>
            <FaSearch style={styles.searchIcon} size={18} />
            <input
              type="text"
              placeholder="Search words..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                ...styles.searchInput,
                '::placeholder': { color: '#FFFFFF' }
              }}
              className="white-placeholder"
            />
          </div>
          
          {/* Add a style tag for the placeholder */}
          <style>
            {`
              .white-placeholder::placeholder {
                color: #FFFFFF;
                opacity: 0.7;
              }
            `}
          </style>
        </div>

        {/* Category Filter */}
        <div style={{ marginBottom: '1.5rem' }}>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Results */}
        {loading ? (
          <div style={styles.loadingContainer}>
            <p>Loading words...</p>
          </div>
        ) : error ? (
          <div style={styles.errorContainer}>
            <p>Error: {error}</p>
            <p>Please try again later or contact support.</p>
          </div>
        ) : filteredWords.length === 0 ? (
          <div style={styles.emptyContainer}>
            <p style={styles.emptyText}>
              {searchTerm || categoryFilter ? 'No words match your search criteria.' : 'No words found for this language.'}
            </p>
            <Link to="/transparent-language-select" style={{...styles.backLink, display: 'inline-block', marginTop: '1rem'}}>
              Choose Another Language
            </Link>
          </div>
        ) : (
          <div>
            {currentWords.map((word) => (
              <div key={word.id} style={styles.wordCard}>
                <div 
                  style={styles.wordHeader}
                  onClick={() => toggleExpandWord(word.id)}
                >
                  <div style={styles.wordTitle}>
                    <span style={styles.greekWord}>{word.greek_word}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        speakWord(word.greek_word, true);
                      }}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#3b82f6',
                      }}
                      title="Listen to Greek pronunciation"
                    >
                      <FaVolumeUp size={16} />
                    </button>
                    <span style={{margin: '0 0.5rem'}}>→</span>
                    <span style={styles.languageWord}>{word.language_word}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        speakWord(word.language_word, false);
                      }}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#3b82f6',
                      }}
                      title={`Listen to ${languageNames[language]} pronunciation`}
                    >
                      <FaVolumeUp size={16} />
                    </button>
                    <span style={styles.wordCategory}>{word.category}</span>
                  </div>
                  <div>
                    {expandedWord === word.id ? 'Hide Details' : 'Show Details'}
                  </div>
                </div>
                
                {expandedWord === word.id && (
                  <div style={styles.wordContent}>
                    <div style={styles.contentSection}>
                      <h3 style={styles.sectionTitle}>Pronunciation</h3>
                      <p style={styles.sectionText}>{word.pronunciation}</p>
                    </div>
                    
                    <div style={styles.contentSection}>
                      <h3 style={styles.sectionTitle}>Etymology</h3>
                      <p style={styles.sectionText}>{word.etymology}</p>
                    </div>
                    
                    <div style={styles.contentSection}>
                      <h3 style={styles.sectionTitle}>Example</h3>
                      <div style={styles.exampleBox}>
                        <p style={{...styles.sectionText, fontStyle: 'italic', marginBottom: '0.5rem'}}>
                          {word.example_greek}
                          <button 
                            onClick={() => speakWord(word.example_greek, true)}
                            style={{
                              backgroundColor: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              color: '#3b82f6',
                              marginLeft: '0.5rem'
                            }}
                            title="Listen to Greek example"
                          >
                            <FaVolumeUp size={14} />
                          </button>
                        </p>
                        <p style={styles.sectionText}>
                          {word.example_translation}
                          <button 
                            onClick={() => speakWord(word.example_translation, false)}
                            style={{
                              backgroundColor: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              color: '#3b82f6',
                              marginLeft: '0.5rem'
                            }}
                            title={`Listen to ${languageNames[language]} example`}
                          >
                            <FaVolumeUp size={14} />
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Pagination */}
            {filteredWords.length > itemsPerPage && (
              <div style={styles.pagination}>
                <button 
                  onClick={prevPage} 
                  style={{
                    ...styles.pageNavButton,
                    ...(currentPage === 1 ? styles.disabledNavButton : {})
                  }}
                  disabled={currentPage === 1}
                >
                  <FaChevronLeft size={14} />
                </button>
                
                {Array.from({ length: Math.ceil(filteredWords.length / itemsPerPage) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    style={{
                      ...styles.pageButton,
                      ...(currentPage === index + 1 ? styles.activePageButton : {})
                    }}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={nextPage} 
                  style={{
                    ...styles.pageNavButton,
                    ...(currentPage === Math.ceil(filteredWords.length / itemsPerPage) ? styles.disabledNavButton : {})
                  }}
                  disabled={currentPage === Math.ceil(filteredWords.length / itemsPerPage)}
                >
                  <FaChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default TransparentWords;
