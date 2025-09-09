import React, { useState, useEffect, useCallback } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const placeIcons = {
  restaurant: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: 'custom-marker-icon restaurant-marker'
  }),
  hotel: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/139/139899.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: 'custom-marker-icon hotel-marker'
  }),
  default: new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
    className: 'custom-marker-icon default-marker'
  })
};

export default function NearbyPlaces({ userLocation, radius = 1200, showNotifications = true }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  const fetchNearbyPlaces = useCallback(async () => {
    if (!userLocation) return;
    
    setLoading(true);
    setError('');
    
    try {
      // Enhanced Overpass QL query with more place types
      const query = `
        [out:json][timeout:30];
        (
          node["amenity"="restaurant"](around:${radius},${userLocation.lat},${userLocation.lng});
          node["amenity"="cafe"](around:${radius},${userLocation.lat},${userLocation.lng});
          node["amenity"="fast_food"](around:${radius},${userLocation.lat},${userLocation.lng});
          node["tourism"="hotel"](around:${radius},${userLocation.lat},${userLocation.lng});
          node["tourism"="guest_house"](around:${radius},${userLocation.lat},${userLocation.lng});
          node["amenity"="bar"](around:${radius},${userLocation.lat},${userLocation.lng});
          node["amenity"="pub"](around:${radius},${userLocation.lat},${userLocation.lng});
        );
        out body;
      `;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query,
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data && data.elements && Array.isArray(data.elements)) {
        // Filter out places without coordinates or names
        const validPlaces = data.elements.filter(place => 
          place.lat && 
          place.lon && 
          place.tags && 
          (place.tags.name || place.tags.amenity || place.tags.tourism)
        );
        
        setPlaces(validPlaces);
        setRetryCount(0);
      } else {
        setPlaces([]);
      }
      
      setLoading(false);
    } catch (err) {
      setLoading(false);
      
      if (err.name === 'AbortError') {
        setError('Request timed out. Please try again.');
      } else if (err.message.includes('Failed to fetch')) {
        setError('Network error. Please check your connection.');
      } else {
        setError('Failed to fetch nearby places. Please try again.');
      }
      
      console.error('Error fetching nearby places:', err);
    }
  }, [userLocation, radius]);

  const handleRetry = useCallback(() => {
    if (retryCount < 3) {
      setRetryCount(prev => prev + 1);
      fetchNearbyPlaces();
    }
  }, [fetchNearbyPlaces, retryCount]);

  useEffect(() => {
    fetchNearbyPlaces();
  }, [fetchNearbyPlaces]);

  const getPlaceIcon = (place) => {
    if (!place.tags) return placeIcons.default;
    
    const amenity = place.tags.amenity;
    const tourism = place.tags.tourism;
    
    if (amenity === 'restaurant' || amenity === 'cafe' || amenity === 'fast_food' || amenity === 'bar' || amenity === 'pub') {
      return placeIcons.restaurant;
    } else if (tourism === 'hotel' || tourism === 'guest_house') {
      return placeIcons.hotel;
    }
    
    return placeIcons.default;
  };

  const getPlaceName = (place) => {
    if (!place.tags) return 'Unknown Place';
    
    if (place.tags.name) return place.tags.name;
    
    const amenity = place.tags.amenity;
    const tourism = place.tags.tourism;
    
    if (amenity === 'restaurant') return 'Restaurant';
    if (amenity === 'cafe') return 'Cafe';
    if (amenity === 'fast_food') return 'Fast Food';
    if (amenity === 'bar') return 'Bar';
    if (amenity === 'pub') return 'Pub';
    if (tourism === 'hotel') return 'Hotel';
    if (tourism === 'guest_house') return 'Guest House';
    
    return 'Place';
  };

  const getPlaceType = (place) => {
    if (!place.tags) return '';
    
    const amenity = place.tags.amenity;
    const tourism = place.tags.tourism;
    
    if (amenity) return amenity.charAt(0).toUpperCase() + amenity.slice(1).replace('_', ' ');
    if (tourism) return tourism.charAt(0).toUpperCase() + tourism.slice(1).replace('_', ' ');
    
    return '';
  };

  if (!userLocation) return null;

  // Loading state
  if (loading && showNotifications) {
    return (
      <div className="nearby-status">
        <div className="loading-spinner"></div>
        <span>Finding nearby places...</span>
        <style jsx>{`
          .nearby-status {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.95);
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            font-weight: 500;
            color: #374151;
          }
          .loading-spinner {
            width: 16px;
            height: 16px;
            border: 2px solid #e5e7eb;
            border-top: 2px solid #3b82f6;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Error state
  if (error && showNotifications) {
    return (
      <div className="nearby-status error">
        <span className="error-icon">⚠️</span>
        <span>{error}</span>
        {retryCount < 3 && (
          <button onClick={handleRetry} className="retry-btn">
            Retry
          </button>
        )}
        <style jsx>{`
          .nearby-status {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.95);
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            font-weight: 500;
            max-width: 300px;
          }
          .nearby-status.error {
            color: #dc2626;
            border-left: 4px solid #dc2626;
          }
          .error-icon {
            font-size: 16px;
            flex-shrink: 0;
          }
          .retry-btn {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
            margin-left: auto;
            transition: background 0.2s ease;
          }
          .retry-btn:hover {
            background: #2563eb;
          }
        `}</style>
      </div>
    );
  }

  // No places found
  if (places.length === 0 && !loading && !error && showNotifications) {
    return (
      <div className="nearby-status">
        <span>📍</span>
        <span>No nearby places found in {radius}m radius</span>
        <style jsx>{`
          .nearby-status {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.95);
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            font-weight: 500;
            color: #6b7280;
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      {places.map(place => (
        <Marker
          key={`${place.id}-${place.lat}-${place.lon}`}
          position={[place.lat, place.lon]}
          icon={getPlaceIcon(place)}
        >
          <Popup className="custom-popup">
            <div className="popup-content">
              <div className="popup-header">
                <span className="popup-icon">
                  {place.tags?.amenity === 'restaurant' || place.tags?.amenity === 'cafe' || place.tags?.amenity === 'fast_food' ? '🍽️' : 
                   place.tags?.amenity === 'bar' || place.tags?.amenity === 'pub' ? '🍺' :
                   place.tags?.tourism === 'hotel' || place.tags?.tourism === 'guest_house' ? '🏨' : '📍'}
                </span>
                <strong className="popup-title">{getPlaceName(place)}</strong>
              </div>
              
              <div className="popup-details">
                {getPlaceType(place) && (
                  <div className="popup-type">{getPlaceType(place)}</div>
                )}
                
                {place.tags?.cuisine && (
                  <div className="popup-info">
                    <span className="info-label">🍴 Cuisine:</span>
                    <span className="info-value">{place.tags.cuisine}</span>
                  </div>
                )}
                
                {place.tags?.opening_hours && (
                  <div className="popup-info">
                    <span className="info-label">🕒 Hours:</span>
                    <span className="info-value">{place.tags.opening_hours}</span>
                  </div>
                )}
                
                {(place.tags?.['addr:street'] || place.tags?.['addr:city']) && (
                  <div className="popup-info">
                    <span className="info-label">📍 Address:</span>
                    <span className="info-value">
                      {place.tags?.['addr:street']}
                      {place.tags?.['addr:street'] && place.tags?.['addr:city'] && ', '}
                      {place.tags?.['addr:city']}
                    </span>
                  </div>
                )}
                
                {place.tags?.phone && (
                  <div className="popup-info">
                    <span className="info-label">📞 Phone:</span>
                    <span className="info-value">
                      <a href={`tel:${place.tags.phone}`}>{place.tags.phone}</a>
                    </span>
                  </div>
                )}
                
                {place.tags?.website && (
                  <div className="popup-info">
                    <span className="info-label">🌐 Website:</span>
                    <span className="info-value">
                      <a href={place.tags.website} target="_blank" rel="noopener noreferrer">
                        Visit Website
                      </a>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
      
      <style jsx global>{`
        .custom-marker-icon {
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          transition: all 0.2s ease;
        }
        
        .custom-marker-icon:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }
        
        .restaurant-marker {
          border: 2px solid #f59e0b;
        }
        
        .hotel-marker {
          border: 2px solid #3b82f6;
        }
        
        .default-marker {
          border: 2px solid #6b7280;
        }
        
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          padding: 0;
        }
        
        .leaflet-popup-content {
          margin: 0;
          padding: 0;
          min-width: 200px;
        }
        
        .popup-content {
          padding: 16px;
        }
        
        .popup-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .popup-icon {
          font-size: 18px;
          flex-shrink: 0;
        }
        
        .popup-title {
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
          line-height: 1.3;
        }
        
        .popup-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .popup-type {
          display: inline-block;
          background: #f3f4f6;
          color: #374151;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
          align-self: flex-start;
          margin-bottom: 4px;
        }
        
        .popup-info {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 14px;
        }
        
        .info-label {
          font-weight: 500;
          color: #6b7280;
          flex-shrink: 0;
          min-width: 60px;
        }
        
        .info-value {
          color: #374151;
          flex: 1;
        }
        
        .info-value a {
          color: #3b82f6;
          text-decoration: none;
        }
        
        .info-value a:hover {
          text-decoration: underline;
        }
        
        .leaflet-popup-tip {
          border-top-color: white;
        }
      `}</style>
    </>
  );
}