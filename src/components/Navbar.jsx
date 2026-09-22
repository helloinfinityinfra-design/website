import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, ShieldCheck } from 'lucide-react';
import logoImg from '../assets/logo1.jpg';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSiteContent } from '../ContentContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { brand, navigation: navLinks, contact } = useSiteContent();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (link.isRoute) {
      navigate(link.href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (location.pathname !== '/') {
        navigate('/' + link.href);
      } else {
        const target = document.querySelector(link.href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  return (
    <header className="site-header">
      {/* Top Utility Bar for authentic human agency feel */}
      <div className="top-bar">
        <div className="container top-bar-container">
          <div className="top-bar-left">
            <span className="top-bar-item">
              <MapPin size={13} className="top-bar-icon" /> Chapagaun, Lalitpur • Kathmandu Valley
            </span>
            <span className="top-bar-item desktop-only">
              <ShieldCheck size={13} className="top-bar-icon" /> company registration no: 388610 
            </span>
          </div>
          <div className="top-bar-right">
            <a href={`tel:${contact?.phone || '+9779801234567'}`} className="top-bar-link">
              <Phone size={13} className="top-bar-icon" /> Direct Line: {contact?.phone || '+977 9801234567'}
            </a>
          </div>
        </div>
      </div>

      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <div className="logo">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="logo-link" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src={logoImg} alt="Logo" style={{ height: '40px', borderRadius: '4px' }} />
              <span className="logo-text">{brand.name} <span className="logo-accent">{brand.accent}</span></span>
            </a>
          </div>

        <div className="nav-links">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="nav-link"
              onClick={(e) => handleNavClick(e, link)}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <a href="#contact" onClick={(e) => handleNavClick(e, { name: 'Book Consult', href: '#contact', isRoute: false })}>
            <button className="btn btn-primary book-btn">Get a Quote</button>
          </a>
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="mobile-nav-link"
                onClick={(e) => handleNavClick(e, link)}
                style={{ padding: '1rem 0', display: 'block', borderBottom: '1px solid var(--border-color)' }}
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" onClick={(e) => handleNavClick(e, { name: 'Book Consult', href: '#contact', isRoute: false })}>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Get a Quote</button>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  </header>
  );
};

export default Navbar;
