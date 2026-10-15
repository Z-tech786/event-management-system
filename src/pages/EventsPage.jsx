import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Search, Sparkles } from 'lucide-react';

function EventsPage() {
  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Explore Events
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
          Discover concerts, sports, theater, and family events powered by Ticketmaster Discovery API.
        </p>
      </div>

      <div className="card" style={{ padding: '2.5rem', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          padding: '1rem',
          borderRadius: '50%',
          backgroundColor: 'var(--primary-light)',
          color: 'var(--primary)',
          marginBottom: '1rem'
        }}>
          <Sparkles size={32} />
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Events Integration Milestone
        </h3>
        <p style={{ color: 'var(--text-muted)', maxWidth: '540px', margin: '0 auto 1.5rem auto' }}>
          Authentication is now successfully hooked up! Next up is connecting the live Ticketmaster Discovery API to populate live event cards, filters, and categories.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Link to="/" className="btn btn-outline">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
