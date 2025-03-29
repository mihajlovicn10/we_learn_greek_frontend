import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-6 w-full">
      <div className="text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} We Learn Greek. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;