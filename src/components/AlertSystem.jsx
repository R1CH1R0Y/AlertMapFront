import React, { useEffect, useState } from 'react';
import AlertMap from './AlertMap';
import NavBar from './NavBar';

const AlertSystem = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [selectedView, setSelectedView] = useState('all');

    const [geofences, setGeofences] = useState([
        { latitude: 10.8505, longitude: 76.2711, radius: 1000, type: 'traffic', notified: false },
        { latitude: 10.8605, longitude: 76.2811, radius: 1000, type: 'traffic', notified: false },
        { latitude: 10.237577700953553, longitude: 76.41175775034719,radius: 1000, type: 'construction' , notified: false },
        { latitude: 10.8555, longitude: 76.2601, radius: 1000, type: 'animal', notified: false },
        { latitude: 10.142303718438948, longitude: 76.2241480776085, radius: 1000, type: 'animal', notified: false },
        { latitude: 10.079115614479509, longitude: 76.27394290945765, radius: 1000, type: 'animal', notified: false },
        { latitude: 10.229831778129121, longitude: 76.39922305889426, radius: 1000, type: 'animal', notified: false },
        { latitude: 10.8555, longitude: 76.2701, radius: 1000, type: 'construction', notified: false },
        { latitude: 10.8655, longitude: 76.2751, radius: 1000, type: 'construction', notified: false },
    ]);

    useEffect(() => {
        const askPermission = async () => {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                console.error('Notification permission not granted.');
                return;
            }
        };

        const checkGeofences = () => {
            if (userLocation) {
                geofences.forEach((geofence, index) => {
                    const distance = getDistance(userLocation, geofence);
                    if (distance < geofence.radius) {
                        if (!geofence.notified) {
                            new Notification(`You are entering a ${geofence.type} alert zone!`);
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
    }, [userLocation, geofences]);

    const trafficData = [
        { latitude: 10.8505, longitude: 76.2711, type: 'traffic' },
        { latitude: 10.8605, longitude: 76.2811, type: 'traffic' },
    ];

    const animalAttackData = [
        { latitude: 10.8555, longitude: 76.2601, type: 'animal' },
        { latitude: 10.142303718438948, longitude: 76.2241480776085, type: 'animal' },
        { latitude: 10.079115614479509, longitude: 76.27394290945765, type: 'animal' },
        { latitude: 10.229831778129121, longitude: 76.39922305889426, type: 'animal' },
    ];

    const constructionData = [
        { latitude: 10.8555, longitude: 76.2701,type: 'construction' },
        { latitude: 10.8655, longitude: 76.2751,type: 'construction' },
        { latitude: 10.237577700953553, longitude: 76.41175775034719,type: 'construction' },
    ];

    // Filter data based on selected view
    const getFilteredData = () => {
        switch (selectedView) {
            case 'traffic':
                return { trafficData };
            case 'animal':
                return { animalAttackData };
            case 'construction':
                return { constructionData };
            case 'all':
            default:
                return { trafficData, animalAttackData, constructionData };
        }
    };

    const filteredData = getFilteredData();

    return (
        <div>
            <NavBar setSelectedView={setSelectedView} />
            <AlertMap {...filteredData} />
        </div>
    );
};

export default AlertSystem;