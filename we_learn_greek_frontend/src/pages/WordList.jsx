import React, { useState, useEffect } from 'react';
import { FaSearch, FaVolumeUp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const WordList = () => {
  console.log('WordList component is rendering');
  
  const [nouns, setNouns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNouns, setFilteredNouns] = useState([]);
  const [genderFilter, setGenderFilter] = useState('');
  const [expandedNoun, setExpandedNoun] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // API base URL - adjust this to match your environment
  const API_BASE_URL = 'http://localhost:8000/api';

  // Fetch nouns from API
  useEffect(() => {
    console.log('NounList useEffect is running');
    const fetchNouns = async () => {
      console.log('fetchNouns function is running');
      try {
        setLoading(true);
        
        // For development, use demo data
        const demoNouns = [
          { 
            id: 1, 
            basic_noun: 'άνθρωπος',
            gender: 'masculine',
            nominative_singular: 'άνθρωπος',
            genitive_singular: 'ανθρώπου',
            accusative_singular: 'άνθρωπο',
            vocative_singular: 'άνθρωπε',
            nominative_plural: 'άνθρωποι',
            genitive_plural: 'ανθρώπων',
            accusative_plural: 'ανθρώπους',
            vocative_plural: 'άνθρωποι'
          },
          { 
            id: 2, 
            basic_noun: 'γυναίκα',
            gender: 'feminine',
            nominative_singular: 'γυναίκα',
            genitive_singular: 'γυναίκας',
            accusative_singular: 'γυναίκα',
            vocative_singular: 'γυναίκα',
            nominative_plural: 'γυναίκες',
            genitive_plural: 'γυναικών',
            accusative_plural: 'γυναίκες',
            vocative_plural: 'γυναίκες'
          },
          { 
            id: 3, 
            basic_noun: 'παιδί',
            gender: 'neuter',
            nominative_singular: 'παιδί',
            genitive_singular: 'παιδιού',
            accusative_singular: 'παιδί',
            vocative_singular: 'παιδί',
            nominative_plural: 'παιδιά',
            genitive_plural: 'παιδιών',
            accusative_plural: 'παιδιά',
            vocative_plural: 'παιδιά'
          },
          {
            id: 4,
            basic_noun: 'σπίτι',
            gender: 'neuter',
            nominative_singular: 'σπίτι',
            genitive_singular: 'σπιτιού',
            accusative_singular: 'σπίτι',
            vocative_singular: 'σπίτι',
            nominative_plural: 'σπίτια',
            genitive_plural: 'σπιτιών',
            accusative_plural: 'σπίτια',
            vocative_plural: 'σπίτια'
          },
          {
            id: 5,
            basic_noun: 'φίλος',
            gender: 'masculine',
            nominative_singular: 'φίλος',
            genitive_singular: 'φίλου',
            accusative_singular: 'φίλο',
            vocative_singular: 'φίλε',
            nominative_plural: 'φίλοι',
            genitive_plural: 'φίλων',
            accusative_plural: 'φίλους',
            vocative_plural: 'φίλοι'
          },
          {
            id: 6,
            basic_noun: 'θάλασσα',
            gender: 'feminine',
            nominative_singular: 'θάλασσα',
            genitive_singular: 'θάλασσας',
            accusative_singular: 'θάλασσα',
            vocative_singular: 'θάλασσα',
            nominative_plural: 'θάλασσες',
            genitive_plural: 'θαλασσών',
            accusative_plural: 'θάλασσες',
            vocative_plural: 'θάλασσες'
          },
          {
            id: 7,
            basic_noun: 'βιβλίο',
            gender: 'neuter',
            nominative_singular: 'βιβλίο',
            genitive_singular: 'βιβλίου',
            accusative_singular: 'βιβλίο',
            vocative_singular: 'βιβλίο',
            nominative_plural: 'βιβλία',
            genitive_plural: 'βιβλίων',
            accusative_plural: 'βιβλία',
            vocative_plural: 'βιβλία'
          },
          {
            id: 8,
            basic_noun: 'δάσκαλος',
            gender: 'masculine',
            nominative_singular: 'δάσκαλος',
            genitive_singular: 'δασκάλου',
            accusative_singular: 'δάσκαλο',
            vocative_singular: 'δάσκαλε',
            nominative_plural: 'δάσκαλοι',
            genitive_plural: 'δασκάλων',
            accusative_plural: 'δασκάλους',
            vocative_plural: 'δάσκαλοι'
          },
          {
            id: 9,
            basic_noun: 'πόλη',
            gender: 'feminine',
            nominative_singular: 'πόλη',
            genitive_singular: 'πόλης',
            accusative_singular: 'πόλη',
            vocative_singular: 'πόλη',
            nominative_plural: 'πόλεις',
            genitive_plural: 'πόλεων',
            accusative_plural: 'πόλεις',
            vocative_plural: 'πόλεις'
          },
          {
            id: 10,
            basic_noun: 'νερό',
            gender: 'neuter',
            nominative_singular: 'νερό',
            genitive_singular: 'νερού',
            accusative_singular: 'νερό',
            vocative_singular: 'νερό',
            nominative_plural: 'νερά',
            genitive_plural: 'νερών',
            accusative_plural: 'νερά',
            vocative_plural: 'νερά'
          },
          // Additional 20 nouns
          {
            id: 11,
            basic_noun: 'αδελφός',
            gender: 'masculine',
            nominative_singular: 'αδελφός',
            genitive_singular: 'αδελφού',
            accusative_singular: 'αδελφό',
            vocative_singular: 'αδελφέ',
            nominative_plural: 'αδελφοί',
            genitive_plural: 'αδελφών',
            accusative_plural: 'αδελφούς',
            vocative_plural: 'αδελφοί'
          },
          {
            id: 12,
            basic_noun: 'αδελφή',
            gender: 'feminine',
            nominative_singular: 'αδελφή',
            genitive_singular: 'αδελφής',
            accusative_singular: 'αδελφή',
            vocative_singular: 'αδελφή',
            nominative_plural: 'αδελφές',
            genitive_plural: 'αδελφών',
            accusative_plural: 'αδελφές',
            vocative_plural: 'αδελφές'
          },
          {
            id: 13,
            basic_noun: 'δέντρο',
            gender: 'neuter',
            nominative_singular: 'δέντρο',
            genitive_singular: 'δέντρου',
            accusative_singular: 'δέντρο',
            vocative_singular: 'δέντρο',
            nominative_plural: 'δέντρα',
            genitive_plural: 'δέντρων',
            accusative_plural: 'δέντρα',
            vocative_plural: 'δέντρα'
          },
          {
            id: 14,
            basic_noun: 'τραπέζι',
            gender: 'neuter',
            nominative_singular: 'τραπέζι',
            genitive_singular: 'τραπεζιού',
            accusative_singular: 'τραπέζι',
            vocative_singular: 'τραπέζι',
            nominative_plural: 'τραπέζια',
            genitive_plural: 'τραπεζιών',
            accusative_plural: 'τραπέζια',
            vocative_plural: 'τραπέζια'
          },
          {
            id: 15,
            basic_noun: 'καρέκλα',
            gender: 'feminine',
            nominative_singular: 'καρέκλα',
            genitive_singular: 'καρέκλας',
            accusative_singular: 'καρέκλα',
            vocative_singular: 'καρέκλα',
            nominative_plural: 'καρέκλες',
            genitive_plural: 'καρεκλών',
            accusative_plural: 'καρέκλες',
            vocative_plural: 'καρέκλες'
          },
          {
            id: 16,
            basic_noun: 'ουρανός',
            gender: 'masculine',
            nominative_singular: 'ουρανός',
            genitive_singular: 'ουρανού',
            accusative_singular: 'ουρανό',
            vocative_singular: 'ουρανέ',
            nominative_plural: 'ουρανοί',
            genitive_plural: 'ουρανών',
            accusative_plural: 'ουρανούς',
            vocative_plural: 'ουρανοί'
          },
          {
            id: 17,
            basic_noun: 'γη',
            gender: 'feminine',
            nominative_singular: 'γη',
            genitive_singular: 'γης',
            accusative_singular: 'γη',
            vocative_singular: 'γη',
            nominative_plural: 'γαίες',
            genitive_plural: 'γαιών',
            accusative_plural: 'γαίες',
            vocative_plural: 'γαίες'
          },
          {
            id: 18,
            basic_noun: 'αυτοκίνητο',
            gender: 'neuter',
            nominative_singular: 'αυτοκίνητο',
            genitive_singular: 'αυτοκινήτου',
            accusative_singular: 'αυτοκίνητο',
            vocative_singular: 'αυτοκίνητο',
            nominative_plural: 'αυτοκίνητα',
            genitive_plural: 'αυτοκινήτων',
            accusative_plural: 'αυτοκίνητα',
            vocative_plural: 'αυτοκίνητα'
          },
          {
            id: 19,
            basic_noun: 'μητέρα',
            gender: 'feminine',
            nominative_singular: 'μητέρα',
            genitive_singular: 'μητέρας',
            accusative_singular: 'μητέρα',
            vocative_singular: 'μητέρα',
            nominative_plural: 'μητέρες',
            genitive_plural: 'μητέρων',
            accusative_plural: 'μητέρες',
            vocative_plural: 'μητέρες'
          },
          {
            id: 20,
            basic_noun: 'πατέρας',
            gender: 'masculine',
            nominative_singular: 'πατέρας',
            genitive_singular: 'πατέρα',
            accusative_singular: 'πατέρα',
            vocative_singular: 'πατέρα',
            nominative_plural: 'πατέρες',
            genitive_plural: 'πατέρων',
            accusative_plural: 'πατέρες',
            vocative_plural: 'πατέρες'
          },
          {
            id: 21,
            basic_noun: 'σκύλος',
            gender: 'masculine',
            nominative_singular: 'σκύλος',
            genitive_singular: 'σκύλου',
            accusative_singular: 'σκύλο',
            vocative_singular: 'σκύλε',
            nominative_plural: 'σκύλοι',
            genitive_plural: 'σκύλων',
            accusative_plural: 'σκύλους',
            vocative_plural: 'σκύλοι'
          },
          {
            id: 22,
            basic_noun: 'γάτα',
            gender: 'feminine',
            nominative_singular: 'γάτα',
            genitive_singular: 'γάτας',
            accusative_singular: 'γάτα',
            vocative_singular: 'γάτα',
            nominative_plural: 'γάτες',
            genitive_plural: 'γατών',
            accusative_plural: 'γάτες',
            vocative_plural: 'γάτες'
          },
          {
            id: 23,
            basic_noun: 'ποτήρι',
            gender: 'neuter',
            nominative_singular: 'ποτήρι',
            genitive_singular: 'ποτηριού',
            accusative_singular: 'ποτήρι',
            vocative_singular: 'ποτήρι',
            nominative_plural: 'ποτήρια',
            genitive_plural: 'ποτηριών',
            accusative_plural: 'ποτήρια',
            vocative_plural: 'ποτήρια'
          },
          {
            id: 24,
            basic_noun: 'πιάτο',
            gender: 'neuter',
            nominative_singular: 'πιάτο',
            genitive_singular: 'πιάτου',
            accusative_singular: 'πιάτο',
            vocative_singular: 'πιάτο',
            nominative_plural: 'πιάτα',
            genitive_plural: 'πιάτων',
            accusative_plural: 'πιάτα',
            vocative_plural: 'πιάτα'
          },
          {
            id: 25,
            basic_noun: 'δρόμος',
            gender: 'masculine',
            nominative_singular: 'δρόμος',
            genitive_singular: 'δρόμου',
            accusative_singular: 'δρόμο',
            vocative_singular: 'δρόμε',
            nominative_plural: 'δρόμοι',
            genitive_plural: 'δρόμων',
            accusative_plural: 'δρόμους',
            vocative_plural: 'δρόμοι'
          },
          {
            id: 26,
            basic_noun: 'λεωφόρος',
            gender: 'feminine',
            nominative_singular: 'λεωφόρος',
            genitive_singular: 'λεωφόρου',
            accusative_singular: 'λεωφόρο',
            vocative_singular: 'λεωφόρε',
            nominative_plural: 'λεωφόροι',
            genitive_plural: 'λεωφόρων',
            accusative_plural: 'λεωφόρους',
            vocative_plural: 'λεωφόροι'
          },
          {
            id: 27,
            basic_noun: 'μάτι',
            gender: 'neuter',
            nominative_singular: 'μάτι',
            genitive_singular: 'ματιού',
            accusative_singular: 'μάτι',
            vocative_singular: 'μάτι',
            nominative_plural: 'μάτια',
            genitive_plural: 'ματιών',
            accusative_plural: 'μάτια',
            vocative_plural: 'μάτια'
          },
          {
            id: 28,
            basic_noun: 'χέρι',
            gender: 'neuter',
            nominative_singular: 'χέρι',
            genitive_singular: 'χεριού',
            accusative_singular: 'χέρι',
            vocative_singular: 'χέρι',
            nominative_plural: 'χέρια',
            genitive_plural: 'χεριών',
            accusative_plural: 'χέρια',
            vocative_plural: 'χέρια'
          },
          {
            id: 29,
            basic_noun: 'κεφάλι',
            gender: 'neuter',
            nominative_singular: 'κεφάλι',
            genitive_singular: 'κεφαλιού',
            accusative_singular: 'κεφάλι',
            vocative_singular: 'κεφάλι',
            nominative_plural: 'κεφάλια',
            genitive_plural: 'κεφαλιών',
            accusative_plural: 'κεφάλια',
            vocative_plural: 'κεφάλια'
          },
          {
            id: 30,
            basic_noun: 'καρδιά',
            gender: 'feminine',
            nominative_singular: 'καρδιά',
            genitive_singular: 'καρδιάς',
            accusative_singular: 'καρδιά',
            vocative_singular: 'καρδιά',
            nominative_plural: 'καρδιές',
            genitive_plural: 'καρδιών',
            accusative_plural: 'καρδιές',
            vocative_plural: 'καρδιές'
          }
        ];
        
        setNouns(demoNouns);
        setFilteredNouns(demoNouns);
      } catch (err) {
        console.error('Error fetching nouns:', err);
        setError('Failed to load nouns');
      } finally {
        setLoading(false);
      }
    };

    fetchNouns();
  }, []);

  // Handle search and filter
  useEffect(() => {
    let result = nouns;
    
    // Apply gender filter
    if (genderFilter) {
      result = result.filter(noun => noun.gender === genderFilter);
    }
    
    // Apply search term
    if (searchTerm.trim() !== '') {
      result = result.filter(noun => 
        noun.basic_noun.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredNouns(result);
  }, [searchTerm, genderFilter, nouns]);

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

  // Toggle expanded noun
  const toggleExpandNoun = (id) => {
    if (expandedNoun === id) {
      setExpandedNoun(null);
    } else {
      setExpandedNoun(id);
    }
  };

  // Get unique noun types for filter
  const nounTypes = [...new Set(nouns.map(noun => noun.noun_type))];

  // Get current nouns for pagination
  const indexOfLastNoun = currentPage * itemsPerPage;
  const indexOfFirstNoun = indexOfLastNoun - itemsPerPage;
  const currentNouns = filteredNouns.slice(indexOfFirstNoun, indexOfLastNoun);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Go to next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredNouns.length / itemsPerPage)) {
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
    nounCard: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      marginBottom: '1.5rem',
      overflow: 'hidden'
    },
    nounHeader: {
      padding: '1.25rem',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer'
    },
    nounTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    nounInfinitive: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1f2937'
    },
    nounType: {
      display: 'inline-block',
      padding: '0.25rem 0.75rem',
      backgroundColor: '#e5e7eb',
      color: '#4b5563',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      fontWeight: '500'
    },
    nounContent: {
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
          <h2 style={styles.title}>Greek Nouns</h2>
          <Link to="/noun-search" style={styles.backLink}>
          Return to noun search
          </Link>
        </div>

        {/* Search and Filter */}
        <div style={styles.searchContainer}>
          <div style={styles.searchWrapper}>
            <FaSearch style={styles.searchIcon} size={18} />
            <input
              type="text"
              placeholder="Search nouns..."
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
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="">All Genders</option>
              <option value="masculine">Masculine</option>
              <option value="feminine">Feminine</option>
              <option value="neuter">Neuter</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div style={styles.loadingContainer}>
            <p>Loading nouns...</p>
          </div>
        ) : error ? (
          <div style={styles.errorContainer}>
            <p>Error: {error}</p>
            <p>Please try again later or contact support.</p>
          </div>
        ) : filteredNouns.length === 0 ? (
          <div style={styles.emptyContainer}>
            <p style={styles.emptyText}>
              {searchTerm || genderFilter ? 'No nouns match your search criteria.' : 'No nouns found in the database.'}
            </p>
            {!searchTerm && !genderFilter && (
              <Link to="/noun-search" style={{...styles.backLink, display: 'inline-block', marginTop: '1rem'}}>
                Return to noun search
              </Link>
            )}
          </div>
        ) : (
          <div>
            {currentNouns.map((noun) => (
              <div key={noun.id} style={styles.nounCard}>
                <div 
                  style={styles.nounHeader}
                  onClick={() => toggleExpandNoun(noun.id)}
                >
                  <div style={styles.nounTitle}>
                    <span style={styles.nounInfinitive}>{noun.basic_noun}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        speakWord(noun.basic_noun);
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
                    <span style={styles.nounType}>{noun.gender}</span>
                  </div>
                  <div>
                    {expandedNoun === noun.id ? 'Hide Declension' : 'Show Declension'}
                  </div>
                </div>
                
                {expandedNoun === noun.id && (
                  <div style={styles.nounContent}>
                    {/* Singular */}
                    <div style={styles.tenseSection}>
                      <h3 style={styles.tenseTitle}>Singular</h3>
                      <table style={styles.conjugationTable}>
                        <tbody>
                          <tr>
                            <td style={{...styles.conjugationCell, ...styles.personLabel}}>Nominative</td>
                            <td style={{...styles.conjugationCell, ...styles.conjugationForm}}>{noun.nominative_singular}</td>
                          </tr>
                          <tr>
                            <td style={{...styles.conjugationCell, ...styles.personLabel}}>Genitive</td>
                            <td style={{...styles.conjugationCell, ...styles.conjugationForm}}>{noun.genitive_singular}</td>
                          </tr>
                          <tr>
                            <td style={{...styles.conjugationCell, ...styles.personLabel}}>Accusative</td>
                            <td style={{...styles.conjugationCell, ...styles.conjugationForm}}>{noun.accusative_singular}</td>
                          </tr>
                          <tr>
                            <td style={{...styles.conjugationCell, ...styles.personLabel}}>Vocative</td>
                              <td style={{...styles.conjugationCell, ...styles.conjugationForm}}>{noun.vocative_singular}</td>
                          </tr> 
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Plural */}
                    <div style={styles.tenseSection}>
                      <h3 style={styles.tenseTitle}>Plural</h3>
                      <table style={styles.conjugationTable}>
                        <tbody>
                          <tr>
                            <td style={{...styles.conjugationCell, ...styles.personLabel}}>Nominative</td>
                            <td style={{...styles.conjugationCell, ...styles.conjugationForm}}>{noun.nominative_plural}</td>
                          </tr>
                          <tr>
                            <td style={{...styles.conjugationCell, ...styles.personLabel}}>Genitive</td>
                            <td style={{...styles.conjugationCell, ...styles.conjugationForm}}>{noun.genitive_plural}</td>
                          </tr>
                          <tr>
                            <td style={{...styles.conjugationCell, ...styles.personLabel}}>Accusative</td>
                            <td style={{...styles.conjugationCell, ...styles.conjugationForm}}>{noun.accusative_plural}</td>
                          </tr>
                          <tr>
                            <td style={{...styles.conjugationCell, ...styles.personLabel}}>Vocative</td> 
                            <td style={{...styles.conjugationCell, ...styles.conjugationForm}}>{noun.vocative_plural}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Pagination */}
            {filteredNouns.length > itemsPerPage && (
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
                
                {Array.from({ length: Math.ceil(filteredNouns.length / itemsPerPage) }).map((_, index) => (
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
                    ...(currentPage === Math.ceil(filteredNouns.length / itemsPerPage) ? styles.disabledNavButton : {})
                  }}
                  disabled={currentPage === Math.ceil(filteredNouns.length / itemsPerPage)}
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

export default WordList;