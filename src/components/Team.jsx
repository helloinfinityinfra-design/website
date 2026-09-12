import React from 'react';
import { useSiteContent } from '../ContentContext';

const Team = () => {
  const { team } = useSiteContent();

  return (
    <section id="team" className="section content-section" style={{ background: 'var(--bg-white)' }}>
      <div className="container text-center">
        <h2 className="title">Meet Our Team</h2>
        <p className="subtitle">The experts behind our successful construction and design projects.</p>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', marginTop: '3rem' }}>
          {team.map((member, index) => (
            <div key={index} className="card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                overflow: 'hidden',
                margin: '0 auto 1.5rem',
                border: '4px solid var(--border-color)'
              }}>
                <img
                  src={member.image}
                  alt={member.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>{member.name}</h3>
              <p style={{ color: 'var(--secondary)', fontWeight: '600', fontSize: '0.9rem' }}>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
