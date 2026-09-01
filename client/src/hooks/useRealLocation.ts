import { useEffect, useState, useRef } from 'react';
import { useMapStore } from '../stores/mapStore';

// 1 real-world meter = 40 pixels on the SVG map (increased for better visual responsiveness)
const SCALE = 40;

class KalmanFilter {
  private Q: number; // process noise covariance
  private R: number; // measurement noise covariance
  private x: number; // value
  private p: number; // estimation error covariance
  private k: number; // kalman gain

  constructor(Q = 0.0001, R = 0.01) {
    this.Q = Q;
    this.R = R;
    this.x = NaN;
    this.p = 1;
    this.k = 0;
  }

  filter(measurement: number): number {
    if (Number.isNaN(this.x)) {
      this.x = measurement;
      this.p = 1;
    } else {
      // Prediction update
      this.p = this.p + this.Q;
      // Measurement update
      this.k = this.p / (this.p + this.R);
      this.x = this.x + this.k * (measurement - this.x);
      this.p = (1 - this.k) * this.p;
    }
    return this.x;
  }
}

export function useRealLocation(isActive: boolean) {
  const { userLocation, setUserLocation } = useMapStore();
  const [error, setError] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const initialGps = useRef<{ lat: number; lng: number } | null>(null);
  const initialSvg = useRef<{ x: number; y: number } | null>(null);
  
  // Create filters for dx and dy
  const kfX = useRef(new KalmanFilter(0.005, 0.5));
  const kfY = useRef(new KalmanFilter(0.005, 0.5));

  useEffect(() => {
    if (!isActive) {
      setIsTracking(false);
      setAccuracy(null);
      initialGps.current = null;
      initialSvg.current = null;
      kfX.current = new KalmanFilter(0.005, 0.5);
      kfY.current = new KalmanFilter(0.005, 0.5);
      return;
    }

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setIsTracking(true);
        const { latitude, longitude, accuracy: posAccuracy } = position.coords;
        setAccuracy(posAccuracy);

        // Ignore highly inaccurate readings, but allow up to 60m since indoors is noisy
        if (posAccuracy > 60 && initialGps.current) {
          console.warn(`Ignored noisy GPS point (Accuracy: ${posAccuracy}m)`);
          return;
        }

        if (!initialGps.current || !initialSvg.current) {
          initialGps.current = { lat: latitude, lng: longitude };
          initialSvg.current = useMapStore.getState().userLocation || { x: 500, y: 750 }; 
          if (!useMapStore.getState().userLocation) {
            setUserLocation({ x: 500, y: 750 });
          }
          return;
        }

        // Calculate distance and bearing using Haversine formula
        const R = 6371e3;
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

        const rawDx = distance * SCALE * Math.sin(bearing * Math.PI/180);
        const rawDy = -distance * SCALE * Math.cos(bearing * Math.PI/180);

        // Apply Kalman filter
        const smoothDx = kfX.current.filter(rawDx);
        const smoothDy = kfY.current.filter(rawDy);

        setUserLocation({
          x: initialSvg.current.x + smoothDx,
          y: initialSvg.current.y + smoothDy
        });
      },
      (err) => {
        console.error("GPS Error:", err);
        setError(err.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 15000
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [isActive, setUserLocation]);

  return { error, isTracking, accuracy };
}
