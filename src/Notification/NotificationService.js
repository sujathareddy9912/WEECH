import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import {UserServices} from '../Services/Api/userServices';
import {storeData} from '../Utils/helper';
import {LOCAL_KEY} from '../Utils/localStorage';

export async function getFCMToken() {
  const fcmToken = await messaging().getToken();
  console.log('fcm==========', fcmToken);
  return fcmToken;
}

export async function checkPermission() {
  const enabled = await messaging().hasPermission();
  if (enabled) {
    const token = await getFCMToken();
    storeFCMToken(token);
    sendFCMTokenToServer(token);
  } else {
    const authStatus = await messaging().requestPermission();
    const permissionEnabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (permissionEnabled) {
      const token = await getFCMToken();
      storeFCMToken(token);
      sendFCMTokenToServer(token);
    }
  }
}

function storeFCMToken(token) {
  storeData(LOCAL_KEY.FCM_TOKEN, token);
}

function sendFCMTokenToServer(token) {
  const data = {
    type: Platform.OS,
    fcmToken: token,
  };
  UserServices.saveFcmTokenApi(data);
}
