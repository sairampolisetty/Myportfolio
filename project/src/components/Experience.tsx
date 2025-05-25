import { motion } from 'framer-motion';

const ExperienceCard = ({ title, company, duration, description }: {
  title: string;
  company: string;
  duration: string;
  description: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
      whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)' }}
      className="bg-white dark:bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-blue-700 hover:border-blue-400 transition-all shadow-md dark:shadow-blue-900/40 group"
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-blue-600 dark:text-blue-400 mb-2">{company}</p>
      <p className="text-gray-500 dark:text-gray-400 mb-4">{duration}</p>
      <p className="text-gray-700 dark:text-gray-200">{description}</p>
    </motion.div>
  );
};

const Experience = () => {
  const experiences = [
    {
      title: "Software Developer Intern",
      company: "Perfect Plan B",
      duration: "5 months",
      description: "I resolved students' doubts related to Python and contributed to the development of innovative projects, helping learners overcome challenges and deepen their understanding of programming concepts."
    },
    {
      title: "Teaching Assistant",
      company: "Nxtwave",
      duration: "May 2024 - Present",
      description: "I assist students with their questions on React frontend and backend development. Over 1,000 students have found my guidance helpful, and I am dedicated to making complex topics accessible and supporting learners in their coding journey."
    }
  ];

  return (
    <section id="experience" className="py-20 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          Professional Experience
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-center max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 