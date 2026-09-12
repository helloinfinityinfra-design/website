import React, { useState } from 'react';
import { useSiteContent } from '../ContentContext';

const Contact = () => {
  const { contact } = useSiteContent();
  const [phoneDigits, setPhoneDigits] = useState('');

  return (
    <section id="contact" className="section" style={{ background: 'var(--bg-white)' }}>
      <div className="container">
        <div className="text-center">
          <h2 className="title">Book a Consultation</h2>
          <p className="subtitle">Schedule a meeting with our experts to discuss your construction or home inspection needs.</p>
        </div>
        
        <div style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--bg-light)', padding: '3rem', borderRadius: '12px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-color)' }}>
          {/* FormSubmit sends emails directly to your Gmail account. 
              Change the email address in the action URL below to your actual Gmail. */}
          <form action={`https://formsubmit.co/${contact.email || 'hello.infinityinfra@gmail.com'}`} method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Optional: Disable Captcha */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="New Consultation Request - Infinity Construction" />
            
            {/* Success Page Redirect (Optional) */}
            <input type="hidden" name="_next" value={window.location.href} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="name" style={{ fontWeight: '600', color: 'var(--text-main)' }}>Full Name</label>
              <input type="text" id="name" name="Full Name" required placeholder="John Doe" style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '1rem', outline: 'none' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="email" style={{ fontWeight: '600', color: 'var(--text-main)' }}>Email Address</label>
              <input type="email" id="email" name="Email Address" required placeholder="john@example.com" style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '1rem', outline: 'none' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="phone_input" style={{ fontWeight: '600', color: 'var(--text-main)' }}>Phone Number *</label>
              <div style={{ display: 'flex', alignItems: 'center', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden', background: 'var(--bg-white)' }}>
                <span style={{ padding: '0.8rem 0.9rem', background: 'rgba(0,0,0,0.05)', color: 'var(--text-main)', fontWeight: '700', fontSize: '0.95rem', borderRight: '1px solid var(--border-color)', userSelect: 'none' }}>+977</span>
                <input 
                  type="tel" 
                  id="phone_input" 
                  required 
                  aria-required="true"
                  minLength={10}
                  maxLength={10}
                  pattern="[0-9]{10}"
                  title="Must be exactly 10 digits"
                  value={phoneDigits}
                  onChange={(e) => setPhoneDigits(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="9801234567" 
                  style={{ flex: 1, padding: '0.8rem', border: 'none', fontSize: '1rem', outline: 'none', background: 'transparent' }} 
                />
              </div>
              <input type="hidden" name="Phone Number" value={phoneDigits ? `+977 ${phoneDigits}` : ''} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Must be exactly 10 digits (Nepali code +977 applied automatically).
              </span>
            </div>

            

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="message" style={{ fontWeight: '600', color: 'var(--text-main)' }}>Project Details</label>
              <textarea id="message" name="Project Details" rows="5" required placeholder="Tell us about your project or consultation needs..." style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '1rem', outline: 'none', resize: 'vertical' }}></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', padding: '1rem', fontSize: '1.1rem', marginTop: '1rem' }}>
              Book Consultation
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
