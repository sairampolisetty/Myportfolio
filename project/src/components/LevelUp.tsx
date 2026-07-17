import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Rocket, Play, Square, RotateCcw } from 'lucide-react';
import { TextReveal } from './TextReveal';
import { StickmanAvatar } from './StickmanAvatar';

const levels = [
  { id: 0, label: '', x: 15, y: 85 },
  { id: 1, label: 'Full stack', x: 85, y: 68 },
  { id: 2, label: 'AI Tools', x: 15, y: 51 },
  { id: 3, label: 'Aws', x: 85, y: 34 },
  { id: 4, label: 'Cyber Security', x: 50, y: 15 },
];

export default function LevelUp() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentLevel((prev) => {
          if (prev >= levels.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3500); // Slower jump every 3.5s to allow full sticky animation
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentLevel(0);
  };

  const handleStart = () => {
    if (currentLevel >= levels.length - 1) {
      setCurrentLevel(0);
    }
    setIsPlaying(true);
  };

  const handleStop = () => setIsPlaying(false);

  return (
    <section id="level-up" className="relative overflow-hidden border-t border-[#1f1f1f] py-12 sm:py-24">
      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Text Content */}
          <div>
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:.5 }} viewport={{ once:true, amount:.2 }}>
              <h2 className="section-title mb-6 lg:mb-8">
                <TextReveal text="🚀 Always Building" delay={0.1} />
              </h2>
              
              <div className="space-y-6 text-gray-400 leading-relaxed text-[1.05rem]">
                <p>
                  Whether it's mentoring students, experimenting with AI-powered dev tools, or diving deep into new domains like <strong className="text-green-500">AWS</strong> and <strong className="text-green-500">Cybersecurity</strong>, I'm constantly looking for ways to push my craft forward. My curiosity drives me to keep exploring, because I believe great engineering is part code, part collaboration, and a lifelong commitment to learning.
                </p>
                <p>
                  <strong className="text-gray-200">In short:</strong> I'm not just here to build software. I'm here to make systems more secure, the web faster, and to leave every codebase I touch in better shape than I found it.
                </p>
                <p className="text-sm border-l-2 border-green-500/30 pl-4 text-gray-500 mt-8">
                  To learn more about how I level up my skills, explore the interactive mini-game on the right. You can watch my virtual avatar jump through the different tiers of my engineering journey!
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Mini-Game Content */}
          <motion.div 
            initial={{ opacity:0, scale:0.95 }} whileInView={{ opacity:1, scale:1 }} transition={{ duration:.6, delay:.2 }} viewport={{ once:true, amount:.2 }}
            className="relative w-full bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4 shadow-2xl h-[450px] sm:h-[500px] lg:h-[550px] flex flex-col"
          >
            {/* Game Header Controls */}
            <div className="flex flex-wrap justify-between items-center mb-6 relative z-20 gap-4">
              <div className="font-bold text-xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 drop-shadow-[0_0_10px_rgba(34,197,94,0.1)] w-full sm:w-auto text-center sm:text-left">
                LEVEL UP
              </div>
              <div className="flex flex-wrap justify-center sm:justify-end gap-3 w-full sm:w-auto">
                <button 
                  onClick={handleStart} 
                  disabled={isPlaying}
                  className={`flex items-center gap-1.5 px-4 py-1.5 border border-transparent rounded font-mono text-xs font-semibold transition-all ${
                    isPlaying 
                    ? 'bg-green-500/50 text-black/50 cursor-not-allowed' 
                    : 'bg-green-500 text-black hover:bg-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                  }`}
                >
                  {isPlaying ? <Rocket size={14} /> : <Play size={14} />} 
                  {isPlaying ? 'Running...' : 'Start'}
                </button>
                <button onClick={handleStop} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 rounded font-mono text-xs transition-colors">
                  <Square size={14} /> Stop
                </button>
                <button onClick={handleReset} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30 rounded font-mono text-xs transition-colors">
                  <RotateCcw size={14} /> Reset
                </button>
              </div>
            </div>

            {/* Game Canvas */}
            <div id="game-canvas" className="flex-1 relative bg-[#050505] rounded-lg border border-[#1f1f1f] overflow-hidden"
                 style={{ backgroundImage: 'radial-gradient(rgba(34,197,94,0.1) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
              
              {/* Responsive Container */}
              <div className="absolute inset-0 w-full h-full">
                {/* Platforms */}
                {levels.map((level) => {
                  const isClickable = Math.abs(level.id - currentLevel) === 1;
                  return (
                  <div 
                    key={level.id}
                    onClick={() => {
                      if (isClickable) {
                        setCurrentLevel(level.id);
                      }
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 group ${
                      isClickable ? 'cursor-pointer' : level.id === currentLevel ? 'cursor-default' : 'cursor-not-allowed'
                    }`}
                    style={{ left: `${level.x}%`, top: `${level.y}%` }}
                  >
                    {/* Large invisible hitbox for easier clicking */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-20 bg-transparent" />
                    
                    <div className={`relative h-1 w-16 sm:w-24 rounded-full transition-all duration-300
                      ${currentLevel >= level.id ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]' : 'bg-gray-700 group-hover:bg-gray-600'}`} 
                    />
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap text-[9px] sm:text-[11px] font-semibold tracking-wider uppercase text-center leading-tight transition-colors duration-300
                      ${currentLevel >= level.id ? 'text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'text-gray-500 group-hover:text-gray-300'}`}>
                      {level.label}
                    </div>
                  </div>
                  );
                })}

                {/* Stickman Avatar (Stretchy sequence) */}
                <StickmanAvatar levels={levels} currentLevel={currentLevel} />
                
                {/* Connection Lines (Optional tech aesthetic) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                  <path 
                    d={`M ${levels.map(l => `${l.x}% ${l.y}%`).join(' L ')}`} 
                    fill="none" 
                    stroke="#22c55e" 
                    strokeWidth="2" 
                    strokeDasharray="4 4" 
                  />
                </svg>
              </div>

            </div>

            {/* Game Footer */}
            <div className="mt-4 text-center">
              <p className="text-gray-400 text-sm">Click a platform to jump Sairam up the different levels!</p>
              <a href="https://github.com/sairampolisetty" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-2 text-xs text-green-500 hover:text-green-400 font-mono transition-colors">
                <Github size={12} /> View on GitHub
              </a>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
