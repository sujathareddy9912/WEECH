import {Platform} from 'react-native';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export async function requestLocationPermission() {
  const granted = await request(
    Platform.select({
      android: PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    }),
    {
      title: 'Weecha',
      message: 'Weecha would like access to your location ',
    },
  );
  return granted === RESULTS.GRANTED;
}
