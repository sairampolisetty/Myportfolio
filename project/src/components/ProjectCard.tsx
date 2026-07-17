import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  desc: string;
  image: string;
  num: string;
  link: string;
  tech: string[];
  note?: string | null;
}

export const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.a 
        ref={ref}
        href={project.link} 
        target="_blank" 
        rel="noopener noreferrer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 26 }} 
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.08 }} 
        viewport={{ once: true, amount: 0.07 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="proj-card-inner group block bg-[#111] border border-[#1f1f1f] rounded-xl h-full overflow-hidden no-underline transition-all duration-300 md:hover:border-green-500/50 md:hover:shadow-[0_20px_40px_-10px_rgba(34,197,94,0.15)]"
      >
        <div 
          style={{ transform: "translateZ(30px)" }} 
          className="h-[160px] md:h-[200px] overflow-hidden relative border-b border-[#1f1f1f]"
        >
          <img src={project.image} alt={project.title} loading="lazy"
            className="proj-card-img w-full h-full object-cover grayscale-[40%] brightness-[0.6] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-500 ease-out"
          />
          <div className="absolute top-3 left-3 font-mono text-[0.65rem] text-green-500 bg-black/60 px-2 py-1 rounded backdrop-blur-sm">
            {project.num}
          </div>
        </div>

        <div className="px-5 py-[18px]" style={{ transform: "translateZ(40px)" }}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[0.95rem] font-semibold text-gray-200">{project.title}</h3>
            <ExternalLink size={13} className="text-gray-400 shrink-0" />
          </div>
          <p className="text-[0.75rem] md:text-[0.8rem] text-gray-400 leading-[1.65] mb-3 line-clamp-4 md:line-clamp-none">{project.desc}</p>
          {project.note && <p className="hidden md:block font-mono text-[0.6rem] text-gray-500 mb-3">{project.note}</p>}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>
      </motion.a>
    </div>
  );
};
