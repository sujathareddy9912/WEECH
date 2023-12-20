import React, { useEffect, useRef, useState } from 'react';
import { Image, NativeModules, Platform, View, Text } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import styles from './Styles';
import CommonActions from '../../Store/Common/Actions';
import { HelperService } from '../../Services/Utils/HelperService';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  Button,
  GradientBackground,
  KeyboardAwareScroll,
  MyText,
  TouchableIcon,
} from '../../Component/commomComponent';
import { strings } from '../../localization/config';
import Icon from '../../Component/Icons/Icon';
import Icons, { SvgIcon } from '../../Component/icons';
import CountryCodePicker from '../../Component/countryCodePicker';
import Input from '../../Component/Input';
import commonStyle from '../../Component/commonStyles';
import {
  requirePassword,
  validateMobileNo,
  validateStatus,
} from '../../Utils/validation';
import { defaultCountry } from '../../Utils/countryCode';
import { loginAction, socialLoginAction } from '../../Redux/Action';
import { reset } from '../../Navigator/navigationHelper';
import {
  isAppleLoginSupported,
  loginWithApple,
  loginWithFacebook,
  loginWithGoogle,
} from '../../Services/Api/socialLoginServices';
import { COLORS } from '../../Utils/colors';
import { isIOS } from '../../Utils/helper';
import TextInput from '../../Component/TextInput/TextInput';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { RNTwitterSignIn } = NativeModules;
const Constants = {
  //Dev Parse keys
  TWITTER_COMSUMER_KEY: 'eImqV8WOm8ojLHFFoa2AD0TeJ',
  TWITTER_CONSUMER_SECRET: 'lCMVKi6kvpUv8WKDEK7EURYGvgfKWGzRt7rK7hVeMdbm7tTcV1',
};

const INPUT_TYPES = { PHONE: 'phone', PASSWORD: 'password' };

