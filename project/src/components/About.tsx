import React, { useRef, useEffect } from 'react';
import SectionHeading from './SectionHeading';

const About: React.FC = () => {
  const bulletRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('translate-x-0', 'opacity-100');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    bulletRefs.current.forEach((bullet) => {
      if (bullet) observer.observe(bullet);
    });

    return () => {
      bulletRefs.current.forEach((bullet) => {
        if (bullet) observer.unobserve(bullet);
      });
    };
  }, []);

  return (
    <section id="about" className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading>About Me</SectionHeading>
        
        <div className="max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 leading-relaxed">
            I'm Sairam—a full‑stack web engineer and AI specialist who elevates digital experiences and solves real-world problems with intelligent agents.
          </p>
          
          <ul className="space-y-8">
            <li 
              ref={(el) => (bulletRefs.current[0] = el)}
              className="flex items-start transform -translate-x-8 opacity-0 transition-all duration-500 delay-100"
            >
              <span className="flex-shrink-0 p-1 bg-blue-100 dark:bg-blue-900 rounded-full mr-4 mt-1">
                <span className="block w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"></span>
              </span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI & Agent Engineering</h3>
                <p className="text-gray-600 dark:text-gray-400">I build AI agents and intelligent systems that solve real-world problems and automate complex workflows. I have explored 100+ AI tools and continue to learn new tools every day.</p>
              </div>
            </li>
            
            <li 
              ref={(el) => (bulletRefs.current[1] = el)}
              className="flex items-start transform -translate-x-8 opacity-0 transition-all duration-500 delay-200"
            >
              <span className="flex-shrink-0 p-1 bg-blue-100 dark:bg-blue-900 rounded-full mr-4 mt-1">
                <span className="block w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"></span>
              </span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Front‑End Precision</h3>
                <p className="text-gray-600 dark:text-gray-400">Pixel‑perfect HTML/CSS and React that feel alive.</p>
              </div>
            </li>
            
            <li 
              ref={(el) => (bulletRefs.current[2] = el)}
              className="flex items-start transform -translate-x-8 opacity-0 transition-all duration-500 delay-300"
            >
              <span className="flex-shrink-0 p-1 bg-blue-100 dark:bg-blue-900 rounded-full mr-4 mt-1">
                <span className="block w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"></span>
              </span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Robust Back‑Ends</h3>
                <p className="text-gray-600 dark:text-gray-400">Node.js + Express powering fast, reliable APIs.</p>
              </div>
            </li>
            
            <li 
              ref={(el) => (bulletRefs.current[3] = el)}
              className="flex items-start transform -translate-x-8 opacity-0 transition-all duration-500 delay-400"
            >
              <span className="flex-shrink-0 p-1 bg-blue-100 dark:bg-blue-900 rounded-full mr-4 mt-1">
                <span className="block w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"></span>
              </span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Data at Scale</h3>
                <p className="text-gray-600 dark:text-gray-400">MongoDB & SQL designs that grow with you.</p>
              </div>
            </li>
          </ul>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-10 font-medium">
            Let's craft the next app users can't live without.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;