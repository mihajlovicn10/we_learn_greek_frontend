import React, { useState, useEffect } from 'react';
import { FaSearch, FaVolumeUp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const VerbList = () => {
  console.log('VerbList component is rendering');
  
  const [verbs, setVerbs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVerbs, setFilteredVerbs] = useState([]);
  const [verbTypeFilter, setVerbTypeFilter] = useState('');
  const [expandedVerb, setExpandedVerb] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // API base URL - adjust this to match your environment
  const API_BASE_URL = 'http://localhost:8000/api';

  // Fetch nouns from API
  useEffect(() => {
    console.log('VerbList useEffect is running');
    const fetchVerbs = async () => {
      console.log('fetchVerbs function is running');
      try {
        setLoading(true);
        
        // For development, use demo data
        const demoVerbs = [
          { 
            id: 1, 
            infinitive: 'είμαι', 
            verb_type: 'A1',
            present_first_singular: 'είμαι',
            present_second_singular: 'είσαι',
            present_third_singular: 'είναι',
            present_first_plural: 'είμαστε',
            present_second_plural: 'είστε',
            present_third_pluran: 'είναι',
            aorist_first_singular: 'ήμουν',
            aorist_second_singular: 'ήσουν',
            aorist_third_singular: 'ήταν',
            aorist_first_plural: 'ήμαστε',
            aorist_second_plural: 'ήσαστε',
            aorist_third_plural: 'ήταν',
            imperfect_first_singular: 'ήμουν',
            imperfect_second_singular: 'ήσουν',
            imperfect_third_singular: 'ήταν',
            imperfect_first_plural: 'ήμαστε',
            imperfect_second_plural: 'ήσαστε',
            imperfect_third_plural: 'ήταν',
            perfect_first_singular: 'έχω είναι',
            perfect_second_singular: 'έχεις είναι',
            perfect_third_singular: 'έχει είναι',
            perfect_first_plural: 'έχουμε είναι',
            perfect_second_plural: 'έχετε είναι',
            perfect_third_plural: 'έχουν είναι',
            future_first_singular: 'θα είμαι',
            future_second_singular: 'θα είσαι',
            future_third_singular: 'θα είναι',
            future_first_plural: 'θα είμαστε',
            future_second_plural: 'θα είστε',
            future_third_plural: 'θα είναι'
          },
          { 
            id: 2, 
            infinitive: 'έχω', 
            verb_type: 'A1',
            present_first_singular: 'έχω',
            present_second_singular: 'έχεις',
            present_third_singular: 'έχει',
            present_first_plural: 'έχουμε',
            present_second_plural: 'έχετε',
            present_third_pluran: 'έχουν',
            aorist_first_singular: 'είχα',
            aorist_second_singular: 'είχες',
            aorist_third_singular: 'είχε',
            aorist_first_plural: 'είχαμε',
            aorist_second_plural: 'είχατε',
            aorist_third_plural: 'είχαν',
            imperfect_first_singular: 'είχα',
            imperfect_second_singular: 'είχες',
            imperfect_third_singular: 'είχε',
            imperfect_first_plural: 'είχαμε',
            imperfect_second_plural: 'είχατε',
            imperfect_third_plural: 'είχαν',
            perfect_first_singular: 'έχω έχει',
            perfect_second_singular: 'έχεις έχει',
            perfect_third_singular: 'έχει έχει',
            perfect_first_plural: 'έχουμε έχει',
            perfect_second_plural: 'έχετε έχει',
            perfect_third_plural: 'έχουν έχει',
            future_first_singular: 'θα έχω',
            future_second_singular: 'θα έχεις',
            future_third_singular: 'θα έχει',
            future_first_plural: 'θα έχουμε',
            future_second_plural: 'θα έχετε',
            future_third_plural: 'θα έχουν'
          },
          { 
            id: 3, 
            infinitive: 'κάνω', 
            verb_type: 'A1',
            present_first_singular: 'κάνω',
            present_second_singular: 'κάνεις',
            present_third_singular: 'κάνει',
            present_first_plural: 'κάνουμε',
            present_second_plural: 'κάνετε',
            present_third_pluran: 'κάνουν',
            aorist_first_singular: 'έκανα',
            aorist_second_singular: 'έκανες',
            aorist_third_singular: 'έκανε',
            aorist_first_plural: 'κάναμε',
            aorist_second_plural: 'κάνατε',
            aorist_third_plural: 'έκαναν',
            imperfect_first_singular: 'έκανα',
            imperfect_second_singular: 'έκανες',
            imperfect_third_singular: 'έκανε',
            imperfect_first_plural: 'κάναμε',
            imperfect_second_plural: 'κάνατε',
            imperfect_third_plural: 'έκαναν',
            perfect_first_singular: 'έχω κάνει',
            perfect_second_singular: 'έχεις κάνει',
            perfect_third_singular: 'έχει κάνει',
            perfect_first_plural: 'έχουμε κάνει',
            perfect_second_plural: 'έχετε κάνει',
            perfect_third_plural: 'έχουν κάνει',
            future_first_singular: 'θα κάνω',
            future_second_singular: 'θα κάνεις',
            future_third_singular: 'θα κάνει',
            future_first_plural: 'θα κάνουμε',
            future_second_plural: 'θα κάνετε',
            future_third_plural: 'θα κάνουν'
          },
          { 
            id: 4, 
            infinitive: 'μιλάω', 
            verb_type: 'A2',
            present_first_singular: 'μιλάω',
            present_second_singular: 'μιλάς',
            present_third_singular: 'μιλάει',
            present_first_plural: 'μιλάμε',
            present_second_plural: 'μιλάτε',
            present_third_pluran: 'μιλάνε',
            aorist_first_singular: 'μίλησα',
            aorist_second_singular: 'μίλησες',
            aorist_third_singular: 'μίλησε',
            aorist_first_plural: 'μιλήσαμε',
            aorist_second_plural: 'μιλήσατε',
            aorist_third_plural: 'μίλησαν',
            imperfect_first_singular: 'μιλούσα',
            imperfect_second_singular: 'μιλούσες',
            imperfect_third_singular: 'μιλούσε',
            imperfect_first_plural: 'μιλούσαμε',
            imperfect_second_plural: 'μιλούσατε',
            imperfect_third_plural: 'μιλούσαν',
            perfect_first_singular: 'έχω μιλήσει',
            perfect_second_singular: 'έχεις μιλήσει',
            perfect_third_singular: 'έχει μιλήσει',
            perfect_first_plural: 'έχουμε μιλήσει',
            perfect_second_plural: 'έχετε μιλήσει',
            perfect_third_plural: 'έχουν μιλήσει',
            future_first_singular: 'θα μιλήσω',
            future_second_singular: 'θα μιλήσεις',
            future_third_singular: 'θα μιλήσει',
            future_first_plural: 'θα μιλήσουμε',
            future_second_plural: 'θα μιλήσετε',
            future_third_plural: 'θα μιλήσουν'
          },
          { 
            id: 5, 
            infinitive: 'τρώω', 
            verb_type: 'A2',
            present_first_singular: 'τρώω',
            present_second_singular: 'τρως',
            present_third_singular: 'τρώει',
            present_first_plural: 'τρώμε',
            present_second_plural: 'τρώτε',
            present_third_pluran: 'τρώνε',
            aorist_first_singular: 'έφαγα',
            aorist_second_singular: 'έφαγες',
            aorist_third_singular: 'έφαγε',
            aorist_first_plural: 'φάγαμε',
            aorist_second_plural: 'φάγατε',
            aorist_third_plural: 'έφαγαν',
            imperfect_first_singular: 'έτρωγα',
            imperfect_second_singular: 'έτρωγες',
            imperfect_third_singular: 'έτρωγε',
            imperfect_first_plural: 'τρώγαμε',
            imperfect_second_plural: 'τρώγατε',
            imperfect_third_plural: 'έτρωγαν',
            perfect_first_singular: 'έχω φάει',
            perfect_second_singular: 'έχεις φάει',
            perfect_third_singular: 'έχει φάει',
            perfect_first_plural: 'έχουμε φάει',
            perfect_second_plural: 'έχετε φάει',
            perfect_third_plural: 'έχουν φάει',
            future_first_singular: 'θα φάω',
            future_second_singular: 'θα φας',
            future_third_singular: 'θα φάει',
            future_first_plural: 'θα φάμε',
            future_second_plural: 'θα φάτε',
            future_third_plural: 'θα φάνε'
          },
          { 
            id: 6, 
            infinitive: 'πηγαίνω', 
            verb_type: 'B1',
            present_first_singular: 'πηγαίνω',
            present_second_singular: 'πηγαίνεις',
            present_third_singular: 'πηγαίνει',
            present_first_plural: 'πηγαίνουμε',
            present_second_plural: 'πηγαίνετε',
            present_third_pluran: 'πηγαίνουν',
            aorist_first_singular: 'πήγα',
            aorist_second_singular: 'πήγες',
            aorist_third_singular: 'πήγε',
            aorist_first_plural: 'πήγαμε',
            aorist_second_plural: 'πήγατε',
            aorist_third_plural: 'πήγαν',
            imperfect_first_singular: 'πήγαινα',
            imperfect_second_singular: 'πήγαινες',
            imperfect_third_singular: 'πήγαινε',
            imperfect_first_plural: 'πηγαίναμε',
            imperfect_second_plural: 'πηγαίνατε',
            imperfect_third_plural: 'πήγαιναν',
            perfect_first_singular: 'έχω πάει',
            perfect_second_singular: 'έχεις πάει',
            perfect_third_singular: 'έχει πάει',
            perfect_first_plural: 'έχουμε πάει',
            perfect_second_plural: 'έχετε πάει',
            perfect_third_plural: 'έχουν πάει',
            future_first_singular: 'θα πάω',
            future_second_singular: 'θα πας',
            future_third_singular: 'θα πάει',
            future_first_plural: 'θα πάμε',
            future_second_plural: 'θα πάτε',
            future_third_plural: 'θα πάνε'
          }
        ];
        
        setVerbs(demoVerbs);
        setFilteredVerbs(demoVerbs);
      } catch (err) {
        console.error('Error fetching verbs:', err);
        setError('Failed to load verbs');
      } finally {
        setLoading(false);
      }
    };

    fetchVerbs();
  }, []);

  // Handle search and filter
  useEffect(() => {
    let result = verbs;
    
    // Apply verb type filter
    if (verbTypeFilter) {
      result = result.filter(verb => verb.verb_type === verbTypeFilter);
    }
    
    // Apply search term
    if (searchTerm.trim() !== '') {
      result = result.filter(verb => 
        verb.infinitive.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredVerbs(result);
  }, [searchTerm, verbTypeFilter, verbs]);

  // Handle text-to-speech
  const speakWord = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'el-GR'; // Greek language
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser.');
    }
  };

  // Toggle expanded verb
  const toggleExpandVerb = (id) => {
    if (expandedVerb === id) {
      setExpandedVerb(null);
    } else {
      setExpandedVerb(id);
    }
  };

  // Get unique verb types for filter
  const verbTypes = [...new Set(verbs.map(verb => verb.verb_type))];

  // Get current verbs for pagination
  const indexOfLastVerb = currentPage * itemsPerPage;
  const indexOfFirstVerb = indexOfLastVerb - itemsPerPage;
  const currentVerbs = filteredVerbs.slice(indexOfFirstVerb, indexOfLastVerb);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Go to next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredVerbs.length / itemsPerPage)) {
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
    verbCard: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      marginBottom: '1.5rem',
      overflow: 'hidden'
    },
    verbHeader: {
      padding: '1.25rem',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer'
    },
    verbTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    verbInfinitive: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1f2937'
    },
    verbType: {
      display: 'inline-block',
      padding: '0.25rem 0.75rem',
      backgroundColor: '#e5e7eb',
      color: '#4b5563',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      fontWeight: '500'
    },
    verbContent: {
      padding: '1.5rem'
    },
    tenseSection: {
      marginBottom: '2rem'
    },
    tenseTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '1rem',
      paddingBottom: '0.5rem',
      borderBottom: '1px solid #e5e7eb'
    },
    conjugationTable: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    conjugationCell: {
      padding: '0.75rem',
      borderBottom: '1px solid #e5e7eb',
      color: '#1f2937'
    },
    personLabel: {
      color: '#6b7280',
      fontWeight: '500',
      width: '30%'
    },
    conjugationForm: {
      fontWeight: '500'
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
          <h2 style={styles.title}>Greek Verbs</h2>
          <Link to="/verb-search" style={styles.backLink}>
          Return to verb search
          </Link>
        </div>

        {/* Search and Filter */}
        <div style={styles.searchContainer}>
          <div style={styles.searchWrapper}>
            <FaSearch style={styles.searchIcon} size={18} />
            <input
              type="text"
              placeholder="Search verbs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
          
          <div>
            <select
              value={verbTypeFilter}
              onChange={(e) => setVerbTypeFilter(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="">All Types</option>
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div style={styles.loadingContainer}>
            <p>Loading verbs...</p>
          </div>
        ) : error ? (
          <div style={styles.errorContainer}>
            <p>Error: {error}</p>
            <p>Please try again later or contact support.</p>
          </div>
        ) : filteredVerbs.length === 0 ? (
          <div style={styles.emptyContainer}>
            <p style={styles.emptyText}>
              {searchTerm || verbTypeFilter ? 'No verbs match your search criteria.' : 'No verbs found in the database.'}
            </p>
            {!searchTerm && !verbTypeFilter && (
              <Link to="/verb-search" style={{...styles.backLink, display: 'inline-block', marginTop: '1rem'}}>
                Return to verb search
              </Link>
            )}
          </div>
        ) : (
          <div>
            {currentVerbs.map((verb) => (
              <div key={verb.id} style={styles.verbCard}>
                <div 
                  style={styles.verbHeader}
                  onClick={() => toggleExpandVerb(verb.id)}
                >
                  <div style={styles.verbTitle}>
                    <span style={styles.verbInfinitive}>{verb.infinitive}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        speakWord(verb.infinitive);
                      }}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#3b82f6',
                      }}
                      title="Listen to pronunciation"
                    >
                      <FaVolumeUp size={16} />
                    </button>
                    <span style={styles.verbType}>{verb.verb_type}</span>
                  </div>
                  <div>
                    {expandedVerb === verb.id ? 'Hide Conjugation' : 'Show Conjugation'}
                  </div>
                </div>
                
                {expandedVerb === verb.id && (
                  <div style={styles.verbContent}>
                    {/* Present Tense */}
                    <div style={styles.tenseSection}>
                      <h3 style={styles.tenseTitle}>Present Tense</h3>
                      <table style={styles.conjugationTable}>
                        <tbody>
                          <tr>
                            <td style={{...styles.conjugationCell, ...styles.personLabel}}>1st Person Singular</td>
                            <td style={{...styles.conjugationCell, ...styles.conjugationForm}}>{verb.present_first_singular}</td>
                          </tr>
                          <tr>
                            <td style={{...styles.conjugationCell, ...styles.personLabel}}>2nd Person Singular</td>
                            <td style={{...styles.conjugationCell, ...styles.conjugationForm}}>{verb.present_second_singular}</td>
                          </tr>
                          <tr>
                            <td style={{...styles.conjugationCell, ...styles.personLabel}}>3rd Person Singular</td>
                            <td style={{...styles.conjugationCell, ...styles.conjugationForm}}>{verb.present_third_singular}</td>
                          </tr>
                          <tr>
                            <td style={{...styles.conjugationCell, ...styles.personLabel}}>1st Person Plural</td>
                            <td style={{...styles.conjugationCell, ...styles.conjugationForm}}>{verb.present_first_plural}</td>
                          </tr>
                          <tr>
                            <td style={{...styles.conjugationCell, ...styles.personLabel}}>2nd Person Plural</td>
                            <td style={{...styles.conjugationCell, ...styles.conjugationForm}}>{verb.present_second_plural}</td>
                          </tr>
                          <tr>
                            <td style={{...styles.conjugationCell, ...styles.personLabel}}>3rd Person Plural</td>
                            <td style={{...styles.conjugationCell, ...styles.conjugationForm}}>{verb.present_third_pluran}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Aorist Tense */}
                    <div style={styles.tenseSection}>
                      <h3 style={styles.tenseTitle}>Aorist Tense</h3>
                      <table style={styles.conjugationTable}>
                        <tbody>
                          <tr>
                            <td style={{...styles.conjugationCell, ...styles.personLabel}}>1st Person Singular</td>
                            <td style={{...styles.conjugationCell, ...styles.conjugationForm}}>{verb.aorist_first_singular}</td>
                          </tr>
                          <tr>
                            <td style={{...styles.conjugationCell, ...styles.personLabel}}>2nd Person Singular</td>
                            <td style={{...styles.conjugationCell, ...styles.conjugationForm}}>{verb.aorist_second_singular}</td>
                          </tr>
                          <tr>
                            <td style={{...styles.conjugationCell, ...styles.personLabel}}>3rd Person Singular</td>
                            <td style={{...styles.conjugationCell, ...styles.conjugationForm}}>{verb.aorist_third_singular}</td>
                          </tr>
                          <tr>
                            <td style={{...styles.conjugationCell, ...styles.personLabel}}>1st Person Plural</td>
                            <td style={{...styles.conjugationCell, ...styles.conjugationForm}}>{verb.aorist_first_plural}</td>
                          </tr>
                          <tr>
                            <td style={{...styles.conjugationCell, ...styles.personLabel}}>2nd Person Plural</td>
                            <td style={{...styles.conjugationCell, ...styles.conjugationForm}}>{verb.aorist_second_plural}</td>
                          </tr>
                          <tr>
                            <td style={{...styles.conjugationCell, ...styles.personLabel}}>3rd Person Plural</td>
                            <td style={{...styles.conjugationCell, ...styles.conjugationForm}}>{verb.aorist_third_plural}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Future Tense */}
                    <div style={styles.tenseSection}>
                      <h3 style={styles.tenseTitle}>Future Tense</h3>
                      <table style={styles.conjugationTable}>
                        <tbody>
                          <tr>
                            <td style={{...styles.conjugationCell, ...styles.personLabel}}>1st Person Singular</td>
                            <td style={{...styles.conjugationCell, ...styles.conjugationForm}}>{verb.future_first_singular}</td>
                          </tr>
                          <tr>
                            <td style={{...styles.conjugationCell, ...styles.personLabel}}>2nd Person Singular</td>
                            <td style={{...styles.conjugationCell, ...styles.conjugationForm}}>{verb.future_second_singular}</td>
                          </tr>
                          <tr>
                            <td style={{...styles.conjugationCell, ...styles.personLabel}}>3rd Person Singular</td>
                            <td style={{...styles.conjugationCell, ...styles.conjugationForm}}>{verb.future_third_singular}</td>
                          </tr>
                          <tr>
                            <td style={{...styles.conjugationCell, ...styles.personLabel}}>1st Person Plural</td>
                            <td style={{...styles.conjugationCell, ...styles.conjugationForm}}>{verb.future_first_plural}</td>
                          </tr>
                          <tr>
                            <td style={{...styles.conjugationCell, ...styles.personLabel}}>2nd Person Plural</td>
                            <td style={{...styles.conjugationCell, ...styles.conjugationForm}}>{verb.future_second_plural}</td>
                          </tr>
                          <tr>
                            <td style={{...styles.conjugationCell, ...styles.personLabel}}>3rd Person Plural</td>
                            <td style={{...styles.conjugationCell, ...styles.conjugationForm}}>{verb.future_third_plural}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Pagination */}
            {filteredVerbs.length > itemsPerPage && (
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
                
                {Array.from({ length: Math.ceil(filteredVerbs.length / itemsPerPage) }).map((_, index) => (
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
                    ...(currentPage === Math.ceil(filteredVerbs.length / itemsPerPage) ? styles.disabledNavButton : {})
                  }}
                  disabled={currentPage === Math.ceil(filteredVerbs.length / itemsPerPage)}
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

export default VerbList;