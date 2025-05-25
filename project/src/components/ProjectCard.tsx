import React, { useState, useRef } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  stats: string;
  technologies: string[];
  link?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  image, 
  stats, 
  technologies, 
  link
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  };
  
  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      ref={cardRef}
      className="h-[500px] bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-500 flex flex-col justify-between"
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="absolute inset-0 w-full h-full backface-visibility-hidden transition-all duration-500"
        style={{ 
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)', 
          backfaceVisibility: 'hidden',
          zIndex: isFlipped ? 0 : 1
        }}
      >
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
          />
        </div>
        <div className="p-6 flex flex-col flex-1 justify-between">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, index) => (
              <span 
                key={index} 
                className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors text-base text-center"
            >
              View Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;