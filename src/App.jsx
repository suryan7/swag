import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NoiseOverlay from './components/NoiseOverlay';
import CursorTrail from './components/CursorTrail';
import LineArts from './pages/LineArts';
import FinalWorks from './pages/FinalWorks';

function App() {
  return (
    <div className="min-h-screen bg-soft-cream selection:bg-gold-accent selection:text-white">
      <NoiseOverlay />
      <CursorTrail />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<>
            <Hero />
            <About />
            <Skills />
            <Portfolio />
            <Contact />
          </>} />

          <Route path="/line-arts" element={<>
            <LineArts />
          </>} />

          <Route path="/final-works" element={<>
            <FinalWorks />
          </>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
