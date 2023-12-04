import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BlurView} from '@react-native-community/blur';
import database from '@react-native-firebase/database';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  ImageBackground,
  Modal,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {SvgIcon} from './icons';
import {COLORS} from '../Utils/colors';
import {IMAGE_URL} from '../Services/Api/Common';
import {incomingCallQuery} from '../firebase/nodeQuery';
import {dynamicSize, getFontSize} from '../Utils/responsive';
import {navigateToScreen} from '../Navigator/navigationHelper';
import {
  MyImage,
  MyText,
  IconWithCount,
  Touchable,
  TouchableIcon,
} from './commomComponent';
import {CALLING_STATUS, SCREEN_HEIGHT, SCREEN_WIDTH} from '../Utils/helper';
import {
  incomingCallDataAction,
  incomingCallPopupAction,
  reconnectLiveStreamAction,
} from '../Redux/Action';
import {FONT_FAMILY, FONT_SIZE} from '../Utils/fontFamily';
import CallPick from '../Assets/Icons/callPick.svg';
import CallDis from '../Assets/Icons/redCall.svg';
import LeaveMsg from '../Assets/Icons/bluMsg.svg';
import {getCountryDetailWithKey, getAge} from '../Utils/helper';
const CALL_NOT_RESPONDED_SECONDS = 10;
let interval = null;

