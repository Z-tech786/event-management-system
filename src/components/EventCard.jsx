import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Tag, ArrowRight } from 'lucide-react';

function EventCard({ event }) {
  // Extract venue details safely
  const venue = event._embedded?.venues?.[0];
  const venueName = venue?.name || 'Venue TBA';
  const city = venue?.city?.name || '';
  const state = venue?.state?.stateCode || venue?.state?.name || venue?.country?.name || '';
  const locationString = [city, state].filter(Boolean).join(', ') || 'Location TBA';

  // Extract date & time
  const localDate = event.dates?.start?.localDate;
  const localTime = event.dates?.start?.localTime;
  let formattedDate = 'Date TBA';
  if (localDate) {
    const d = new Date(`${localDate}T${localTime || '00:00:00'}`);
    formattedDate = isNaN(d)
      ? localDate
      : d.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
  }

  // Extract category
  const classification = event.classifications?.[0];
  const categoryName = classification?.segment?.name || 'Event';
  const genreName = classification?.genre?.name;

  // Extract best image (16:9 ratio preferred)
  const image =
    event.images?.find((img) => img.ratio === '16_9') ||
    event.images?.[0] ||
    { url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80' };

  // Price range
  const price = event.priceRanges?.[0];
  const priceText = price ? `${price.currency} ${price.min} - ${price.max}` : null;

  return (
    <div className="card event-card">
      <div className="event-card-image-wrap">
        <img
          src={image.url}
          alt={event.name}
          className="event-card-image"
          loading="lazy"
        />
        <div className="event-card-badges">
          <span className="badge badge-primary">{categoryName}</span>
          {genreName && genreName !== 'Undefined' && (
            <span className="badge badge-secondary">{genreName}</span>
          )}
        </div>
      </div>

      <div className="event-card-body">
        <div className="event-date-row">
          <Calendar size={15} className="text-primary" />
          <span className="event-date">{formattedDate}</span>
          {localTime && <span className="event-time">· {localTime.slice(0, 5)}</span>}
        </div>

        <h3 className="event-card-title" title={event.name}>
          {event.name}
        </h3>

        <div className="event-location-row">
          <MapPin size={15} className="text-muted" />
          <span className="event-location">
            <strong>{venueName}</strong> {locationString !== 'Location TBA' && `· ${locationString}`}
          </span>
        </div>

        {priceText && (
          <div className="event-price-row">
            <Tag size={14} className="text-muted" />
            <span className="event-price">From {priceText}</span>
          </div>
        )}

        <div className="event-card-footer">
          <Link to={`/events/${event.id}`} className="btn btn-outline btn-block btn-sm">
            <span>View Details & Register</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
