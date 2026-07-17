import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { TextReveal } from './TextReveal';
import { projects } from '../lib/data';
import { ProjectCard } from './ProjectCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const Projects = () => (
  <section id="projects">
    <div className="container overflow-hidden">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .5 }} viewport={{ once: true, amount: .1 }}>
        <span className="section-num">04. projects</span>
        <h2 className="section-title mb-6">
          <TextReveal text="🌍 Things I've Built" delay={0.1} />
        </h2>
        <p className="text-gray-400 text-[0.9rem] mb-6 max-w-[480px]">A selection of projects I'm proud of. More on GitHub.</p>
      </motion.div>

      {/* DESKTOP VIEW */}
      <div className="hidden md:block">
        <div className="proj-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>

      {/* MOBILE 3D STACKED CAROUSEL VIEW */}
      <div className="block md:hidden w-full -mx-4 px-4 relative pb-10">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1.5}
          loop={false}
          coverflowEffect={{
            rotate: 0,
            stretch: -30,
            depth: 150,
            modifier: 2,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Navigation]}
          className="w-full pt-4 pb-12"
        >
          {projects.map((p, i) => (
            <SwiperSlide key={p.title} className="w-full max-w-[290px]">
              <ProjectCard project={p} index={i} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: .5, delay: .2 }} viewport={{ once: true }}
        className="mt-12 flex justify-center items-center">
        <a href="https://github.com/sairampolisetty" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-500 border border-green-500/30 bg-green-500/5 hover:bg-green-500/15 hover:border-green-500/60 px-6 py-2.5 rounded font-mono text-[0.8rem] transition-all duration-300">
          <Github size={16} /> view more on github
        </a>
      </motion.div>
    </div>
  </section>
);

export default Projects;
