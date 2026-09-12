import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useSiteContent } from '../ContentContext';

const Testimonials = () => {
  const { testimonials } = useSiteContent();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <section className="section content-section" style={{ position: 'relative', overflow: 'hidden', padding: '6rem 0', background: 'var(--primary)', color: 'var(--bg-white)' }}>
      {/* Decorative background quote icon */}
      <Quote 
        size={240} 
        style={{ 
          position: 'absolute', 
          right: '5%', 
          bottom: '-20px', 
          color: 'rgba(255,255,255,0.03)', 
          zIndex: 1, 
          pointerEvents: 'none' 
        }} 
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="title" style={{ color: 'var(--bg-white)' }}>Client Testimonials</h2>
          <p className="subtitle" style={{ color: 'rgba(255,255,255,0.7)' }}>What our clients say about our services and build quality.</p>
        </div>

        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative',
          minHeight: '280px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4 }}
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '1.5rem' }}>
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={20} fill="var(--secondary)" color="var(--secondary)" />
                ))}
              </div>

              {/* Text */}
              <p style={{
                fontSize: '1.25rem',
                lineHeight: 1.7,
                fontStyle: 'italic',
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '2rem',
                maxWidth: '700px'
              }}>
                "{testimonials[currentIndex].text}"
              </p>

              {/* Client Profile */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    border: '3px solid rgba(255, 255, 255, 0.2)',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ textAlign: 'left' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{testimonials[currentIndex].name}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', margin: 0 }}>{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            marginTop: '3rem',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <button
              onClick={handlePrev}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'var(--bg-white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              <ChevronLeft size={22} />
            </button>

            {/* Indicator Dots */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {testimonials.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  style={{
                    width: currentIndex === idx ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: currentIndex === idx ? 'var(--secondary)' : 'rgba(255,255,255,0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'var(--bg-white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
