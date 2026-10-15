import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEvents,
  setSearchTerm,
  setSelectedCategory,
  selectAllEvents,
  selectEventsLoading,
  selectEventsError,
  selectSearchTerm,
  selectSelectedCategory,
  selectIsDemoData,
  selectTotalEvents
} from '../redux/eventsSlice';
import EventCard from '../components/EventCard';
import { Search, Filter, RefreshCw, AlertCircle, Info, Sparkles } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Music',
  'Sports',
  'Arts & Theatre',
  'Film',
  'Miscellaneous'
];

function EventsPage() {
  const dispatch = useDispatch();
  const events = useSelector(selectAllEvents);
  const loading = useSelector(selectEventsLoading);
  const error = useSelector(selectEventsError);
  const searchTerm = useSelector(selectSearchTerm);
  const selectedCategory = useSelector(selectSelectedCategory);
  const isDemoData = useSelector(selectIsDemoData);
  const totalEvents = useSelector(selectTotalEvents);

  const [searchInput, setSearchInput] = useState(searchTerm);

  // Fetch events when category changes or on first mount
  useEffect(() => {
    dispatch(
      fetchEvents({
        keyword: searchTerm,
        classificationName: selectedCategory
      })
    );
  }, [dispatch, selectedCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(searchInput));
    dispatch(
      fetchEvents({
        keyword: searchInput,
        classificationName: selectedCategory
      })
    );
  };

  const handleCategoryChange = (category) => {
    dispatch(setSelectedCategory(category));
  };

  const handleRefresh = () => {
    dispatch(
      fetchEvents({
        keyword: searchTerm,
        classificationName: selectedCategory
      })
    );
  };

  return (
    <div className="events-page">
      <div className="container">
        {/* Page Title & Subtitle */}
        <div className="page-header">
          <div className="page-header-text">
            <h1 className="page-title">Explore Events</h1>
            <p className="page-subtitle">
              Browse live events, concerts, sports, and performances from the Ticketmaster Discovery API.
            </p>
          </div>

          <button onClick={handleRefresh} className="btn btn-outline btn-sm" title="Refresh events list">
            <RefreshCw size={15} className={loading ? 'spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Demo Data Notice (helpful for first-time setup / grading) */}
        {isDemoData && (
          <div className="alert alert-info">
            <Info size={18} />
            <div style={{ flex: 1 }}>
              <strong>Notice:</strong> Currently displaying curated discovery events. To fetch live global Ticketmaster data, add your API key to <code>.env</code> as <code>VITE_TICKETMASTER_API_KEY</code>.
            </div>
          </div>
        )}

        {/* Search & Category Filter Controls */}
        <div className="search-filter-card card">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search by artist, team, venue, or event name..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="search-input"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>

          {/* Category Filter Pills */}
          <div className="category-filters">
            <div className="category-label">
              <Filter size={15} />
              <span>Category:</span>
            </div>
            <div className="category-pills">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Counter / Status */}
        <div className="results-status">
          <span>
            {loading ? (
              'Searching events...'
            ) : (
              <>
                Showing <strong>{events.length}</strong> event{events.length === 1 ? '' : 's'}
                {selectedCategory !== 'All' && <span> in <strong>{selectedCategory}</strong></span>}
                {searchTerm && <span> matching "<strong>{searchTerm}</strong>"</span>}
              </>
            )}
          </span>
        </div>

        {/* Error State */}
        {error && (
          <div className="alert alert-danger">
            <AlertCircle size={18} />
            <div style={{ flex: 1 }}>
              <strong>Error loading events:</strong> {error}
            </div>
            <button onClick={handleRefresh} className="btn btn-sm btn-outline">
              Try Again
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Fetching events from Ticketmaster Discovery API...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && events.length === 0 && (
          <div className="card empty-card">
            <div className="empty-icon-wrapper">
              <Sparkles size={32} />
            </div>
            <h3>No Events Found</h3>
            <p>We couldn't find any events matching your current search or category filter.</p>
            <button
              onClick={() => {
                setSearchInput('');
                dispatch(setSearchTerm(''));
                dispatch(setSelectedCategory('All'));
              }}
              className="btn btn-outline btn-sm"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Events Grid */}
        {!loading && events.length > 0 && (
          <div className="events-grid">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EventsPage;
