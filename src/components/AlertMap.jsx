import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom hook to set map view to user location
const SetViewOnLocation = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (map && location) {
      map.setView(location, 13);
    }
  }, [map, location]);
  return null;
};

const AlertMap = ({ trafficData = [], animalAttackData = [], constructionData = [] }) => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, []);

  const userIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/9356/9356230.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <MapContainer 
      center={userLocation || [51.505, -0.09]} 
      zoom={13} 
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {userLocation && <SetViewOnLocation location={userLocation} />}
      
      {/* Traffic Alert Circles */}
      {trafficData.map((traffic, idx) => (
        <Circle
          key={idx}
          center={[traffic.latitude, traffic.longitude]}
          radius={100} 
          color="red" 
          fillOpacity={0.5}
        />
      ))}

      {/* Animal Attack Alert Circles */}
      {animalAttackData.map((attack, idx) => (
        <Circle
          key={idx}
          center={[attack.latitude, attack.longitude]}
          radius={100} 
          color="darkblue" 
          fillOpacity={0.5}
        />
      ))}

      {/* Construction Alert Circles */}
      {constructionData.map((construct, idx) => (
        <Circle
          key={idx}
          center={[construct.latitude, construct.longitude]}
          radius={100} 
          color="darkgreen" 
          fillOpacity={0.5}
        />
      ))}

      {/* User Location Marker */}
      {userLocation && (
        <Marker position={userLocation} icon={userIcon}>
          <Popup>Your Current Location</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default AlertMap;
