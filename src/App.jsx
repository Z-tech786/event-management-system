import React from 'react';

function App() {
  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Header */}
      <header style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--border)',
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.75rem' }}>🎟️</span>
            <div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.2 }}>
                EventHub
              </h1>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Event Management System</span>
            </div>
          </div>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              Initial Project Setup
            </span>
            <span className="badge badge-primary">v0.1.0</span>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '3rem 0' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          {/* Welcome Banner */}
          <div className="card" style={{ padding: '2.5rem', textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              display: 'inline-flex',
              padding: '1rem',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-light)',
              marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '2.5rem' }}>🚀</span>
            </div>
            
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              Web Programming — Assignment 2
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
              Event Management System developed with React, Redux Toolkit, React Router, and Ticketmaster Discovery API.
            </p>

            <div style={{
              display: 'inline-block',
              backgroundColor: '#f1f5f9',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              fontFamily: 'monospace',
              color: '#334155'
            }}>
              Milestone 1: Initial React project setup
            </div>
          </div>

          {/* Setup Verification Checklist */}
          <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              📦 Initial Setup Checklist
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', backgroundColor: '#fafafa' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>✓</span>
                  <strong>React.js & Vite</strong>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Fast development build tool and component architecture configured.</p>
              </div>

              <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', backgroundColor: '#fafafa' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>✓</span>
                  <strong>Redux Toolkit & React-Redux</strong>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Installed for state management (auth, events, registrations).</p>
              </div>

              <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', backgroundColor: '#fafafa' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>✓</span>
                  <strong>React Router</strong>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Installed for multi-page routing and navigation.</p>
              </div>

              <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', backgroundColor: '#fafafa' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>✓</span>
                  <strong>Git & Security (.gitignore)</strong>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Configured to protect API keys and node_modules before commits.</p>
              </div>
            </div>
          </div>

          {/* Roadmap for Next Steps */}
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
              🎯 Upcoming Implementation Steps
            </h3>
            <ol style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '0.95rem' }}>
              <li><strong>Step 2:</strong> Add authentication pages (Login & Register forms with input validation).</li>
              <li><strong>Step 3:</strong> Implement Redux authentication with localStorage persistence & session state.</li>
              <li><strong>Step 4:</strong> Add Ticketmaster API integration service & environment configuration.</li>
              <li><strong>Step 5:</strong> Add event listing & categories with responsive cards.</li>
              <li><strong>Step 6:</strong> Implement event search and filtering.</li>
              <li><strong>Step 7:</strong> Implement Event Details page with full venue & timing info.</li>
              <li><strong>Step 8:</strong> Implement Event Registration & My Events (with upcoming/completed filters and cancellation).</li>
              <li><strong>Step 9:</strong> Add Protected Routes & final UI polish.</li>
            </ol>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid var(--border)',
        padding: '1.5rem 0',
        marginTop: 'auto',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.875rem'
      }}>
        <div className="container">
          <p>EventHub — Web Programming Assignment 2</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
