import {Provider} from 'react-redux';
import React, {useEffect, useRef} from 'react';
import {Settings} from 'react-native-fbsdk-next';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {StyleSheet, StatusBar, Platform} from 'react-native';
import {store} from './Store';
import AppStack from './Navigator';
import {NativeBaseProvider} from 'native-base';
import {LOCAL_KEY} from './Utils/localStorage';
import {enableKeepAwake, getData} from './Utils/helper';
import {checkPermission} from './Notification/NotificationService';
import FlashMessage from 'react-native-flash-message';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {PermissionsAndroid} from 'react-native';

const App = () => {
  const refFlashMessage = useRef(null);

  useEffect(() => {
    enableKeepAwake();
    Settings.setAppID('900132947295198');

    Settings.initializeSDK();

    GoogleSignin.configure({
      webClientId:
        '919639847531-u1jkbqg98hqncq8p8rr2fv76tmd51dap.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: false,
    });
    checkFcmToken();
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }, []);

  const checkFcmToken = async () => {
    const fcmToken = await getData(LOCAL_KEY.FCM_TOKEN);

    if (!fcmToken) {
      checkPermission();
    }
  };

  // Register background handler
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const result = JSON.stringify(remoteMessage);
      if (Platform.OS === 'android') {
        PushNotification.createChannel(
          {
            channelId: '1',
            channelName: 'name',
          },
          created => console.log(`createChannel returned '${created}'`),
        );

        PushNotification.localNotification({
          title: result.notification.title,
          message: result.notification.body,
          channelId: '1',
          channelName: 'name',
        });
      } else if (Platform.OS === 'ios') {
        PushNotificationIOS.addNotificationRequest({
          id: '1',
          title: 'NEW Message - IOS',
          body: 'in',
        });
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <Provider store={store}>
        <SafeAreaProvider>
          <NativeBaseProvider>
            <AppStack />
          </NativeBaseProvider>
        </SafeAreaProvider>
        <FlashMessage
          textStyle={[styles.fontNormal, styles.flexWrap]}
          titleStyle={styles.fontNormal}
          ref={refFlashMessage}
          hideStatusBar={false}
          statusBarHeight={StatusBar.currentHeight}
          floating={Platform.OS === 'ios'}
        />
      </Provider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  flexWrap: {flexWrap: 'wrap'},
  fontNormal: {
    fontWeight: '500',
  },
});
