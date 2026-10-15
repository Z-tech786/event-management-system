import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEventDetails,
  clearSelectedEvent,
  selectSelectedEvent,
  selectEventDetailLoading,
  selectEventDetailError
} from '../redux/eventsSlice';
import {
  registerForEvent,
  cancelRegistration,
  clearRegistrationMessages,
  selectIsEventRegistered,
  selectRegistrationMessage,
  selectRegistrationError
} from '../redux/registrationSlice';
import { selectCurrentUser, selectIsAuthenticated } from '../redux/authSlice';
import {
  Calendar,
  Clock,
  MapPin,
  Tag,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Ticket,
  ShieldCheck,
  XCircle
} from 'lucide-react';

function EventDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const event = useSelector(selectSelectedEvent);
  const loading = useSelector(selectEventDetailLoading);
  const error = useSelector(selectEventDetailError);

  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const isRegistered = useSelector((state) =>
    selectIsEventRegistered(state, currentUser?.id, id)
  );
  const regMessage = useSelector(selectRegistrationMessage);
  const regError = useSelector(selectRegistrationError);

  useEffect(() => {
    dispatch(fetchEventDetails(id));
    dispatch(clearRegistrationMessages());

    return () => {
      dispatch(clearSelectedEvent());
      dispatch(clearRegistrationMessages());
    };
  }, [dispatch, id]);

  const handleRegister = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/events/${id}` } } });
      return;
    }
    if (event) {
      dispatch(
        registerForEvent({
          userId: currentUser.id,
          userEmail: currentUser.email,
          event
        })
      );
    }
  };

  const handleCancelRegistration = () => {
    if (currentUser && event) {
      dispatch(
        cancelRegistration({
          userId: currentUser.id,
          eventId: event.id
        })
      );
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div className="spinner" style={{ margin: '0 auto 1.5rem auto' }}></div>
        <p style={{ color: 'var(--text-muted)' }}>Loading event details...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        <div className="card" style={{ padding: '2.5rem', textAlign: 'center' }}>
          <AlertCircle size={36} className="text-danger" style={{ marginBottom: '1rem' }} />
          <h2>Event Not Found</h2>
          <p style={{ color: 'var(--text-muted)', margin: '0.75rem 0 1.5rem 0' }}>
            {error || 'Unable to locate details for the requested event.'}
          </p>
          <Link to="/events" className="btn btn-primary">
            <ArrowLeft size={16} />
            <span>Back to All Events</span>
          </Link>
        </div>
      </div>
    );
  }

  // Extract venue details
  const venue = event._embedded?.venues?.[0];
  const venueName = venue?.name || 'Venue TBA';
  const addressLine = venue?.address?.line1 || '';
  const city = venue?.city?.name || '';
  const state = venue?.state?.name || venue?.state?.stateCode || '';
  const postalCode = venue?.postalCode || '';
  const country = venue?.country?.name || '';
  const fullAddress = [addressLine, city, state, postalCode, country].filter(Boolean).join(', ');

  // Extract date & time
  const localDate = event.dates?.start?.localDate;
  const localTime = event.dates?.start?.localTime;
  let formattedDate = 'Date TBA';
  if (localDate) {
    const d = new Date(`${localDate}T${localTime || '00:00:00'}`);
    formattedDate = isNaN(d)
      ? localDate
      : d.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });
  }

  // Best high-res image
  const bestImage =
    event.images?.find((img) => img.ratio === '16_9' && img.width > 800) ||
    event.images?.[0] ||
    { url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80' };

  // Classification
  const classification = event.classifications?.[0];
  const segment = classification?.segment?.name;
  const genre = classification?.genre?.name;
  const subGenre = classification?.subGenre?.name;

  // Price range
  const price = event.priceRanges?.[0];

  return (
    <div className="event-detail-page">
      <div className="container" style={{ padding: '2rem 1.5rem 4rem 1.5rem' }}>
        {/* Back navigation */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Link to="/events" className="btn btn-outline btn-sm">
            <ArrowLeft size={16} />
            <span>Back to Events</span>
          </Link>
        </div>

        {/* Feedback Banners */}
        {regMessage && (
          <div className="alert alert-success">
            <CheckCircle2 size={18} />
            <span>{regMessage}</span>
          </div>
        )}

        {regError && (
          <div className="alert alert-danger">
            <AlertCircle size={18} />
            <span>{regError}</span>
          </div>
        )}

        {/* Hero Banner Card */}
        <div className="card detail-hero-card">
          <div className="detail-image-wrapper">
            <img src={bestImage.url} alt={event.name} className="detail-banner-img" />
            <div className="detail-image-overlay">
              <div className="detail-badges">
                {segment && <span className="badge badge-primary">{segment}</span>}
                {genre && genre !== 'Undefined' && (
                  <span className="badge badge-secondary">{genre}</span>
                )}
                {subGenre && subGenre !== 'Undefined' && (
                  <span className="badge" style={{ backgroundColor: 'rgba(255,255,255,0.85)', color: '#0f172a' }}>
                    {subGenre}
                  </span>
                )}
              </div>
              <h1 className="detail-title">{event.name}</h1>
            </div>
          </div>

          {/* Main Details Body */}
          <div className="detail-body-grid">
            {/* Left Column: Information */}
            <div className="detail-info-col">
              {/* Timing */}
              <div className="detail-info-card">
                <div className="detail-info-icon">
                  <Calendar size={22} className="text-primary" />
                </div>
                <div>
                  <h4 className="detail-info-heading">Date & Time</h4>
                  <p className="detail-info-value">{formattedDate}</p>
                  {localTime && (
                    <p className="detail-info-sub">
                      Starts at {localTime.slice(0, 5)} {event.dates?.timezone && `(${event.dates.timezone})`}
                    </p>
                  )}
                </div>
              </div>

              {/* Venue & Location */}
              <div className="detail-info-card">
                <div className="detail-info-icon">
                  <MapPin size={22} className="text-primary" />
                </div>
                <div>
                  <h4 className="detail-info-heading">Venue & Location</h4>
                  <p className="detail-info-value">{venueName}</p>
                  {fullAddress && <p className="detail-info-sub">{fullAddress}</p>}
                </div>
              </div>

              {/* Pricing & Status */}
              <div className="detail-info-card">
                <div className="detail-info-icon">
                  <Ticket size={22} className="text-primary" />
                </div>
                <div>
                  <h4 className="detail-info-heading">Admission & Status</h4>
                  <p className="detail-info-value">
                    {price ? `${price.currency} ${price.min} - ${price.max}` : 'General Admission'}
                  </p>
                  <p className="detail-info-sub" style={{ textTransform: 'capitalize' }}>
                    Ticket Status: <strong>{event.dates?.status?.code || 'Active'}</strong>
                  </p>
                </div>
              </div>

              {/* Event Description / Info */}
              {event.info && (
                <div style={{ marginTop: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    About This Event
                  </h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.95rem' }}>
                    {event.info}
                  </p>
                </div>
              )}
            </div>

            {/* Right Column: Registration Card */}
            <div className="detail-action-col">
              <div className="card registration-action-card">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                  Event Registration
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Reserve your place and add this event to your personal registered schedule.
                </p>

                {isRegistered ? (
                  <div className="registered-state-box">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', fontWeight: 700, marginBottom: '0.5rem' }}>
                      <CheckCircle2 size={20} />
                      <span>You Are Registered!</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                      This event is added to your account. You can view all your passes in My Events.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <Link to="/my-events" className="btn btn-outline btn-block btn-sm">
                        Go to My Events
                      </Link>
                      <button
                        onClick={handleCancelRegistration}
                        className="btn btn-sm btn-block"
                        style={{ color: 'var(--danger)', backgroundColor: 'var(--danger-light)' }}
                      >
                        <XCircle size={15} />
                        <span>Cancel Registration</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {isAuthenticated ? (
                      <button
                        onClick={handleRegister}
                        className="btn btn-primary btn-block btn-lg"
                        style={{ marginBottom: '1rem' }}
                      >
                        <ShieldCheck size={18} />
                        <span>Confirm Registration</span>
                      </button>
                    ) : (
                      <div>
                        <button
                          onClick={handleRegister}
                          className="btn btn-primary btn-block btn-lg"
                          style={{ marginBottom: '0.75rem' }}
                        >
                          Log In to Register
                        </button>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                          You must be logged into an account to register for events.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* External Ticketmaster Link */}
                {event.url && (
                  <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-block btn-sm"
                    >
                      <span>View on Ticketmaster</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailPage;
