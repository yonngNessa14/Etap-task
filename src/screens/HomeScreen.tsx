/* eslint-disable @typescript-eslint/no-unused-vars */
import {Alert, Linking, View, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {startLocationTracking, stopLocationTracking} from '@services/location';
import Geolocation from 'react-native-geolocation-service';

export const HomeScreen = () => {
  const [currentLocation, setCurrentLocation] =
    useState<GeolocationCoordinates>();
  const [watchId, setWatchId] = useState<Number>(0);

  const hasPermissionIOS = useCallback(async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const newStatus = await Geolocation.requestAuthorization('whenInUse');

    if (newStatus === 'granted') {
      return true;
    }

    if (newStatus === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (newStatus === 'disabled') {
      Alert.alert(
        'Turn on Location Services to allow "RentIt" to determine your location.',
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }

    return false;
  }, []);

  useEffect(() => {
    hasPermissionIOS();
    const onLocationUpdate = (position: GeolocationPosition) => {
      console.log('here', position);

      setCurrentLocation(position.coords);
    };

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const watchId = startLocationTracking(onLocationUpdate);
    console.log('new log id', {watchId});

    setWatchId(watchId);

    return () => stopLocationTracking(watchId);
  }, [hasPermissionIOS]);

  return (
    <View style={StyleSheet.absoluteFillObject}>
      {currentLocation && (
        <MapView.Animated
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFillObject}
          zoomEnabled
          minZoomLevel={10}
          maxZoomLevel={500}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="Current Location"
          />
        </MapView.Animated>
      )}
    </View>
  );
};
