import React from 'react';
import SectionHeading from './SectionHeading';
import ProjectCard from './ProjectCard';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'YouTube Clone',
      description: 'A full-featured YouTube clone with video streaming, search, and user authentication.',
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
      stats: '',
      technologies: ['HTML', 'React', 'SQL', 'Node.js'],
      link: 'https://sairamnxtwatch.ccbp.tech/'
    },
    {
      title: 'Jobby Application',
      description: 'A job portal application for searching and applying to jobs, with authentication and job details.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
      stats: '',
      technologies: ['HTML', 'CSS', 'React', 'Node', 'SQL'],
      link: 'https://sairamjobbyap.ccbp.tech/'
    },
    {
      title: 'Customer support Agent',
      description: 'It will chat with customer and updated the google sheets if the customer needs our help.',
      image: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=600&q=80',
      stats: '',
      technologies: ['React Native', 'Express', 'PostgreSQL'],
      link: 'https://creator.voiceflow.com/prototype/681334ad483a7d0803aa4cb3'
    }
  ];

  return (
    <section id="projects" className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading>Featured Projects</SectionHeading>
        
        <p className="text-xl text-center text-gray-700 dark:text-gray-300 mb-16 max-w-2xl mx-auto">
          See how I turn code into solutions
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              title={project.title}
              description={project.description}
              image={project.image}
              stats={project.stats}
              technologies={project.technologies}
              link={project.link}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a
            href="https://github.com/sairampolisetty"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 text-blue-500 font-medium border border-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            View All Projects
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;