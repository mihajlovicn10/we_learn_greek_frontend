import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Replace with your actual API endpoint
      const response = await axios.post('http://localhost:8000/api/auth/login/', formData);
      
      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      
      // Redirect to home page
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.detail || 
        'Login failed. Please check your credentials and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '60px', // For fixed navbar
      backgroundColor: '#f0f2f5'
    },
    content: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem 1.5rem',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      width: '100%',
      maxWidth: '32rem',
      padding: '2rem',
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '2rem',
      textAlign: 'center',
    },
    form: {
      padding: '0 2rem',
    },
    formGroup: {
      marginBottom: '1.5rem',
    },
    inputLabel: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#4b5563',
      marginBottom: '0.5rem',
      display: 'block',
    },
    input: {
      width: '95%',
      padding: '0.75rem 1rem',
      backgroundColor: '#0f172a',
      color: 'white',
      border: 'none',
      outline: 'none',
      borderRadius: '9999px',
      textAlign: 'center',
      margin: '0 auto',
      display: 'block',
    },
    button: {
      width: '95%',
      padding: '0.75rem 1.5rem',
      backgroundColor: '#4285f4',
      color: 'white',
      border: 'none',
      borderRadius: '9999px',
      fontWeight: '500',
      cursor: 'pointer',
      marginTop: '1rem',
      marginBottom: '1rem',
      margin: '1rem auto',
      display: 'block',
    },
    error: {
      color: '#ef4444',
      fontSize: '0.875rem',
      marginTop: '0.5rem',
      textAlign: 'center',
    },
    registerLink: {
      textAlign: 'center',
      marginTop: '0.5rem',
      fontSize: '0.875rem',
      color: '#4b5563',
    },
    link: {
      color: '#4285f4',
      fontWeight: '500',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.container}>
      <Navbar />
      
      <main style={styles.content}>
        <div style={styles.card}>
          <h1 style={styles.title}>Login to Your Account</h1>
          
          {error && <div style={styles.error}>{error}</div>}
          
          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.inputLabel}>Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter your username"
                required
                className="dark-placeholder"
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.inputLabel}>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter your password"
                required
                className="dark-placeholder"
              />
            </div>
            
            <button 
              type="submit" 
              style={styles.button}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <div style={styles.registerLink}>
            Don't have an account? <Link to="/register" style={styles.link}>Register here</Link>
          </div>
        </div>
      </main>

      <style>
        {`
          .dark-placeholder::placeholder {
            color: #FFFFFF;
            opacity: 0.7;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
