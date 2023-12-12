import React, {useEffect, useRef, useState} from 'react';
import {View, Image, Keyboard, NativeModules, Platform} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  Button,
  GradientBackground,
  KeyboardAwareScroll,
  MyText,
  TouchableIcon,
} from '../../Component/commomComponent';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import commonStyle from '../../Component/commonStyles';
import CountryCodePicker from '../../Component/countryCodePicker';
import {SvgIcon} from '../../Component/icons';
import Input from '../../Component/Input';
import {strings} from '../../localization/config';
import {reset} from '../../Navigator/navigationHelper';
import {
  sendOtpAction,
  socialLoginAction,
  userRegistration,
} from '../../Redux/Action';
import {
  isAppleLoginSupported,
  loginWithApple,
  loginWithFacebook,
  loginWithGoogle,
} from '../../Services/Api/socialLoginServices';
import {COLORS} from '../../Utils/colors';
import {defaultCountry} from '../../Utils/countryCode';
import {isIOS} from '../../Utils/helper';
import {
  validateConfpassword,
  validateMobileNo,
  validateName,
  validatePassword,
  validateStatus,
} from '../../Utils/validation';
import styles from './styles';
import Timer from '../../Component/timer';

const INPUT_TYPES = {
  NAME: 'name',
  PHONE: 'phone',
  OTP: 'otp',
  PASSWORD: 'password',
  CONF_PASSWORD: 'confPassword',
};

const {RNTwitterSignIn} = NativeModules;
const Constants = {
  //Dev Parse keys
  TWITTER_COMSUMER_KEY: 'eImqV8WOm8ojLHFFoa2AD0TeJ',
  TWITTER_CONSUMER_SECRET: 'lCMVKi6kvpUv8WKDEK7EURYGvgfKWGzRt7rK7hVeMdbm7tTcV1',
};

