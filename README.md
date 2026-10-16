# Event Management System (EventHub)

> **Web Programming — Assignment 2**  
> **Instructor:** Mahhek Tahir  
> Developed using **React.js**, **Redux Toolkit**, **React Router**, and the **Ticketmaster Discovery API**.

---

## 📌 Project Overview

**EventHub** is a modern React-based Event Management System that allows users to:
- Explore events fetched live from the Ticketmaster Discovery API.
- Search and filter events by name, category, and date.
- View detailed event information including venue, date/time, images, and classification.
- Register and log in with simulated authentication and state persistence via LocalStorage.
- Register for events, prevent duplicate registrations, and manage registrations in a dedicated "My Events" section (with distinction between upcoming and completed events).
- Cancel registrations as desired.

---

## 🛠️ Tech Stack & Libraries

- **Frontend Framework:** React 18 (using Vite)
- **Routing:** React Router v6
- **Global State Management:** Redux Toolkit (`@reduxjs/toolkit` & `react-redux`)
- **API:** Ticketmaster Discovery API v2
- **Icons:** Lucide React
- **Styling:** Custom CSS with responsive modern design variables

---

## 📁 Project Structure

```text
2 web/
├── public/
├── src/
│   ├── assets/             # Static images and icons
│   ├── components/         # Reusable UI components (Navbar, EventCard, etc.)
│   ├── pages/              # Route pages (Login, Register, Events, EventDetails, MyEvents)
│   ├── redux/              # Redux slices (authSlice, eventsSlice, registrationSlice) and store
│   ├── services/           # Ticketmaster API service functions
│   ├── App.jsx             # Main application layout and routes
│   ├── index.css           # Global stylesheet & design tokens
│   └── main.jsx            # Application entry point
├── .env.example            # Environment template for API keys
├── .gitignore              # Ignored files (node_modules, .env, dist)
├── index.html              # HTML template
├── package.json            # Project dependencies & scripts
├── README.md               # Setup and execution guide
└── vite.config.js          # Vite configuration
```

