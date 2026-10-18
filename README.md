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

---

## 🚀 Setup & Execution Instructions

### 1. Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (installed automatically with Node)
- [Git](https://git-scm.com/)

### 2. Installation
Open your terminal inside the project directory and install the dependencies:

```bash
npm install
```

### 3. Environment Configuration
To use the live Ticketmaster Discovery API:
1. Register for a free developer account at [Ticketmaster Developer Portal](https://developer.ticketmaster.com/).
2. Create an App in your developer dashboard to get your **Consumer Key (API Key)**.
3. Duplicate `.env.example` and rename it to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Add your API key in `.env`:
   ```env
   VITE_TICKETMASTER_API_KEY=your_actual_ticketmaster_api_key
   ```
> ⚠️ **Note:** `.env` is listed in `.gitignore` to avoid exposing API keys on GitHub as required by the assignment guidelines.

### 4. Running the Development Server
Start the local Vite development server:

```bash
npm run dev
```

The application will be accessible at: `http://localhost:3000` (or `http://localhost:5173`).

### 5. Building for Production
To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

##  Git Commit Guidelines (Assignment Roadmap)


