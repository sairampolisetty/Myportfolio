import React from 'react';
import { Linkedin, Github, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/sairam-polisetty/', target:'__blank', label: 'LinkedIn' },
    { icon: <Github size={20} />, href: 'https://github.com/sairampolisetty',target:'_blank', label: 'GitHub' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Mail size={20} />, href: '#', label: 'Email' }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <div className="text-2xl font-bold mb-2">Sairam.dev</div>
            <p className="text-gray-400">
              © {currentYear} Sairam Polisetty
            </p>
            <p className="text-gray-400 mt-2">
              Crafted with care. Let's build something extraordinary.
            </p>
          </div>
          
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                aria-label={link.label}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-blue-600 hover:text-white transition-colors duration-300 transform perspective-icon"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;