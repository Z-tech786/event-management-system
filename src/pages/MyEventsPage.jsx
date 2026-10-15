import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/authSlice';
import {
  selectUserRegistrations,
  cancelRegistration,
  selectRegistrationMessage,
  clearRegistrationMessages
} from '../redux/registrationSlice';
import {
  Calendar,
  Clock,
  MapPin,
  XCircle,
  CheckCircle2,
  BookmarkCheck,
  ArrowRight,
  Sparkles,
  Tag
} from 'lucide-react';

function MyEventsPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const registrations = useSelector((state) =>
    selectUserRegistrations(state, currentUser?.id)
  );
  const statusMessage = useSelector(selectRegistrationMessage);

  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'completed' | 'all'

  // Current date in YYYY-MM-DD
  const todayStr = new Date().toISOString().slice(0, 10);

  // Separate upcoming vs completed events based on eventDate
  const upcomingEvents = registrations.filter((reg) => {
    if (!reg.eventDate) return true; // Default to upcoming if no date
    return reg.eventDate >= todayStr;
  });

  const completedEvents = registrations.filter((reg) => {
    if (!reg.eventDate) return false;
    return reg.eventDate < todayStr;
  });

  // Filter based on active tab
  let displayedEvents = upcomingEvents;
  if (activeTab === 'completed') {
    displayedEvents = completedEvents;
  } else if (activeTab === 'all') {
    displayedEvents = registrations;
  }

  const handleCancel = (eventId, eventName) => {
    if (window.confirm(`Are you sure you want to cancel your registration for "${eventName}"?`)) {
      dispatch(
        cancelRegistration({
          userId: currentUser.id,
          eventId
        })
      );
    }
  };

  return (
    <div className="my-events-page">
      <div className="container" style={{ padding: '2.5rem 1.5rem 4rem 1.5rem' }}>
        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">My Registered Events</h1>
            <p className="page-subtitle">
              Manage your event schedule and bookings for <strong>{currentUser?.name}</strong> ({currentUser?.email})
            </p>
          </div>

          <Link to="/events" className="btn btn-outline btn-sm">
            <span>Explore More Events</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Feedback message banner */}
        {statusMessage && (
          <div className="alert alert-success">
            <CheckCircle2 size={18} />
            <span style={{ flex: 1 }}>{statusMessage}</span>
            <button
              onClick={() => dispatch(clearRegistrationMessages())}
              className="btn btn-sm"
              style={{ padding: '0.2rem 0.5rem', color: '#065f46' }}
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Tabs: Upcoming vs Completed */}
        <div className="my-events-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            <span>Upcoming Events</span>
            <span className="tab-count">{upcomingEvents.length}</span>
          </button>

          <button
            type="button"
            className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            <span>Completed Events</span>
            <span className="tab-count">{completedEvents.length}</span>
          </button>

          <button
            type="button"
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            <span>All Registrations</span>
            <span className="tab-count">{registrations.length}</span>
          </button>
        </div>

        {/* Empty State */}
        {displayedEvents.length === 0 && (
          <div className="card empty-card" style={{ padding: '3.5rem 2rem', textAlign: 'center' }}>
            <div className="empty-icon-wrapper" style={{ margin: '0 auto 1.25rem auto' }}>
              <BookmarkCheck size={36} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              No {activeTab === 'upcoming' ? 'Upcoming' : activeTab === 'completed' ? 'Completed' : ''} Events Found
            </h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 1.5rem auto' }}>
              {activeTab === 'upcoming'
                ? "You don't have any upcoming registered events yet. Explore concerts, sports, and theatre to register!"
                : activeTab === 'completed'
                ? "You haven't attended any past events yet."
                : "You haven't registered for any events yet."}
            </p>
            <Link to="/events" className="btn btn-primary">
              <Sparkles size={16} />
              <span>Discover Events Now</span>
            </Link>
          </div>
        )}

        {/* Registered Events List */}
        {displayedEvents.length > 0 && (
          <div className="registrations-list">
            {displayedEvents.map((reg) => {
              const isPast = reg.eventDate && reg.eventDate < todayStr;
              return (
                <div key={reg.registrationId} className="card registration-item-card">
                  <div className="reg-image-wrapper">
                    <img src={reg.eventImage} alt={reg.eventName} className="reg-image" />
                    <span className={`badge ${isPast ? 'badge-completed' : 'badge-primary'} reg-status-badge`}>
                      {isPast ? 'Completed' : 'Upcoming'}
                    </span>
                  </div>

                  <div className="reg-content">
                    <div className="reg-meta-row">
                      <span className="badge badge-secondary">{reg.category}</span>
                      <span className="reg-date-badge">
                        <Calendar size={14} />
                        <span>{reg.eventDate || 'Date TBA'}</span>
                        {reg.eventTime && <span>· {reg.eventTime.slice(0, 5)}</span>}
                      </span>
                    </div>

                    <h3 className="reg-title">
                      <Link to={`/events/${reg.eventId}`}>{reg.eventName}</Link>
                    </h3>

                    <div className="reg-venue">
                      <MapPin size={15} className="text-muted" />
                      <span><strong>{reg.venueName}</strong> · {reg.venueLocation}</span>
                    </div>

                    <div className="reg-timestamp">
                      Registered on: {new Date(reg.registeredAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="reg-actions">
                    <Link to={`/events/${reg.eventId}`} className="btn btn-outline btn-sm">
                      View Details
                    </Link>

                    {!isPast && (
                      <button
                        onClick={() => handleCancel(reg.eventId, reg.eventName)}
                        className="btn btn-danger-outline btn-sm"
                        title="Cancel registration"
                      >
                        <XCircle size={15} />
                        <span>Cancel</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyEventsPage;