const CallModal = props => {
  const {isVisible} = props;

  const dispatch = useDispatch();
  const state = useSelector(state => {
    return state;
  });

  const {incomingCallData, isLiveActive} = state.callReducer;

  const {userLoginList} = state.authReducer;

  const [seconds, setSeconds] = useState(CALL_NOT_RESPONDED_SECONDS);

  useEffect(() => {
    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (seconds == 0) {
      _callNotResponded();
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    if (isVisible) setSeconds(CALL_NOT_RESPONDED_SECONDS);
    else setSeconds(0);
  }, [isVisible]);

  const _callNotResponded = () => {
    dispatch(incomingCallPopupAction(false));
    dispatch(reconnectLiveStreamAction(true));
    const newData = {...incomingCallData, status: CALLING_STATUS.NOT_RESPONDED};
    incomingCallQuery(incomingCallData?.receiverId).set(newData);
    dispatch(incomingCallDataAction({}));
  };

  const _declineCall = () => {
    const referenceForLiveStatus = database().ref(
      `/liveStatus/${userLoginList?.user?._id}`,
    );

    referenceForLiveStatus.set({isLive: false, isBusy: false});
    dispatch(incomingCallPopupAction(false));
    dispatch(reconnectLiveStreamAction(true));
    const newData = {...incomingCallData, status: CALLING_STATUS.REJECTED};
    incomingCallQuery(incomingCallData?.receiverId).set(newData);
    dispatch(incomingCallDataAction({}));
    incomingCallQuery(incomingCallData?.receiverId).off('value', snaphot => {});
  };

  const _acceptCall = () => {
    const referenceForLiveStatus = database().ref(
      `/liveStatus/${userLoginList?.user?._id}`,
    );

    referenceForLiveStatus.set({isLive: false, isBusy: true});
    dispatch(incomingCallPopupAction(false));
    const newData = {...incomingCallData, status: CALLING_STATUS.ACCEPTED};
    incomingCallQuery(incomingCallData?.receiverId).set(newData);
    setTimeout(() => {
      navigateToScreen('VideoCall', {
        ...incomingCallData,
        status: CALLING_STATUS.ACCEPTED,
      });
    }, 500);
  };

  return (
    <Modal
      visible={isVisible}
      transparent={isLiveActive}
      style={styles.modalContainer}>
      {!isLiveActive ? (
        <View
          // source={{
          //   uri: `${IMAGE_URL}${incomingCallData?.callerProfilePic}`,
          // }}
          style={styles.imageBackgroundStyle}>
          {/* <BlurView
          blurType="light"
          blurAmount={20}
          style={[
            styles.blurViewStyle,
            {height: SCREEN_HEIGHT + useSafeAreaInsets().top},
          ]}
          reducedTransparencyFallbackColor="white"
        /> */}
          <View style={styles.container}>
            <View style={styles.nameContainer}>
              <MyText numberOfLines={2} style={styles.nameStyle}>
                {incomingCallData?.callerName}
              </MyText>
              <MyText style={styles.callTypeStyle}>{`WeeCha ${
                incomingCallData.type || ''
              }`}</MyText>
            </View>

            <MyImage
              source={{
                uri: `${IMAGE_URL}${incomingCallData?.callerProfilePic}`,
              }}
              // source={{
              //   uri: 'https://images.pexels.com/photos/87611/sun-fireball-solar-flare-sunlight-87611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              // }}
              style={styles.profileStyle}
              resizeMode={'cover'}
              borderRadius={SCREEN_WIDTH}
            />
            <View style={styles.footerContainer}>
              <Touchable style={styles.btnCon} onPress={_declineCall}>
                <MaterialCommunityIcons
                  name={'phone-hangup'}
                  size={wp(10)}
                  color={COLORS.WHITE}
                />
              </Touchable>
              <Touchable
                style={[styles.btnCon, {backgroundColor: COLORS.SUCCESS}]}
                onPress={_acceptCall}>
                <MaterialIcons
                  name={'call'}
                  size={wp(10)}
                  color={COLORS.WHITE}
                />
              </Touchable>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.mainContainer}>
          <View
            style={{
              backgroundColor: COLORS.WHITE,
              alignItems: 'center',
              padding: dynamicSize(30),
              borderRadius: dynamicSize(10),
            }}>
            <MyText style={styles.name}>
              {incomingCallData?.callerName} wants to call you
            </MyText>
            <View style={styles.imgContainer}>
              <Image
                source={{
                  uri: `${IMAGE_URL}${incomingCallData?.callerProfilePic}`,
                }}
                style={styles.img}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: wp(18),
                marginBottom: hp(2),
              }}>
              <MyImage
                source={
                  getCountryDetailWithKey({
                    key: 'name',
                    value: userLoginList?.user?.country,
                  }).icon
                }
                style={styles.flag}
              />
              <IconWithCount
                tintColor={COLORS.LIGHT_VIOLET}
                source={<SvgIcon.SmallGenderIcon />}
                // count={getAge(detail.DateOfBirth)}
                textStyle={{fontSize: FONT_SIZE.REGULAR}}
                style={{
                  paddingHorizontal: SCREEN_HEIGHT * 0.005,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={_declineCall}>
                <CallDis />
              </TouchableOpacity>
              <TouchableOpacity>
                <LeaveMsg style={{marginHorizontal: dynamicSize(35)}} />
              </TouchableOpacity>
              <TouchableOpacity onPress={_acceptCall}>
                <CallPick />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Modal>
  );
};

export default CallModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  imageBackgroundStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH,
    flex: 1,
    backgroundColor: '#4F5FF2',
  },
  blurViewStyle: {
    width: SCREEN_WIDTH,
    position: 'absolute',
  },
  container: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameContainer: {
    marginTop: hp(5),
    alignItems: 'center',
  },
  nameStyle: {
    width: wp(70),
    fontWeight: '600',
    textAlign: 'center',
    color: COLORS.WHITE,
    fontSize: getFontSize(25),
  },
  callTypeStyle: {
    fontWeight: '600',
    color: COLORS.WHITE,
    fontSize: getFontSize(18),
  },
  profileStyle: {
    width: SCREEN_WIDTH / 1.7,
    height: SCREEN_WIDTH / 1.7,
    borderRadius: SCREEN_WIDTH / 2 / 2,
  },
  footerContainer: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnCon: {
    width: wp(20),
    height: wp(20),
    alignItems: 'center',
    borderRadius: wp(100),
    justifyContent: 'center',
    backgroundColor: COLORS.RED_COLOR,
  },
  name: {
    color: COLORS.BLACK,
    fontSize: FONT_SIZE.LARGE,
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
  },
  imgContainer: {
    width: dynamicSize(65),
    height: dynamicSize(65),
    backgroundColor: COLORS.GOLD,
    borderRadius: dynamicSize(32),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(3),
  },
  img: {
    width: dynamicSize(60),
    height: dynamicSize(60),
    borderRadius: dynamicSize(30),
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.TRANSPARENT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flag: {
    width: dynamicSize(22),
    height: dynamicSize(16),
  },
});
