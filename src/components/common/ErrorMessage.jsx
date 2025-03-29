import React from 'react';

/**
 * ErrorMessage component for displaying error messages inline
 * 
 * @param {Object} props
 * @param {string} props.message - The error message to display
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.withIcon - Whether to show an error icon
 * @param {string} props.variant - Error variant (default, warning, info)
 */
const ErrorMessage = ({ 
  message, 
  className = '',
  withIcon = true,
  variant = 'default'
}) => {
  if (!message) return null;
  
  const variants = {
    default: 'text-red-500 bg-red-50 border-red-200',
    warning: 'text-yellow-700 bg-yellow-50 border-yellow-200',
    info: 'text-blue-500 bg-blue-50 border-blue-200'
  };
  
  // Icons for each variant
  const icons = {
    default: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    info: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  return (
    <div className={`p-3 rounded-md border ${variants[variant]} text-sm flex items-start ${className}`}>
      {withIcon && (
        <span className="flex-shrink-0 mt-0.5">
          {icons[variant]}
        </span>
      )}
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
