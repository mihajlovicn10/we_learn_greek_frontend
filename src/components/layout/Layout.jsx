import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 px-4 pb-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 