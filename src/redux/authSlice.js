import { createSlice } from '@reduxjs/toolkit';

// Helper functions to safely read from and write to localStorage
const loadRegisteredUsers = () => {
  try {
    const data = localStorage.getItem('eventhub_registered_users');
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Failed to load registered users from localStorage:', error);
  }
  // Default demo user so the instructor or user can test login immediately
  const defaultDemoUser = [
    {
      id: 'demo-user-1',
      name: 'Demo Student',
      email: 'student@example.com',
      password: 'password123'
    }
  ];
  localStorage.setItem('eventhub_registered_users', JSON.stringify(defaultDemoUser));
  return defaultDemoUser;
};

const loadCurrentUser = () => {
  try {
    const data = localStorage.getItem('eventhub_current_user');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load current user from localStorage:', error);
    return null;
  }
};

const initialCurrentUser = loadCurrentUser();

const initialState = {
  currentUser: initialCurrentUser,
  isAuthenticated: !!initialCurrentUser,
  registeredUsers: loadRegisteredUsers(),
  error: null,
  successMessage: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const { name, email, password } = action.payload;

      // Check if user already exists
      const existingUser = state.registeredUsers.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (existingUser) {
        state.error = 'An account with this email address already exists.';
        state.successMessage = null;
        return;
      }

      // Create new user record
      const newUser = {
        id: 'user_' + Date.now(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password
      };

      state.registeredUsers.push(newUser);
      localStorage.setItem('eventhub_registered_users', JSON.stringify(state.registeredUsers));

      // Automatically log the user in upon registration
      const sessionUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      };

      state.currentUser = sessionUser;
      state.isAuthenticated = true;
      state.error = null;
      state.successMessage = 'Account created successfully!';
      localStorage.setItem('eventhub_current_user', JSON.stringify(sessionUser));
    },

    loginUser: (state, action) => {
      const { email, password } = action.payload;

      // Find matching user credentials
      const user = state.registeredUsers.find(
        (u) =>
          u.email.toLowerCase() === email.trim().toLowerCase() &&
          u.password === password
      );

      if (!user) {
        state.error = 'Invalid email or password. Please try again.';
        state.successMessage = null;
        return;
      }

      const sessionUser = {
        id: user.id,
        name: user.name,
        email: user.email
      };

      state.currentUser = sessionUser;
      state.isAuthenticated = true;
      state.error = null;
      state.successMessage = `Welcome back, ${user.name}!`;
      localStorage.setItem('eventhub_current_user', JSON.stringify(sessionUser));
    },

    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
      state.successMessage = null;
      localStorage.removeItem('eventhub_current_user');
    },

    clearAuthMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    }
  }
});

export const { registerUser, loginUser, logoutUser, clearAuthMessages } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthSuccess = (state) => state.auth.successMessage;

export default authSlice.reducer;
