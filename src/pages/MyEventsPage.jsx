import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/authSlice';
import { BookmarkCheck, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

function MyEventsPage() {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          My Registered Events
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
          Viewing registrations for <strong>{currentUser?.name || 'Logged-in User'}</strong>
        </p>
      </div>

      <div className="card" style={{ padding: '2.5rem', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          padding: '1rem',
          borderRadius: '50%',
          backgroundColor: 'var(--success-light)',
          color: 'var(--success)',
          marginBottom: '1rem'
        }}>
          <BookmarkCheck size={32} />
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          No Registered Events Yet
        </h3>
        <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
          Once event listings and registration are enabled in the next steps, you will be able to register for events, view upcoming vs completed events, and cancel registrations here.
        </p>
        <Link to="/events" className="btn btn-primary">
          Explore Events
        </Link>
      </div>
    </div>
  );
}

export default MyEventsPage;
