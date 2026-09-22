import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import logoImg from '../assets/logo1.jpg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSiteContent } from '../ContentContext';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { brand, services, contact } = useSiteContent();

  const handleLinkClick = (e, href, isRoute = false) => {
    e.preventDefault();
    if (isRoute) {
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (location.pathname !== '/') {
        navigate('/' + href);
      } else {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  return (
    <footer className="footer shadow-lg">
      <div className="container footer-grid">
        <div className="footer-col brand-col">
          <a href="/" onClick={(e) => handleLinkClick(e, '/', true)} className="logo footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', cursor: 'pointer' }}>
            <img src={logoImg} alt="Logo" style={{ height: '40px', mixBlendMode: 'multiply' }} />
            <span className="logo-text">{brand.name} <span className="logo-accent">{brand.accent}</span></span>
          </a>
          <p className="footer-about" style={{ color: 'var(--text-muted)', margin: '1.5rem 0', lineHeight: 1.6 }}>
            {brand.description}
          </p>
          <div className="social-links" style={{ display: 'flex', gap: '1rem' }}>
            <a href="https://www.facebook.com/profile.php?id=61594576174807" className="social-link-item"><FaFacebook size={18} /></a>
            <a href="#" className="social-link-item"><FaInstagram size={18} /></a>
            <a href="#" className="social-link-item"><FaLinkedin size={18} /></a>
            <a href="#" className="social-link-item"><FaXTwitter size={18} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '1.5rem', fontWeight: 700 }}>Quick Links</h4>
          <ul className="footer-links" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <li><a href="#home" onClick={(e) => handleLinkClick(e, '#home')}>Home</a></li>
            <li><a href="#about" onClick={(e) => handleLinkClick(e, '#about')}>About Us</a></li>
            <li><a href="#construction" onClick={(e) => handleLinkClick(e, '#construction')}>Our Projects</a></li>
            <li><a href="#blogs" onClick={(e) => handleLinkClick(e, '/blogs', true)}>Latest Blogs</a></li>
            <li><a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')}>Book Consult</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '1.5rem', fontWeight: 700 }}>Services</h4>
          <ul className="footer-links" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {services.slice(0, 5).map((service) => (
              <li key={service.title}><a href="#services" onClick={(e) => handleLinkClick(e, '#services')}>{service.title}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '1.5rem', fontWeight: 700 }}>Contact Us</h4>
          <ul className="contact-info" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}><MapPin size={18} style={{ marginTop: '4px', flexShrink: 0 }} /> <span>{contact.address}</span></li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><Phone size={18} style={{ flexShrink: 0 }} /> <span>{contact.phone}</span></li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><Mail size={18} style={{ flexShrink: 0 }} /> <span>{contact.email}</span></li>
          </ul>
          <div style={{ width: '100%', height: '150px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src={contact.mapUrl}
              title="Infinity Construction Location"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-content">
          <p>© {new Date().getFullYear()} {brand.copyrightName} All Rights Reserved.</p>
          <p>Designed By {brand.designer}</p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .social-link-item {
          width: 36px;
          height: 36px;
          background: var(--primary);
          color: white;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .social-link-item:hover {
          background: var(--primary-hover);
          color: #f4c778;
          transform: translateY(-3px);
        }
        .social-link-item:hover svg {
          fill: #f4c778;
          color: #f4c778;
        }
        .footer-links a { color: var(--text-muted); }
        .footer-links a:hover { color: var(--secondary); padding-left: 5px; }
      `}} />
    </footer>
  );
};

export default Footer;
