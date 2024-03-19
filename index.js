/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

AppRegistry.registerComponent(appName, () => App);

PushNotification.configure({
  onRegister: function (token) {
  },

  onNotification: function (notification) {
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  channelId: '1',

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,

  requestPermissions: Platform.OS === 'ios',
});
