import {useDispatch, useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  Text,
  PermissionsAndroid,
  ScrollView,
  Alert,
} from 'react-native';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  RtcSurfaceView,
  ChannelProfileType,
} from 'react-native-agora';

import styles from './styles';
import {COLORS} from '../../Utils/colors';
import {IMAGE_URL} from '../../Services/Api/Common';
import {rtmAgoraConfig} from '../../Utils/agoraConfig';
import {routeNameRef} from '../../Navigator/navigationHelper';
import {HelperService} from '../../Services/Utils/HelperService';

import {
  incomingCallQuery,
  removedbNodeIfExist,
  disableIncomingCallQuery,
} from '../../firebase/nodeQuery';

import {
  CALLING_STATUS,
  CALLING_TYPE,
  getAge,
  getCountryDetailWithKey,
  SCREEN_WIDTH,
  secondsToHourMinute,
} from '../../Utils/helper';

import {
  MyText,
  MyImage,
  MyLinearGradient,
  CallActionBottonSheet,
  CallActionBottonSheetAudio,
  IconWithCount,
} from '../../Component/commomComponent';

import {
  updateCallPeerIdAction,
  incomingCallPopupAction,
  leaveCallingRoomAction,
  createIncomeCallAction,
  showGiftComponentOnCallAction,
  clearCommentOnDuringCall,
  reconnectLiveStreamAction,
} from '../../Redux/Action';
import {SvgIcon} from '../../Component/icons';
import {FONT_SIZE} from '../../Utils/fontFamily';
import {Modal} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';

let timeout = null;
let checkEndCall = 0;

