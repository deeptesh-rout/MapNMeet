import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import FooterSection from './components/sections/FooterSection';
import HomePage from '@/pages/HomePage';
import TouristPlacesPage from '@/pages/tourist-places';
import EventGallery from '@/pages/EventGallery';


// Import CSS
import './styles/style.css';
import './styles/Home.css';
import './styles/AppStyles.css';
import './styles/faq.css';
import 'leaflet/dist/leaflet.css';

const App = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <Router>
      <div className={`app ${theme}`}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tourist-places" element={<TouristPlacesPage />} />
            <Route path="/event-gallery" element={<EventGallery />} />
          </Routes>
        </main>
        <FooterSection />
      </div>
    </Router>
  );
};

export default App;
