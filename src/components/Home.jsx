import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Hero from './Hero';
import Services from './Services';
import ProjectsGallery from './ProjectsGallery';
import WhyUs from './WhyUs';
import Testimonials from './Testimonials';
import Team from './Team';
import Footer from './Footer';
import ChatWidget from './ChatWidget';
import { useSiteContent } from '../ContentContext';
import { Play, ArrowRight } from 'lucide-react';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const { blogs } = useSiteContent();

  // Scroll to section based on URL hash
  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        const timer = setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  // Display only the first 3 latest posts on home page
  const latestPosts = blogs.slice(0, 3);

  return (
    <div className="app-wrapper">
      <Navbar />

      <main style={{ paddingTop: '110px' }}> {/* Prevents layout shift under fixed header */}
        {/* Navbar points to #home */}
        <section id="home" className="content-section">
          <Hero />
        </section>

        {/* Navbar points to #services */}
        <section id="services" className="content-section">
          <Services />
        </section>

        {/* Navbar points to #construction - Now fully interactive and dynamic */}
        <ProjectsGallery />

        {/* #about is inside WhyUs component (now features AJAX submission) */}
        <WhyUs />

        {/* Dynamic Testimonials Slider */}
        <Testimonials />

        {/* Navbar points to #team */}
        <Team />

        {/* Navbar points to #blogs */}
        <section id="blogs" className="section bg-light content-section">
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
              06 // INDUSTRY INSIGHTS & ENGINEERING GUIDES
            </span>
            <h2 className="title" style={{ fontSize: '2.5rem', fontWeight: 800 }}>Nepal Construction Guides & Vlogs</h2>
            <p className="subtitle">Expert engineering insights, cost breakdown guides, and video walkthroughs in Kathmandu.</p>
            
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
              {latestPosts.map(post => (
                <div 
                  key={post.id} 
                  className="card blog-card-hover" 
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  style={{ 
                    cursor: 'pointer', 
                    textAlign: 'left', 
                    background: 'var(--bg-white)',
                    borderRadius: '16px', 
                    overflow: 'hidden', 
                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} 
                      className="blog-img"
                    />
                    {post.isVideo && (
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'rgba(0,0,0,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <div style={{
                          width: 44, height: 44, borderRadius: '50%',
                          background: 'var(--secondary)', display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          color: 'var(--bg-white)',
                          boxShadow: '0 4px 12px rgba(200,138,61,0.3)'
                        }}>
                          <Play size={18} fill="white" />
                        </div>
                      </div>
                    )}
                    <span style={{
                      position: 'absolute', top: 12, left: 12,
                      background: post.categoryColor,
                      color: 'var(--bg-white)', fontSize: '0.7rem', fontWeight: 700,
                      padding: '4px 10px', borderRadius: 20
                    }}>
                      {post.category}
                    </span>
                  </div>
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{post.date}</span>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {post.title}
                    </h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {post.excerpt}
                    </p>
                    <div style={{ marginTop: '1.25rem', color: 'var(--primary)', fontWeight: 600, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      {post.isVideo ? 'Watch Vlog' : 'Read Article'} <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '3rem' }}>
              <button 
                className="btn btn-outline" 
                onClick={() => navigate('/blogs')}
                style={{ padding: '0.8rem 2rem', fontWeight: 700 }}
              >
                View All Blogs & Vlogs
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}

export default Home;
