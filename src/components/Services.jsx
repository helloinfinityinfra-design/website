import React from 'react';
import { Home, Ruler, Hammer, Paintbrush, ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSiteContent } from '../ContentContext';

const serviceIcons = { Home, Ruler, Hammer, Paintbrush, ShieldCheck, Zap };

const serviceHighlights = {
  'Home Inspection': ['Non-Destructive Testing', 'REBAR Scan & Concrete Strength', 'Comprehensive Safety Certificate'],
  'Modern Construction': ['Turnkey EPC Execution', 'NBC 105 Seismic Compliant', 'Transparent Itemized BOQ'],
  'Interior Renovation': ['3D Spatial Visualization', 'Premium Material Sourcing', 'Custom Acoustic & Joinery Works'],
  'Architectural Design': ['2D Floor Plans & 3D Renders', 'Municipal Approval Drawings', 'Sun-Path & Energy Efficiency'],
  'Structural Design': ['Finite Element Analysis', 'Seismic Shear Wall Design', 'OCR Certified Stamps'],
  'Plumbing & Electrical': ['MEP System Schematic', 'Sub-Surface Leak Detection', 'Smart Home Integration']
};

const Services = () => {
  const { services } = useSiteContent();

  return (
    <section className="section bg-light" id="services-section">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '3.5rem', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
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
            01 // OUR SPECIALIZATIONS
          </span>
          <h2 className="title" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)' }}>
            Comprehensive Construction & Engineering Services
          </h2>
          <p className="subtitle" style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
            From seismic structural audits to turnkey residential and commercial developments, we deliver certified engineering compliant with Nepal Building Codes (NBC).
          </p>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon] || ShieldCheck;
            const highlights = serviceHighlights[service.title] || ['Certified Engineers', 'Quality Assured', 'Timely Execution'];

            return (
              <motion.div 
                key={index}
                className="card service-card"
                whileHover={{ y: -6 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
                style={{ 
                  textAlign: 'left', 
                  padding: '2.25rem', 
                  borderRadius: '18px',
                  background: 'var(--white)',
                  border: '1px solid var(--border-color)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  color: 'rgba(12, 68, 124, 0.1)',
                  fontFamily: 'var(--font-heading)'
                }}>
                  0{index + 1}
                </div>

                <div className="service-icon" style={{ 
                  width: '60px', height: '60px', display: 'flex', alignItems: 'center', 
                  justifyContent: 'center', borderRadius: '14px', marginBottom: '1.5rem',
                  color: 'var(--primary)', background: 'rgba(12, 68, 124, 0.08)',
                  border: '1px solid rgba(12, 68, 124, 0.12)'
                }}>
                  <Icon size={28} />
                </div>
                
                <h3 className="service-title" style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.75rem' }}>
                  {service.title}
                </h3>
                
                <p className="service-desc" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  {service.description}
                </p>

                <div className="service-highlights" style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {highlights.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 500 }}>
                      <CheckCircle2 size={15} style={{ color: 'var(--secondary)', flexShrink: 0 }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
