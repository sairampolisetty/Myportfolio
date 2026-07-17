import { motion } from 'framer-motion';
import { TextReveal } from './TextReveal';

const jobs = [
  {
    date:    'Jan 2026 - May 2026',
    role:    'Frontend Engineer Intern',
    company: 'AARO7 Fintech (CarArth Platform)',
    url:     'https://cararth.com/',
    desc:    'Developed reusable React components and designed responsive UI layouts with Tailwind CSS. Implemented real-time search and handled REST API integrations. Collaborated on RAG features for intelligent data retrieval and improved overall SEO performance.',
    skills:  ['React.js', 'Tailwind CSS', 'REST APIs', 'RAG'],
  },
  {
    date:    'April 2024 – Dec 2025',
    role:    'Teaching Assistant',
    company: 'Extracurricular / Leadership',
    url:     '#',
    desc:    'Mentored 1100+ students through coding challenges and project development. Founded and led an English communication group with 250+ active members. Solved 180+ Data Structures and Algorithms problems on various coding platforms.',
    skills:  ['Mentoring', 'Problem Solving', 'Leadership'],
  },
];

const Experience = () => (
  <section id="experience" className="relative overflow-hidden">
    <div className="container">
      <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:.5 }} viewport={{ once:true, amount:.1 }}>
        <span className="section-num">03. experience</span>
        <h2 className="section-title mb-8">
          <TextReveal text="🧠 My Journey" delay={0.1} />
        </h2>
      </motion.div>

      <div className="relative group/list mt-10">
        {jobs.map((job, i) => (
          <motion.div key={i}
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            transition={{ duration:.5, delay: i*.1 }} viewport={{ once:true, amount:.1 }}
            className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 mb-12 sm:mb-8"
          >
            {/* Absolute hover effect background spanning out */}
            <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-[#151515] lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>

            {/* Date col */}
            <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-gray-500 sm:col-span-2 font-mono" aria-label={job.date}>
              {job.date}
            </header>

            {/* Content col */}
            <div className="z-10 sm:col-span-6">
              <h3 className="font-medium leading-snug text-gray-200">
                <div>
                  <a className="inline-flex items-baseline font-semibold leading-tight text-gray-200 hover:text-green-400 focus-visible:text-green-400 group/link text-base transition-colors" href={job.url} target="_blank" rel="noopener noreferrer" aria-label={`${job.role} at ${job.company}`}>
                    <span>
                      {job.role} · <span className="inline-block text-green-500 group-hover/link:text-green-400 transition-colors">{job.company}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" aria-hidden="true"><path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd"></path></svg>
                    </span>
                  </a>
                </div>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">{job.desc}</p>
              <ul className="mt-4 flex flex-wrap" aria-label="Technologies used">
                {job.skills.map(s => (
                  <li key={s} className="mr-1.5 mt-2">
                    <div className="flex items-center rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium leading-5 text-green-400 font-mono border border-green-500/20">
                      {s}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
