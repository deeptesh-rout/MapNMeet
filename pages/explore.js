import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { initializeFirebase } from '../utils/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Dynamically import MapExplorer with no SSR to avoid leaflet issues
const MapExplorer = dynamic(() => import('../components/map/MapExplorer'), {
  ssr: false,
  loading: () => <div className="map-loading">Loading map...</div>
});

export default function MapPage() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Animation on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.map-header, .map-container, .categories-list');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
          element.classList.add('animate');
        }
      });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  useEffect(() => {
    // Initialize Firebase first
    const app = initializeFirebase();
    
    if (app) {
      try {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        });
        
        return () => unsubscribe();
      } catch (error) {
        console.error("Error setting up auth:", error);
        setLoading(false);
      }
    } else {
      // Firebase not configured, continue without auth
      console.log("Running without Firebase authentication");
      setLoading(false);
    }
  }, []);

  // Load events from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEvents = localStorage.getItem('eventmappr-events');
      if (savedEvents) {
        try {
          setEvents(JSON.parse(savedEvents));
        } catch (error) {
          console.error('Error loading events:', error);
        }
      }
    }
  }, []);

  const handleEventAdded = (newEvent) => {
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    if (typeof window !== 'undefined') {
      localStorage.setItem('eventmappr-events', JSON.stringify(updatedEvents));
    }
  };

  const handleEventDeleted = (eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    if (typeof window !== 'undefined') {
      localStorage.setItem('eventmappr-events', JSON.stringify(updatedEvents));
    }
  };

  return (
    <>
      <Head>
        <title>Interactive Map | EventMappr</title>
        <meta name="description" content="Explore local events happening around you on an interactive map." />
      </Head>
      
      <div className="map-page">
        <div className="map-header">
          <div className="container">
            <h1>Event Map</h1>
            <p>Discover and explore events happening in your community</p>
          </div>
        </div>
        
        <div className="map-container">
          {!loading && (
            <MapExplorer 
              events={events}
              onEventAdded={handleEventAdded}
              onEventDeleted={handleEventDeleted}
              isAuthenticated={!!user}
            />
          )}
        </div>
      </div>
      
      <style jsx>{`
        .map-page {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          position: relative;
          z-index: 0;
          padding-top: 60px; /* Add padding for navbar height */
        }
        
        .map-header {
          padding: 2rem 0;
          background: linear-gradient(135deg, var(--primary-light), var(--primary));
          text-align: center;
          color: white;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
          position: relative;
          z-index: 2;
        }
        
        .map-header.animate {
          opacity: 1;
          transform: translateY(0);
        }
        
        .map-header h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }
        
        .map-header p {
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto;
          opacity: 0.9;
        }
        
        .categories-container {
          position: sticky;
          top: 60px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: 0.5rem 0;
          z-index: 1;
        }

        .categories-list {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
          max-width: 1200px;
          margin: 0 auto;
        }

        .categories-list.animate {
          opacity: 1;
          transform: translateY(0);
        }

        .category-item {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          background: var(--slate);
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .category-item:hover {
          background: var(--midnight-blue);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .map-container {
          flex: 1;
          width: 100%;
          height: calc(100vh - 120px);
          min-height: 500px;
          position: relative;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
          z-index: 0;
          margin-top: 1rem;
        }
        
        .map-container.animate {
          opacity: 1;
          transform: translateY(0);
        }
        
        .map-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          font-size: 1.2rem;
          color: var(--text-light);
        }

        @media (max-width: 768px) {
          .map-header {
            padding: 1.5rem 0;
          }
          
          .map-header h1 {
            font-size: 2rem;
          }
          
          .map-container {
            height: calc(100vh - 150px);
          }
          
          .categories-list {
            padding: 0.5rem;
          }
        }
      `}</style>
    </>
  );
} 