// Ticketmaster Discovery API Service

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';
const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;

// Realistic fallback events used when no API key is provided or when rate-limited
export const MOCK_EVENTS = [
  {
    id: 'mock-evt-1',
    name: 'Coldplay: Music of the Spheres World Tour',
    type: 'event',
    url: 'https://www.ticketmaster.com',
    locale: 'en-us',
    images: [
      {
        ratio: '16_9',
        url: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 675
      }
    ],
    dates: {
      start: {
        localDate: '2026-11-20',
        localTime: '19:30:00'
      },
      status: {
        code: 'onsale'
      }
    },
    classifications: [
      {
        segment: { name: 'Music' },
        genre: { name: 'Rock / Pop' }
      }
    ],
    priceRanges: [
      {
        type: 'standard',
        currency: 'USD',
        min: 85,
        max: 350
      }
    ],
    _embedded: {
      venues: [
        {
          name: 'Wembley Stadium',
          city: { name: 'London' },
          state: { name: 'Greater London' },
          country: { name: 'United Kingdom' },
          address: { line1: 'Wembley' }
        }
      ]
    },
    info: 'Experience Coldplay live on their groundbreaking Music of the Spheres World Tour with sustainable stage production and kinetic dance floors.'
  },
  {
    id: 'mock-evt-2',
    name: 'NBA Finals 2026: Eastern vs Western Champions',
    type: 'event',
    url: 'https://www.ticketmaster.com',
    locale: 'en-us',
    images: [
      {
        ratio: '16_9',
        url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 675
      }
    ],
    dates: {
      start: {
        localDate: '2026-12-05',
        localTime: '20:00:00'
      },
      status: {
        code: 'onsale'
      }
    },
    classifications: [
      {
        segment: { name: 'Sports' },
        genre: { name: 'Basketball' }
      }
    ],
    priceRanges: [
      {
        type: 'standard',
        currency: 'USD',
        min: 150,
        max: 950
      }
    ],
    _embedded: {
      venues: [
        {
          name: 'Madison Square Garden',
          city: { name: 'New York' },
          state: { name: 'NY' },
          country: { name: 'United States' },
          address: { line1: '4 Pennsylvania Plaza' }
        }
      ]
    },
    info: 'High stakes basketball championship game featuring top world-class athletes competing for the Larry O’Brien Trophy.'
  },
  {
    id: 'mock-evt-3',
    name: 'The Phantom of the Opera - Broadway Revival',
    type: 'event',
    url: 'https://www.ticketmaster.com',
    locale: 'en-us',
    images: [
      {
        ratio: '16_9',
        url: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 675
      }
    ],
    dates: {
      start: {
        localDate: '2026-11-28',
        localTime: '19:00:00'
      },
      status: {
        code: 'onsale'
      }
    },
    classifications: [
      {
        segment: { name: 'Arts & Theatre' },
        genre: { name: 'Musical' }
      }
    ],
    priceRanges: [
      {
        type: 'standard',
        currency: 'USD',
        min: 65,
        max: 220
      }
    ],
    _embedded: {
      venues: [
        {
          name: 'Majestic Theatre',
          city: { name: 'New York' },
          state: { name: 'NY' },
          country: { name: 'United States' },
          address: { line1: '245 W 44th St' }
        }
      ]
    },
    info: 'Andrew Lloyd Webber’s timeless masterwork returns with breathtaking stagecraft, iconic score, and unforgettable performances.'
  },
  {
    id: 'mock-evt-4',
    name: 'Hans Zimmer Live: Symphonic Cinema Concert',
    type: 'event',
    url: 'https://www.ticketmaster.com',
    locale: 'en-us',
    images: [
      {
        ratio: '16_9',
        url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 675
      }
    ],
    dates: {
      start: {
        localDate: '2026-12-15',
        localTime: '20:00:00'
      },
      status: {
        code: 'onsale'
      }
    },
    classifications: [
      {
        segment: { name: 'Music' },
        genre: { name: 'Classical / Film Score' }
      }
    ],
    priceRanges: [
      {
        type: 'standard',
        currency: 'USD',
        min: 70,
        max: 290
      }
    ],
    _embedded: {
      venues: [
        {
          name: 'Hollywood Bowl',
          city: { name: 'Los Angeles' },
          state: { name: 'CA' },
          country: { name: 'United States' },
          address: { line1: '2301 N Highland Ave' }
        }
      ]
    },
    info: 'An epic orchestral journey featuring iconic scores from Interstellar, Gladiator, Inception, Dune, and The Dark Knight.'
  },
  {
    id: 'mock-evt-5',
    name: 'Premier League: Arsenal vs Manchester City',
    type: 'event',
    url: 'https://www.ticketmaster.com',
    locale: 'en-us',
    images: [
      {
        ratio: '16_9',
        url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 675
      }
    ],
    dates: {
      start: {
        localDate: '2026-11-22',
        localTime: '16:30:00'
      },
      status: {
        code: 'onsale'
      }
    },
    classifications: [
      {
        segment: { name: 'Sports' },
        genre: { name: 'Soccer' }
      }
    ],
   
