import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  onClick,
  type = 'button',
  fullWidth = false,
  className = ''
}) => {
  const baseStyles = "rounded font-semibold focus:outline-none transition-colors duration-200";
  
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-700 active:bg-blue-800",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800",
    outline: "border-2 border-blue-500 text-blue-500 hover:bg-blue-50 active:bg-blue-100",
    danger: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
    success: "bg-green-500 text-white hover:bg-green-600 active:bg-green-700"
  };
  
  const sizes = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;