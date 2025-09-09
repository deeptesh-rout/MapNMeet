# 📚 EventMappr: A Learning Guide for Contributors & Curious Users

Welcome to the **EventMappr Learning Guide**! This file is designed to help you understand how EventMappr works, how its codebase is organized, and how you can contribute or extend it. Whether you're a new contributor or a user who wants to dig deeper, this guide is for you.

---

## 🗺️ What is EventMappr?

EventMappr is a community-driven web app for discovering, adding, and exploring local events on an interactive map. It combines a modern frontend (React/Next.js) with a Node.js backend, and uses mapping and geolocation to make event discovery easy and fun.

---

## 🧩 How Does It Work?

- **Frontend:** Users interact with a map, add events, filter by category, and view details. The UI is built with React and Next.js for fast, dynamic updates.
- **Backend:** Handles user authentication, event data storage, and API endpoints. Built with Node.js and Express.
- **Mapping:** Uses Leaflet.js and OpenStreetMap for interactive maps and geolocation features.
- **Persistence:** Events are stored in-browser (localStorage) and/or backend database (for registered users).

---

## 🏗️ Codebase Tour

### Main Folders

- `components/` – UI building blocks (map, navbar, event cards, etc.)
- `pages/` – Next.js pages (Home, Explore, Auth, etc.)
- `Backend/` – Node.js backend (API, models, controllers)
- `public/` – Static assets (images, icons)
- `styles/` – CSS files for styling
- `utils/` – Helper functions (routing, animations, firebase, etc.)

### Key Files

- `server.js` – Entry point for backend server
- `index.js` (in `src/` and `pages/`) – Main entry for frontend
- `event.model.js` & `user.model.js` – Data models for events and users
- `auth.middleware.js` – Authentication logic
- `MapExplorer.js` – Main map component
- `NearbyPlaces.js` – Shows places near the user

---

## 🛠️ How to Explore & Learn

1. **Run the App Locally**

   - Install dependencies: `npm install`
   - Start frontend: `npm run dev`
   - Start backend: `node Backend/server.js` (or as per backend docs)
   - Open [http://localhost:3000](http://localhost:3000)

2. **Explore the Map**

   - Try adding events, filtering, and viewing details
   - Check how components interact (see `components/map/`)

3. **Read the Code**

   - Start with `pages/index.js` and `components/layout/`
   - Follow the flow for adding/viewing events
   - Look at API calls in frontend and their handlers in backend

4. **Experiment**
   - Change a UI element or add a new feature
   - Try writing a new filter or notification
   - Add a new API endpoint in backend

---

## 🧑‍💻 For Contributors

- **Start Small:** Fix a typo, improve a style, or add a comment
- **Understand the Flow:** Trace how data moves from frontend to backend
- **Read `CONTRIBUTING.md`:** For PR process, code style, and best practices
- **Ask Questions:** Open issues for help or clarification
- **Test Your Changes:** Make sure your edits work locally

---

## 🧠 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://reactjs.org/docs/getting-started.html)
- [Leaflet.js Docs](https://leafletjs.com/)
- [Node.js Docs](https://nodejs.org/en/docs/)
- [OpenStreetMap](https://www.openstreetmap.org)

---

## 💡 Tips for Deep Learning

- **Follow the Data:** See how event data is created, stored, and displayed
- **Explore Components:** See how UI is built from reusable pieces
- **Check Routing:** Learn how navigation works (React Router, Next.js pages)
- **Understand State:** See how React manages app state and updates
- **Look for Patterns:** Notice how code is organized for scalability

---

## 🙌 Community & Support

- Join discussions, ask questions, and share ideas
- Check issues and PRs for ongoing work
- Help others learn by improving docs and code comments

---

Happy learning and contributing! 🚀
