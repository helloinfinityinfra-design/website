import React, { useState } from 'react';
import { useSiteContent } from '../ContentContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Ruler, Award, DollarSign, User, ArrowRight } from 'lucide-react';

const Categories = ['All', 'Residential', 'Commercial', 'Interior', 'Renovation'];

const ProjectsGallery = () => {
  const { projects } = useSiteContent();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const handleInquire = (project) => {
    setSelectedProject(null); // close modal
    
    // Find the contact form
    const contactSection = document.getElementById('about'); // WhyUs is #about and form is inside
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Auto-fill message in the form
    const textarea = document.getElementById('message');
    if (textarea) {
      textarea.value = `I am interested in consulting for a project similar to: "${project.title}" located in ${project.location}. Please provide details on feasibility, cost estimates, and timelines.`;
      textarea.focus();
    }
  };

  return (
    <section id="construction" className="section content-section" style={{ background: 'var(--bg-light)' }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
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
            03 // PORTFOLIO & CASE STUDIES
          </span>
          <h2 className="title">Our Featured Engineered Projects</h2>
          <p className="subtitle">Explore our benchmark residential, commercial, and structural renovation projects across Nepal.</p>
        </div>

        {/* Categories Filter Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '3rem'
        }}>
          {Categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: '50px',
                fontWeight: 600,
                fontSize: '0.95rem',
                background: selectedCategory === category ? 'var(--primary)' : 'white',
                color: selectedCategory === category ? 'white' : 'var(--text-main)',
                border: '1px solid',
                borderColor: selectedCategory === category ? 'var(--primary)' : 'var(--border-color)',
                boxShadow: selectedCategory === category ? '0 4px 15px rgba(17, 17, 17, 0.2)' : 'none',
                transform: selectedCategory === category ? 'translateY(-1px)' : 'none',
                transition: 'all 0.25s ease'
              }}
            >
              {category === 'Interior' ? 'Interior & Renovation' : category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid" 
          style={{ 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '2rem' 
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map(project => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                onClick={() => {
                  setSelectedProject(project);
                  setActivePhotoIndex(0);
                }}
                className="card"
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-white)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
                }}
                whileHover={{ 
                  y: -8, 
                  boxShadow: '0 12px 30px rgba(17, 17, 17, 0.12)'
                }}
              >
                {/* Image Wrapper */}
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    className="project-image-hover"
                  />
                  
                  {/* Category Badge */}
                  <span style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    color: 'var(--primary)',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    padding: '4px 12px',
                    borderRadius: '30px',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    {project.category}
                  </span>

                  {/* Status Badge */}
                  <span style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: 'var(--secondary)',
                    color: 'var(--bg-white)',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    padding: '4px 12px',
                    borderRadius: '30px',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    {project.status}
                  </span>
                </div>

                {/* Card Content */}
                <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                    <MapPin size={14} style={{ color: 'var(--secondary)' }} /> {project.location}
                  </div>

                  <h3 style={{
                    fontSize: '1.3rem',
                    color: 'var(--primary)',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    lineHeight: 1.3
                  }}>
                    {project.title}
                  </h3>

                  {/* Quick specs preview */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '10px', 
                    background: 'var(--bg-light)', 
                    padding: '0.75rem 1rem', 
                    borderRadius: '8px',
                    marginBottom: '1.5rem',
                    fontSize: '0.85rem',
                    color: 'var(--text-main)',
                    fontWeight: 500
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Ruler size={13} style={{ color: 'var(--primary)' }} /> {project.area}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Calendar size={13} style={{ color: 'var(--primary)' }} /> {project.year}
                    </div>
                  </div>

                  <div style={{ 
                    marginTop: 'auto', 
                    color: 'var(--secondary)', 
                    fontWeight: 700, 
                    fontSize: '0.9rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px' 
                  }}>
                    View Details <ArrowRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Detailed Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10000,
                padding: '2rem'
              }}
              onClick={() => setSelectedProject(null)}
            >
              {/* Modal Body */}
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                style={{
                  background: 'var(--bg-white)',
                  borderRadius: '24px',
                  width: '100%',
                  maxWidth: '1000px',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  position: 'relative'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'var(--bg-white)',
                    border: '1px solid var(--border-color)',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-main)',
                    boxShadow: 'var(--shadow-md)',
                    zIndex: 10
                  }}
                >
                  <X size={20} />
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
                  {/* Left Column: Image Viewer */}
                  <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderRight: '1px solid #f0f0f0' }}>
                    <div style={{ height: '350px', borderRadius: '16px', overflow: 'hidden', background: 'var(--bg-light)', boxShadow: 'inset 0 0 10px rgba(28,36,33,0.05)' }}>
                      <img
                        src={selectedProject.gallery[activePhotoIndex]}
                        alt={selectedProject.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    {/* Gallery Thumbnails */}
                    <div style={{ display: 'flex', gap: '10px' }}>
                      {selectedProject.gallery.map((img, idx) => (
                        <div
                          key={idx}
                          onClick={() => setActivePhotoIndex(idx)}
                          style={{
                            width: '80px',
                            height: '60px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            border: activePhotoIndex === idx ? '3px solid var(--secondary)' : '2px solid transparent',
                            transform: activePhotoIndex === idx ? 'scale(1.05)' : 'none',
                            transition: 'all 0.2s ease',
                            opacity: activePhotoIndex === idx ? 1 : 0.7
                          }}
                        >
                          <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Project details */}
                  <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--secondary)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                      <Award size={14} /> {selectedProject.category} Project
                    </div>

                    <h2 style={{ fontSize: '2rem', color: 'var(--primary)', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>
                      {selectedProject.title}
                    </h2>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                      <MapPin size={16} /> {selectedProject.location}
                    </div>

                    <h4 style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.05rem' }}>Project Description</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                      {selectedProject.description}
                    </p>

                    {/* Specifications table */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '1.25rem',
                      background: 'var(--bg-light)',
                      padding: '1.5rem',
                      borderRadius: '16px',
                      marginBottom: '2rem'
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>Client</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.92rem' }}>
                          <User size={14} style={{ color: 'var(--primary)' }} /> {selectedProject.client}
                        </span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>Est. Cost</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.92rem' }}>
                          <DollarSign size={14} style={{ color: 'var(--secondary)' }} /> {selectedProject.cost}
                        </span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>Total Area</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.92rem' }}>
                          <Ruler size={14} style={{ color: 'var(--primary)' }} /> {selectedProject.area}
                        </span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>Status</span>
                        <span style={{ 
                          fontWeight: 700, 
                          color: 'var(--secondary)',
                          fontSize: '0.92rem'
                        }}>
                          {selectedProject.status}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleInquire(selectedProject)}
                      className="btn btn-primary"
                      style={{
                        marginTop: 'auto',
                        width: '100%',
                        justifyContent: 'center',
                        padding: '1rem',
                        fontSize: '1rem',
                        fontWeight: 700,
                        boxShadow: '0 4px 15px rgba(200, 138, 61, 0.15)',
                        background: 'var(--secondary)'
                      }}
                    >
                      Inquire About This Project
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsGallery;
