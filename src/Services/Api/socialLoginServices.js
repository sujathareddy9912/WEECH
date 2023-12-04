import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {HelperService} from '../Utils/HelperService';

export const FACEBOOK_URL =
  'https://graph.facebook.com/v2.5/me?fields=email,name,picture.width(300),friends&access_token=';

const loginWithGoogle = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();
      resolve(userInfo);
    } catch (error) {
      reject(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED)
        HelperService.showToast('User cancelled login with google');
      else if (error.code === statusCodes.IN_PROGRESS)
        HelperService.showToast('Login with google already in progress');
      else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE)
        HelperService.showToast(
          'Google play services not available or outdated',
        );
      else
        HelperService.showToast('Some error occured while login with google');
    }
  });
};

const loginWithFacebook = () => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('native_with_fallback');
    }
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      result => {
        if (result.isCancelled) {
          HelperService.showToast('User cancelled login with facebook');
          reject('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const {accessToken} = data;
            const token = accessToken.toString();
            return fetch(FACEBOOK_URL + token, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then(response =>
                response.json().then(facebookData => {
                  if (response.ok === true) {
                    const reqData = {
                      socialId: facebookData.id ? facebookData.id : '',
                      socialType: 'Facebook',
                      profilePic: facebookData['picture']['data']['url'],
                      email: facebookData.email ? facebookData.email : '',
                      fullName: facebookData.name ? facebookData.name : '',
                    };
                    resolve(reqData);
                  }
                }),
              )
              .catch(err => reject(err));
          });
        }
      },
    );
  });
};

const loginWithApple = async () => {
  try {
    const appleResp = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    return appleResp;
  } catch (error) {
    if (error.code === appleAuth.Error.CANCELED)
      HelperService.showToast('User cancelled login with Apple.');
    else HelperService.showToast('Some error occured while login with Apple.');
  }
};

const isAppleLoginSupported = appleAuth.isSupported;

export {
  loginWithGoogle,
  loginWithFacebook,
  loginWithApple,
  isAppleLoginSupported,
};
