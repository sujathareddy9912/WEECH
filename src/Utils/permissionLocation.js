import {Platform} from 'react-native';
import {
  request,
  PERMISSIONS,
  RESULTS,
  requestMultiple,
  checkMultiple,
} from 'react-native-permissions';

export async function requestLocationPermission() {
  const granted = await request(
    Platform.select({
      android: PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    }),
    {
      title: 'Weecha',
      message: 'Weecha would like access to your location ',
      buttonNeutral: 'No Thanks',
      buttonNegative: ' ',
      buttonPositive: 'OK',
    },
  );
  return granted === RESULTS.GRANTED;
}

export const RequestAllPermissions = async () => {
  const permissionsAndroid = [
    PERMISSIONS.ANDROID.CAMERA,
    PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  ];

  const permissionsIOS = [
    PERMISSIONS.IOS.CAMERA,
    PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    PERMISSIONS.IOS.MEDIA_LIBRARY,
    PERMISSIONS.IOS.PHOTO_LIBRARY,
  ];

  const statuses = await requestMultiple(
    Platform.select({
      android: [permissionsAndroid.ANDROID],
      ios: [permissionsIOS.IOS],
    }),
    {
      title: 'Weecha',
      message: 'Weecha would like access to your location ',
    },
  );

  const grantedPermissions = Platform.select({
    android: permissionsAndroid,
    ios: permissionsIOS,
  }).filter(permission => statuses[permission] === 'granted');

  if (
    grantedPermissions.length ===
    Platform.select({
      android: permissionsAndroid,
      ios: permissionsIOS,
    }).length
  ) {
    console.log('All permissions granted!');
  } else {
    console.log(
      'Denied permissions:',
      Platform.select({
        android: permissionsAndroid,
        ios: permissionsIOS,
      }).filter(permission => statuses[permission] !== 'granted'),
    );
  }
};
