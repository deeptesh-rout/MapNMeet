import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { FiChevronLeft, FiMenu } from "react-icons/fi";
import L from 'leaflet';

// Fix for default icon issue with Leaflet and Webpack
if (typeof window !== 'undefined') {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });
}

const MapController = ({ center }) => {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      map.flyTo(center, 15);
    }
  }, [center, map]);
  return null;
};

export default function TouristPlacesMap({
  attractions,
  userLocation,
  selectedPlace,
  sidebarOpen,
  setSidebarOpen
}) {
  return (
    <main className="flex-1 relative">
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-4 left-4 z-20 bg-white p-2 rounded-full shadow-md text-slate-700 hover:bg-slate-100 md:hidden"
      >
        {sidebarOpen ? <FiChevronLeft /> : <FiMenu />}
      </button>
      <MapContainer center={userLocation || [51.505, -0.09]} zoom={13} className="w-full h-full z-10">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapController center={selectedPlace?.position || userLocation} />
        {userLocation && <Marker position={userLocation}><Popup>Your Location</Popup></Marker>}
        {attractions.map(place => (
          <Marker key={place.id} position={place.position}>
            <Popup>
              <div className="font-sans">
                <h4 className="font-bold">{place.name}</h4>
                <p className="capitalize">{place.type.replace(/_/g, ' ')}</p>
                {place.website && <a href={place.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Website</a>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </main>
  );
}