const VideoCall = ({navigation, route}) => {
  const agoraEngineRef = useRef();
  const dispatch = useDispatch();
  const state = useSelector(state => {
    return state;
  });
  const {userLoginList} = state.authReducer;
  const {showGiftComponentOnCall} = state.loaderReducer;

  const initialState = {
    joinSucceed: false,
    peerIds: [],
    switchCamera: false,
    secondUserJoined: false,
  };

  const [second, UpdateSecond] = useState(0);
  const [showTime, UpdateTimeStatus] = useState(false);
  const [{joinSucceed, switchCamera, peerIds}, setState] =
    useState(initialState);
  const [remoteUid, setRemoteUid] = useState(0);
  const [isJoined, setIsJoined] = useState(false);
  const [callChargeDetails, setCallChargeDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const detail = useMemo(() => {
    return route?.params;
  }, [route?.params]);

  const channelName = useMemo(() => {
    if (detail?.liveName) return detail?.liveName;
    else return '';
  }, [detail?.liveName]);

  const channelToken = useMemo(() => {
    if (detail?.liveToken) return detail?.liveToken;
    else return '';
  }, [detail?.liveToken]);

  const callData = useMemo(() => {
    if (userLoginList?.user?._id == detail?.callerId)
      return {
        name: detail?.receiverName,
        pic: detail?.receiverProfilePic,
        isVideoCall: detail?.type == CALLING_TYPE.VIDEO,
        points: detail?.callerPoints,
        dob: userLoginList?.user?.DateOfBirth,
        gender: userLoginList?.user?.gender,
      };
    else
      return {
        name: detail?.callerName,
        pic: detail?.callerProfilePic,
        isVideoCall: detail?.type == CALLING_TYPE.VIDEO,
        points: detail?.receiverPoints,
        dob: userLoginList?.user?.DateOfBirth,
        gender: userLoginList?.user?.gender,
      };
  }, [detail]);

  useEffect(() => {
    incomingCallQuery(detail?.receiverId).on('value', async snapShot => {
      if (
        snapShot.val() &&
        snapShot?.val()?.status == CALLING_STATUS.REJECTED
      ) {
        dispatch(incomingCallPopupAction(false));
        HelperService.showToast(`${detail.receiverName} reject the call.`);
        onCancelPress();
      } else if (
        snapShot.val() &&
        snapShot?.val()?.status == CALLING_STATUS.NOT_RESPONDED
      ) {
        dispatch(incomingCallPopupAction(false));
        HelperService.showToast(
          `${detail.receiverName} did not responded your call.`,
        );
        onCancelPress();
      } else if (
        snapShot.val() &&
        snapShot?.val()?.status == CALLING_STATUS.ACCEPTED
      ) {
        UpdateTimeStatus(true);
      }
    });
    return async () => {
      await _destroyCallRefrence();
    };
  }, []);

  useMemo(() => {
    if (modalVisible) {
      Alert.alert(
        '',
        'Please recharge, other wise you call will end within a minute',
        [
          {
            text: 'OK',
            onPress: () => {
              setShowPopup(true);
              setModalVisible(false);
            },
          },
        ],
      );
    }
  }, [modalVisible]);

  useEffect(() => {
    if (showTime) {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        UpdateSecond(second + 1);
      }, 1000);
      if (
        second != 0 &&
        second % 60 === 0 &&
        route?.params?.receiverId !== userLoginList?.user?._id
      ) {
        _incomeOnEveryMinute();
      }
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [showTime, second]);

  useEffect(() => {
    console.log(callChargeDetails);
    if (callChargeDetails) {
      let perSecondCharge = callChargeDetails.balance?.charge / 60;
      checkEndCall = checkEndCall + Math.abs(perSecondCharge);
      if (
        !callChargeDetails.data.call &&
        callChargeDetails.data.message.toLowerCase() ==
          'Insufficient balance !!'.toLowerCase()
      ) {
        onCancelPress();
      } else if (
        callChargeDetails.data.call &&
        callChargeDetails.data.balance <= callChargeDetails.data.charge &&
        callChargeDetails.data.message.toLowerCase() ==
          'success'.toLowerCase() &&
        !showPopup
      ) {
        setModalVisible(true);
      }
    }
  }, [second]);

  useEffect(() => {
    if (channelToken && channelName) {
      setupVideoSDKEngine();
    }
  }, [channelToken, channelName]);

  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };

  const setupVideoSDKEngine = async () => {
    try {
      if (Platform.OS === 'android') {
        await getPermission();
      }
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngineInit = agoraEngineRef.current;
      agoraEngineInit.registerEventHandler({
        onJoinChannelSuccess: () => {
          setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          setRemoteUid(Uid);
        },
        onUserOffline: (_connection, Uid) => {
          setRemoteUid(0);
          onCancelPress();
        },
        onConnectionLost: _connection => {
          console.log('Please check your internet connection.');
        },
      });

      if (detail?.type === CALLING_TYPE.VIDEO) {
        agoraEngineInit.initialize({
          appId: rtmAgoraConfig.appId,
          channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
        });
        agoraEngineInit.enableVideo();
      } else {
        agoraEngineInit.initialize({
          appId: rtmAgoraConfig.appId,
        });
      }
      join();
    } catch (e) {
      console.log(e);
    }
  };

  const join = async () => {
    if (callData.isVideoCall) {
      await agoraEngineRef.current?.leaveChannel();
    }

    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileCommunication,
      );
      if (detail?.type === CALLING_TYPE.VIDEO) {
        agoraEngineRef.current?.startPreview();
      }
      agoraEngineRef.current?.joinChannel(
        channelToken,
        channelName,
        rtmAgoraConfig.uid,
        {
          clientRoleType: ClientRoleType.ClientRoleBroadcaster,
        },
      );
    } catch (e) {
      console.log(e);
    }
  };

  const leave = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
    } catch (e) {
      console.log(e);
    }
  };

  const onCameraPress = async () => {
    await agoraEngineRef.current?.switchCamera();
    setState(prevState => ({...prevState, switchCamera: !switchCamera}));
  };

  const onVideoPress = async videoStatus => {
    await agoraEngineRef.current?.enableLocalVideo(videoStatus);
  };

  const onMicPress = async micStatus => {
    await agoraEngineRef.current?.muteLocalAudioStream(micStatus);
  };

  const onSpeakerPress = async speakerStatus => {
    if (speakerStatus) {
      await agoraEngineRef.current?.setEnableSpeakerphone(true);
    } else {
      await agoraEngineRef.current?.setEnableSpeakerphone(false);
    }
  };

  const onSpeakerVideoPress = async speakerStatus => {
    if (speakerStatus) {
      await agoraEngineRef.current?.disableAudio();
    } else {
      await agoraEngineRef.current?.enableAudio();
    }
  };

  const onCancelPress = () => {
    if (routeNameRef?.current == 'VideoCall') {
      navigation.goBack();
    }

    const referenceForLiveStatus = database().ref(
      `/liveStatus/${userLoginList?.user?._id}`,
    );

    referenceForLiveStatus.set({isLive: false, isBusy: false});
    dispatch(incomingCallPopupAction(false));
    dispatch(reconnectLiveStreamAction(true));
    incomingCallQuery(detail?.receiverId).off('value', snaphot => {});
    _leaveRoom();
    leave();
  };

  const _destroyCallRefrence = async () => {
    try {
      await agoraEngineRef.current?.leaveChannel();
      await removedbNodeIfExist(detail.receiverId);
      await disableIncomingCallQuery(detail.receiverId);
      dispatch(clearCommentOnDuringCall());
      dispatch(updateCallPeerIdAction([]));
      clearTimeout(timeout);
    } catch (error) {
      console.log('leave room catch err->', error.message);
    }
  };

  const _leaveRoom = () => {
    const param = {
      userId: userLoginList?.user?._id,
      roomId: detail.liveToken,
      roomName: detail.liveName,
    };
    dispatch(leaveCallingRoomAction(param));
  };
  useEffect(() => {
    if (detail?.receiverId !== userLoginList?.user?._id) {
      _incomeCreate();
    }
  }, []);

  const _incomeOnEveryMinute = () => {
    const param = {
      senderId: userLoginList?.user?._id,
      receiverId: detail?.receiverId,
      type: callData.isVideoCall ? 'VIDEOCALL' : 'CALL',
      chargeSettle: true,
    };

    dispatch(
      createIncomeCallAction(param, result => {
        checkEndCall = 0;
        if (result && result !== undefined) {
          setCallChargeDetails(result);
        }
      }),
    );
  };

  const _incomeCreate = () => {
    const param = {
      senderId: userLoginList?.user?._id,
      receiverId: detail?.receiverId,
      type: callData.isVideoCall ? 'VIDEOCALL' : 'CALL',
      chargeSettle: false,
    };

    dispatch(
      createIncomeCallAction(param, result => {
        checkEndCall = 0;
        if (
          result &&
          result !== undefined &&
          result.balance.balance < result.balance.charge
        ) {
          setModalVisible(true);
        }
      }),
    );
  };

  const _hideGiftComponent = () =>
    dispatch(showGiftComponentOnCallAction(false));

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        hidden={true}
      />
      <TouchableWithoutFeedback onPress={_hideGiftComponent}>
        <View style={styles.mainContainer}>
          <MyLinearGradient
            colors={[
              COLORS.WHITE,
              COLORS.GRADIENT_PINK,
              COLORS.GRADIENT_VIOLET,
            ]}
            style={styles.secondPartyVideoContainer}>
            {detail?.type == CALLING_TYPE.VIDEO ? (
              <View
                style={[
                  styles.nameContainer,
                  !showGiftComponentOnCall && {zIndex: 10},
                ]}>
                <View style={[styles.infoCon, {alignSelf: 'flex-start'}]}>
                  <IconWithCount
                    style={styles.genderCon}
                    source={<SvgIcon.Gender />}
                    count={getAge(callData.dob)}
                    tintColor={COLORS.LIGHT_VIOLET}
                    textStyle={{fontSize: FONT_SIZE.REGULAR}}
                  />
                  <MyImage
                    source={
                      getCountryDetailWithKey({
                        key: 'name',
                        value: userLoginList?.user?.country,
                      }).icon
                    }
                    style={styles.flag}
                  />
                </View>
                <MyText numberOfLines={1} style={styles.name}>
                  {callData.name}
                </MyText>
                <MyText style={styles.time}>
                  {showTime ? secondsToHourMinute(second) : 'Ringing'}
                </MyText>
              </View>
            ) : (
              <View style={styles.nameContainerAudio}>
                <MyText numberOfLines={1} style={styles.nameAudio}>
                  {callData.name}
                </MyText>
                <MyText style={styles.timeAudio}>
                  {showTime ? secondsToHourMinute(second) : 'Ringing'}
                </MyText>
                <View style={styles.infoCon}>
                  <IconWithCount
                    style={styles.genderCon}
                    source={<SvgIcon.Gender />}
                    count={getAge(callData.dob)}
                    tintColor={COLORS.LIGHT_VIOLET}
                    textStyle={{fontSize: FONT_SIZE.REGULAR}}
                  />
                  <MyImage
                    source={
                      getCountryDetailWithKey({
                        key: 'name',
                        value: userLoginList?.user?.country,
                      }).icon
                    }
                    style={styles.flag}
                  />
                </View>

                <MyImage
                  source={{
                    uri: `${IMAGE_URL}${callData.pic}`,
                  }}
                  style={styles.profileStyle}
                  resizeMode={'cover'}
                  borderRadius={SCREEN_WIDTH}
                />
              </View>
            )}
            {!callData.isVideoCall ? (
              <View style={[styles.imageBackgroundStyle]}></View>
            ) : (
              <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContainer}>
                {isJoined && (
                  <React.Fragment key={0}>
                    <RtcSurfaceView
                      canvas={{uid: 0}}
                      style={styles.uservideo}
                    />
                  </React.Fragment>
                )}
                {isJoined && remoteUid !== 0 && (
                  <React.Fragment key={remoteUid}>
                    <RtcSurfaceView
                      canvas={{uid: remoteUid}}
                      style={styles.remoteView}
                    />
                  </React.Fragment>
                )}
              </ScrollView>
            )}
          </MyLinearGradient>
          {detail?.type == CALLING_TYPE.VIDEO ? (
            <View
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'transparent',
              }}>
              <CallActionBottonSheet
                type={detail?.type}
                points={callData.points}
                onCameraPress={onCameraPress}
                onVideoPress={onVideoPress}
                onMicPress={onMicPress}
                onSpeakerPress={onSpeakerVideoPress}
                onCancelPress={onCancelPress}
                detail={detail}
              />
            </View>
          ) : (
            <View
              style={{
                bottom: 0,
                position: 'absolute',
                width: '100%',
                backgroundColor: 'transparent',
                zIndex: 1,
              }}>
              <CallActionBottonSheetAudio
                type={detail?.type}
                points={callData.points}
                onCameraPress={onCameraPress}
                onVideoPress={onVideoPress}
                onSpeakerPress={onSpeakerPress}
                onMicPress={onMicPress}
                onCancelPress={onCancelPress}
                detail={detail}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default VideoCall;
