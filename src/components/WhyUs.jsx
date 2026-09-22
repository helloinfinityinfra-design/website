import React, { useState } from 'react';
import { CheckCircle2, UserCheck, Clock, Award, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WhyUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, submitting, success, error

  const usps = [
    {
      icon: <UserCheck size={32} />,
      title: "Qualified Engineers",
      desc: "All projects supervised by certified professional engineers."
    },
    {
      icon: <Clock size={32} />,
      title: "On-time Delivery",
      desc: "We strictly follow timelines to ensure your project is completed on schedule."
    },
    {
      icon: <Award size={32} />,
      title: "Quality Assurance",
      desc: "Rigorous quality checks at every stage of construction."
    },
    {
      icon: <CheckCircle2 size={32} />,
      title: "Transparent Pricing",
      desc: "No hidden costs. Clear and honest quotation for every service."
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setSubmitStatus('error');
      return;
    }

    setSubmitStatus('submitting');

    try {
      const response = await fetch("https://formsubmit.co/ajax/hello.infinityinfra@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "Full Name": formData.name,
          "Email Address": formData.email,
          "Phone Number": `+977 ${cleanPhone}`,
          "Project Details": formData.message,
          "_subject": `New Consultation Request from ${formData.name}`,
          "_replyto": formData.email
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus('error');
    }
  };

  return (
    <section id="about" className="section content-section bg-primary text-white" style={{ background: 'var(--primary)', color: 'var(--bg-white)' }}>
      <div className="container why-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '5rem', alignItems: 'center' }}>
        
        {/* Left Side: USPS */}
        <div className="why-content">
          <span className="section-eyebrow" style={{
            display: 'inline-block',
            color: '#f4c778',
            fontWeight: 700,
            fontSize: '0.85rem',
            letterSpacing: '1.8px',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
            background: 'rgba(244, 199, 120, 0.12)',
            padding: '4px 14px',
            borderRadius: '20px',
            border: '1px solid rgba(244, 199, 120, 0.25)'
          }}>
            02 // THE INFINITY ENGINEERING STANDARD
          </span>
          <h2 className="title" style={{ color: 'var(--bg-white)', fontSize: '2.5rem', fontWeight: 800 }}>
            Why Engineering Assurance Matters in Nepal
          </h2>
          <p className="subtitle" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Building in the Kathmandu Valley requires strict seismic code compliance (NBC 105/202), certified material testing, and zero-compromise structural supervision.
          </p>

          <div className="usp-list" style={{ display: 'grid', gap: '2rem', marginTop: '3rem' }}>
            {usps.map((usp, index) => (
              <motion.div
                key={index}
                className="usp-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}
              >
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '12px', color: 'var(--secondary)' }}>{usp.icon}</div>
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{usp.title}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{usp.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Lead Consultation Form */}
        <motion.div
          className="lead-form-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ background: 'var(--bg-white)', padding: '3rem', borderRadius: '24px', color: 'var(--text-main)', boxShadow: 'var(--shadow-lg)', position: 'relative', overflow: 'hidden' }}
        >
          <AnimatePresence mode="wait">
            {submitStatus === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                style={{ textAlign: 'center', padding: '2rem 0' }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'rgba(200, 138, 61, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  color: 'var(--secondary)'
                }}>
                  <Sparkles size={40} />
                </div>
                <h3 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '0.75rem', fontWeight: 700 }}>Thank You!</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
                  Your consultation request has been successfully submitted. Our senior engineers will review your details and contact you shortly.
                </p>
                <button 
                  onClick={() => setSubmitStatus('idle')}
                  className="btn btn-outline" 
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                onSubmit={handleSubmit}
                className="lead-form" 
                id="contact"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3 style={{ fontSize: '1.75rem', color: 'var(--primary)', marginBottom: '0.5rem', fontWeight: 700 }}>Book a Consultation</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Fill out the form and our engineers will get back to you shortly.</p>

                {submitStatus === 'error' && (
                  <div style={{
                    background: 'rgba(200, 138, 61, 0.1)',
                    color: 'var(--secondary)',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1.5rem',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    border: '1px solid rgba(200, 138, 61, 0.3)'
                  }}>
                    Oops! Something went wrong while submitting. Please try again.
                  </div>
                )}

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label htmlFor="name" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--primary)' }}>Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe" 
                    style={{ width: '100%', padding: '0.8rem 1rem', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '0.95rem' }} 
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label htmlFor="email" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--primary)' }}>Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com" 
                    style={{ width: '100%', padding: '0.8rem 1rem', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '0.95rem' }} 
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label htmlFor="phone" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--primary)' }}>Phone Number *</label>
                  <div style={{ display: 'flex', alignItems: 'center', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden', background: 'var(--bg-white)' }}>
                    <span style={{ padding: '0.8rem 0.9rem', background: 'rgba(28, 36, 33, 0.06)', color: 'var(--primary)', fontWeight: '700', fontSize: '0.95rem', borderRight: '1px solid var(--border-color)', userSelect: 'none' }}>+977</span>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      required 
                      aria-required="true"
                      minLength={10}
                      maxLength={10}
                      pattern="[0-9]{10}"
                      title="Must be exactly 10 digits"
                      value={formData.phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setFormData(prev => ({ ...prev, phone: val }));
                      }}
                      placeholder="9801234567" 
                      style={{ width: '100%', padding: '0.8rem 1rem', border: 'none', outline: 'none', fontSize: '0.95rem', background: 'transparent' }} 
                    />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem', display: 'block' }}>
                    Must be exactly 10 digits (Nepali code +977 applied automatically).
                  </span>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label htmlFor="message" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--primary)' }}>Project Details</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="3" 
                    required 
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project (location, build type, area, etc.)..." 
                    style={{ width: '100%', padding: '0.8rem 1rem', border: '1px solid var(--border-color)', borderRadius: '8px', resize: 'vertical', fontSize: '0.95rem', fontFamily: 'inherit' }}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={submitStatus === 'submitting'}
                  style={{ 
                    width: '100%', 
                    background: 'var(--secondary)', 
                    border: 'none', 
                    padding: '1.2rem', 
                    marginTop: '1rem', 
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    borderRadius: '10px',
                    boxShadow: '0 8px 20px rgba(200, 138, 61, 0.25)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    transition: 'all 0.3s ease',
                    cursor: submitStatus === 'submitting' ? 'not-allowed' : 'pointer',
                    opacity: submitStatus === 'submitting' ? 0.8 : 1
                  }}
                >
                  {submitStatus === 'submitting' ? (
                    <>
                      <Loader2 className="animate-spin" size={20} style={{ animation: 'spin 1s linear infinite' }} />
                      Submitting...
                    </>
                  ) : (
                    'Book Consultation'
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {/* Keyframe animation for spinner */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default WhyUs;
