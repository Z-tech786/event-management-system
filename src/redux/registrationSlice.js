import { createSlice } from '@reduxjs/toolkit';

// Load stored registrations from localStorage
const loadRegistrations = () => {
  try {
    const data = localStorage.getItem('eventhub_registrations');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to parse registrations from localStorage:', error);
    return [];
  }
};

const initialState = {
  registrations: loadRegistrations(),
  statusMessage: null,
  error: null
};

export const registrationSlice = createSlice({
  name: 'registrations',
  initialState,
  reducers: {
    registerForEvent: (state, action) => {
      const { userId, userEmail, event } = action.payload;

      // Duplicate prevention check
      const alreadyRegistered = state.registrations.some(
        (reg) => reg.userId === userId && reg.eventId === event.id
      );

      if (alreadyRegistered) {
        state.error = 'You have already registered for this event.';
        state.statusMessage = null;
        return;
      }

      // Extract event summary fields for fast retrieval in "My Events"
      const venue = event._embedded?.venues?.[0];
      const city = venue?.city?.name || '';
      const stateCode = venue?.state?.stateCode || venue?.state?.name || venue?.country?.name || '';
      const locationString = [city, stateCode].filter(Boolean).join(', ') || 'Venue TBA';

      const bestImage =
        event.images?.find((img) => img.ratio === '16_9') ||
        event.images?.[0] ||
        { url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80' };

      const newRegistration = {
        registrationId: 'reg_' + Date.now(),
        userId,
        userEmail,
        eventId: event.id,
        eventName: event.name,
        eventDate: event.dates?.start?.localDate || '',
        eventTime: event.dates?.start?.localTime || '',
        eventImage: bestImage.url,
        venueName: venue?.name || 'Venue TBA',
        venueLocation: locationString,
        category: event.classifications?.[0]?.segment?.name || 'General',
        registeredAt: new Date().toISOString()
      };

      state.registrations.push(newRegistration);
      localStorage.setItem('eventhub_registrations', JSON.stringify(state.registrations));
      state.statusMessage = `You have successfully registered for "${event.name}"!`;
      state.error = null;
    },

    cancelRegistration: (state, action) => {
      const { userId, eventId } = action.payload;

      const previousLength = state.registrations.length;
      state.registrations = state.registrations.filter(
        (reg) => !(reg.userId === userId && reg.eventId === eventId)
      );

      if (state.registrations.length < previousLength) {
        localStorage.setItem('eventhub_registrations', JSON.stringify(state.registrations));
        state.statusMessage = 'Your registration has been cancelled.';
        state.error = null;
      }
    },

    clearRegistrationMessages: (state) => {
      state.statusMessage = null;
      state.error = null;
    }
  }
});

export const {
  registerForEvent,
  cancelRegistration,
  clearRegistrationMessages
} = registrationSlice.actions;

// Selectors
export const selectAllRegistrations = (state) => state.registrations.registrations;

export const selectUserRegistrations = (state, userId) =>
  state.registrations.registrations.filter((reg) => reg.userId === userId);

export const selectIsEventRegistered = (state, userId, eventId) => {
  if (!userId || !eventId) return false;
  return state.registrations.registrations.some(
    (reg) => reg.userId === userId && reg.eventId === eventId
  );
};

export const selectRegistrationMessage = (state) => state.registrations.statusMessage;
export const selectRegistrationError = (state) => state.registrations.error;

export default registrationSlice.reducer;
