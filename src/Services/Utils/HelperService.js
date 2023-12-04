import {Platform} from 'react-native';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';

import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOCAL_KEY} from '../../Utils/localStorage';

const showToast = message =>
  Toast.show(message ? message : 'Somenting goes worng', Toast.LONG);

export const onFacebookLogin = () =>
  new Promise((resolve, reject) => {
    // For facebook web login
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('web_only');
    }
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      async function (result) {
        if (result.isCancelled) {
          reject('Login cancelled');
        } else {
          const data = await AccessToken.getCurrentAccessToken();
          const fbAccessToken = data.accessToken;

          resolve(fbAccessToken);
          // await AsyncStorage.setItem('facebookToken', fbAccessToken);
          // await AsyncStorage.setItem('facebookUserId', data.userID);
          // const PROFILE_REQUEST_PARAMS = {
          //   fields: {
          //     string:
          //       'id, email,picture.width(200).height(200),name,gender,location{location{city,state,region,country}},birthday,friends',
          //   },
          // };
          // const profileRequest = new GraphRequest(
          //   '/me',
          //   {fbAccessToken, parameters: PROFILE_REQUEST_PARAMS},
          //   (error, user) => {
          //     if (error) {
          //       reject('Something went wrong please try again');
          //     } else {
          //       // this.setState({userInfo: user});
          //       resolve(user);
          //     }
          //   },
          // );
          // new GraphRequestManager().addRequest(profileRequest).start();
        }
      },
      function (error) {
        reject('Login fail with error:asdasdasdas ' + error);
      },
    );
  });

export const serviceConst = {
  token: '',
};

export const HelperService = {
  showToast,
  onFacebookLogin,
};

export const returntoken = async () => {
  try {
    var token = await AsyncStorage.getItem(LOCAL_KEY.TOKEN);
  } catch (e) {
    // saving error
  }
};
