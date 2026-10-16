import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import MyEventsPage from './pages/MyEventsPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectIsAuthenticated } from './redux/authSlice';
import { ArrowRight, Sparkles, ShieldCheck, Calendar, Users } from 'lucide-react';

function HomePage() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Web Programming Assignment 2</span>
          </div>

          <h1 className="hero-title">
            Discover, Register & Manage <span className="gradient-text">Live Events</span>
          </h1>

          <p className="hero-subtitle">
            An end-to-end Event Management System built with React, Redux Toolkit, React Router, and the Ticketmaster Discovery API.
          </p>

          <div className="hero-actions">
            <Link to="/events" className="btn btn-primary btn-lg">
              <span>Explore All Events</span>
              <ArrowRight size={18} />
            </Link>

            {isAuthenticated ? (
              <Link to="/my-events" className="btn btn-outline btn-lg">
                <span>View My Registered Events</span>
              </Link>
            ) : (
              <Link to="/login" className="btn btn-outline btn-lg">
                <span>Log In / Register</span>
              </Link>
            )}
          </div>

          {/* Current Session Indicator */}
          <div className="session-card card">
            <div className="session-status">
              <span className={`status-dot ${isAuthenticated ? 'online' : 'offline'}`}></span>
              <span className="status-label">
                Authentication Status: <strong>{isAuthenticated ? 'Logged In' : 'Guest / Logged Out'}</strong>
              </span>
            </div>

            {isAuthenticated ? (
              <p className="session-details">
                Active user: <strong>{currentUser?.name}</strong> ({currentUser?.email})
              </p>
            ) : (
              <p className="session-details">
                Try logging in with the demo student account (<code>student@example.com</code> / <code>password123</code>) or register a new one.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card card">
              <div className="feature-icon bg-indigo">
                <ShieldCheck size={24} />
              </div>
              <h3>Redux Authentication</h3>
              <p>Simulated user registration, login, logout, and session state persistence via LocalStorage.</p>
            </div>

            <div className="feature-card card">
              <div className="feature-icon bg-cyan">
                <Calendar size={24} />
              </div>
              <h3>Ticketmaster API</h3>
              <p>Search, filter, and view real-time concerts, sports, theater, and arts events across venues.</p>
            </div>

            <div className="feature-card card">
              <div className="feature-icon bg-amber">
                <Users size={24} />
              </div>
              <h3>Event Registration</h3>
              <p>Reserve spots, prevent duplicate bookings, and manage your upcoming vs completed events.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

