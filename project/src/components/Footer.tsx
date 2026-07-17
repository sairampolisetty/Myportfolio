import React from 'react';
import { motion } from 'framer-motion';
import { socials } from '../lib/data';

const Footer = () => (
  <footer className="pt-20 bg-[#0d0d0d] border-t border-[#1f1f1f]">
    <div className="container flex flex-col items-center">
      {/* Top section: Social Icons with Labels */}
      <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-32">
        {socials.map(s => (
          <motion.a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="group flex flex-col items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 no-underline"
          >
            <div 
              className={`w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] ${s.shape === 'circle' ? 'rounded-full' : 'rounded-[18px]'} flex items-center justify-center shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 ring-1 ring-white/5 group-hover:ring-white/20`}
              style={{ backgroundColor: s.bg, color: s.color }}
            >
              {s.icon}
            </div>
            <span className="text-[0.75rem] font-sans tracking-wide">
              {s.label}
            </span>
          </motion.a>
        ))}
      </div>
    </div>

    {/* Bottom section: Copyright Divider */}
    <div className="w-full border-t border-[#1f1f1f] bg-[#0a0a0a]">
      <div className="container pt-8 pb-32 flex justify-center text-center">
        <span className="text-gray-400 text-[0.85rem] font-sans">
          This site is designed and developed by Sairam Polisetty (@sairampolisetty) | &copy; 2026 All rights reserved.
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
