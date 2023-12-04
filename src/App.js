import {Provider} from 'react-redux';
import React, {useEffect} from 'react';
import {Settings} from 'react-native-fbsdk-next';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {store} from './Store';
import AppStack from './Navigator';
import {NativeBaseProvider} from 'native-base';
import {LOCAL_KEY} from './Utils/localStorage';
import {enableKeepAwake, getData} from './Utils/helper';
import {checkPermission} from './Notification/NotificationService';

const App = () => {
  useEffect(() => {
    console.error = () => {};
    enableKeepAwake();
    Settings.setAppID('900132947295198');

    Settings.initializeSDK();

    GoogleSignin.configure({
      webClientId:
        '708041282700-0epu75r4oocln0k806gdg94uupril4ru.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });

    checkFcmToken();
  }, []);

  const checkFcmToken = async () => {
    const fcmToken = await getData(LOCAL_KEY.FCM_TOKEN);

    if (!fcmToken) {
      checkPermission();
    }
  };

  return (
    <>
      <Provider store={store}>
        <SafeAreaProvider>
          <NativeBaseProvider>
            <AppStack />
          </NativeBaseProvider>
        </SafeAreaProvider>
      </Provider>
    </>
  );
};

export default App;
