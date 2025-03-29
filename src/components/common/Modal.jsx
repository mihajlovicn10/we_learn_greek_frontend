import React, { useEffect } from 'react';

/**
 * Modal component for displaying content in an overlay
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to call when the modal is closed
 * @param {string} props.title - The title of the modal
 * @param {ReactNode} props.children - The content of the modal
 * @param {string} props.size - The size of the modal (sm, md, lg, xl)
 * @param {boolean} props.closeOnOutsideClick - Whether to close the modal when clicking outside
 * @param {boolean} props.showCloseButton - Whether to show the close button
 * @param {ReactNode} props.footer - Optional footer content
 * @param {string} props.className - Additional CSS classes for the modal container
 */
const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  size = 'md',
  closeOnOutsideClick = true,
  showCloseButton = true,
  footer = null,
  className = ''
}) => {
  // Handle ESC key press to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (isOpen && event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    
    // Prevent scrolling on the body when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'visible';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Size classes for the modal
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4'
  };

  // Handle outside click
  const handleOutsideClick = (e) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 overflow-y-auto"
      onClick={handleOutsideClick}
    >
      <div 
        className={`
          bg-white rounded-lg shadow-xl w-full 
          ${sizeClasses[size]} 
          ${className}
          transform transition-all duration-300 ease-in-out
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 
            id="modal-title" 
            className="text-xl font-bold text-gray-800"
          >
            {title}
          </h2>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
              aria-label="Close"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          )}
        </div>
        
        <div className="p-4">
          {children}
        </div>
        
        {footer && (
          <div className="border-t p-4 bg-gray-50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;