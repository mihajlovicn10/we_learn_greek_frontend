import React from 'react';

const Card = ({ 
  title, 
  children, 
  className = '',
  titleClassName = '',
  hoverable = false,
  footer = null
}) => {
  return (
    <div className={`
      bg-white rounded-lg shadow-md overflow-hidden
      ${hoverable ? 'transition-shadow duration-300 hover:shadow-lg' : ''}
      ${className}
    `}>
      {title && (
        <div className={`px-6 py-4 border-b ${titleClassName}`}>
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
      )}
      
      <div className="p-6">
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card; 