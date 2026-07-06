import React from 'react';
import Navbar from '../components/layout/Navbar';

const Privacy = () => {
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
      textAlign: 'left', // Align all card content to the left
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
    subSectionTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '0.75rem',
      textAlign: 'center',
    },
    sectionContainer: {
      marginBottom: '2rem',
    },
    paragraph: {
      marginBottom: '1rem',
      textAlign: 'center',
    },
    list: {
      listStylePosition: 'outside',
      listStyleType: 'disc',
      paddingLeft: '2.5rem',
      marginBottom: '1rem',
      marginLeft: '1rem',
      marginRight: '1rem',
    },
    listItem: {
      marginBottom: '0.5rem',
      paddingLeft: '0.5rem',
    },
    link: {
      color: '#2563eb',
      textDecoration: 'none',
    },
    italic: {
      fontStyle: 'italic',
      color: '#6b7280',
      textAlign: 'center',
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      
      <main style={styles.content}>
        <div style={styles.innerContent}>
          <h1 style={styles.title}>Privacy Policy</h1>
          
          <div style={styles.card}>
            <section style={styles.sectionContainer}>
              <h3 style={styles.sectionTitle}>Introduction</h3>
              <p style={styles.paragraph}>
                At We Learn Greek, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
            </section>

            <section style={styles.sectionContainer}>
              <h3 style={styles.sectionTitle}>Information We Collect</h3>
              <h4 style={styles.subSectionTitle}>Personal Information</h4>
              <p style={styles.paragraph}>
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul style={styles.list}>
                <li style={styles.listItem}>Register for an account</li>
                <li style={styles.listItem}>Sign up for our newsletter</li>
                <li style={styles.listItem}>Contact us through our contact form</li>
                <li style={styles.listItem}>Participate in user forums or discussions</li>
              </ul>

              <h4 style={styles.subSectionTitle}>Usage Information</h4>
              <p style={styles.paragraph}>
                We automatically collect certain information when you visit our website, including:
              </p>
              <ul style={styles.list}>
                <li style={styles.listItem}>IP address</li>
                <li style={styles.listItem}>Browser type</li>
                <li style={styles.listItem}>Device information</li>
                <li style={styles.listItem}>Pages visited</li>
                <li style={styles.listItem}>Time spent on pages</li>
              </ul>
            </section>

            <section style={styles.sectionContainer}>
              <h3 style={styles.sectionTitle}>How We Use Your Information</h3>
              <p style={styles.paragraph}>We use the collected information for various purposes:</p>
              <ul style={styles.list}>
                <li style={styles.listItem}>To provide and maintain our service</li>
                <li style={styles.listItem}>To notify you about changes to our service</li>
                <li style={styles.listItem}>To provide customer support</li>
                <li style={styles.listItem}>To gather analysis or valuable information to improve our service</li>
                <li style={styles.listItem}>To monitor the usage of our service</li>
                <li style={styles.listItem}>To detect, prevent and address technical issues</li>
              </ul>
            </section>

            <section style={styles.sectionContainer}>
              <h3 style={styles.sectionTitle}>Data Security</h3>
              <p style={styles.paragraph}>
                We implement appropriate technical and organizational security measures to protect your personal 
                information. However, please note that no method of transmission over the Internet or electronic 
                storage is 100% secure.
              </p>
            </section>

            <section style={styles.sectionContainer}>
              <h3 style={styles.sectionTitle}>Cookies</h3>
              <p style={styles.paragraph}>
                We use cookies and similar tracking technologies to track activity on our website and store 
                certain information. You can instruct your browser to refuse all cookies or to indicate when 
                a cookie is being sent.
              </p>
            </section>

            <section style={styles.sectionContainer}>
              <h3 style={styles.sectionTitle}>Your Rights</h3>
              <p style={styles.paragraph}>
                You have the right to:
              </p>
              <ul style={styles.list}>
                <li style={styles.listItem}>Access your personal data</li>
                <li style={styles.listItem}>Correct inaccurate personal data</li>
                <li style={styles.listItem}>Request deletion of your personal data</li>
                <li style={styles.listItem}>Object to our processing of your personal data</li>
                <li style={styles.listItem}>Request restriction of processing your personal data</li>
              </ul>
            </section>

            <section style={styles.sectionContainer}>
              <h3 style={styles.sectionTitle}>Contact Us</h3>
              <p style={styles.paragraph}>
                If you have any questions about this Privacy Policy, please contact us at:{' '}
                <a href="mailto:privacy@welearngreek.com" style={styles.link}>
                  privacy@welearngreek.com
                </a>
              </p>
            </section>

            <section style={styles.sectionContainer}>
              <h3 style={styles.sectionTitle}>Changes to This Policy</h3>
              <p style={styles.paragraph}>
                We may update our Privacy Policy from time to time. We will notify you of any changes by 
                posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
              <p style={styles.italic}>
                Last Updated: {new Date().toLocaleDateString()}
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy; 