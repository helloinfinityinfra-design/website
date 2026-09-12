import React from 'react';
import { Home, Ruler, Hammer, Paintbrush, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSiteContent } from '../ContentContext';

const serviceIcons = { Home, Ruler, Hammer, Paintbrush, ShieldCheck, Zap };

const Services = () => {
  const { services } = useSiteContent();

  return (
    <section className="section bg-light">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '700px', margin: '0 auto 4rem' }}>
          <h2 className="title">Our Specialized Services</h2>
          <p className="subtitle">Everything you need for your dream home, handled by experts.</p>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon];
            return (
            <motion.div 
              key={index}
              className="card service-card"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{ textAlign: 'left', padding: '2.5rem', borderRadius: '20px' }}
            >
              <div className="service-icon" style={{ 
                width: '70px', height: '70px', display: 'flex', alignItems: 'center', 
                justifyContent: 'center', borderRadius: '15px', marginBottom: '1.5rem',
                color: service.color, background: `${service.color}15` 
              }}>
                <Icon size={32} />
              </div>
              <h3 className="service-title" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1rem' }}>{service.title}</h3>
              <p className="service-desc" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>{service.description}</p>
              <a href="#" className="service-link" style={{ color: 'var(--secondary)', fontWeight: 600, fontSize: '0.9rem' }}>Learn More →</a>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
