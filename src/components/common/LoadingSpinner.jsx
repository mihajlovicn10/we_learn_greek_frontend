import React from 'react';

/**
 * Loading spinner component with various size options and customization
 * 
 * @param {Object} props
 * @param {string} props.size - The size of the spinner (sm, md, lg)
 * @param {string} props.color - The color of the spinner
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.fullScreen - Whether to display as a full-screen overlay
 * @param {string} props.text - Optional loading text to display below spinner
 */
const LoadingSpinner = ({ 
  size = 'md',
  color = 'blue',
  className = '',
  fullScreen = false,
  text = ''
}) => {
  // Size mappings
  const sizes = {
    sm: 'h-5 w-5 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
    xl: 'h-16 w-16 border-4'
  };

  // Color mappings
  const colors = {
    blue: 'border-blue-500',
    red: 'border-red-500',
    green: 'border-green-500',
    gray: 'border-gray-500',
    white: 'border-white'
  };
  
  const spinnerElement = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div 
        className={`
          animate-spin rounded-full border-transparent
          ${sizes[size]} 
          ${colors[color]}
        `}
      ></div>
      {text && (
        <p className="mt-2 text-sm font-medium text-gray-700">{text}</p>
      )}
    </div>
  );
  
  // If fullScreen, render with an overlay
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-5 rounded-lg shadow-lg">
          {spinnerElement}
        </div>
      </div>
    );
  }
  
  return spinnerElement;
};

export default LoadingSpinner;