import React from 'react';
import Navbar from '../components/layout/Navbar';

const About = () => {
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
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '1.5rem',
      textAlign: 'center',
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '1rem',
      textAlign: 'center',
    },
    sectionContainer: {
      marginBottom: '2rem',
    },
    paragraph: {
      marginBottom: '1rem',
      textAlign: 'center',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '1.5rem',
      justifyContent: 'center',
    },
    featureCard: {
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      textAlign: 'center',
    },
    featureTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#2563eb',
      marginBottom: '0.5rem',
      textAlign: 'center',
    },
    link: {
      color: '#2563eb',
      textDecoration: 'none',
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      
      <main style={styles.content}>
        <div style={styles.innerContent}>
          <h1 style={styles.title}>About We Learn Greek</h1>
          
          <div style={styles.card}>
            <section style={styles.sectionContainer}>
              <h3 style={styles.sectionTitle}>Our Mission</h3>
              <p style={styles.paragraph}>
                We Learn Greek is dedicated to making Modern Greek language learning accessible, 
                engaging, and effective for learners worldwide. Our platform combines comprehensive 
                learning tools with an intuitive interface to help you master the Greek language.
              </p>
            </section>

            <section style={styles.sectionContainer}>
              <h3 style={styles.sectionTitle}>Features</h3>
              <div style={styles.featuresGrid}>
                <div style={styles.featureCard}>
                  <h3 style={styles.featureTitle}>Dictionary</h3>
                  <p>
                    Comprehensive Greek-English dictionary with example sentences and usage notes.
                  </p>
                </div>
                <div style={styles.featureCard}>
                  <h3 style={styles.featureTitle}>Verb Conjugations</h3>
                  <p>
                    Complete verb conjugation tables for all tenses and moods.
                  </p>
                </div>
                <div style={styles.featureCard}>
                  <h3 style={styles.featureTitle}>Greek to Greek</h3>
                  <p>
                    Native Greek definitions to enhance your understanding.
                  </p>
                </div>
                <div style={styles.featureCard}>
                  <h3 style={styles.featureTitle}>Transparent Words</h3>
                  <p>
                    Discover words that are similar across different languages.
                  </p>
                </div>
              </div>
            </section>

            <section style={styles.sectionContainer}>
              <h3 style={styles.sectionTitle}>Contact Us</h3>
              <p style={styles.paragraph}>
                Have questions or suggestions? We'd love to hear from you! Visit our{' '}
                <a href="/contact" style={styles.link}>
                  Contact page
                </a>{' '}
                or email us at{' '}
                <a href="mailto:contact@welearngreek.com" style={styles.link}>
                  contact@welearngreek.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About; 