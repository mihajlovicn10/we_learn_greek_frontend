import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { showToast } from '../components/common/Toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement actual form submission
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      showToast.success('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      showToast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '60px', // For fixed navbar
      backgroundColor: '#f0f2f5',
      color: 'black'
    },
    content: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '1rem 1.5rem',
      marginTop: '0.5rem',
    },
    innerContent: {
      maxWidth: '800px', // Limit width with margins on left and right
      width: '100%',
      textAlign: 'center', // Center all text content
    },
    card: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      marginBottom: '2rem',
      maxWidth: '600px', // Reduced width
      margin: '0 auto', // Center the card
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '1.5rem',
      textAlign: 'center',
    },
    cardText: {
      marginBottom: '1.5rem',
      textAlign: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      alignItems: 'center', // Center form elements
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '500px', // Limit width of form groups
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#4b5563',
      marginBottom: '0.25rem',
      textAlign: 'left',
    },
    input: {
      padding: '0.75rem 1rem',
      border: 'none',
      borderRadius: '2rem',
      outline: 'none',
      width: '100%',
      fontSize: '1rem',
      backgroundColor: '#111827', // Dark background
      color: 'white', // White text
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    },
    textarea: {
      padding: '0.75rem 1rem',
      border: 'none',
      borderRadius: '1.5rem',
      outline: 'none',
      width: '100%',
      minHeight: '8rem',
      fontSize: '1rem',
      backgroundColor: '#111827', // Dark background
      color: 'white', // White text
      resize: 'vertical',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    },
    inputIcon: {
      position: 'relative',
    },
    icon: {
      position: 'absolute',
      left: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#6B7280',
      fontSize: '1.25rem',
    },
    button: {
      width: '100%',
      maxWidth: '500px', // Match form group width
      padding: '0.75rem 2rem', 
      marginLeft: '1rem',
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '2rem', // Increased border radius to match input fields
      fontWeight: '500',
      cursor: 'pointer',
      fontSize: '1,2rem',
      transition: 'background-color 0.2s',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', // Added shadow to match inputs
      '&:hover': {
        backgroundColor: '#1d4ed8',
      }
    },
    disabledButton: {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
    contactInfo: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      maxWidth: '600px', // Reduced width
      margin: '0 auto', // Center the card
      textAlign: 'center',
    },
    contactInfoTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '1rem',
      textAlign: 'center',
    },
    contactDetail: {
      marginBottom: '1rem',
      textAlign: 'center',
    },
    link: {
      color: '#2563eb',
      textDecoration: 'none',
      marginRight: '0.5rem',
      transition: 'color 0.2s',
      '&:hover': {
        color: '#1d4ed8',
      }
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      
      <main style={styles.content}>
        <div style={styles.innerContent}>
          <h1 style={styles.title}>Contact Us</h1>
          
          <div style={styles.card}>
            <p style={styles.cardText}>
              Have questions, suggestions, or feedback? We'd love to hear from you! 
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label htmlFor="name" style={styles.label}>
                  Name
                </label>
                <div style={styles.inputIcon}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={styles.input}
                    placeholder="Your name"
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.label}>
                  Email
                </label>
                <div style={styles.inputIcon}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                    placeholder="Your email address"
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="subject" style={styles.label}>
                  Subject
                </label>
                <div style={styles.inputIcon}>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    style={styles.input}
                    placeholder="Subject of your message"
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="message" style={styles.label}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  style={styles.textarea}
                  placeholder="Your message"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  ...styles.button,
                  ...(isSubmitting ? styles.disabledButton : {})
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          <div style={styles.contactInfo}>
            <h2 style={styles.contactInfoTitle}>Other Ways to Reach Us</h2>
            <div>
              <p style={styles.contactDetail}>
                <strong>Email:</strong>{' '}
                <a href="mailto:contact@welearngreek.com" style={styles.link}>
                  contact@welearngreek.com
                </a>
              </p>
              <p style={styles.contactDetail}>
                <strong>Follow us:</strong>{' '}
                <a href="#" style={styles.link}>Twitter</a>
                <a href="#" style={styles.link}>Facebook</a>
                <a href="#" style={styles.link}>Instagram</a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact; 