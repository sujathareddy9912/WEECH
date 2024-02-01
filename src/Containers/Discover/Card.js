import {useDispatch, useSelector} from 'react-redux';
import {View, TouchableOpacity, Text, Alert} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {firebase} from '@react-native-firebase/database';

import {
  RtcRemoteView,
  VideoRenderMode,
  VideoRemoteState,
} from 'react-native-agora';
import LiveIcon from '../../Assets/Icons/discoverLive.svg';
import styles from './styles';
import {COLORS} from '../../Utils/colors';
import {agoraEngine} from './DiscoverScreen';
import {SvgIcon} from '../../Component/icons';
import India from '../../Assets/Icons/india.svg';
import {strings} from '../../localization/config';
import {IMAGE_URL} from '../../Services/Api/Common';
import Diamonds from '../../Assets/Icons/diamonds.svg';
import VideoCall from '../../Assets/Icons/VideoCallNew.svg';
import AudioCall from '../../Assets/Icons/AudioCallNew.svg';
import TextMessage from '../../Assets/Icons/MessageNew.svg';
import {navigateToScreen} from '../../Navigator/navigationHelper';
import {HelperService} from '../../Services/Utils/HelperService';
import {
  createChatRoomAction,
  followUserAction,
  getCAllingDetailAction,
  getHostExtraDetailAction,
  hostDetailAction,
  viewedProfileAction,
} from '../../Redux/Action';

import {
  incomingCallQuery,
  checkNodePresentOrNot,
} from '../../firebase/nodeQuery';

import {
  MyText,
  MyImage,
  Touchable,
  MyIndicator,
  TouchableIcon,
} from '../../Component/commomComponent';

import requestCameraAndAudioPermission, {
  CALLING_STATUS,
  CALLING_TYPE,
  getAge,
  getCountryDetailWithKey,
  requestAudioPermission,
  SCREEN_HEIGHT,
} from '../../Utils/helper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {STREAM_TYPE} from '../../Utils/agoraConfig';
import {getUserHaveBalance} from '../../Services/Api/LiveStreaming';

