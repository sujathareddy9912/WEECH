import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {BlurView} from '@react-native-community/blur';
import database from '@react-native-firebase/database';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  ImageBackground,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import RtcEngine, {
  ClientRole,
  RtcLocalView,
  RtcRemoteView,
  ChannelProfile,
  VideoRenderMode,
} from 'react-native-agora';

import styles from './styles';
import {COLORS} from '../../Utils/colors';
import India from '../../Assets/Icons/india.svg';
import {dynamicSize} from '../../Utils/responsive';
import {IMAGE_URL} from '../../Services/Api/Common';
import {rtmAgoraConfig} from '../../Utils/agoraConfig';
import {routeNameRef} from '../../Navigator/navigationHelper';
import {HelperService} from '../../Services/Utils/HelperService';

import {
  incomingCallQuery,
  checkNodePresentOrNot,
  removedbNodeIfExist,
  disableIncomingCallQuery,
} from '../../firebase/nodeQuery';

import {
  CALLING_STATUS,
  CALLING_TYPE,
  getAge,
  getCountryDetailWithKey,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  secondsToHourMinute,
} from '../../Utils/helper';

import {
  MyText,
  MyImage,
  MyIndicator,
  MyLinearGradient,
  CallActionBottonSheet,
  CallActionBottonSheetAudio,
  IconWithCount,
} from '../../Component/commomComponent';

import {
  joinHostPeerIdAction,
  updateCallPeerIdAction,
  incomingCallPopupAction,
  joinAudiencePeerIdAction,
  leaveCallingRoomAction,
  createIncomeCallAction,
  showGiftComponentOnCallAction,
  incomingCallDataAction,
  clearCommentOnDuringCall,
  reconnectLiveStreamAction,
} from '../../Redux/Action';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {SvgIcon} from '../../Component/icons';
import {FONT_SIZE} from '../../Utils/fontFamily';

let timeout = null;

