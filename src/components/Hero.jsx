import React, { useState, useEffect } from 'react';
import heroimages from '../assets/hero.avif';
import heroConstruction from '../assets/hero_construction.png';
import blogInterior from '../assets/blog_interior.png';
import { ChevronRight, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Count-up helper component
const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value.replace(/\D/g, ''));
    if (start === end) return;

    let totalMiliseconds = duration;
    let incrementTime = Math.abs(Math.floor(totalMiliseconds / end));
    
    // Safety guard to ensure the timer is not running too fast for browser ticks
    incrementTime = Math.max(incrementTime, 16);

    const timer = setInterval(() => {
      start += Math.ceil(end / 60); // Increment larger chunks for higher numbers
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  const suffix = value.replace(/\d/g, '');
  return <span>{count}{suffix}</span>;
};

const slides = [
  {
    image: heroimages,
    title: 'Modern Construction & Design',
    badge: 'CONSTRUCTION',
    badgeNp: 'निर्माण सेवा'
  },
  {
    image: heroConstruction,
    title: 'Earthquake-Resistant Engineering',
    badge: 'STRUCTURAL',
    badgeNp: 'बलियो संरचना'
  },
  {
    image: blogInterior,
    title: 'Premium Home Inspection & Renovations',
    badge: 'RENOVATION',
    badgeNp: 'गृह निरीक्षण'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleConsultClick = () => {
    const contactSection = document.getElementById('about'); // WhyUs is #about
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProjectsClick = () => {
    const projectsSection = document.getElementById('construction'); // Projects is #construction
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      <div className="container hero-container" style={{ minHeight: '600px' }}>
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: '650px' }}
        >
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="badge" 
              style={{ 
                display: 'inline-flex', 
                padding: '0.5rem 1rem', 
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '50px', 
                marginBottom: '2rem', 
                border: '1px solid rgba(255, 255, 255, 0.2)',
                alignItems: 'center', 
                gap: '1rem' 
              }}
            >
              <span className="badge-text" style={{ fontWeight: 700, color: '#f4c778', fontSize: '0.9rem' }}>
                {slides[currentSlide].badge}
              </span>
              <span className="nepali-text" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                {slides[currentSlide].badgeNp}
              </span>
            </motion.div>
          </AnimatePresence>
          
          <h1 className="hero-title" style={{ minHeight: '160px' }}>
            The Largest <span className="highlight">Construction</span> & Engineering Hub in Nepal
          </h1>
          
          <p className="hero-description" style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.82)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
            We provide professional home inspection, retrofitting, interior renovation, and construction services with certified engineers and quality assurance.
          </p>
          
          <div className="hero-btns" style={{ display: 'flex', gap: '1.5rem', marginBottom: '3rem' }}>
            <button className="btn btn-primary" onClick={handleConsultClick}>
              Consult Now <ChevronRight size={20} />
            </button>
            <button className="btn btn-outline" onClick={handleProjectsClick}>
              See Projects
            </button>
          </div>

          <div className="hero-stats" style={{ display: 'flex', gap: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
            <div className="stat-item">
              <span className="stat-number" style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>
                <AnimatedCounter value="500+" />
              </span>
              <span className="stat-label" style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500, display: 'block' }}>Projects Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>
                <AnimatedCounter value="50+" />
              </span>
              <span className="stat-label" style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500, display: 'block' }}>Expert Engineers</span>
            </div>
          </div>
        </motion.div>

        {/* Right side: Dynamic image slider with framer motion crossfade */}
        <motion.div 
          className="hero-image-container"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="image-wrapper" style={{ position: 'relative', width: '100%', height: '420px' }}>
            <div style={{ 
              width: '100%', 
              height: '100%', 
              background: 'var(--bg-light)',
              borderRadius: '24px', 
              overflow: 'hidden', 
              boxShadow: 'var(--shadow-lg)',
              position: 'relative'
            }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}
                />
              </AnimatePresence>

              {/* Overlay with details */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                padding: '2.5rem 2rem 1.5rem',
                color: 'var(--bg-white)',
                zIndex: 2
              }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 style={{ margin: '0 0 4px', fontSize: '1.2rem', fontWeight: 700 }}>
                      {slides[currentSlide].title}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                      Infinity Construction Portfolio
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slider Dots */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                display: 'flex',
                gap: '8px',
                zIndex: 3
              }}>
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: currentSlide === idx ? 'var(--secondary)' : 'rgba(255,255,255,0.5)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background 0.3s ease'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Decorative Floating Card */}
            <div className="floating-card" style={{ 
              position: 'absolute', 
              bottom: '-20px', 
              left: '-20px', 
              background: 'var(--white)', 
              padding: '1rem 1.5rem', 
              borderRadius: '16px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              boxShadow: 'var(--shadow-lg)', 
              border: '1px solid var(--border-color)', 
              transform: 'rotate(-2deg)',
              zIndex: 4
            }}>
              <Calendar className="card-icon" style={{ 
                color: 'var(--secondary)', 
                background: 'rgba(200, 138, 61, 0.1)',
                padding: '10px', 
                borderRadius: '12px', 
                width: '44px', 
                height: '44px' 
              }} />
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700 }}>Fast Delivery</h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>On-time completion</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
