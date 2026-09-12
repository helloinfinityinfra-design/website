import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoImg from '../assets/logo.jpeg';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSiteContent } from '../ContentContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { brand, navigation: navLinks } = useSiteContent();

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
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <div className="logo">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="logo-link" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={logoImg} alt="Logo" style={{ height: '40px', mixBlendMode: 'multiply' }} />
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
  );
};

export default Navbar;
