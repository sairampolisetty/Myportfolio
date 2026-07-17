import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { ArrowRight, Download } from 'lucide-react';
import { TextReveal } from './TextReveal';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current; 
    if (!cv) return;
    
    const ctx = cv.getContext('2d')!;
    let w = 0, h = 0, raf = 0, t = 0;
    
    const resize = () => { 
      w = cv.width = cv.offsetWidth; 
      h = cv.height = cv.offsetHeight; 
    };
    resize();
    window.addEventListener('resize', resize);
    
    // Background stars (spread out further to cover corners during rotation)
    const stars = Array.from({ length: 800 }, () => ({
      x: (Math.random() - 0.5) * 2.5,
      y: (Math.random() - 0.5) * 2.5,
      r: Math.random() * 1.5 + 0.5,
      a: Math.random() * 0.7 + 0.1,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
    }));

    // One slow-moving dot
    let slowDot = {
      x: -0.1,
      y: 0.5,
      speed: 0.0025,
      active: true,
      delayCounter: 0,
    };
    
    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) draw();
    });
    observer.observe(cv);

    const draw = () => {
      if (!isVisible) return;
      t++;
      ctx.clearRect(0, 0, w, h);
      
      // Draw background stars with slow 360 rotation
      ctx.save();
      ctx.translate(w/2, h/2);
      ctx.rotate(t * 0.0005); // Very slow rotation
      
      stars.forEach(s => {
        s.a += Math.sin(t * s.twinkleSpeed) * 0.02; 
        if(s.a < 0.1) s.a = 0.1;
        if(s.a > 1) s.a = 1;
        
        ctx.beginPath(); 
        const maxDim = Math.max(w, h);
        ctx.arc(s.x * maxDim, s.y * maxDim, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a})`; 
        ctx.fill();
      });
      ctx.restore();

      // Draw the single slow-moving dot
      if (slowDot.active) {
        slowDot.x += slowDot.speed;
        
        // Arc path: calculate progress from -0.1 to 1.1, mapping to a sine wave arch
        const progress = (slowDot.x + 0.1) / 1.2;
        slowDot.y = 0.5 - Math.sin(progress * Math.PI) * 0.25;
        
        const dotX = slowDot.x * w;
        const dotY = slowDot.y * h;
        
        // The dot itself with a soft glow
        ctx.beginPath();
        ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,1)';
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'white';
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Deactivate once it passes the screen
        if (slowDot.x > 1.1) {
          slowDot.active = false;
          slowDot.delayCounter = 60 + Math.random() * 60;
        }
      } else {
        slowDot.delayCounter--;
        if (slowDot.delayCounter <= 0) {
          slowDot.active = true;
          slowDot.x = -0.1;
          slowDot.y = 0.5;
          slowDot.speed = 0.0025;
        }
      }

      raf = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => { 
      cancelAnimationFrame(raf); 
      window.removeEventListener('resize', resize); 
      observer.disconnect();
    };
  }, []);

  return (
    <section id="home" className="min-h-[100svh] lg:min-h-[85vh] flex items-center relative overflow-hidden border-none py-10 lg:py-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 opacity-100 pointer-events-none" />

      <div className="container relative z-10 py-12 lg:py-20">

        <motion.span
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:.5 }}
          className="font-mono text-[0.72rem] text-green-500 tracking-[0.15em] block mt-4 lg:mt-2 mb-4 sm:mb-5">
          Hi, my name is
        </motion.span>

        <h1 className="text-[clamp(2.5rem,8vw,5.8rem)] font-bold tracking-[-0.04em] leading-none text-gray-100 mb-2">
          <TextReveal text="Sairam Polisetty." delay={0.1} />
        </h1>

        <h2 className="text-[clamp(1.8rem,5.5vw,3.5rem)] font-bold tracking-[-0.03em] leading-[1.1] text-gray-400 mb-7">
          <TextReveal text="I build things for the web." delay={0.2} />
        </h2>

        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:.5, delay:.35 }}
          className="font-mono text-[0.9rem] text-gray-300 mb-8 min-h-[48px] sm:min-h-[26px]">
          <Typewriter words={['Full-Stack Engineer.','AI Agent Builder.','React Developer.','Problem Solver.']} loop={0} cursor cursorStyle="_" typeSpeed={50} deleteSpeed={30} delaySpeed={2000}/>
        </motion.div>

        <motion.p
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:.5, delay:.45 }}
          className="body-text mb-10">
          I'm a Software Engineer based in India, specializing in building responsive web applications with React and integrating AI features like RAG. Currently pursuing my B.Tech at Narasaraopeta Engineering College and working as a Teaching Assistant to help 1100+ students level up their engineering skills.
        </motion.p>

        <motion.div
          initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:.5, delay:.55 }}
          className="flex flex-wrap gap-3 mb-8 sm:mb-12">
          <a href="#projects" className="btn-primary">
            See my work <ArrowRight size={14}/>
          </a>
          <a href="sairam_Fullstack_web_Developer.pdf" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <Download size={14}/> Resume
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
