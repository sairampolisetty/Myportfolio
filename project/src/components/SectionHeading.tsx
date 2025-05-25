import React from 'react';

interface SectionHeadingProps {
  children: React.ReactNode;
  centered?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ children, centered = true }) => {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        {children}
      </h2>
      <div className={`h-1 w-20 bg-blue-500 mt-4 rounded ${centered ? 'mx-auto' : ''}`}></div>
    </div>
  );
};

export default SectionHeading;