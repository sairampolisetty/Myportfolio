import React from 'react';
import SectionHeading from './SectionHeading';
import { Code2, Database, Palette, Terminal } from 'lucide-react';

const Skills: React.FC = () => {
  const skills = [
    {
      category: "Frontend Development",
      icon: <Code2 size={48} />,
      image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      items: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      category: "Backend Development",
      icon: <Terminal size={48} />,
      image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      items: ["Node.js", "Express", "Python", "FastAPI"],
      color: "from-green-500 to-emerald-500"
    },
    {
      category: "Database Management",
      icon: <Database size={48} />,
      image: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      items: ["MongoDB", "PostgreSQL", "Redis", "Firebase"],
      color: "from-purple-500 to-pink-500"
    },
    {
      category: "UI/UX Design",
      icon: <Palette size={48} />,
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      items: ["Figma", "Adobe XD", "Sketch", "Principle"],
      color: "from-orange-500 to-red-500"
    },
  ];

  return (
    <section id="skills" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading>Technical Expertise</SectionHeading>
        
        <p className="text-xl text-center text-gray-700 dark:text-gray-300 mb-16 max-w-2xl mx-auto">
          Mastering the full stack, one technology at a time
        </p>
        
        <div className="space-y-24">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className={`skill-card flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } gap-8 md:gap-16`}
            >
              <div className="w-full md:w-1/2">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r opacity-75 rounded-xl blur-xl transition-all duration-500 group-hover:opacity-100 group-hover:blur-2xl"></div>
                  <div className="relative overflow-hidden rounded-xl aspect-video">
                    <img 
                      src={skill.image} 
                      alt={skill.category}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 space-y-6">
                <div className={`inline-block p-3 rounded-xl bg-gradient-to-r ${skill.color}`}>
                  <div className="skill-icon text-white">
                    {skill.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {skill.category}
                </h3>
                
                <div className="space-y-3">
                  {skill.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex}
                      className="flex items-center space-x-3 text-gray-700 dark:text-gray-300"
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;