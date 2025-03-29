import React from 'react';
import { FaHome } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-md fixed top-0 left-0 right-0 w-full m-0 z-50">
      <div className="flex items-center">
        <FaHome className="text-blue-500 text-xl" />
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 text-lg font-semibold overflow-x-auto whitespace-nowrap">
          <a href="#" className="hover:text-blue-500">Declinator</a>
          <a href="#" className="hover:text-blue-500">Conjugator</a>
          <a href="#" className="hover:text-blue-500">Dictionary</a>
          <a href="#" className="hover:text-blue-500">Greek to Greek Dictionary</a>
          <a href="#" className="hover:text-blue-500">Transparent Greek Words</a>
        </div>
        
        <div className="relative group">
          <button className="flex items-center gap-1 hover:text-blue-500">Login / Register <IoIosArrowDown /></button>
          <div className="absolute hidden group-hover:block bg-white shadow-lg mt-2 p-2 rounded-md right-0">
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Login</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Register</a>
          </div>
        </div>
        <div className="relative group">
          <button className="flex items-center gap-1 hover:text-blue-500">More... <IoIosArrowDown /></button>
          <div className="absolute hidden group-hover:block bg-white shadow-lg mt-2 p-2 rounded-md right-0">
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">FAQ</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Privacy Policy</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
