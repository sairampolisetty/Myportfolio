import React from 'react';
import { FaGithub, FaLinkedinIn, FaEnvelope, FaLink } from 'react-icons/fa';

export const socials = [
  { href: 'https://github.com/sairampolisetty',            icon: <FaGithub size={28} />,   label: 'GitHub', bg: '#000000', color: '#ffffff', shape: 'square' },
  { href: 'https://www.linkedin.com/in/sairam-polisetty/', icon: <FaLinkedinIn size={24} />, label: 'LinkedIn', bg: '#0077b5', color: '#ffffff', shape: 'circle' },
  { href: 'mailto:sairampolisetty6@gmail.com',            icon: <FaEnvelope size={22} />,     label: 'Email', bg: '#ea4335', color: '#ffffff', shape: 'circle' },
  { href: 'https://topmate.io/sairam_polisetty/',          icon: <FaLink size={24} />,    label: 'Topmate', bg: '#111111', color: '#38bdf8', shape: 'square' },
];

export const skills = {
  'Languages':     ['JavaScript (ES6+)', 'HTML5', 'CSS3', 'Python', 'SQL'],
  'Frontend':      ['React.js', 'Next.js', 'Tailwind CSS', 'Bootstrap'],
  'Backend':       ['Node.js', 'Express.js', 'FastAPI'],
  'AI & Concepts': ['RAG', 'LangChain', 'LLM Integration'],
  'Databases':     ['MongoDB', 'PostgreSQL', 'MySQL'],
  'Tools & Cloud': ['Git', 'GitHub', 'AWS (EC2, S3, IAM)', 'Postman'],
};

export const projects = [
  {
    num: '01',
    title: 'ImagineZY',
    desc: 'Full-stack AI image generation platform with secure authentication, personalized feeds, and responsive UI.',
    image: './imaginezy.webp',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Clerk', 'Tailwind CSS'],
    link: 'https://github.com/sairampolisetty/imagineZY',
    note: null,
  },
  {
    num: '02',
    title: 'WikiQuizAi',
    desc: 'AI-powered quiz generation platform. Integrated REST APIs to fetch quiz data dynamically with difficulty tagging.',
    image: './wikiquiz.webp',
    tech: ['Python', 'FastAPI', 'LangChain', 'React', 'MySQL'],
    link: 'https://github.com/sairampolisetty/WikiQuizAi',
    note: null,
  },
  {
    num: '03',
    title: "Priya's English World",
    desc: 'Developed a custom English communication and learning platform. Features responsive design and interactive elements. (Client Work)',
    image: './pew.webp',
    tech: ['React.js', 'Tailwind CSS', 'Node.js'],
    link: 'https://github.com/sairampolisetty/Priyas_english_world',
    note: 'Client Work',
  },
];
