import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
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
    
    // Validate passwords match
    if (formData.password !== formData.password2) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);

    try {
      // Replace with your actual API endpoint
      const response = await axios.post('http://localhost:8000/api/auth/register/', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      // Redirect to login page after successful registration
      navigate('/login');
    } catch (err) {
      setError(
        err.response?.data?.detail || 
        err.response?.data?.username?.[0] ||
        err.response?.data?.email?.[0] ||
        err.response?.data?.password?.[0] ||
        'Registration failed. Please try again.'
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
    loginLink: {
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
          <h1 style={styles.title}>Create an Account</h1>
          
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
                placeholder="Choose a username"
                required
                className="dark-placeholder"
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.inputLabel}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter your email address"
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
                placeholder="Create a password"
                required
                className="dark-placeholder"
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.inputLabel}>Confirm Password</label>
              <input
                type="password"
                id="password2"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                style={styles.input}
                placeholder="Confirm your password"
                required
                className="dark-placeholder"
              />
            </div>
            
            <button 
              type="submit" 
              style={styles.button}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          
          <div style={styles.loginLink}>
            Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
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

export default Register;
