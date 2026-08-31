import { useEffect, useState, useRef } from 'react';
import { useMapStore } from '../stores/mapStore';

// 1 real-world meter = 40 pixels on the SVG map (increased for better visual responsiveness)
const SCALE = 40;

export function useRealLocation(isActive: boolean) {
  const { userLocation, setUserLocation } = useMapStore();
  const [error, setError] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const initialGps = useRef<{ lat: number; lng: number } | null>(null);
  const initialSvg = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!isActive) {
      setIsTracking(false);
      initialGps.current = null;
      initialSvg.current = null;
      return;
    }

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setIsTracking(true);
        const { latitude, longitude } = position.coords;

        // Loosened accuracy to 100m because indoor GPS is inherently noisy.
        // Google Maps uses Wi-Fi/Bluetooth beacons for indoor, which we don't have in web.
        if (position.coords.accuracy > 100 && initialGps.current) {
          console.warn(`Ignored noisy GPS point (Accuracy: ${position.coords.accuracy}m)`);
          return;
        }

        if (!initialGps.current || !initialSvg.current) {
          // Lock the initial position to wherever the user currently is on the SVG map
          initialGps.current = { lat: latitude, lng: longitude };
          initialSvg.current = useMapStore.getState().userLocation || { x: 500, y: 750 }; 
          
          if (!useMapStore.getState().userLocation) {
            setUserLocation({ x: 500, y: 750 });
          }
          return;
        }

        // Calculate distance and bearing using Haversine formula
        const R = 6371e3; // metres
        const lat1 = initialGps.current.lat * Math.PI/180;
        const lat2 = latitude * Math.PI/180;
        const dLat = (latitude - initialGps.current.lat) * Math.PI/180;
        const dLng = (longitude - initialGps.current.lng) * Math.PI/180;

        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1) * Math.cos(lat2) *
                  Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;

        // Calculate bearing
        const y = Math.sin(dLng) * Math.cos(lat2);
        const x = Math.cos(lat1) * Math.sin(lat2) -
                  Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
        const theta = Math.atan2(y, x);
        const bearing = (theta * 180 / Math.PI + 360) % 360;

        // Map to SVG coordinates
        // Bearing 0 (North) -> -Y in SVG
        // Bearing 90 (East) -> +X in SVG
        const dx = distance * SCALE * Math.sin(bearing * Math.PI/180);
        const dy = -distance * SCALE * Math.cos(bearing * Math.PI/180);

        setUserLocation({
          x: initialSvg.current.x + dx,
          y: initialSvg.current.y + dy
        });
      },
      (err) => {
        console.error("GPS Error:", err);
        setError(err.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [isActive, setUserLocation]);

  return { error, isTracking };
}
