import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Typewriter } from 'react-simple-typewriter';
import Button from './Button';

const AnimatedSphere = () => {
  return (
    <Sphere args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color="#4f46e5"
        attach="material"
        distort={0.5}
        speed={1.5}
        roughness={0}
      />
    </Sphere>
  );
};

const Hero: React.FC = () => {
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!profileRef.current) return;
      
      // Calculate the center of the element
      const rect = profileRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate the distance from the mouse to the center
      const distX = (e.clientX - centerX) / 25;
      const distY = (e.clientY - centerY) / 25;
      
      // Apply the transform (limited range)
      profileRef.current.style.transform = `perspective(1000px) rotateY(${distX}deg) rotateX(${-distY}deg)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center pt-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* 3D Background Element */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <AnimatedSphere />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 mb-12 md:mb-0"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            >
              <span className="inline-block">
                <Typewriter
                  words={[
                    "I build AI agents for real-world problems.",
                    "Full Stack Web & AI Specialist.",
                    "Modern, Fast, Beautiful, Intelligent.",
                    "Let's turn your idea into reality."
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={60}
                  deleteSpeed={40}
                  delaySpeed={2000}
                />
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
            >
              I specialize in full stack web development using AI. I create intelligent, scalable solutions that solve real-world challenges and deliver exceptional user experiences.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <a href="sairam_Fullstack_web_Developer.pdf" target="_blank">
                <Button>View My CV</Button>
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            ref={profileRef}
            className="w-full md:w-2/5 transition-transform duration-200 ease-out"
            style={{
              animation: 'float 4s ease-in-out infinite, rotate3d 10s linear infinite',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              border: '2px solid #3B82F6',
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="relative w-full h-0 pb-[100%] rounded-2xl overflow-hidden shadow-xl border border-white/10 backdrop-blur-sm">
          
              <img
                src={`/Myportfolio/images/sairam.jpg?v=1.0`}
                alt="Sairam"
                className="absolute top-0 left-0 w-full h-full object-cover"
                style={{
                  animation: 'float 6s ease-in-out infinite, rotate3d 12s linear infinite',
                  borderRadius: '1.5rem',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
