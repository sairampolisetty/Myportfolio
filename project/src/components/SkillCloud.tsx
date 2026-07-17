import { useRef, useState, useMemo, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { RotateCcw, Database, Globe, Brain, MessageSquare, Network, Cloud } from 'lucide-react';
import {
  SiJavascript, SiTypescript, SiPython, SiHtml5, SiReact, SiNextdotjs,
  SiFramer, SiTailwindcss, SiThreedotjs, SiNodedotjs, SiExpress,
  SiFastapi, SiJsonwebtokens, SiLangchain, SiN8N, SiMongodb,
  SiPostgresql, SiMysql, SiFirebase, SiRedis, SiGit, SiDocker,
  SiVercel, SiLinux
} from 'react-icons/si';

const skillsData = [
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Python', icon: SiPython },
  { name: 'HTML/CSS', icon: SiHtml5 },
  { name: 'SQL', icon: Database },
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Framer Motion', icon: SiFramer },
  { name: 'Tailwind', icon: SiTailwindcss },
  { name: 'Three.js', icon: SiThreedotjs },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Express', icon: SiExpress },
  { name: 'FastAPI', icon: SiFastapi },
  { name: 'REST APIs', icon: Globe },
  { name: 'JWT', icon: SiJsonwebtokens },
  { name: 'LangChain', icon: SiLangchain },
  { name: 'OpenAI', icon: Brain },
  { name: 'Voiceflow', icon: MessageSquare },
  { name: 'n8n', icon: SiN8N },
  { name: 'RAG', icon: Network },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'MySQL', icon: SiMysql },
  { name: 'Firebase', icon: SiFirebase },
  { name: 'Redis', icon: SiRedis },
  { name: 'Git', icon: SiGit },
  { name: 'Docker', icon: SiDocker },
  { name: 'Vercel', icon: SiVercel },
  { name: 'AWS', icon: Cloud },
  { name: 'Linux', icon: SiLinux }
];

const SkillChip = ({ skill, index, resetSignal, containerRef }: any) => {
  const [flipped, setFlipped] = useState(false);
  const Icon = skill.icon;
  
  // Motion values to track and control drag position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Reduce scatter on small screens to prevent overlap
  const scatter = useMemo(() => {
    const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 6 : 18;
    return {
      x: (Math.random() - 0.5) * radius,
      y: (Math.random() - 0.5) * radius,
      rotate: (Math.random() - 0.5) * radius
    };
  }, []);

  // Animate dragged chips back to origin when resetSignal triggers
  useEffect(() => {
    if (resetSignal > 0) {
      animate(x, 0, { type: 'spring', stiffness: 300, damping: 25 });
      animate(y, 0, { type: 'spring', stiffness: 300, damping: 25 });
      setFlipped(false);
    }
  }, [resetSignal, x, y]);

  return (
    <div style={{ transform: `translate(${scatter.x}px, ${scatter.y}px)` }}>
      <motion.div
        key={index}
        drag
        className="px-2.5 py-1.5 sm:px-5 sm:py-2.5 text-[0.55rem] sm:text-[0.8rem] flex items-center justify-center relative cursor-pointer font-mono text-[#e5e7eb] bg-green-500/5 border border-green-500/20 rounded-full"
        style={{
          x, y,
          transformStyle: 'preserve-3d'
        }}
        dragConstraints={containerRef}
        dragElastic={0.2}
        onClick={() => setFlipped(!flipped)}
        whileHover={{
          scale: 1.15,
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
          color: '#22c55e',
          zIndex: 10,
          rotate: 0
        }}
        whileDrag={{ scale: 1.2, zIndex: 20, cursor: 'grabbing', rotate: 0 }}
        initial={{ opacity: 0, y: 20, scale: 0.9, rotateY: 180, rotate: scatter.rotate }}
        whileInView={{ opacity: 1, y: 0, scale: 1, rotateY: flipped ? 180 : 0 }}
        viewport={{ once: true, margin: "50px" }}
        transition={{
          opacity: { duration: 0.4, delay: index * 0.02 },
          y: { duration: 0.4, delay: index * 0.02 },
          scale: { type: 'spring', stiffness: 300, damping: 20 },
          rotateY: { duration: 0.3, ease: "easeOut" },
          rotate: { duration: 0.3 }
        }}
      >
        <div style={{ backfaceVisibility: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}>
          {skill.name}
        </div>
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={20} />
        </div>
      </motion.div>
    </div>
  );
};

export const SkillCloud = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [resetSignal, setResetSignal] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          viewport={{ once: true }}
          style={{
            color: '#6b7280',
            fontSize: '0.75rem',
            fontFamily: "'Space Mono', monospace",
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M9 19l3 3 3-3M19 9l3 3-3 3M2 12h20M12 2v20" />
          </svg>
          Try dragging or clicking the skills
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          onClick={() => setResetSignal(s => s + 1)}
          whileHover={{ color: '#22c55e' }}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            color: '#9ca3af',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            fontSize: '0.75rem',
            fontFamily: "'Space Mono', monospace",
            transition: 'border-color 0.2s ease'
          }}
          title="Reset positions"
        >
          <RotateCcw size={12} />
          Reset
        </motion.button>
      </div>

      <div ref={containerRef} className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 py-10 px-4 max-w-[900px]">
        {skillsData.map((skill, i) => (
          <SkillChip
            key={i}
            skill={skill}
            index={i}
            resetSignal={resetSignal}
            containerRef={containerRef}
          />
        ))}
      </div>
    </div>
  );
};
