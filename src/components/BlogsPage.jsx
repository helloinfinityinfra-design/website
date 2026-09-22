import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, User, Tag, ArrowRight, Search, ChevronRight, Play } from 'lucide-react';
import { useSiteContent } from '../ContentContext';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatWidget from './ChatWidget';

const CATEGORIES = ['All', 'Vlogs', 'Structural Engineering', 'Interior Design', 'Cost & Planning', 'Materials & Quality', 'Renovation'];

// ─── Blog Card ────────────────────────────────────────────────────────────────
const BlogCard = ({ post, index, onClick }) => (
  <motion.article
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
    onClick={onClick}
    style={{
      background: 'var(--bg-white)',
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
      border: '1px solid #f0f0f0',
      cursor: 'pointer',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
    }}
    whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(48,51,135,0.15)' }}
  >
    {/* Image */}
    <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
      <img
        src={post.image}
        alt={post.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
      />
      {post.isVideo && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            width: 50, height: 50, borderRadius: '50%',
            background: 'var(--secondary)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(0, 144, 76, 0.4)',
            color: 'var(--bg-white)'
          }}>
            <Play size={20} fill="white" />
          </div>
        </div>
      )}
      {/* Category Badge */}
      <span style={{
        position: 'absolute', top: 14, left: 14,
        background: post.categoryColor,
        color: 'var(--bg-white)', fontSize: '0.72rem', fontWeight: 700,
        padding: '4px 12px', borderRadius: 20,
        letterSpacing: 0.3,
      }}>
        {post.category}
      </span>
    </div>

    {/* Content */}
    <div style={{ padding: '20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Meta */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.75rem', color: '#999', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Clock size={12} /> {post.readTime}
        </span>
        <span style={{ fontSize: '0.75rem', color: '#999', display: 'flex', alignItems: 'center', gap: 4 }}>
          <User size={12} /> {post.author}
        </span>
        <span style={{ fontSize: '0.75rem', color: '#999' }}>{post.date}</span>
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)',
        lineHeight: 1.4, marginBottom: 10,
        display: '-webkit-box', WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        {post.title}
      </h3>

      {/* Excerpt */}
      <p style={{
        fontSize: '0.88rem', color: '#666', lineHeight: 1.6,
        flex: 1, marginBottom: 16,
        display: '-webkit-box', WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        {post.excerpt}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {post.tags.slice(0, 3).map(tag => (
          <span key={tag} style={{
            fontSize: '0.68rem', background: 'var(--bg-light)',
            color: 'var(--primary)', padding: '3px 10px',
            borderRadius: 12, fontWeight: 500,
          }}>
            #{tag}
          </span>
        ))}
      </div>

      {/* Read More */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 4,
        color: 'var(--primary)', fontWeight: 600, fontSize: '0.88rem',
      }}>
        {post.isVideo ? 'Watch Vlog' : 'Read Article'} <ArrowRight size={15} />
      </div>
    </div>
  </motion.article>
);

// ─── Featured Blog Card ───────────────────────────────────────────────────────
const FeaturedCard = ({ post, onClick }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    onClick={onClick}
    style={{
      background: 'var(--bg-white)', borderRadius: 20,
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(48,51,135,0.12)',
      cursor: 'pointer',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      border: '1px solid #f0f0f0',
      marginBottom: 40,
    }}
    whileHover={{ y: -4, boxShadow: '0 20px 50px rgba(48,51,135,0.18)' }}
  >
    <div style={{ position: 'relative', minHeight: 320, overflow: 'hidden' }}>
      <img
        src={post.image} alt={post.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {post.isVideo && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            width: 60, height: 60, borderRadius: '50%',
            background: 'var(--secondary)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(0, 144, 76, 0.5)',
            color: 'var(--bg-white)'
          }}>
            <Play size={24} fill="white" />
          </div>
        </div>
      )}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.1))',
      }} />
      <span style={{
        position: 'absolute', top: 16, left: 16,
        background: post.categoryColor, color: 'var(--bg-white)',
        fontSize: '0.78rem', fontWeight: 700, padding: '5px 14px', borderRadius: 20,
      }}>
        ⭐ Featured · {post.category}
      </span>
    </div>

    <div style={{ padding: '36px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.78rem', color: '#999', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Clock size={13} /> {post.readTime}
        </span>
        <span style={{ fontSize: '0.78rem', color: '#999' }}>{post.date}</span>
      </div>

      <h2 style={{ fontSize: '1.55rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.35, marginBottom: 14 }}>
        {post.title}
      </h2>

      <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.7, marginBottom: 20 }}>
        {post.excerpt}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--bg-white)'
        }}>
          <User size={16} />
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>{post.author}</div>
          <div style={{ fontSize: '0.75rem', color: '#999' }}>{post.authorRole}</div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          color: 'var(--bg-white)', border: 'none', padding: '12px 24px',
          borderRadius: 12, fontWeight: 600, fontSize: '0.9rem',
          cursor: 'pointer', alignSelf: 'flex-start',
        }}
      >
        {post.isVideo ? 'Watch Vlog' : 'Read Full Article'} <ArrowRight size={16} />
      </motion.button>
    </div>
  </motion.article>
);

