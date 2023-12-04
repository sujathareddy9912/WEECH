import React, {useRef, useState} from 'react';
import {View, Image, Keyboard} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  Button,
  GradientBackground,
  KeyboardAwareScroll,
  MyText,
  Touchable,
} from '../../Component/commomComponent';
import CountryCodePicker from '../../Component/countryCodePicker';
import Icons, {SvgIcon} from '../../Component/icons';
import Input from '../../Component/Input';
import Timer from '../../Component/timer';
import {strings} from '../../localization/config';
import {
  forgotPasswordAction,
  forgotPasswordSendOtpAction,
} from '../../Redux/Action';
import {COLORS} from '../../Utils/colors';
import {defaultCountry} from '../../Utils/countryCode';
import {
  validateConfpassword,
  validateMobileNo,
  validatePassword,
  validateStatus,
} from '../../Utils/validation';
import styles from './styles';

const INPUT_TYPES = {
  PHONE: 'phone',
  OTP: 'otp',
  PASSWORD: 'password',
  CONF_PASSWORD: 'confPassword',
};

const ForgotPassword = props => {
  const dispatch = useDispatch();

  const initialState = {
    dialCode: defaultCountry.dialCode,
    phone: '',
    otp: '',
    password: '',
    confirmPassword: '',
    otpFromBackend: '',
    userId: '',
    isVerified: false,
  };

  const initialError = {
    phoneError: '',
    otpError: '',
    passwordError: '',
    confirmPasswordError: '',
  };

  const [
    {
      dialCode,
      phone,
      otp,
      password,
      confirmPassword,
      otpFromBackend,
      userId,
      isVerified,
    },
    setState,
  ] = useState(initialState);
  const [
    {phoneError, otpError, passwordError, confirmPasswordError},
    setError,
  ] = useState(initialError);
  const [isShowCountryModal, setCountryModal] = useState(false);
  const [fetchingOtp, setFetcingOtp] = useState(false);
  const [loader, setLoader] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [confPasswordShow, setConfirmShow] = useState(false);
  const [showResendButton, setShowResendButton] = useState(true);

  const otpRef = useRef('otpRef');
  const passwordRef = useRef('passwordRef');
  const confPasswordRef = useRef('confPasswordRef');

  const _openCountryModal = () => setCountryModal(true);

  const _closeCountryModal = () => setCountryModal(false);

  const _getCountry = data => {
    setState(prevState => ({...prevState, dialCode: data.dialCode}));
    _closeCountryModal();
  };

  const _onChangeText = type => text => {
    if (type == INPUT_TYPES.PHONE) {
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
    if (type == INPUT_TYPES.PHONE) otpRef.current?.focus();
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
      forgotPasswordSendOtpAction(param, data => {
        if (data) {
          shouldHideResendButton();
          setState(prevState => ({
            ...prevState,
            otpFromBackend: data.otp,
            userId: data.userId,
          }));
        }
        setFetcingOtp(false);
      }),
    );
  };

  const _validatePassowrd = () => {
    let isValid = true;
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

    if (isValid) _forgotPassword();
  };

  const _forgotPassword = () => {
    setLoader(true);
    const param = {
      password,
      confirm_password: confirmPassword,
      otp,
      userId,
    };
    dispatch(
      forgotPasswordAction(param, status => {
        if (status) props.navigation.goBack();
        setLoader(false);
      }),
    );
  };

  const navigateGoBack = () => {
    props.navigation.goBack();
  };

  const _onEyePressPassword = () => setPasswordShow(!passwordShow);

  const _onEyePressConfPassword = () => setConfirmShow(!confPasswordShow);

  const shouldShowResendButton = () => setShowResendButton(true);

  const shouldHideResendButton = () => setShowResendButton(false);

  const timeOver = () => {
    shouldShowResendButton();
  };

  return (
    <GradientBackground>
      <KeyboardAwareScroll>
        <View style={styles.mainContainer}>
          <Touchable onPress={navigateGoBack} style={styles.headerBackIcon}>
            <SvgIcon.BackArrowIcon />
          </Touchable>

          <Image source={Icons.WeechaLogoIcon} />

          <MyText style={styles.forgotLabel}>{`${strings(
            'forgotPassword.ForgotPaswordUpperCase',
          )}?`}</MyText>

          <Input
            onPhonePress={_openCountryModal}
            phone={dialCode}
            value={phone}
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
            style={styles.marginMidTop}
          />

          <View style={styles.rowContainer}>
            {showResendButton ? (
              <MyText onPress={_validatePhoneOrOtp} style={styles.smallText}>
                {strings('common.resendCode')}
              </MyText>
            ) : (
              <Timer over={timeOver} style={{color: COLORS.VIOLET}} />
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
            style={styles.marginMidTop}
          />

          <Button
            indicator={loader}
            disabled={!isVerified || loader}
            buttonStyle={styles.buttonStyle}
            isDark
            label={strings('forgotPassword.confirmUpperCase')}
            width={'75%'}
            onPress={_validatePassowrd}
          />
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

export default ForgotPassword;
