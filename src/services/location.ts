import Geolocation from 'react-native-geolocation-service';

export const startLocationTracking = (onLocationUpdate: Function) => {
  const watchId = Geolocation.watchPosition(
    position => onLocationUpdate(position),
    error => console.log(error),
    {enableHighAccuracy: true, distanceFilter: 2},
  );

  return watchId;
};

export const stopLocationTracking = (watchId: number) => {
  Geolocation.clearWatch(watchId);
};
