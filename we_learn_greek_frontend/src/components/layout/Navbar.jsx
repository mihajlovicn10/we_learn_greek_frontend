import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Logo/Home */}
        <Link to="/" className="text-blue-300">
          <FaHome size={20} />
        </Link>

        {/* Desktop Navigation - hidden on mobile */}
        <div className="hidden md:flex md:items-center space-x-6">
          <Link to="/declinator" className="text-blue-300 hover:text-white">Declinator</Link>
          <Link to="/conjugator" className="text-blue-300 hover:text-white">Conjugator</Link>
          <Link to="/dictionary" className="text-blue-300 hover:text-white">Dictionary</Link>
          <Link to="/greek-to-greek-dictionary" className="text-blue-300 hover:text-white">Greek to Greek Dictionary</Link>
          <Link to="/transparent-greek-words" className="text-blue-300 hover:text-white">Transparent Greek Words</Link>
        </div>

        {/* Desktop Dropdowns - hidden on mobile */}
        <div className="hidden md:flex md:items-center space-x-4">
          <select className="bg-gray-900 text-blue-300 border border-gray-700 rounded px-2 py-1">
            <option>Login / Register</option>
            <option value="login">Login</option>
            <option value="register">Register</option>
          </select>
          
          <select className="bg-gray-900 text-blue-300 border border-gray-700 rounded px-2 py-1">
            <option>More...</option>
            <option value="faq">FAQ</option>
            <option value="privacy">Privacy Policy</option>
            <option value="contact">Contact</option>
          </select>
        </div>

        {/* Mobile menu button - only visible on mobile */}
        <button 
          className="md:hidden text-blue-300 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile menu - only visible when menu is open */}
      {isMenuOpen && (
        <div className="mt-3 md:hidden">
          <Link to="/declinator" className="block text-blue-300 py-2 hover:text-white">Declinator</Link>
          <Link to="/conjugator" className="block text-blue-300 py-2 hover:text-white">Conjugator</Link>
          <Link to="/dictionary" className="block text-blue-300 py-2 hover:text-white">Dictionary</Link>
          <Link to="/greek-to-greek-dictionary" className="block text-blue-300 py-2 hover:text-white">Greek to Greek Dictionary</Link>
          <Link to="/transparent-greek-words" className="block text-blue-300 py-2 hover:text-white">Transparent Greek Words</Link>
          
          <div className="py-2">
            <select className="w-full bg-gray-800 text-blue-300 border border-gray-700 rounded px-2 py-1 mt-2">
              <option>Login / Register</option>
              <option value="login">Login</option>
              <option value="register">Register</option>
            </select>
            
            <select className="w-full bg-gray-800 text-blue-300 border border-gray-700 rounded px-2 py-1 mt-2">
              <option>More...</option>
              <option value="faq">FAQ</option>
              <option value="privacy">Privacy Policy</option>
              <option value="contact">Contact</option>
            </select>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
