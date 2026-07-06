import React, { useState, useEffect } from 'react';
import { FaSearch, FaEdit, FaTrash, FaVolumeUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SavedWords = () => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredWords, setFilteredWords] = useState([]);

  // API base URL - adjust this to match your environment
  const API_BASE_URL = 'http://localhost:8000/api';

  // Fetch saved words from API
  useEffect(() => {
    const fetchWords = async () => {
      try {
        setLoading(true);
        // Get token from localStorage
        const token = localStorage.getItem('auth_token');
        
        // Only try the API call if we have a token
        if (token) {
          try {
            const response = await axios.get(`${API_BASE_URL}/dictionary/`, {
              headers: {
                'Authorization': `Token ${token}`
              }
            });
            
            // Map the response data to match our component's expected format
            const formattedWords = response.data.map(word => ({
              id: word.id,
              greek: word.greek_word,
              pronunciation: word.pronounciation,
              translation: word.translation,
              dateAdded: new Date(word.date_added).toLocaleDateString()
            }));
            
            setWords(formattedWords);
            setFilteredWords(formattedWords);
            setLoading(false);
            return; // Exit early if API call succeeded
          } catch (apiError) {
            console.error('API call failed:', apiError);
            // Continue to demo data
          }
        }
        
        // DEMO DATA - Always load this for now during development
        console.log('Loading demo data for development');
        const demoWords = [
          { id: 1, greek: 'Καλημέρα', pronunciation: 'Kaliméra', translation: 'Good morning', dateAdded: '2023-06-15' },
          { id: 2, greek: 'Γειά σου', pronunciation: 'Yiá sou', translation: 'Hello', dateAdded: '2023-06-16' },
          { id: 3, greek: 'Ευχαριστώ', pronunciation: 'Efcharistó', translation: 'Thank you', dateAdded: '2023-06-17' },
          { id: 4, greek: 'Παρακαλώ', pronunciation: 'Parakaló', translation: 'Please/You\'re welcome', dateAdded: '2023-06-18' },
          { id: 5, greek: 'Ναί', pronunciation: 'Ne', translation: 'Yes', dateAdded: '2023-06-19' },
          { id: 6, greek: 'Όχι', pronunciation: 'Óchi', translation: 'No', dateAdded: '2023-06-20' },
          { id: 7, greek: 'Συγγνώμη', pronunciation: 'Signómi', translation: 'Sorry/Excuse me', dateAdded: '2023-06-21' },
          { id: 8, greek: 'Αντίο', pronunciation: 'Antío', translation: 'Goodbye', dateAdded: '2023-06-22' },
          { id: 9, greek: 'Νερό', pronunciation: 'Neró', translation: 'Water', dateAdded: '2023-06-23' },
          { id: 10, greek: 'Φαγητό', pronunciation: 'Fagitó', translation: 'Food', dateAdded: '2023-06-24' },
        ];
        setWords(demoWords);
        setFilteredWords(demoWords);
        
      } catch (err) {
        console.error('Error in fetchWords:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, [API_BASE_URL]);

  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredWords(words);
    } else {
      const filtered = words.filter(word => 
        word.greek.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.pronunciation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.translation.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredWords(filtered);
    }
  }, [searchTerm, words]);

  // Handle delete word - use demo mode for now
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this word?')) {
      try {
        // Demo mode - just remove from state
        setWords(words.filter(word => word.id !== id));
        setFilteredWords(filteredWords.filter(word => word.id !== id));
        
        // Show a success message
        alert('Word deleted successfully (Demo Mode)');
      } catch (err) {
        console.error('Error deleting word:', err);
        alert('Failed to delete word. Please try again.');
      }
    }
  };

  // Handle edit word (redirect to edit page or show modal)
  const handleEdit = (id) => {
    // For demo purposes, just show an alert
    alert(`Edit functionality for word ID: ${id} (Demo Mode)`);
  };

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

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      padding: '2rem 1rem',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#000000',
          }}>
            Your Saved Greek Words
          </h1>
          <Link to="/dictionary" style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.375rem',
            textDecoration: 'none',
            fontWeight: '500',
          }}>
            Add New Words
          </Link>
        </div>

        {/* Search Bar */}
        <div style={{
          position: 'relative',
          marginBottom: '2rem',
          maxWidth: '500px',
        }}>
          <div style={{ 
            width: '100%',
            position: 'relative',
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
              <FaSearch size={18} />
            </div>
            <input
              type="text"
              placeholder="Search words..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 0.5rem',
                backgroundColor: 'transparent',
                border: 'none',
                color: '#000000',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Loading your saved words...</p>
          </div>
        ) : error ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem',
            backgroundColor: '#fee2e2',
            borderRadius: '0.5rem',
            color: '#b91c1c'
          }}>
            <p>Error: {error}</p>
            <p>Please try again later or contact support.</p>
          </div>
        ) : filteredWords.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
          }}>
            <p style={{ fontSize: '1.125rem', color: '#000000' }}>
              {searchTerm ? 'No words match your search.' : 'You haven\'t saved any words yet.'}
            </p>
            {!searchTerm && (
              <Link to="/dictionary" style={{
                display: 'inline-block',
                marginTop: '1rem',
                color: '#3b82f6',
                textDecoration: 'none',
                fontWeight: '500',
              }}>
                Start adding words to your dictionary
              </Link>
            )}
          </div>
        ) : (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            overflow: 'hidden',
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
              }}>
                <thead>
                  <tr style={{
                    backgroundColor: '#f9fafb',
                    borderBottom: '1px solid #e5e7eb',
                  }}>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#000000' }}>Greek Word</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#000000' }}>Pronunciation</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#000000' }}>Translation</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#000000' }}>Date Added</th>
                    <th style={{ padding: '1rem', textAlign: 'center', color: '#000000' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWords.map((word) => (
                    <tr key={word.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '1rem', fontSize: '1.125rem', fontWeight: '500', color: '#000000' }}>
                        {word.greek}
                      </td>
                      <td style={{ padding: '1rem', color: '#000000' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {word.pronunciation}
                          <button 
                            onClick={() => speakWord(word.greek)}
                            style={{
                              backgroundColor: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              marginLeft: '0.5rem',
                              color: '#3b82f6',
                            }}
                            title="Listen to pronunciation"
                          >
                            <FaVolumeUp size={16} />
                          </button>
                        </div>
                      </td>
                      <td style={{ padding: '1rem', color: '#000000' }}>{word.translation}</td>
                      <td style={{ padding: '1rem', color: '#000000' }}>{word.dateAdded}</td>
                      <td style={{ padding: '1rem', color: '#000000' }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'center',
                          gap: '0.75rem',
                        }}>
                          <button
                            onClick={() => handleEdit(word.id)}
                            style={{
                              backgroundColor: '#e5e7eb',
                              color: '#000000',
                              border: 'none',
                              borderRadius: '0.375rem',
                              padding: '0.5rem',
                              cursor: 'pointer',
                            }}
                            title="Edit word"
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(word.id)}
                            style={{
                              backgroundColor: '#fee2e2',
                              color: '#b91c1c',
                              border: 'none',
                              borderRadius: '0.375rem',
                              padding: '0.5rem',
                              cursor: 'pointer',
                            }}
                            title="Delete word"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedWords; 