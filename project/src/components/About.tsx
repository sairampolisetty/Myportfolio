import { motion } from 'framer-motion';
import { TextReveal } from './TextReveal';
import { SkillCloud } from './SkillCloud';
import { ImageAtomizer } from './ImageAtomizer';

const About = () => (
  <>
    <section id="about">
      <div className="container">
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:.5 }} viewport={{ once:true, amount:.1 }}>
          <span className="section-num">01. about me</span>
          <h2 className="section-title mb-8">
            <TextReveal text="👋 About Me" delay={0.1} />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 items-start">
          <motion.div initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:.5, delay:.1 }} viewport={{ once:true, amount:.1 }}>
            <div className="grid md:grid-cols-[6fr_4fr] gap-12 md:gap-16 items-center w-full">
              <div className="flex flex-col gap-4">
                <p className="body-text">
                  I'm <strong className="text-gray-200">Sairam Polisetty</strong> — a Software Engineer with a deep interest in building responsive web applications. I am currently pursuing my B.Tech in ECE at <strong className="text-gray-200">Narasaraopeta Engineering College</strong>, graduating in May 2026.
                </p>
                <p className="body-text">
                  Recently, I worked as a Frontend Engineer Intern at <strong className="text-gray-200">AARO7 Fintech</strong>, where I developed React components and integrated Retrieval-Augmented Generation (RAG) features. I also work as a Teaching Assistant, mentoring over <strong className="text-green-500">1,100 students</strong> through coding challenges and algorithms.
                </p>
                <p className="body-text">
                  Outside of coursework and interning, I enjoy solving Data Structures and Algorithms problems (having solved 180+ on LeetCode) and leading an English communication group with 250+ active members. I believe software should feel fast, intuitive, and human.
                </p>
              </div>

              <div className="relative w-full max-w-[500px] mx-auto">
                {/* Floating "Hover me" hint outside the image container */}
                <div className="absolute -top-[35px] -left-[10px] -rotate-10 font-mono text-green-500 text-base font-bold pointer-events-none flex items-center gap-2 z-20" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                    Hover me
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rotate-[135deg]">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>

                  {/* Main image container, enlarged and set to true aspect ratio */}
                  <div className="relative w-full aspect-[1239/1272]">
                    <ImageAtomizer imageUrl="https://res.cloudinary.com/dwwqwf1q1/image/upload/v1755193861/sairam_ibscor.jpg" />
                  </div>
                </div>
              </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Skills section immediately after about */}
    <section id="skills">
      <div className="container">
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:.5 }} viewport={{ once:true, amount:.1 }}>
          <span className="section-num">02. skills</span>
          <h2 className="section-title mb-8">
            <TextReveal text="💡 Tech Arsenal" delay={0.1} />
          </h2>
        </motion.div>

        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ duration: 1, delay: 0.2 }} viewport={{ once:true, amount:0.1 }}>
          <SkillCloud />
        </motion.div>
      </div>
    </section>
  </>
);

export default About;
