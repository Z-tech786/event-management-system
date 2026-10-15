import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchTicketmasterEvents, getTicketmasterEventById } from '../services/ticketmasterApi';

// Async thunk to search and fetch events
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await searchTicketmasterEvents(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load events.');
    }
  }
);

// Async thunk to fetch details of a specific event
export const fetchEventDetails = createAsyncThunk(
  'events/fetchEventDetails',
  async (eventId, { rejectWithValue }) => {
    try {
      const data = await getTicketmasterEventById(eventId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load event details.');
    }
  }
);

const initialState = {
  items: [],
  selectedEvent: null,
  loading: false,
  detailLoading: false,
  error: null,
  detailError: null,
  searchTerm: '',
  selectedCategory: 'All',
  isDemoData: false,
  totalEvents: 0
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearSelectedEvent: (state) => {
      state.selectedEvent = null;
      state.detailError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchEvents lifecycle
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.events;
        state.isDemoData = action.payload.isDemoData;
        state.totalEvents = action.payload.totalElements || action.payload.events.length;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch events from Ticketmaster.';
      })

      // fetchEventDetails lifecycle
      .addCase(fetchEventDetails.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
      })
      .addCase(fetchEventDetails.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedEvent = action.payload.event;
      })
      .addCase(fetchEventDetails.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError = action.payload || 'Failed to load event details.';
      });
  }
});

export const { setSearchTerm, setSelectedCategory, clearSelectedEvent } = eventsSlice.actions;

// Selectors
export const selectAllEvents = (state) => state.events.items;
export const selectSelectedEvent = (state) => state.events.selectedEvent;
export const selectEventsLoading = (state) => state.events.loading;
export const selectEventDetailLoading = (state) => state.events.detailLoading;
export const selectEventsError = (state) => state.events.error;
export const selectEventDetailError = (state) => state.events.detailError;
export const selectSearchTerm = (state) => state.events.searchTerm;
export const selectSelectedCategory = (state) => state.events.selectedCategory;
export const selectIsDemoData = (state) => state.events.isDemoData;
export const selectTotalEvents = (state) => state.events.totalEvents;

export default eventsSlice.reducer;