const Signup = props => {
  const dispatch = useDispatch();

  const initialState = {
    name: '',
    dialCode: defaultCountry.dialCode,
    phone: '',
    otp: '',
    password: '',
    confirmPassword: '',
    otpFromBackend: '',
    isVerified: false,
  };

  const initialError = {
    nameError: '',
    phoneError: '',
    otpError: '',
    passwordError: '',
    confirmPasswordError: '',
  };

  const [
    {
      name,
      dialCode,
      phone,
      otp,
      otpFromBackend,
      password,
      confirmPassword,
      isVerified,
    },
    setState,
  ] = useState(initialState);
  const [
    {nameError, phoneError, otpError, passwordError, confirmPasswordError},
    setError,
  ] = useState(initialError);

  const [isShowCountryModal, setCountryModal] = useState(false);
  const [fetchingOtp, setFetcingOtp] = useState(false);
  const [uploadingUserDetail, setUploadingUserDetail] = useState(false);
  const [fbFetching, setFbFetching] = useState(false);
  const [googleFetching, setGoogleFetching] = useState(false);
  const [appleFetching, setAppleFetching] = useState(false);
  const [twitterFetching, setTwitterFetching] = useState(false);
  const [passwordShow, setPasswordShow] = useState(true);
  const [confPasswordShow, setConfirmShow] = useState(true);
  const [showResetButton, setShowResendButton] = useState(true);

  const phoneRef = useRef('phoneRef');
  const otpRef = useRef('otpRef');
  const passwordRef = useRef('passwordRef');
  const confPasswordRef = useRef('confPasswordRef');

  useEffect(() => {
    _checkSocialLogin();
  }, []);

  const _checkSocialLogin = async () => {
    const isSigninIn = await GoogleSignin.isSignedIn();
    if (isSigninIn) {
      GoogleSignin.signOut();
    }
  };

  const _openCountryModal = () => setCountryModal(true);

  const _closeCountryModal = () => setCountryModal(false);

  const _getCountry = data => {
    setState(prevState => ({...prevState, dialCode: data.dialCode}));
    _closeCountryModal();
  };

  const _navToSignIn = () => props.navigation.navigate('Login');

  const _onChangeText = type => text => {
    if (type == INPUT_TYPES.NAME) {
      setState(prevState => ({...prevState, name: text}));
      setError(preverror => ({...preverror, nameError: ''}));
    } else if (type == INPUT_TYPES.PHONE) {
      setState(prevState => ({...prevState, phone: text}));
      setError(preverror => ({...preverror, phoneError: ''}));
    } else if (type == INPUT_TYPES.OTP) {
      if (otpFromBackend) {
        setState(prevState => ({
          ...prevState,
          otp: text,
          isVerified: otpFromBackend == text,
        }));
      } else {
        setState(prevState => ({...prevState, otp: text, isVerified: false}));
      }
      setError(preverror => ({...preverror, otpError: ''}));
    } else if (type == INPUT_TYPES.PASSWORD) {
      setState(prevState => ({...prevState, password: text}));
      setError(preverror => ({...preverror, passwordError: ''}));
    } else if (type == INPUT_TYPES.CONF_PASSWORD) {
      setState(prevState => ({...prevState, confirmPassword: text}));
      setError(preverror => ({...preverror, confirmPasswordError: ''}));
    }
  };

  const _focusNext = type => () => {
    if (type == INPUT_TYPES.NAME) phoneRef.current?.focus();
    else if (type == INPUT_TYPES.PHONE) otpRef.current?.focus();
    else if (type == INPUT_TYPES.OTP) Keyboard.dismiss();
    else if (type == INPUT_TYPES.PASSWORD) confPasswordRef.current?.focus();
    else if (type == INPUT_TYPES.CONF_PASSWORD) Keyboard.dismiss();
  };

  const _validatePhoneOrOtp = () => {
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
    } else setError(preverror => ({...preverror, phoneError: ''}));

    if (isValid) _sendOtp();
  };

  const _sendOtp = () => {
    setFetcingOtp(true);
    const param = {
      phone: `${dialCode}${phone}`,
    };
    dispatch(
      sendOtpAction(param, data => {
        if (data) {
          hideResendButton();
          setState(prevState => ({...prevState, otpFromBackend: data.otp}));
        }
        setFetcingOtp(false);
      }),
    );
  };

  const _validatePassowrd = () => {
    let isValid = true;
    // if (!validateName(name).status) {
    //   isValid = false;
    //   if (validateName(name).error == validateStatus.required)
    //     setError(preverror => ({
    //       ...preverror,
    //       nameError: strings('validation.requireName'),
    //     }));
    //   else if (validateName(name).error == validateStatus.validateRegEx)
    //     setError(preverror => ({
    //       ...preverror,
    //       nameError: strings('validation.validName'),
    //     }));
    // } else setError(preverror => ({...preverror, nameError: ''}));
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
    } else setError(preverror => ({...preverror, phoneError: ''}));
    if (!validatePassword(password).status) {
      isValid = false;
      if (validatePassword(password).error == validateStatus.required)
        setError(preverror => ({
          ...preverror,
          passwordError: strings('validation.requirePassword'),
        }));
      else if (validatePassword(password).error == validateStatus.validateRegEx)
        setError(preverror => ({
          ...preverror,
          passwordError: strings('validation.validPassword'),
        }));
    } else setError(preverror => ({...preverror, passwordError: ''}));
    if (!validateConfpassword(password, confirmPassword).status) {
      isValid = false;
      if (validatePassword(password).error == validateStatus.required)
        setError(preverror => ({
          ...preverror,
          confirmPasswordError: strings('validation.requireConfPassword'),
        }));
      else if (
        validateConfpassword(password, confirmPassword).error ==
        validateStatus.validateRegEx
      )
        setError(preverror => ({
          ...preverror,
          confirmPasswordError: strings('validation.validConfPassword'),
        }));
    } else setError(preverror => ({...preverror, confirmPasswordError: ''}));

    if (isValid) _signup();
  };

  const _signup = () => {
    setUploadingUserDetail(true);
    const param = {
      // name,
      phone: `${dialCode}${phone}`,
      password,
      confirm_password: confirmPassword,
    };
    dispatch(
      userRegistration(param, data => {
        if (data) {
          reset('ProfileSetup', {isEdit: false});
          _resetFields();
        }
        setUploadingUserDetail(false);
      }),
    );
  };

  const _resetFields = () => {
    setState(initialState);
    setError(initialError);
  };

  const facebookLogin = async () => {
    try {
      const resp = await loginWithFacebook();
      const param = {type: 'facebook', id: resp.socialId};
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

  const appleLogin = async () => {
    try {
      setAppleFetching(true);
      const resp = await loginWithApple();
      if (resp?.['user']) {
        const {user} = resp;
        const param = {type: 'apple', id: user};
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

  const _onEyePressPassword = () => setPasswordShow(!passwordShow);

  const _onEyePressConfPassword = () => setConfirmShow(!confPasswordShow);

  const showResendButton = () => setShowResendButton(true);

  const hideResendButton = () => setShowResendButton(false);

  const timeOver = () => {
    showResendButton();
  };

  return (
    <GradientBackground>
      <KeyboardAwareScroll>
        <View style={styles.mainContainer}>
          <Image source={Icons.WeechaLogoIcon} />

          <MyText style={styles.forgotLabel}>
            {strings('signup.signupUpperCase')}
          </MyText>
          {/* 
          <Input
            placeholder={strings('common.name')}
            style={styles.marginTop}
            onChangeText={_onChangeText(INPUT_TYPES.NAME)}
            onSubmitEditing={_focusNext(INPUT_TYPES.NAME)}
            value={name}
            blurOnSubmit={false}
            textInputStyle={styles.textCenter}
            returnKeyType="next"
            error={nameError}
          /> */}

          <Input
            ref={phoneRef}
            onPhonePress={_openCountryModal}
            phone={dialCode}
            value={phone}
            editable={!isVerified}
            onChangeText={_onChangeText(INPUT_TYPES.PHONE)}
            onSubmitEditing={_focusNext(INPUT_TYPES.PHONE)}
            returnKeyType="next"
            keyboardType="number-pad"
            error={phoneError}
            style={styles.marginTop}
          />

          <Input
            ref={otpRef}
            placeholder={strings('common.otp')}
            secureTextEntry
            rightButton
            indicator={fetchingOtp}
            value={otp}
            keyboardType={'number-pad'}
            onChangeText={_onChangeText(INPUT_TYPES.OTP)}
            onSubmitEditing={_focusNext(INPUT_TYPES.OTP)}
            onPress={_validatePhoneOrOtp}
            error={otpError}
            style={styles.marginTop}
          />

          <View style={styles.rowContainer}>
            {showResetButton ? (
              <MyText onPress={_validatePhoneOrOtp} style={styles.smallText}>
                {strings('common.resendCode')}
              </MyText>
            ) : (
              <Timer over={timeOver} />
            )}
          </View>

          <Input
            ref={passwordRef}
            placeholder={strings('common.password')}
            value={password}
            secureTextEntry={passwordShow}
            editable={isVerified}
            onChangeText={_onChangeText(INPUT_TYPES.PASSWORD)}
            onSubmitEditing={_focusNext(INPUT_TYPES.PASSWORD)}
            returnKeyType="next"
            error={passwordError}
            eyeIcon
            isOpen={!passwordShow}
            onEyePress={_onEyePressPassword}
            style={styles.marginTop}
            textInputStyle={styles.textCenter}
          />
          <Input
            ref={confPasswordRef}
            placeholder={strings('common.confirmPassword')}
            value={confirmPassword}
            secureTextEntry={confPasswordShow}
            editable={isVerified}
            onChangeText={_onChangeText(INPUT_TYPES.CONF_PASSWORD)}
            onSubmitEditing={_focusNext(INPUT_TYPES.CONF_PASSWORD)}
            error={confirmPasswordError}
            eyeIcon
            isOpen={!confPasswordShow}
            onEyePress={_onEyePressConfPassword}
            textInputStyle={styles.textCenter}
            style={styles.marginTop}
          />

          <Button
            onPress={_validatePassowrd}
            indicator={uploadingUserDetail}
            disabled={!isVerified || uploadingUserDetail}
            buttonStyle={styles.buttonStyle}
            isDark
            label={strings('signup.signupUpperCase')}
            width={'75%'}
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

          <MyText style={[commonStyle.mediumWhite, styles.alreadyMember]}>
            {`${strings('signup.alreadyMember')}? `}
            <MyText onPress={_navToSignIn} style={styles.underline}>{`${strings(
              'signup.signIn',
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

export default Signup;
// export default ;
