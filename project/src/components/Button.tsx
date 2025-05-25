import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, primary = false, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-md active:scale-95 ${
        primary
          ? 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
          : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700'
      } ${disabled ? 'opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none' : ''}`}
    >
      {children}
    </button>
  );
};

export default Button;