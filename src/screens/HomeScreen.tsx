import {View, ViewStyle} from 'react-native';
import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import MapView, {LatLng, PROVIDER_GOOGLE} from 'react-native-maps';
import {startLocationTracking, stopLocationTracking} from '@services/location';
import CustomMarker from '@components/Map/CustomMarkers';
import {Icon} from '@components';
import {trigger} from 'react-native-haptic-feedback';
import {useLocation} from '@hooks';
import {MapType} from '@components/Map';
import {AppStackScreenProps} from '@navigators/AppNavigator';
import BottomSheet from '@gorhom/bottom-sheet';
import {BottomSheetFooter} from '@components/BottomSheet';

interface HomeScreenProps extends AppStackScreenProps<'Home'> {}
export const HomeScreen: FC<HomeScreenProps> = _props => {
  const {navigation} = _props;
  const {isPermissionGranted, getLocationPermission} = useLocation();

  const [currentLocation, setCurrentLocation] =
    useState<GeolocationCoordinates>();

  const [watchId, setWatchId] = useState<number>(0);
  const [markers, setMarkers] = useState<LatLng[]>([]);

  const [switchVal, setSwitchVal] = useState(false);
  const [startTracking, setStartTracking] = useState(true);

  const [showSettings, setShowSettings] = useState(false);

  const [sateliteMode, setSateliteMode] = useState<boolean>(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['10%', '50%', '75%'], []);

  useEffect(() => {
    !isPermissionGranted && getLocationPermission();
    const onLocationUpdate = (position: GeolocationPosition) => {
      setCurrentLocation(position.coords);
    };

    const trackingId = startLocationTracking(onLocationUpdate);

    setWatchId(trackingId);

    return () => stopLocationTracking(trackingId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPermissionGranted, startTracking]);

  const addNewMarker = useCallback(
    e => {
      const copiedMarkers = [...markers];
      const newMarker = e.nativeEvent.coordinate;

      copiedMarkers.push(newMarker);

      setMarkers(copiedMarkers);
      trigger('impactLight');
    },
    [markers],
  );

  const changeMapType = useCallback(() => {
    setSateliteMode(!sateliteMode);
  }, [sateliteMode]);

  const memoizedMapType = useMemo(() => {
    return <MapType {...{sateliteMode, changeMapType}} />;
  }, [changeMapType, sateliteMode]);

  const headerRight = useMemo(
    () => (
      <Icon icon="settings" onPress={() => setShowSettings(!showSettings)} />
    ),
    [showSettings],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => headerRight,
    });
  }, [headerRight, navigation]);

  return (
    <View style={$flex}>
      <View style={$flex}>
        {currentLocation && (
          <MapView.Animated
            provider={PROVIDER_GOOGLE}
            style={$flex}
            zoomEnabled
            showsMyLocationButton
            mapType={sateliteMode ? 'hybrid' : 'standard'}
            showsBuildings={true}
            showsCompass={true}
            showsUserLocation={true}
            minZoomLevel={10}
            maxZoomLevel={500}
            onLongPress={addNewMarker}
            initialRegion={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            {/* user location */}
            <CustomMarker
              coordinates={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
            />
            {markers.map((marker, index) => (
              <CustomMarker key={index} coordinates={marker} />
            ))}
          </MapView.Animated>
        )}
        {memoizedMapType}
      </View>

      {showSettings && (
        <BottomSheetFooter
          ref={bottomSheetRef}
          switchVal={switchVal}
          snapPoints={snapPoints}
          onValueChange={val => {
            setSwitchVal(val);
            if (val) {
              // start tracking doesnt really do anything, its just to refresh the useEffect, hence the reason i am not giving it a true val
              return setStartTracking(!startTracking);
            }
            stopLocationTracking(watchId);
          }}
          onPress={(data, details = null) => {
            const {lat, lng}: any = details?.geometry.location;
            setMarkers([...markers, {latitude: lat, longitude: lng}]);
            console.log(markers);
          }}
          onDonePress={() => {
            bottomSheetRef.current?.close();
          }}
          onClose={() => {
            setShowSettings(false);
          }}
        />
      )}
    </View>
  );
};

const $flex: ViewStyle = {
  flex: 1,
};