const Login = props => {
  const dispatch = useDispatch();
  const state = useSelector(state => {
    return state;
  });

  const { userLoginList } = state.authReducer;

  const initialState = {
    phone: '',
    password: '',
    dialCode: defaultCountry.dialCode,
  };

  const initialError = {
    phoneError: '',
    passwordError: '',
  };

  const [isShowCountryModal, setCountryModal] = useState(false);
  const [{ phone, password, dialCode }, setState] = useState(initialState);
  const [{ phoneError, passwordError }, setError] = useState(initialError);
  const [fetching, setFetching] = useState(false);
  const [fbFetching, setFbFetching] = useState(false);
  const [googleFetching, setGoogleFetching] = useState(false);
  const [appleFetching, setAppleFetching] = useState(false);
  const [twitterFetching, setTwitterFetching] = useState(false);
  const [passwordShow, setPasswordShow] = useState(true);

  const passwordRef = useRef('passwordRef');

  useEffect(() => {
    if (userLoginList?.user?.userId) {
      socialLogin();
    }
    _checkSocialLogin();
  }, [userLoginList]);

  const socialLogin = async () => {
    try {
      if (userLoginList.user.first_time) {
        reset('ProfileSetup', { isEdit: false });
      } else {
        reset('MainTabNavigation');
      }
    } catch (e) { }
  };

  const _checkSocialLogin = async () => {
    const isSigninIn = await GoogleSignin.isSignedIn();
    if (isSigninIn) {
      GoogleSignin.signOut();
    }
  };

  const _getCountry = data => {
    setState(prevState => ({ ...prevState, dialCode: data.dialCode }));
    _closeCountryModal();
  };

  const _openCountryModal = () => setCountryModal(true);

  const _closeCountryModal = () => setCountryModal(false);

  const _navToForgorPassword = () =>
    props.navigation.navigate('ForgotPassword');

  const _navToSignup = () => props.navigation.navigate('Signup');

  const _onChangeText = type => text => {
    if (type == INPUT_TYPES.PHONE) {
      setState(prevState => ({ ...prevState, phone: text }));
      setError(preverror => ({ ...preverror, phoneError: '' }));
    } else if (type == INPUT_TYPES.PASSWORD) {
      setState(prevState => ({ ...prevState, password: text }));
      setError(preverror => ({ ...preverror, passwordError: '' }));
    }
  };

  const _focusNext = () => passwordRef.current.focus();

  const _validate = () => {
    let isValid = true;
    if (!validateMobileNo(phone).status) {
      isValid = false;
      if (validateMobileNo(phone).error == validateStatus.required)
        setError(preverror => ({
          ...preverror,
          phoneError: strings('validation.requirePhone'),
        }));
      else if (validateMobileNo(phone).error == validateStatus.validateRegEx)
        setError(preverror => ({
          ...preverror,
          phoneError: strings('validation.validPhone'),
        }));
    } else {
      setError(preverror => ({ ...preverror, phoneError: '' }));
    }
    if (!requirePassword(password).status) {
      isValid = false;
      setError(preverror => ({
        ...preverror,
        passwordError: strings('validation.requirePassword'),
      }));
    } else setError(preverror => ({ ...preverror, passwordError: '' }));

    if (isValid) _login();
  };

  const _login = () => {
    setFetching(true);
    const param = {
      phone: `${dialCode}${phone}`,
      password,
    };
    dispatch(
      loginAction(param, () => {
        setFetching(false);
      }),
    );
  };

  const facebookLogin = async () => {
    try {
      const resp = await loginWithFacebook();
      const param = { type: 'facebook', id: resp.socialId };
      dispatch(
        socialLoginAction(param, () => {
          setFbFetching(false);
        }),
      );
    } catch (error) {
      setFbFetching(false);
    }
  };

  const googleLogin = async () => {
    try {
      setGoogleFetching(true);
      const resp = await loginWithGoogle();
      if (resp?.user?.id) {
        const param = {
          type: 'google',
          id: resp.user.id,
          email: resp.user.email,
        };
        dispatch(
          socialLoginAction(param, () => {
            setGoogleFetching(false);
          }),
        );
      } else {
        setGoogleFetching(false);
      }
    } catch (error) {
      setGoogleFetching(false);
    }
  };

  const twitterSignIn = () => {
    setTwitterFetching(true);
    RNTwitterSignIn.init(
      Constants.TWITTER_COMSUMER_KEY,
      Constants.TWITTER_CONSUMER_SECRET,
    );
    RNTwitterSignIn.logIn()
      .then(loginData => {
        const param = {
          type: 'twitter',
          id: loginData?.userID,
          email: loginData?.email,
        };
        dispatch(
          socialLoginAction(param, () => {
            setTwitterFetching(false);
          }),
        );
      })
      .catch(error => {
        // if (Platform.OS == 'android') {
        //   const data = JSON.stringify(error.userInfo);
        //   const parseData = JSON.parse(data);
        //   if (parseData?.userID) {
        //     const param = {type: 'twitter', id: parseData?.userID};
        //     dispatch(
        //       socialLoginAction(param, () => {
        //         setTwitterFetching(false);
        //       }),
        //     );
        //   } else {
        //     setTwitterFetching(false);
        //   }
        // } else {
        setTwitterFetching(false);
        // }
      });
  };

  const appleLogin = async () => {
    try {
      setAppleFetching(true);
      const resp = await loginWithApple();
      if (resp?.['user']) {
        const { user } = resp;
        const param = { type: 'apple', id: user };
        dispatch(
          socialLoginAction(param, () => {
            setAppleFetching(false);
          }),
        );
      } else setAppleFetching(false);
    } catch (error) {
      setAppleFetching(false);
    }
  };

  const _onEyePressPassword = () => setPasswordShow(!passwordShow);

  return (
    <GradientBackground>
      <KeyboardAwareScroll>
        <View style={styles.mainContainer}>
          <Image source={Icons.WeechaLogoIcon} />

          {/* <TextInput 
             containerStyle = {{width:'90%',borderRadius:32}}
             isShowLeftIcon={true} 
             leftIcon={
              <TouchableOpacity style={{flexDirection:'row',width:'100%',alignItems:'center',borderRightWidth:2,paddingHorizontal:8}} onPress={_openCountryModal}>
                 <Icon origin='Ionicons' name ='call' size={18} color={COLORS.BLACK}/>
                 <Text style={{marginHorizontal:8,fontSize:16}}>{dialCode}</Text>
                 <Icon origin='AntDesign' name ='caretdown' size={12} color={COLORS.LIGHT_GREY}/>
              </TouchableOpacity>
             }
           /> */}

          <Input
            onPhonePress={_openCountryModal}
            phone={dialCode}
            style={styles.marginTop}
            value={phone}
            svgSource={SvgIcon.callIcon()}
            onChangeText={_onChangeText(INPUT_TYPES.PHONE)}
            onSubmitEditing={_focusNext}
            returnKeyType="next"
            keyboardType="number-pad"
            error={phoneError}
            blurOnSubmit={false}
          />

          <Input
            ref={passwordRef}
            secureTextEntry={passwordShow}
            placeholder={'**********'}
            svgSource={SvgIcon.passwordIcon()}
            value={password}
            style={styles.marginMidTop}
            onChangeText={_onChangeText(INPUT_TYPES.PASSWORD)}
            eyeIcon
            isOpen={!passwordShow}
            onEyePress={_onEyePressPassword}
            error={passwordError}
          />

          <MyText
            onPress={_navToForgorPassword}
            style={styles.forgotText}>{`${strings(
              'login.ForgotPassword',
            )}?`}</MyText>

          <Button
            indicator={fetching}
            buttonStyle={styles.loginButton}
            isDark
            label={strings('login.Login')}
            width={'75%'}
            onPress={_validate}
          />

          <MyText style={[commonStyle.mediumWhite, styles.or]}>
            {strings('common.or')}
          </MyText>

          <View
            style={[
              commonStyle.rowWithAlignJustifyCenter,
              styles.socialIconContainer,
            ]}>
            {/* <TouchableIcon
              indicator={fbFetching}
              customIcon={SvgIcon.fbIcon()}
              onPress={facebookLogin}
              color={COLORS.VIOLET}
            /> */}
            <TouchableIcon
              indicator={twitterFetching}
              color={COLORS.VIOLET}
              onPress={twitterSignIn}
              customIcon={SvgIcon.twitterIcon()}
            />
            <TouchableIcon
              indicator={googleFetching}
              customIcon={SvgIcon.googleIcon()}
              onPress={googleLogin}
              color={COLORS.VIOLET}
            />
            {isIOS && isAppleLoginSupported ? (
              <TouchableIcon
                indicator={appleFetching}
                customIcon={SvgIcon.appleIcon()}
                onPress={appleLogin}
                color={COLORS.VIOLET}
              />
            ) : null}
          </View>

          <MyText style={[commonStyle.mediumWhite, styles.newMewmber]}>
            {`${strings('login.newMember')}? `}
            <MyText onPress={_navToSignup} style={styles.underline}>{`${strings(
              'login.signUp',
            )}`}</MyText>
          </MyText>
          <MyText style={styles.bold}>
            {`${strings('login.aggrementDescription')} `}
            <MyText
              onPress={() => props.navigation.navigate('UserAgreement')}
              style={styles.underline}>{`${strings(
                'login.termsCondition',
              )} `}</MyText>
            <MyText>{`${strings('login.and')} `}</MyText>
            <MyText
              onPress={() => props.navigation.navigate('PrivacyPolicy')}
              style={styles.underline}>
              {strings('login.privacyPolicy')}
            </MyText>
          </MyText>
          <MyText style={styles.bold}>
            {`${strings('login.poweredBy')} `}
            <MyText style={styles.regular}>{strings('login.weecha')}</MyText>
          </MyText>
        </View>
        <CountryCodePicker
          showDialCode
          countryCode={dialCode}
          isVisible={isShowCountryModal}
          getCountry={_getCountry}
          closeCountryModal={_closeCountryModal}
        />
      </KeyboardAwareScroll>
    </GradientBackground>
  );
};
const mapStateToProps = state => ({
  social_loginLoading: state.common.social_loginLoading,
});

const mapDispatchToProps = dispatch => ({
  social_login: params => {
    dispatch(CommonActions.social_login(params));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
