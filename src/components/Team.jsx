import React from 'react';
import { useSiteContent } from '../ContentContext';
import { motion } from 'framer-motion';

const Team = () => {
  const { team } = useSiteContent();

  return (
    <section id="team" className="section content-section" style={{ background: 'var(--bg-white)' }}>
      <div className="container text-center">
        <span className="section-eyebrow" style={{
          display: 'inline-block',
          color: 'var(--secondary)',
          fontWeight: 700,
          fontSize: '0.85rem',
          letterSpacing: '1.8px',
          textTransform: 'uppercase',
          marginBottom: '0.75rem',
          background: 'rgba(186, 117, 23, 0.1)',
          padding: '4px 14px',
          borderRadius: '20px'
        }}>
          05 // EXECUTIVE LEADERSHIP & ENGINEERS
        </span>
        <h2 className="title" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)' }}>Meet Our Technical Leadership</h2>
        <p className="subtitle" style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>The licensed engineers, founders, and project managers driving Nepal's engineering standards.</p>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', marginTop: '3.5rem' }}>
          {team.map((member, index) => (
            <motion.div 
              key={index} 
              className="card team-card" 
              whileHover={{ y: -6 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{ 
                padding: '2.25rem 1.5rem', 
                textAlign: 'center',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                background: 'var(--white)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <div style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                overflow: 'hidden',
                margin: '0 auto 1.5rem',
                border: '4px solid rgba(12, 68, 124, 0.12)',
                boxShadow: '0 8px 20px rgba(12, 68, 124, 0.15)',
                position: 'relative'
              }}>
                <img
                  src={member.image}
                  alt={member.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '0.4rem' }}>{member.name}</h3>
              <p style={{ color: 'var(--secondary)', fontWeight: '700', fontSize: '0.88rem', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 0 }}>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
