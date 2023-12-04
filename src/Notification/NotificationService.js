import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import {UserServices} from '../Services/Api/userServices';
import {storeData} from '../Utils/helper';
import {LOCAL_KEY} from '../Utils/localStorage';

export async function printToken() {
  const fcmToken = await messaging().getToken();
}

export async function checkPermission() {
  let fcmToken;
  const enabled = await messaging().hasPermission();

  if (enabled == 1) {
    fcmToken = await messaging().getToken();
    storeData(LOCAL_KEY.FCM_TOKEN, fcmToken);
    const data = {
      type: Platform.OS,
      fcmToken: fcmToken,
    };

    UserServices.saveFcmTokenApi(data);
  } else {
    const authStatus = await messaging().requestPermission();
    const permissionEnabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (permissionEnabled) {
      fcmToken = await messaging().getToken();
      storeData(LOCAL_KEY.FCM_TOKEN, fcmToken);
      const data = {
        type: Platform.OS,
        fcmToken: fcmToken,
      };

      UserServices.saveFcmTokenApi(data);
    } else {
      // Alert.alert('', strings('permission.notificationDecline'), [
      //   {
      //     text: 'Cancel',
      //     onPress: () => console.log('Cancel Pressed'),
      //   },
      //   {text: 'Go To Setting', onPress: () => Linking.openSettings()},
      // ]);
    }
  }
}
