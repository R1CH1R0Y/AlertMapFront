import React, { useEffect, useState } from 'react';
import TrafficMap from './TrafficMap'; // Ensure you have this component defined

const AlertSystem = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [geofences, setGeofences] = useState([
        { latitude: 10.8505, longitude: 76.2711, radius: 1000, notified: false },
        { latitude: 10.8605, longitude: 76.2811, radius: 1000, notified: false },
        { latitude: 10.142303718438948, longitude: 76.2241480776085, radius: 1000, notified: false },
        { latitude: 10.079115614479509, longitude: 76.27394290945765, radius: 1000, notified: false },
    ]);

    useEffect(() => {
        const askPermission = async () => {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                console.error('Notification permission not granted.');
                return;
            }
        };

        // Function to check if user is within any geofence
        const checkGeofences = () => {
            if (userLocation) {
                geofences.forEach((geofence, index) => {
                    const distance = getDistance(userLocation, geofence);
                    console.log(`Checking geofence at (${geofence.latitude}, ${geofence.longitude}) with radius ${geofence.radius}: Distance to user is ${distance} meters`);
                    if (distance < geofence.radius) {
                        if (!geofence.notified) {
                            new Notification('You are entering an alert zone!');
                            const updatedGeofences = [...geofences];
                            updatedGeofences[index].notified = true;
                            setGeofences(updatedGeofences);
                        }
                    } else {
                        if (geofence.notified) {
                            const updatedGeofences = [...geofences];
                            updatedGeofences[index].notified = false;
                            setGeofences(updatedGeofences);
                        }
                    }
                });
            }
        };

        // Function to calculate distance between two coordinates
        const getDistance = (location1, location2) => {
            const R = 6371e3; // Earth's radius in meters
            const lat1 = location1.latitude * Math.PI / 180;
            const lat2 = location2.latitude * Math.PI / 180;
            const deltaLat = (location2.latitude - location1.latitude) * Math.PI / 180;
            const deltaLon = (location2.longitude - location1.longitude) * Math.PI / 180;

            const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
                      Math.cos(lat1) * Math.cos(lat2) *
                      Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            return R * c; // Distance in meters
        };

        // Function to track user location
        const trackUserLocation = () => {
            if ('geolocation' in navigator) {
                navigator.geolocation.watchPosition((position) => {
                    const newLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    setUserLocation(newLocation);
                    checkGeofences(); // Check geofences whenever location updates
                }, (error) => {
                    console.error(`Error getting location: ${error.message}`);
                });
            } else {
                console.error('Geolocation not supported.');
            }
        };

        askPermission();
        trackUserLocation();
    }, [userLocation, geofences]); // Including geofences to handle updates

    const trafficData = [
        { latitude: 10.8505, longitude: 76.2711 },
        { latitude: 10.8605, longitude: 76.2811 },
    ];

    const animalAttackData = [
        { latitude: 10.8555, longitude: 76.2601 },
        { latitude: 10.142303718438948, longitude: 76.2241480776085 },
        { latitude: 10.079115614479509, longitude: 76.27394290945765 },
    ];

    const constructionData = [
        { latitude: 10.8555, longitude: 76.2701 },
        { latitude: 10.8655, longitude: 76.2751 },
    ];

    return (
        <div>
            <h1><center>Alert-Map</center></h1>
            <TrafficMap trafficData={trafficData} animalAttackData={animalAttackData} constructionData={constructionData} />
        </div>
    );
};

export default AlertSystem;
