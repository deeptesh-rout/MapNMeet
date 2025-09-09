import React, { useEffect, useState } from 'react';
import NearbyPlaces from './NearbyPlaces';

export default function NearbyPlacesPanel({ userLocation, onClose }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch places using the same Overpass API logic as NearbyPlaces
  useEffect(() => {
    if (!userLocation) return;
    setLoading(true);
    setError('');
    const radius = 1200;
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="restaurant"](around:${radius},${userLocation.lat},${userLocation.lng});
        node["tourism"="hotel"](around:${radius},${userLocation.lat},${userLocation.lng});
      );
      out body;
    `;
    fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        if (data && data.elements) {
          setPlaces(data.elements);
        } else {
          setPlaces([]);
        }
      })
      .catch(() => {
        setLoading(false);
        setError('Failed to fetch nearby places.');
      });
  }, [userLocation]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      <div className="nearby-modal-overlay" onClick={onClose}></div>
      <div className="nearby-modal">
        <div className="nearby-modal-header">
          <span>Nearby Restaurants & Hotels</span>
          <button className="close-btn" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="nearby-modal-content">
          {loading && (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <span>Finding nearby places...</span>
            </div>
          )}
          {error && (
            <div className="error-state">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}
          {!loading && !error && places.length === 0 && (
            <div className="empty-state">
              <span className="empty-icon">📍</span>
              <span>No nearby places found.</span>
            </div>
          )}
          {!loading && !error && places.length > 0 && (
            <ul className="nearby-places-list">
              {places.map(place => (
                <li key={place.id} className="nearby-place-item">
                  <div className="place-header">
                    <span className="place-icon">
                      {place.tags.amenity === 'restaurant' ? '🍽️' : '🏨'}
                    </span>
                    <strong className="place-name">
                      {place.tags.name || (place.tags.amenity === 'restaurant' ? 'Restaurant' : 'Hotel')}
                    </strong>
                  </div>
                  <div className="place-details">
                    {place.tags.cuisine && (
                      <span className="place-cuisine">🍴 {place.tags.cuisine}</span>
                    )}
                    {place.tags['addr:street'] && (
                      <span className="place-address">📍 {place.tags['addr:street']}</span>
                    )}
                    {place.tags['addr:city'] && (
                      <span className="place-city">{place.tags['addr:city']}</span>
                    )}
                  </div>
                  <span className="place-type">
                    {place.tags.amenity === 'restaurant' ? 'Restaurant' : 'Hotel'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <style jsx>{`
        .nearby-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
          animation: fadeIn 0.2s ease-out;
        }

        .nearby-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90vw;
          max-width: 500px;
          max-height: 80vh;
          background: #ffffff;
          color: #333;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          z-index: 1001;
          display: flex;
          flex-direction: column;
          animation: slideIn 0.3s ease-out;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        .nearby-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          font-size: 1.25rem;
          font-weight: 600;
          border-bottom: 1px solid #e5e7eb;
          background: #f9fafb;
          border-radius: 16px 16px 0 0;
          color: #1f2937;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #6b7280;
          padding: 0.25rem;
          border-radius: 4px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
        }

        .close-btn:hover {
          background: #e5e7eb;
          color: #374151;
        }

        .nearby-modal-content {
          flex: 1;
          padding: 1.5rem 2rem;
          overflow-y: auto;
          color: #374151;
        }

        .loading-state,
        .error-state,
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          text-align: center;
          gap: 1rem;
        }

        .loading-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid #e5e7eb;
          border-top: 3px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-state {
          color: #dc2626;
        }

        .error-icon,
        .empty-icon {
          font-size: 2rem;
        }

        .nearby-places-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .nearby-place-item {
          padding: 1.25rem;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          background: #ffffff;
          transition: all 0.2s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .nearby-place-item:hover {
          border-color: #d1d5db;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transform: translateY(-1px);
        }

        .place-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .place-icon {
          font-size: 1.25rem;
          flex-shrink: 0;
        }

        .place-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1f2937;
          line-height: 1.4;
        }

        .place-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .place-cuisine,
        .place-address,
        .place-city {
          font-size: 0.9rem;
          color: #6b7280;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .place-type {
          display: inline-block;
          background: #f3f4f6;
          color: #374151;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .nearby-modal {
            width: 95vw;
            max-height: 85vh;
            margin: 1rem;
          }

          .nearby-modal-header {
            padding: 1.25rem 1.5rem;
            font-size: 1.1rem;
          }

          .nearby-modal-content {
            padding: 1.25rem 1.5rem;
          }

          .nearby-place-item {
            padding: 1rem;
          }

          .place-name {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .nearby-modal {
            width: 100vw;
            height: 100vh;
            max-height: 100vh;
            border-radius: 0;
            margin: 0;
          }

          .nearby-modal-header {
            border-radius: 0;
          }
        }
      `}</style>
    </>
  );
}