const Card = props => {
  const dispatch = useDispatch();
  const detail = props?.data || {};
  const state = useSelector(state => state);
  const [alreadyFollowing, setAlreadyFollowing] = useState(false);
  const {userLoginList} = state.authReducer;
  const {agoraInitializedStatus} = state.streamingReducer;
  const [isLive, setIsLive] = useState(true);
  const [otherUserDetail, setOtherUserDetail] = useState();
  const initialState = {
    joinSucceed: false,
    peerIds: [],
  };

  const {kickedOutRooms, blockedLiveRooms} = useSelector(
    state => state.streamingReducer,
  );

  const [broadcasterVideoState, setBroadcasterVideoState] = useState(
    VideoRemoteState.Decoding,
  );
  const [{joinSucceed, peerIds}, setState] = useState(initialState);
  const [startCallIndicator, setStartCallIndicator] = useState(false);

  const channelName = useMemo(() => {
    if (props?.data?.followByMe) setAlreadyFollowing(true);
    if (props?.data?.liveName) return props?.data?.liveName;
    else return '';
  }, [props?.data?.liveName]);

  const channelToken = useMemo(() => {
    if (props?.data?.liveToken) return props?.data?.liveToken;
    else return '';
  }, [props?.data?.liveToken]);

  useEffect(() => {
    if (detail?._id) {
      setOtherUserDetail(detail);
      const params = {
        toUserId: userLoginList?.user?._id,
        fromUserId: detail?._id,
      };
      dispatch(viewedProfileAction(params));
    }
  }, [detail]);

  useEffect(() => {
    if (agoraInitializedStatus) {
      _addListeners();
    }
  }, [agoraInitializedStatus]);

  useEffect(() => {
    if (channelToken && channelName) _startCall();
  }, [channelToken, channelName]);

  useEffect(() => {
    const liveStatus = firebase
      .database()
      .ref(`/liveRoom/${channelName}/status`);
  }, []);

  const _muteRemoteUsers = async () => {
    await agoraEngine.current?.muteAllRemoteAudioStreams(true);
  };

  const _addListeners = () => {
    agoraEngine.current?.addListener('Warning', warn => {
      console.log('Warning', warn);
    });

    agoraEngine.current?.addListener('Error', err => {
      console.log('Error', err);
    });

    agoraEngine.current?.addListener('UserJoined', (uid, elapsed) => {
      // If new user
      if (peerIds.indexOf(uid) === -1) {
        setState(prevState => ({...prevState, peerIds: [...peerIds, uid]}));
      }
    });

    agoraEngine.current?.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      // Remove peer ID from state array
      setState(prevState => ({
        ...prevState,
        peerIds: peerIds.filter(id => id !== uid),
      }));
    });

    // If Local user joins RTC channel
    agoraEngine.current?.addListener(
      'JoinChannelSuccess',
      (channel, uid, elapsed) => {
        console.log('JoinChannelSuccess', channel, uid, elapsed);
        // Set state variable to true
        setState(prevState => ({...prevState, joinSucceed: true}));
      },
    );

    agoraEngine.current?.addListener(
      'RemoteVideoStateChanged',
      (uid, state) => {
        if (uid === 1) setBroadcasterVideoState(state);
      },
    );
  };

  const _startCall = async () => {
    // Join Channel using null token and channel name
    const uid = 0;
    await agoraEngine.current?.joinChannel(
      channelToken,
      channelName,
      null,
      uid,
    );
    _muteRemoteUsers();
    await agoraEngine.current?.stopPreview();
  };

  const checkCallPossible = type => async () => {
    const data = {
      senderId: userLoginList?.user?._id,
      receiverId: props?.data?._id,
      type: type == CALLING_TYPE.VIDEO ? 'VIDEOCALL' : 'CALL',
    };
    try {
      const response = await getUserHaveBalance(data);
      if (response.data.data) {
        callingFunctionality(type);
      }
    } catch (error) {
      const data = error.response.data;
      alert(data.message);
    }
  };

  const callingFunctionality = async type => {
    const permissionGranted =
      type == CALLING_TYPE.VIDEO
        ? await requestCameraAndAudioPermission()
        : await requestAudioPermission();

    if (permissionGranted && props?.data) {
      try {
        const userBusyorNot = await checkNodePresentOrNot(props?.data?._id);
        if (userBusyorNot) {
          HelperService.showToast('User is busy on another call.');
          setIsLive(false);
          return;
        }

        setStartCallIndicator(true);
        const param = {
          callerId: userLoginList?.user?._id,
          receiverId: props?.data?._id,
          type: type == CALLING_TYPE.VIDEO ? 'VIDEOCALL' : 'CALL',
        };
        dispatch(
          getCAllingDetailAction(param, result => {
            if (result) {
              const callingParams = {
                type,
                status: CALLING_STATUS.CALLING,
                liveName: result.roomName || 'WeechaTest',
                liveToken:
                  result?.token ||
                  '006151109dddcda44a0913ebd6abc899e45IAC49Tjv8mQr1lDa2gm+K/Hu6jq2IZsP6q/nx4Q8RgifuO8UH5UAAAAAEABMB+AnoaufYgEAAQChq59i',
                receiverId: props?.data?._id,
                receiverName: props?.data?.name,
                receiverProfilePic: props?.data?.profile,
                callerId: userLoginList?.user?._id,
                callerName: userLoginList?.user?.name,
                callerProfilePic: userLoginList?.user?.profile,
                callerPoints: userLoginList?.user?.points,
                receiverPoints: props?.data?.points,
              };
              incomingCallQuery(props?.data?._id).set(callingParams);
              props.navigation.navigate('VideoCall', callingParams);
            }
            setStartCallIndicator(false);
          }),
        );
      } catch (error) {
        console.log('error while call creation', error);
      }
    }
  };

  const _renderCoverImage = () => {
    if (props?.data?.coverImage) {
      return (
        <MyImage
          fast
          resizeMode={'cover'}
          style={{height: '100%', width: '100%'}}
          source={{uri: `${IMAGE_URL}${props?.data?.coverImage}`}}
        />
      );
    } else if (props?.data?.profile)
      return (
        <MyImage
          fast
          resizeMode={'cover'}
          style={{height: '100%', width: '100%'}}
          source={{uri: `${IMAGE_URL}${props?.data?.profile}`}}
        />
      );
    else return <SvgIcon.profilePlaceholder />;
  };

  const _followUnfollow = () => {
    const param = {
      followByUserId: userLoginList?.user?._id,
      followToUserId: props?.data?._id,
    };
    dispatch(
      followUserAction(param, result => {
        if (result) {
          let otherDetail = otherUserDetail;
          otherDetail.followByMe = true;
          setOtherUserDetail(otherDetail);
          setAlreadyFollowing(true);
        }
      }),
    );
  };

  const _createRoom = () => {
    const param = {
      receiverId: props?.data?._id,
    };
    dispatch(
      createChatRoomAction(param, result => {
        if (result) {
          setTimeout(() => {
            navigateToScreen('PersonalChat', {
              receiverId: props?.data?._id,
              name: props?.data?.name,
              profile: props?.data?.profile,
              chatId: result._id,
            });
          }, 500);
        }
      }),
    );
  };

  const renderHost = () =>
    broadcasterVideoState === VideoRemoteState.Decoding ? (
      <RtcRemoteView.SurfaceView
        uid={1}
        channelId={channelName}
        zOrderMediaOverlay={true}
        removeClippedSubviews={false}
        style={{
          height: '100%',
          width: '100%',
          zIndex: 10,
        }}
        renderMode={VideoRenderMode.Hidden}
      />
    ) : (
      <MyIndicator color={COLORS.BABY_PINK} />
    );

  const _joinAsAudience = item => {
    if (kickedOutRooms?.includes(item?.liveToken)) {
      return Alert.alert('You have been kicked out from this live');
    }

    if (blockedLiveRooms?.includes(item?.liveToken)) {
      return Alert.alert('You have been Blocked from this live');
    }
    dispatch(
      hostDetailAction({
        ...item,
      }),
    );
    props.navigation.navigate('liveStreaming', {
      ...item,
      type: STREAM_TYPE.AUDIENCE,
      channel: item?.liveName,
      token: item?.liveToken,
    });
    dispatch(getHostExtraDetailAction(item?._id));
  };

  return (
    <View style={styles.coverImageContainer}>
      {_renderCoverImage()}
      {isLive && (
        <TouchableOpacity
          onPress={() => _joinAsAudience(detail)}
          style={[styles.smallVideoCardContainer]}>
          <View style={[styles.smallVideoCard]}>
            {!joinSucceed ? _renderCoverImage() : renderHost()}
            {/* <MyText style={styles.liveText}>{strings('discover.live')}</MyText> */}
          </View>
          {!alreadyFollowing && (
            <TouchableOpacity
              onPress={_followUnfollow}
              style={{
                bottom: '9%',
              }}>
              <SvgIcon.GreenPlus />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      )}
      {!isLive ? (
        <View
          style={[
            styles.showLiveContainer,
            {
              paddingHorizontal: wp(5),
              paddingVertical: hp(0.2),
            },
          ]}>
          <Text style={styles.liveText}>
            Bu
            <Text
              style={[
                styles.liveText,
                {
                  color: COLORS.BABY_PINK,
                },
              ]}>
              sy
            </Text>
          </Text>
        </View>
      ) : (
        <View style={styles.showLiveContainer}>
          <LiveIcon width={wp(8)} height={wp(8)} fill={COLORS.BABY_PINK} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      )}
      <View style={styles.bottomContainer}>
        <Touchable
          onPress={() =>
            props.navigation.navigate('UserProfile', otherUserDetail)
          }
          style={{
            marginTop: SCREEN_HEIGHT * 0.01,
          }}>
          <MyText style={styles.name}>
            {props?.data?.name}, {getAge(props?.data?.DateOfBirth)}
          </MyText>
        </Touchable>
        <View style={styles.durationContainer}>
          <Diamonds width={'24'} height={'24'} />
          <MyText style={styles.smallText}>{10}/min</MyText>
        </View>
        <View style={styles.durationContainer}>
          <MyImage
            source={
              getCountryDetailWithKey({
                key: 'name',
                value: props?.data?.country,
              }).icon
            }
            style={{
              width: wp(5),
              height: wp(5),
            }}
          />
          <MyText style={styles.smallText}>
            {props?.data?.country || 'India'}
          </MyText>
        </View>
        <View style={styles.bottomCall}>
          <Touchable onPress={checkCallPossible(CALLING_TYPE.AUDIO)}>
            {/* <AudioCall height={'64'} width={'64'} /> */}
            <SvgIcon.callWhite />
          </Touchable>
          <Touchable
            onPress={checkCallPossible(CALLING_TYPE.VIDEO)}
            style={{justifyContent: 'center', alignItems: 'center'}}>
            {startCallIndicator ? (
              <MyIndicator
                color={COLORS.VIOLET}
                style={{position: 'absolute', zIndex: 10}}
              />
            ) : null}
            {/* <VideoCall height={'80'} width={'80'} /> */}
            <SvgIcon.videoRed />
          </Touchable>

          <Touchable onPress={_createRoom}>
            {/* <TextMessage height={'64'} width={'64'} /> */}
            <SvgIcon.msgWhite />
          </Touchable>
        </View>
      </View>
    </View>
  );
};

export default Card;
