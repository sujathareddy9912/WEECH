import React, {useRef, useState} from 'react';
import {View, Image, Keyboard, TouchableOpacity, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  Button,
  GradientBackground,
  KeyboardAwareScroll,
  MyText,
  Touchable,
} from '../../../Component/commomComponent';
import Header from '../../../Component/header/Header';
import Icons, {SvgIcon} from '../../../Component/icons';
import Input from '../../../Component/Input';
import Timer from '../../../Component/timer';
import {strings} from '../../../localization/config';
import {linkMailAction, updateMailAction} from '../../../Redux/Action';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../../Utils/colors';
import {defaultCountry} from '../../../Utils/countryCode';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {validateStatus, validateMail} from '../../../Utils/validation';
import styles from './styles';

const INPUT_TYPES = {
  MAIL: 'mail',
  OTP: 'otp',
};

const LinkMail = props => {
  const dispatch = useDispatch();

  const initialState = {
    mail: '',
    otp: '',
    otpFromBackend: '',
    userId: '',
    isVerified: false,
  };

  const initialError = {
    mailError: '',
    otpError: '',
  };

  const [{mail, otp, otpFromBackend, isVerified}, setState] =
    useState(initialState);
  const [{mailError, otpError}, setError] = useState(initialError);
  const [fetchingOtp, setFetcingOtp] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showResendButton, setShowResendButton] = useState(true);
  const otpRef = useRef('otpRef');

  const _onChangeText = type => text => {
    if (type == INPUT_TYPES.MAIL) {
      setState(prevState => ({...prevState, mail: text}));
      setError(preverror => ({...preverror, mailError: ''}));
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
    }
  };

  const _focusNext = type => () => {
    if (type == INPUT_TYPES.MAIL) otpRef.current?.focus();
    else if (type == INPUT_TYPES.OTP) Keyboard.dismiss();
  };

  const _validateMailOrOtp = () => {
    let isValid = true;
    if (!validateMail(mail).status) {
      isValid = false;
      if (validateMail(mail).error == validateStatus.required)
        setError(preverror => ({
          ...preverror,
          mailError: 'email required',
        }));
      else if (validateMail(mail).error == validateStatus.validateRegEx)
        setError(preverror => ({
          ...preverror,
          mailError: 'email invalid',
        }));
    } else setError(preverror => ({...preverror, mailError: ''}));

    if (isValid) _sendOtp();
  };

  const _sendOtp = () => {
    setFetcingOtp(true);
    const param = {
      email: mail,
    };
    dispatch(
      linkMailAction(param, res => {
        setFetcingOtp(false);
        setShowResendButton(false);
        setState(prevState => ({...prevState, otpFromBackend: res?.otp}));
      }),
    );
  };
  const _updateMail = () => {
    setLoader(true);
    const param = {
      email: mail,
      otp: otp,
    };
    dispatch(
      updateMailAction(param, res => {
        setLoader(false);
        dispatch(
          profleSetupAction({}, () => {
            props.navigation?.goBack();
          }),
        );
      }),
    );
  };

  const shouldShowResendButton = () => setShowResendButton(true);

  const shouldHideResendButton = () => setShowResendButton(false);

  const timeOver = () => {
    shouldShowResendButton();
  };
  const leftHeaderComponent = (
    <TouchableOpacity
      style={styles.backContainer}
      onPress={() => props.navigation?.goBack()}>
      <FontAwesome5Icon
        name={'chevron-left'}
        color={COLORS.BLACK}
        size={wp(4)}
        style={{
          marginRight: wp(1),
        }}
      />
      <Text>Back</Text>
    </TouchableOpacity>
  );

  return (
    <GradientBackground>
      <KeyboardAwareScroll contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.mainContainer}>
          <View
            style={[
              styles.mainContainer,
              {paddingHorizontal: 0, justifyContent: 'flex-start'},
            ]}>
            <Header
              title={''}
              leftComponent={leftHeaderComponent}
              containerStyle={styles.header}
            />

            <Image source={Icons.WeechaLogoIcon} />
            <Input
              value={mail}
              placeholder={'Enter Mail ID'}
              onChangeText={_onChangeText(INPUT_TYPES.MAIL)}
              onSubmitEditing={_focusNext(INPUT_TYPES.OTP)}
              returnKeyType="next"
              keyboardType="email-address"
              error={mailError}
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
              onPress={_validateMailOrOtp}
              error={otpError}
              style={styles.marginMidTop}
            />

            <View style={styles.rowContainer}>
              {showResendButton ? (
                <MyText onPress={_validateMailOrOtp} style={styles.smallText}>
                  {strings('common.resendCode')}
                </MyText>
              ) : (
                <Timer over={timeOver} style={{color: COLORS.VIOLET}} />
              )}
            </View>
          </View>

          <Button
            indicator={loader}
            disabled={!isVerified}
            buttonStyle={styles.buttonStyle}
            isDark
            label={'Confirm'}
            width={'90%'}
            onPress={_updateMail}
          />
        </View>
      </KeyboardAwareScroll>
    </GradientBackground>
  );
};

export default LinkMail;
