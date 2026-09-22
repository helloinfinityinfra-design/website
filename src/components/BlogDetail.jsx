import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Tag, Share2, Play } from 'lucide-react';
import { useSiteContent } from '../ContentContext';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatWidget from './ChatWidget';
import { motion } from 'framer-motion';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { blogs } = useSiteContent();

  // Find the post
  const post = blogs.find(p => p.slug === slug);

  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-white)' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem' }}>Article Not Found</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>The article you are looking for does not exist or has been moved.</p>
          <button className="btn btn-primary" onClick={() => navigate('/blogs')}>Back to Blogs</button>
        </div>
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  // Get recommended posts (excluding current post)
  const recommendedPosts = blogs.filter(p => p.id !== post.id).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-white)' }}>
      <Navbar />

      {/* ─── Hero Banner for Blog Detail ── */}
      <div style={{
        background: 'var(--gradient-hero)',
        paddingTop: '8rem',
        paddingBottom: '3.5rem',
        color: '#ffffff',
      }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          {/* Back Button */}
          <Link 
            to="/blogs" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              color: 'rgba(255, 255, 255, 0.85)', 
              textDecoration: 'none', 
              fontWeight: 600, 
              fontSize: '0.95rem',
              marginBottom: '1.5rem',
              transition: 'color 0.2s ease'
            }}
            onMouseOver={e => e.currentTarget.style.color = '#ffffff'}
            onMouseOut={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)'}
          >
            <ArrowLeft size={18} /> Back to Blogs & Vlogs
          </Link>

          {/* Meta Category & Date */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{
              background: post.categoryColor,
              color: 'var(--bg-white)',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '6px 14px',
              borderRadius: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {post.category}
            </span>
            <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Calendar size={14} /> {post.date}
            </span>
            <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Clock size={14} /> {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 style={{ 
            fontSize: 'clamp(2rem, 4vw, 2.75rem)', 
            fontWeight: 800, 
            color: '#ffffff', 
            lineHeight: 1.25, 
            margin: 0 
          }}>
            {post.title}
          </h1>
        </div>
      </div>

      {/* Main Content Container */}
      <main style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
        <div className="container" style={{ maxWidth: '900px' }}>

          {/* Author info & Share */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '1rem 0', 
            borderTop: '1px solid var(--border-color)', 
            borderBottom: '1px solid var(--border-color)',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--bg-white)'
              }}>
                <User size={20} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>{post.author}</h4>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>{post.authorRole}</p>
              </div>
            </div>

            <button 
              onClick={handleShare}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--bg-light)',
                color: 'var(--primary)',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = 'var(--primary)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'var(--bg-light)';
                e.currentTarget.style.color = 'var(--primary)';
              }}
            >
              <Share2 size={16} /> Share Post
            </button>
          </div>

          {/* Media Header (Video Embed or Image) */}
          <div style={{ 
            borderRadius: '16px', 
            overflow: 'hidden', 
            boxShadow: 'var(--shadow-lg)', 
            marginBottom: '3rem',
            background: '#000',
            aspectRatio: post.isVideo ? '16/9' : 'auto',
            maxHeight: post.isVideo ? 'none' : '500px'
          }}>
            {post.isVideo && post.videoUrl ? (
              <iframe
                width="100%"
                height="100%"
                src={post.videoUrl}
                title={post.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ display: 'block' }}
              ></iframe>
            ) : (
              <img 
                src={post.image} 
                alt={post.title} 
                style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '500px', objectFit: 'cover' }}
              />
            )}
          </div>

          {/* Article Content */}
          <article className="blog-body" style={{ 
            fontSize: '1.1rem', 
            lineHeight: 1.8, 
            color: '#333',
            marginBottom: '4rem'
          }}>
            {post.content.map((block, idx) => {
              switch (block.type) {
                case 'intro':
                  return (
                    <p key={idx} style={{ 
                      fontSize: '1.25rem', 
                      lineHeight: 1.7, 
                      color: 'var(--primary)', 
                      fontWeight: 500, 
                      marginBottom: '2rem',
                      fontStyle: 'italic',
                      borderLeft: '4px solid var(--secondary)',
                      paddingLeft: '1.5rem'
                    }}>
                      {block.text}
                    </p>
                  );
                case 'heading':
                  return (
                    <h2 key={idx} style={{ 
                      fontSize: '1.65rem', 
                      fontWeight: 800, 
                      color: 'var(--primary)', 
                      marginTop: '2.5rem', 
                      marginBottom: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span style={{ width: '8px', height: '24px', background: 'var(--secondary)', display: 'inline-block', borderRadius: '4px' }}></span>
                      {block.text}
                    </h2>
                  );
                case 'text':
                  return (
                    <p key={idx} style={{ marginBottom: '1.5rem' }} dangerouslySetInnerHTML={{
                      __html: block.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }}></p>
                  );
                case 'list':
                  return (
                    <ul key={idx} style={{ marginBottom: '2rem', paddingLeft: '1.5rem', listStyleType: 'none' }}>
                      {block.items.map((item, itemIdx) => (
                        <li key={itemIdx} style={{ marginBottom: '0.75rem', position: 'relative', paddingLeft: '1.5rem' }}>
                          <span style={{ position: 'absolute', left: 0, color: 'var(--secondary)' }}>•</span>
                          <span dangerouslySetInnerHTML={{
                            __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          }}></span>
                        </li>
                      ))}
                    </ul>
                  );
                case 'callout':
                  return (
                    <div key={idx} style={{ 
                      background: 'rgba(0, 144, 76, 0.05)', 
                      borderLeft: '4px solid var(--secondary)', 
                      padding: '1.5rem', 
                      borderRadius: '8px', 
                      marginBottom: '2rem',
                      marginTop: '2rem'
                    }}>
                      <p style={{ margin: 0, color: '#111', fontWeight: 500 }} dangerouslySetInnerHTML={{
                        __html: block.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      }}></p>
                    </div>
                  );
                case 'video':
                  return (
                    <div key={idx} style={{ 
                      borderRadius: '12px', 
                      overflow: 'hidden', 
                      boxShadow: 'var(--shadow-md)', 
                      marginBottom: '2.5rem',
                      marginTop: '2.5rem',
                      aspectRatio: '16/9',
                      background: '#000'
                    }}>
                      <iframe
                        width="100%"
                        height="100%"
                        src={block.url}
                        title="Embedded Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  );
                case 'conclusion':
                  return (
                    <p key={idx} style={{ 
                      marginTop: '2.5rem', 
                      fontWeight: 600, 
                      color: 'var(--primary)',
                      borderTop: '1px solid var(--border-color)',
                      paddingTop: '2rem'
                    }}>
                      {block.text}
                    </p>
                  );
                default:
                  return null;
              }
            })}
          </article>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px', marginRight: '8px' }}>
              <Tag size={16} /> Tags:
            </span>
            {post.tags.map(tag => (
              <span key={tag} style={{
                background: 'var(--bg-light)',
                color: 'var(--primary)',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 600
              }}>
                #{tag}
              </span>
            ))}
          </div>

          {/* Recommended Articles */}
          <div style={{ marginTop: '4rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '2rem' }}>
              Recommended for You
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
              {recommendedPosts.map(p => (
                <div 
                  key={p.id}
                  onClick={() => navigate(`/blog/${p.slug}`)}
                  style={{
                    background: 'var(--bg-white)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                    border: '1px solid #f0f0f0',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease'
                  }}
                  className="blog-card-hover"
                >
                  <div style={{ position: 'relative', height: '150px', overflow: 'hidden' }}>
                    <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {p.isVideo && (
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'rgba(0,0,0,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: '50%',
                          background: 'var(--secondary)', display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          color: 'var(--bg-white)'
                        }}>
                          <Play size={16} fill="white" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>{p.date}</span>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {p.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default BlogDetail;
