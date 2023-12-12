import {useState} from 'react';
import {Platform} from 'react-native';
import {check, PERMISSIONS, request} from 'react-native-permissions';

export const useLocation = () => {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  const getLocationPermission = async () => {
    request(
      Platform.select({
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      }) as any,
    )
      .then((result: any) => {
        if (result === 'granted') {
          setIsPermissionGranted(true);
        } else {
          setIsPermissionGranted(false);
        }
      })
      .catch((error: any) => {
        console.log('error.message :>> ', error.message);
      });
  };

  const checkLocationPermission = () => {
    check(
      Platform.select({
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      }) as any,
    )
      .then((result: any) => {
        if (result === 'granted') {
          setIsPermissionGranted(true);
        } else {
          getLocationPermission();
          setIsPermissionGranted(false);
        }
      })
      .catch((error: any) => {
        console.log('error.message :>> ', error.message);
      });
  };

  return {
    isPermissionGranted,
    setIsPermissionGranted,
    checkLocationPermission,
    getLocationPermission,
  };
};