// ─── Main Blogs Page ──────────────────────────────────────────────────────────
const BlogsPage = () => {
  const { blogs } = useSiteContent();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = blogs.filter(post => {
    const matchCat = activeCategory === 'All' || post.category === activeCategory;
    const matchSearch = !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-white)' }}>
      <Navbar onBlogsPage />

      {/* ─── Hero Banner ── */}
      <div style={{
        background: 'var(--gradient-hero)',
        paddingTop: '8rem', paddingBottom: '4rem', textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{
            display: 'inline-block', background: 'rgba(255,255,255,0.15)',
            borderRadius: 20, padding: '6px 18px', marginBottom: 16,
            fontSize: '0.82rem', color: 'rgba(255,255,255,0.9)', fontWeight: 500,
          }}>
            📰 Construction Knowledge Hub
          </div>
          <h1 style={{
            fontSize: '3rem', fontWeight: 800, color: 'var(--bg-white)',
            marginBottom: 14, lineHeight: 1.2,
          }}>
            Construction Blogs & Guides
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.82)', maxWidth: 560, margin: '0 auto 28px' }}>
            Expert insights on building, renovation, materials, and design — straight from Infinity Construct's engineers and architects.
          </p>

          {/* Search */}
          <div style={{
            display: 'flex', maxWidth: 500, margin: '0 auto',
            background: 'var(--bg-white)', borderRadius: 50, overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '0 18px', color: '#aaa' }}>
              <Search size={18} />
            </div>
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              style={{
                flex: 1, padding: '14px 0', border: 'none', outline: 'none',
                fontSize: '0.95rem', color: '#333', background: 'transparent',
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* ─── Category Filter ── */}
      <div style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 70, zIndex: 100 }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem',
          display: 'flex', gap: 8, overflowX: 'auto', paddingTop: 14, paddingBottom: 14,
          scrollbarWidth: 'none',
        }}>
          {CATEGORIES.map(cat => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '7px 18px', borderRadius: 20, fontWeight: 600,
                fontSize: '0.82rem', whiteSpace: 'nowrap', cursor: 'pointer',
                border: '2px solid',
                borderColor: activeCategory === cat ? 'var(--primary)' : 'var(--border-color)',
                background: activeCategory === cat ? 'var(--primary)' : 'white',
                color: activeCategory === cat ? 'white' : '#555',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>

      {/* ─── Content ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 1.5rem 80px' }}>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#999' }}>
            <div style={{ fontSize: '3rem', marginBottom: 12 }}>🔍</div>
            <p style={{ fontSize: '1.1rem' }}>No articles found. Try a different search or category.</p>
          </div>
        ) : (
          <>
            {/* Featured */}
            {featured && !searchQuery && (
              <FeaturedCard post={featured} onClick={() => navigate(`/blog/${featured.slug}`)} />
            )}

            {/* Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 28,
            }}>
              {(searchQuery ? filtered : rest).map((post, i) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  index={i}
                  onClick={() => navigate(`/blog/${post.slug}`)}
                />
              ))}
            </div>
          </>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: 64, textAlign: 'center',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            borderRadius: 20, padding: '48px 32px',
            boxShadow: '0 12px 40px rgba(48,51,135,0.25)',
          }}
        >
          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--bg-white)', marginBottom: 12 }}>
            Ready to Build Your Dream Home?
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1rem', marginBottom: 24 }}>
            Talk to our expert engineers and architects for a free consultation.
          </p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/')}
            style={{
              background: 'var(--bg-white)', color: 'var(--primary)',
              border: 'none', padding: '14px 32px',
              borderRadius: 12, fontWeight: 700, fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Get a Free Consultation →
          </motion.button>
        </motion.div>
      </div>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default BlogsPage;
