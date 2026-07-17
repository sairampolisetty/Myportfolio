import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { label:'about', href:'#about' }, { label:'skills', href:'#skills' },
  { label:'experience', href:'#experience' }, { label:'projects', href:'#projects' },
  { label:'contact', href:'#contact' },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive:true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <header className="site-header" style={{ boxShadow: scrolled ? '0 1px 0 #1f1f1f' : 'none' }}>
        <div className="container">
          <a href="#home" className="logo">sp<span style={{ color:'#9ca3af' }}>.</span></a>
          <nav className="nav-desktop">
            {links.map((l, i) => (
              <a key={l.href} href={l.href} className="relative group transition-colors duration-300 py-1">
                <span className="text-green-500 mr-1 text-[0.65rem] group-hover:text-green-400 transition-colors">0{i+1}.</span>
                <span className="text-gray-400 group-hover:text-gray-200 transition-colors">{l.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-green-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
          <button className="nav-burger" onClick={() => setOpen(o => !o)} aria-label="Menu">
            {open ? <X size={18}/> : <Menu size={18}/>}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div className="nav-drawer"
              initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }}
              transition={{ duration:.22, ease:'easeOut' }}>
              {links.map((l, i) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="relative group inline-block py-1">
                  <span className="text-green-500 mr-2 group-hover:text-green-400 transition-colors">0{i+1}.</span>
                  <span className="text-gray-400 group-hover:text-gray-200 transition-colors">{l.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
