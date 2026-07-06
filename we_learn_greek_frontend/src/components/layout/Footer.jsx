import React from 'react';

const Footer = () => {
  const styles = {
    footer: {
      width: '100%',
      backgroundColor: '#003366',
      padding: '24px 0',
      textAlign: 'center',
      color: 'white'
    },
    footerContent: {
      width: '1840px',
      margin: '0 auto',
      padding: '0 16px'
    },
    footerText: {
      fontSize: '0.875rem'
    }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <p style={styles.footerText}>
          © 2024 We Learn Greek. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;