const VideoCall = ({navigation, route}) => {
  const routeName = useRoute();
  const agoraEngine = useRef();
  const dispatch = useDispatch();
  const state = useSelector(state => {
    return state;
  });
  const {userLoginList} = state.authReducer;
  const {peerId} = state.callReducer;
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
    if (channelToken && channelName) {
      _initEngine();
      return async () => {
        // await _destroyCallRefrence();
      };
    }
  }, [channelToken, channelName]);

  const _initEngine = async () => {
    try {
      agoraEngine.current = await RtcEngine.create(rtmAgoraConfig.appId);
      if (callData.isVideoCall) {
        await agoraEngine.current?.enableVideo();
        await agoraEngine.current?.startPreview();
      } else {
        await agoraEngine.current?.enableAudio();
      }
      await agoraEngine.current?.setChannelProfile(
        ChannelProfile.LiveBroadcasting,
      );
      await agoraEngine.current?.setClientRole(ClientRole.Broadcaster);
      _addListeners();
      _startCall();
    } catch (error) {
      console.log('init error==>', error.message);
    }
  };

  const _addListeners = () => {
    agoraEngine.current?.addListener('Warning', warn => {
      console.log('Warning', warn);
    });

    agoraEngine.current?.addListener('Error', err => {
      console.log('Error', err);
    });

    agoraEngine.current?.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);
      // If new user
      if (peerId.indexOf(uid) === -1) {
        dispatch(joinAudiencePeerIdAction(uid));
      }
    });

    // for video call if user leaves the room
    agoraEngine.current?.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      // Remove peer ID from state array
      onCancelPress();
    });

    // If Local user joins RTC channel
    agoraEngine.current?.addListener(
      'JoinChannelSuccess',
      (channel, uid, elapsed) => {
        console.log('JoinChannelSuccess', channel, uid, elapsed);
        // Set state variable to true
        setState(prevState => ({
          ...prevState,
          joinSucceed: true,
        }));
        dispatch(joinHostPeerIdAction(uid));
      },
      error => {
        console.log('JoinChannel Failure', error);
      },
    );

    agoraEngine.current?.addListener(
      'RemoteVideoStateChanged',
      (uid, state) => {
        // if (uid === 1) setBroadcasterVideoState(state);
      },
    );
  };

  const _startCall = async () => {
    if (callData.isVideoCall) {
      await agoraEngine.current?.leaveChannel();
    }
    const uid = 0;

    await agoraEngine.current?.joinChannel(
      channelToken,
      channelName,
      null,
      uid,
    );
    if (!callData.isVideoCall) {
      await agoraEngine.current?.setEnableSpeakerphone(false);
    }
    await agoraEngine.current?.stopPreview();
  };

  const onCameraPress = async () => {
    await agoraEngine.current?.switchCamera();
    setState(prevState => ({...prevState, switchCamera: !switchCamera}));
  };

  const onVideoPress = async videoStatus => {
    await agoraEngine.current?.enableLocalVideo(videoStatus);
  };

  const onMicPress = async micStatus => {
    await agoraEngine.current?.muteLocalAudioStream(micStatus);
  };

  const onSpeakerPress = async speakerStatus => {
    if (speakerStatus) {
      await agoraEngine.current?.setEnableSpeakerphone(true);
    } else {
      await agoraEngine.current?.setEnableSpeakerphone(false);
    }
  };

  const onSpeakerVideoPress = async speakerStatus => {
    if (speakerStatus) {
      await agoraEngine.current?.disableAudio();
    } else {
      await agoraEngine.current?.enableAudio();
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
    // const newData = {...detail, status: CALLING_STATUS.REJECTED};
    // incomingCallQuery(detail?.receiverId).set(newData);
    dispatch(incomingCallDataAction({}));
    dispatch(reconnectLiveStreamAction(true));
    incomingCallQuery(detail?.receiverId).off('value', snaphot => {});

    // _destroyCallRefrence();
    _leaveRoom();
  };

  const _destroyCallRefrence = async () => {
    try {
      await agoraEngine.current?.leaveChannel();
      await agoraEngine?.current?.destroy();
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
    if (route?.params?.receiverId !== userLoginList?.user?._id) {
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
        if (!result.status) {
          onCancelPress();
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
        if (!result.status) {
          onCancelPress();
        }
      }),
    );
  };

  const renderLocal = () => {
    return (
      <RtcLocalView.SurfaceView
        style={[styles.videoContainer, {borderRadius: dynamicSize(10)}]}
        uid={peerId?.[0] || 0}
        channelId={channelName}
        removeClippedSubviews={false}
        renderMode={VideoRenderMode.Hidden}
        zOrderMediaOverlay={true}
      />
    );
  };

  const renderHost = () => {
    return (
      <RtcRemoteView.SurfaceView
        style={styles.videoContainer}
        uid={peerId?.[1] || 1}
        removeClippedSubviews={false}
        channelId={channelName}
        renderMode={VideoRenderMode.Hidden}
        zOrderMediaOverlay={true}
      />
    );
  };

  const _hideGiftComponent = () =>
    dispatch(showGiftComponentOnCallAction(false));

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
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
              <View>
                {peerId?.length > 1 ? renderHost() : null}
                {peerId?.length == 1 ? renderLocal() : null}
                {peerId?.length > 1 ? (
                  <MyLinearGradient
                    colors={[
                      COLORS.WHITE,
                      COLORS.GRADIENT_PINK,
                      COLORS.GRADIENT_VIOLET,
                    ]}
                    style={styles.firstPartyVideoContainer}>
                    <RtcLocalView.SurfaceView
                      style={[
                        styles.videoContainer,
                        {borderRadius: dynamicSize(10)},
                      ]}
                      uid={peerId?.[0] || 0}
                      channelId={channelName}
                      removeClippedSubviews={false}
                      renderMode={VideoRenderMode.Hidden}
                      zOrderMediaOverlay={true}
                    />
                  </MyLinearGradient>
                ) : null}
              </View>
            )}
          </MyLinearGradient>

          {detail?.type == CALLING_TYPE.VIDEO ? (
            <View
              style={{
                // top: heightPercentageToDP(0),
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
                zIndex: 100,
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
