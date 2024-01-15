import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  NativeModules,
  ScrollView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect, useSelector} from 'react-redux';
import CommonActions from '../../Store/Common/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  HelperService,
  onFacebookLogin,
} from '../../Services/Utils/HelperService';
import {prop} from 'ramda';
import {StorageUtils} from '../../Helper/storage';
const {RNTwitterSignIn} = NativeModules;
const Constants = {
  //Dev Parse keys
  TWITTER_COMSUMER_KEY: 'fvuncxtgPw2LeqRG0yk2QsvQZ',
  TWITTER_CONSUMER_SECRET: 'bSYvdeWSYSplNkYamVFi8Hvl0100duGLHsOinlTSFA5L9BHEmD',
};
const LoginPhone = props => {
  // const [phone, setPhone] = useState('8178281311');
  // const [password, setconfirmPassword] = useState('123456@a');
  const [phone, setPhone] = useState('');
  const [password, setconfirmPassword] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const state = useSelector(state => {
    return state;
  });

  const {userLoginList} = state.authReducer;

  const login = () => {
    if (phone != '') {
      if (password != '') {
        props.userLogin({phone: '+91' + phone, password: password});
      } else {
        HelperService.showToast('Enter a password');
      }
    } else {
      HelperService.showToast('Enter a phone number');
    }
  };

  const _twitterSignIn = () => {
    RNTwitterSignIn.init(
      Constants.TWITTER_COMSUMER_KEY,
      Constants.TWITTER_CONSUMER_SECRET,
    );
    RNTwitterSignIn.logIn()
      .then(loginData => {
        props.navigation.navigate('MainTabNavigation', {screen: 'LiveSection'});
        const {authToken, authTokenSecret} = loginData;
        if (authToken && authTokenSecret) {
          setisLoggedIn(true);
        }
      })
      .catch(error => {
        HelperService.showToast(error);
        //      if(error!="[Error: Authorization failed, request was canceled.]"){

        // }else{

        // }
      });
  };
  useEffect(() => {
    //     // Initial configuration

    //     // Check if user is already signed in
    _isSignedIn();
  }, []);
  const _isSignedIn = async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      HelperService.showToast('User is already signed in');
      // Set User Info if user is already signed in
      _getCurrentUserInfo();
    } else {
    }
    setGettingLoginStatus(false);
  };
  const _getCurrentUserInfo = async () => {
    try {
      let info = await GoogleSignin.signInSilently();
      props.navigation.navigate('MainTabNavigation', {screen: 'LiveSection'});

      setUserInfo(info);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
      } else {
        alert("Unable to get user's info");
      }
    }
  };
  const facebookLogin = () => {
    onFacebookLogin()
      .then(async (data, token) => {
        props.navigation.navigate('MainTabNavigation', {screen: 'LiveSection'});
      })
      .catch(err => {});
  };
  const _signIn = async () => {
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      props.navigation.navigate('MainTabNavigation', {screen: 'LiveSection'});
      setUserInfo(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Play Services Not Available or Outdated');
      } else {
        // alert(error.message);
      }
    }
  };

  // useEffect(async () => {
  // if (userLoginList) {
  //   try {
  //     await AsyncStorage.setItem('token', userLoginList.tokens.access.token);
  //     await AsyncStorage.setItem('id', userLoginList._id);
  //     await AsyncStorage.setItem('gender', userLoginList.gender);
  //   } catch (e) {
  //     // saving error
  //   }
  //   // StorageUtils.setStringValue(
  //   //   'token',
  //   //  JSON.stringify(,
  //   // );
  //   props.navigation.navigate('MainTabNavigation', {screen: 'LiveSection'});
  // }
  //
  // }, [userLoginList]);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar translucent={false} backgroundColor="white" />
      <ScrollView>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}
          style={{margin: '3%', marginTop: hp('2%'), flexDirection: 'row'}}>
          <AntDesign name="arrowleft" size={20} color={'black'} />
          <View style={{marginLeft: wp('2%')}}>
            <Text style={{fontSize: wp('3.9%')}}>
              Registration / Mobile Number Login:
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: hp('4%'),
          }}>
          <View
            style={{
              width: wp('79%'),
              height: hp('8%'),
              backgroundColor: '#E8E6F6',
              borderRadius: 100,
              flexDirection: 'row',
            }}>
            <View
              style={{
                // width: wp('15%'),
                paddingLeft: 20,
                // backgroundColor: 'blue',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text style={{}}>+91 </Text>
              <Text>| </Text>
            </View>
            <TextInput
              value={phone}
              onChangeText={text => {
                setPhone(text);
              }}
              allowFontScaling={false}
              keyboardType={'phone-pad'}
              style={{flex: 1}}
              maxLength={10}
              placeholder={'Phone number'}
              placeholderTextColor={'#5B5B5B'}
            />
          </View>
          <View
            style={{
              width: wp('79%'),
              height: hp('8%'),
              backgroundColor: '#E8E6F6',
              paddingHorizontal: 20,
              borderRadius: 100,
              flexDirection: 'row',
              marginTop: hp('3%'),
            }}>
            <TextInput
              allowFontScaling={false}
              value={password}
              secureTextEntry={true}
              style={{flex: 1}}
              onChangeText={text => {
                setconfirmPassword(text);
              }}
              placeholder={'Password'}
              placeholderTextColor={'#5B5B5B'}
            />
          </View>
          <View style={{width: wp('80%'), marginTop: hp('3%')}}>
            <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
              <Text style={{color: '#4B2FF9', fontSize: wp('3.7')}}>
                Forgot Password ?
              </Text>
            </View>
          </View>
          <TouchableOpacity style={{marginTop: hp('4%')}} onPress={login}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              colors={['#6C56F1', '#F329F8']}
              style={{
                width: wp('79%'),
                height: hp('7%'),
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff', fontSize: wp('4%')}}>Log In</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={{marginTop: hp('4%')}}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Signup');
              }}
              style={{
                backgroundColor: '#E8E6F6',
                width: wp('79%'),
                height: hp('7%'),
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#F329F8',
                borderWidth: 1,
              }}>
              <Text style={{color: '#5B5B5B', fontSize: wp('4%')}}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{marginTop: hp('15%')}}>
            <View style={{marginBottom: hp('3%')}}>
              <Text style={{color: '#000000', fontFamily: 'AvenirLTStd-Book'}}>
                Other login methods
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={_twitterSignIn}
                style={{
                  backgroundColor: '#55ACEE',
                  width: wp('8%'),
                  marginRight: wp('5%'),
                  height: hp('4%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                }}>
                <Image
                  source={require('../../Assets/Images/Twitter.png')}
                  style={{
                    width: wp('5%'),
                    height: hp('5%'),
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={_signIn}
                style={{
                  width: wp('8%'),
                  height: hp('4%'),
                  marginRight: wp('3%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                }}>
                <Image
                  source={require('../../Assets/Images/google_icon.png')}
                  style={{
                    width: wp('8%'),
                    height: hp('8%'),
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={facebookLogin}
                style={{
                  width: wp('8%'),
                  height: hp('4%'),
                  marginLeft: wp('3%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                }}>
                <Image
                  source={require('../../Assets/Images/facebook_icon.png')}
                  style={{
                    width: wp('4%'),
                    height: hp('4%'),
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = state => ({
  userLoginLoading: state.common.userLoginLoading,
});

const mapDispatchToProps = dispatch => ({
  sentOtp: params => {
    dispatch(CommonActions.sentOtp(params));
  },
  userLogin: params => {
    dispatch(CommonActions.userLogin(params));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginPhone);
