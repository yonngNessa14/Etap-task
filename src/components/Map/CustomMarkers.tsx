import React, {FC, useEffect, useState} from 'react';
import {Icon} from '@components';
import {LatLng, Marker, MarkerPressEvent} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import Animated, {BounceIn} from 'react-native-reanimated';
import {palette} from '@theme';

interface Props {
  coordinates: LatLng;
  onPress?: (event: MarkerPressEvent) => void;
}
const CustomMarker: FC<Props> = ({coordinates, onPress}) => {
  const [adress, setAddress] = useState('');
  useEffect(() => {
    Geocoder.from(coordinates).then(add => {
      setAddress(add.results[0].formatted_address);
    });
  }, [coordinates]);

  return (
    <Animated.View entering={BounceIn.delay(200)}>
      <Marker
        coordinate={coordinates}
        testID="testing"
        onPress={onPress}
        description={adress}>
        <Icon icon="pin" size={35} color={palette.danger} />
      </Marker>
    </Animated.View>
  );
};

export default CustomMarker;
