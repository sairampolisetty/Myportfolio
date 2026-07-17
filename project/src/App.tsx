import { useEffect } from 'react';
// Removed Lenis import as user requested native scrolling
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import LevelUp from './components/LevelUp';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  // Removed Lenis instantiation to restore pure native scrolling for laptops
  return (
    <div style={{ background:'#0a0a0a', minHeight:'100vh', width: '100%', overflowX: 'hidden', fontFamily:"'Space Grotesk',system-ui,sans-serif" }}>
      {/* <Header /> */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <LevelUp />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
