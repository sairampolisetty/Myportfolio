import React, { useState } from 'react';

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  skills: string[];
}

const SkillCard: React.FC<SkillCardProps> = ({ icon, title, skills }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 transition-all duration-300 transform hover:shadow-lg"
      style={{
        transform: isHovered ? 'translateY(-5px) rotateX(2deg) rotateY(2deg)' : 'translateY(0) rotateX(0) rotateY(0)',
        transition: 'transform 0.3s ease-out'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-blue-500 mb-6">{icon}</div>
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
      
      <div className="space-y-2">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center">
            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            <span className="text-gray-700 dark:text-gray-300">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCard;