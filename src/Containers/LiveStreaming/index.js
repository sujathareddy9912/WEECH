import moment from 'moment';
import Lottie from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import database from '@react-native-firebase/database';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import Game from '../Game';
import Icon from '../../Component/Icons/Icon';

import {
  View,
  Alert,
  Keyboard,
  ScrollView,
  BackHandler,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
  StatusBar,
  FlatList,
  PermissionsAndroid,
} from 'react-native';

import {
  ClientRoleType,
  ChannelProfileType,
  RemoteVideoState,
  createAgoraRtcEngine,
  RtcSurfaceView,
} from 'react-native-agora';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import styles from './styles';
import Input from '../../Component/Input';
import CrossPink from '../../Assets/Icons/crossPink.svg';
import SendIcon from '../../Assets/Icons/BlueSendIcon.svg';
import VideoCallSmallIcon from '../../Assets/Icons/VideoCallSmallIcon.svg';
import {COLORS} from '../../Utils/colors';
import {SvgIcon} from '../../Component/icons';
import {FONT_SIZE} from '../../Utils/fontFamily';
import {strings} from '../../localization/config';
import {dynamicSize} from '../../Utils/responsive';
import GiftComponent from '../../Component/giftComponent';
import {IMAGE_URL} from '../../Services/Api/Common';
import {rtmAgoraConfig, STREAM_TYPE} from '../../Utils/agoraConfig';
import LiveStreamingActiveUserList from '../../Component/activeUserListingModal';

import {
  joinUserAction,
  followUserAction,
  refreshDataAction,
  getGiftDataAction,
  likeStreamApiAction,
  joinNewUserApiAction,
  likeLiveStreamAction,
  updateHostPointAction,
  endLiveStreamingAction,
  getCAllingDetailAction,
  changeAnimationTypeAction,
  commentOnLiveStreamAction,
  clearLiveStreamDataAction,
  joinUserOnLiveStreamAction,
  activeLiveUserListInStreamingAction,
  getFollowingListAction,
  userMute,
  userKickoutFromLive,
  makeUserAdmin,
  userLiveMuteFlag,
  userBlockFromLiveSession,
  putInKickoutRoom,
  putInBlockRoom,
  isLiveActiveAction,
  removeUserAction,
  getAnotherUserProfile,
  getFriendsListAction,
  reconnectLiveStreamAction,
  getUserEarningListAction,
  getLiveUserListAction,
  hostDetailAction,
  getHostExtraDetailAction,
} from '../../Redux/Action';

import {
  isIOS,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  dismissKeyboard,
  CALLING_TYPE,
  requestAudioPermission,
  CALLING_STATUS,
} from '../../Utils/helper';

import {
  MyText,
  SafeArea,
  Touchable,
  MyIndicator,
  TouchableIcon,
  IconWithCount,
  SmallProfilePic,
  MyLinearGradient,
  Button,
  MyImage,
} from '../../Component/commomComponent';
import {HelperService} from '../../Services/Utils/HelperService';
import {
  checkNodePresentOrNot,
  incomingCallQuery,
} from '../../firebase/nodeQuery';
import ReportModal from '../../Component/ReportModal';
import MakeRemoveAdmin from '../../Component/Make_RemoveAdmin';
import {socket} from '../../Services/Sockets/sockets';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Share from 'react-native-share';
import {
  getEndUserDetailApi,
  getUserHaveBalance,
} from '../../Services/Api/LiveStreaming';
import {Actionsheet} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';

const HEART_ANIMATION = require('../../Assets/lottiefiles/heartAnimation.json');

const videoStateMessage = state => {
  switch (state) {
    case RemoteVideoState.RemoteVideoStateStopped:
      return 'Video turned off by Host';

    case RemoteVideoState.RemoteVideoStateFrozen:
      return 'Connection Issue, Please Wait';

    case RemoteVideoState.RemoteVideoStateFailed:
      return 'Network Error';
  }
};

let timeout = null,
  joinedTimout = null,
  getJoinedUserDataTimeout = null;

const LiveStreaming = ({navigation, route}) => {
  const dispatch = useDispatch();
  const state = useSelector(state => {
    return state;
  });

  const {userLoginList} = state.authReducer;
  const {refreshData} = state.loaderReducer;
  const {reconnectLiveStream} = state.callReducer;

  const liveEndSuggestionRef = useRef();

  const {
    likeCount,
    hostDetail,
    commentData,
    userLiveMute,
    animationType,
    joinUserCount,
    joinedUserData,
    hostExtraDetail,
    likeStatusStream,
  } = state.streamingReducer;

  const isBroadcaster = useMemo(() => {
    if (route?.params?.type) return route?.params?.type == STREAM_TYPE.HOST;
    else false;
  }, [route?.params?.type]);

  const channelName = useMemo(() => {
    if (route?.params?.channel) return route?.params?.channel;
  }, [route?.params?.channel]);

  const channelToken = useMemo(() => {
    if (route?.params?.token) return route?.params?.token;
  }, [route?.params?.token]);

  const initialState = {
    joinSucceed: false,
    peerIds: [],
  };
  const agoraEngineRef = useRef();
  const scrollRef = useRef();
  const pan = useRef(new Animated.ValueXY()).current;
  const reconnectAlertStatus = useRef(false);

  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [adminList, setAdminList] = useState([]);
  const [alreadyFollowing, setAlreadyFollowing] = useState(false);
  const [giftData, updateGiftData] = useState([]);
  const [showGifts, setShowGift] = useState(false);
  const [isMute, updateMuteState] = useState(false);
  const [heartFlag, setHeartFlag] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const [commentText, UpdateCommentText] = useState('');
  const [fetchingGifts, setFetchingGifts] = useState(false);
  const [showActiveUser, setShowActiveUser] = useState(false);
  const [showReport, setReport] = useState(false);
  const [isOpen, setIsopen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [pageXY, setPageXY] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [viewersFollowing, setViewersFollowing] = useState([]);
  const [removeAdminVisible, setRemoveAdminVisible] = useState(false);
  const [renderNewJoinne, UpdateNewJoinneState] = useState(false);
  const [{joinSucceed, peerIds}, setState] = useState(initialState);
  const [joinedUserDataState, updateJoinedUserDataState] = useState([]);
  const [isKeyboardShow, updateKeyboardShow] = useState(false);
  const [broadcasterVideoState, setBroadcasterVideoState] = useState(
    RemoteVideoState.RemoteVideoStateDecoding,
  );
  const [diamondPoints, setDiamondPoints] = useState(
    userLoginList?.user?.myBalance,
  );
  const [liveEndSuggestionData, updateEndLiveSuggestionData] = useState();
  const [firstTimeRender, UpdateFirstTimeRender] = useState(true);
  const [hostScreenStatus, UpdateHostScreenStatus] = useState(true);
  const [myEarning, setMyEarning] = useState();
  const [liveUserList, UpdateLiveUserList] = useState([]);
  const [todayEarning, UpdateTodayEarning] = useState(
    route?.params?.todayEarning,
  );

  const [showGames, setShowGames] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const latestImage =
      commentData.length > 0 ? commentData[commentData.length - 1] : null;
    if (latestImage && latestImage?.image) {
      setImageSrc(latestImage?.image);
      setIsVisible(true);

      // Schedule hiding the gift image after 3 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setImageSrc(null);
      setIsVisible(false);
    }
  }, [commentData]);

  const BROAD_OPTIONS = [
    `${isAdmin ? 'Remove Admin' : 'Make Admin'}`,
    `${isFollowing ? 'UnFollow' : 'Follow'}`,
    'Block',
    'Kickout',
    'Mute/UnMute',
    'Report',
  ];

  const OPTIONS = {
    true: BROAD_OPTIONS,
    false: [
      `${isFollowing ? 'UnFollow' : 'Follow'}`,
      'Block',
      'Mute/UnMute',
      'Report',
      'Private call',
    ],
  };

  const getUserEarning = () => {
    dispatch(
      getUserEarningListAction(result => {
        setMyEarning(result?.data);
      }),
    );
  };

  useEffect(() => {
    if ((channelName, channelToken)) {
      _initEngine();
    }
  }, [channelName, channelToken]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    _fetchGifts();
    UpdateFirstTimeRender(false);

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (reconnectLiveStream && !firstTimeRender && isBroadcaster) {
      updateMuteState(false);
      UpdateHostScreenStatus(false);
      dispatch(reconnectLiveStreamAction(false));
      if (!reconnectAlertStatus.current) {
        reconnectAlertStatus.current = true;
        setTimeout(() => {
          Alert.alert('Weecha Live', 'Continue Live Now ?', [
            {text: 'OK', onPress: () => reconnectAgro()},
          ]);
        }, 500);
      }
    }
  }, [reconnectLiveStream]);

  useEffect(() => {
    if (isBroadcaster) {
      updateFirebase();
    } else {
      _fetchFollowingList();
    }
  }, []);

  const updateFirebase = () => {
    const reference = database().ref(`/liveRoom/${channelName}/status`);

    const referenceForLiveStatus = database().ref(
      `/liveStatus/${userLoginList?.user?._id}`,
    );

    referenceForLiveStatus.set({isLive: true, isBusy: false});

    // Set the user islive and busy status value to false
    referenceForLiveStatus.onDisconnect().set({isLive: false, isBusy: false});

    // Set the user online status value to false
    reference.onDisconnect().set(false);
  };

  useEffect(() => {
    if (joinedUserData?.id) {
      if (joinedTimout || !renderNewJoinne) {
        UpdateNewJoinneState(true);
      } else {
        dispatch(changeAnimationTypeAction('slideInRight'));
        setTimeout(() => {
          joinedTimout = null;
          UpdateNewJoinneState(false);
          dispatch(changeAnimationTypeAction('slideOutLeft'));
        }, 3000);
      }
      _fetchFollowingList();
    }
  }, [joinedUserData, joinedUserData?.id]);

  const backAction = () => {
    return true;
  };

  const Invite = async () => {
    const url = await dynamicLinks().buildLink({
      link: `https://www.google.com?liveName=${channelName}&liveToken=${channelToken}`,
      domainUriPrefix: 'https://weecha.page.link',
      social: {
        title: 'Weecha',
        descriptionText: 'Look out for this awesome Live Streaming',
        // imageUrl:''
      },
      android: {
        packageName: 'com.weecha',
      },
      ios: {
        bundleId: 'com.weecha',
        appStoreId: '123456789',
      },
    });
    const options = Platform.select({
      default: {
        title: 'TITLE',
        subject: 'title',
        message: `${'Check out this'} ${url}`,
      },
    });
    Share.open(options)
      .then(res => {})
      .catch(err => {});
  };

  const fetchEndLiveDetails = async () => {
    const data = {
      roomId: channelToken,
    };

    const responseData = await getEndUserDetailApi(data);
    if (responseData.code === 201 || responseData.code === 200) {
      liveEndSuggestionRef.current.open();
      updateEndLiveSuggestionData(responseData.data);
      getLiveUserListData();
    }
  };

  const getLiveUserListData = () => {
    const params = {
      pageNumber: 0,
      country: 'India',
    };

    dispatch(
      getLiveUserListAction(params, async data => {
        UpdateLiveUserList(data?.data);
      }),
    );
  };

  useEffect(() => {
    socket.off('live_session').on('live_session', async data => {
      if (data?.type === 'join_user') {
        dispatch(
          joinUserOnLiveStreamAction({
            ...data,
          }),
        );
        dispatch(joinUserAction());
        getUserJoinedData();
        _scrollToEnd();
      }
      if (data?.type === 'comment') {
        dispatch(commentOnLiveStreamAction(data));
        _scrollToEnd();
      }
      if (data?.type === 'like_event') {
        dispatch(likeLiveStreamAction(data));
        setHeartFlag(true);
      }
      if (
        data?.type === 'kickout_user' &&
        data?.userId === userLoginList?.user?._id
      ) {
        dispatch(putInKickoutRoom(data?.roomId));
        _endCallAudiance();
      }
      if (data?.type === 'diamond_update') {
        dispatch(updateHostPointAction(data.diamondData.diamonds));
        if (data.diamondData.senderID === userLoginList?.user?._id) {
          setDiamondPoints(diamondPoints - data.diamondData.diamonds);
        }
      }
      if (
        data?.type === 'block_user' &&
        data?.userId === userLoginList?.user?._id
      ) {
        dispatch(putInBlockRoom(data?.roomId));
        _endCallAudiance();
      }
      if (
        data?.type === 'mute_user' &&
        data?.userId === userLoginList?.user?._id
      ) {
        dispatch(userLiveMuteFlag());
      }
      if (data?.type === 'leave_host' && data?.detail?.id === hostDetail?._id) {
        _endCall();
        if (!isBroadcaster) fetchEndLiveDetails();
      }
      if (
        data?.type === 'leave_user' &&
        data?.detail?.id !== userLoginList?.user?._id
      ) {
        dispatch(removeUserAction());
        getUserJoinedData();
      }
      if (
        data?.type === 'reconnect_live_stream' &&
        data?.detail?.id !== userLoginList?.user?._id
      ) {
        agoraEngineRef.current?.leaveChannel();

        agoraEngineRef.current = createAgoraRtcEngine();
        await agoraEngineRef.current?.setChannelProfile(
          ChannelProfileType.ChannelProfileLiveBroadcasting,
        );
        await agoraEngineRef.current.enableVideo();
        await agoraEngineRef.current.startPreview();
        await agoraEngineRef.current?.setClientRole(
          isBroadcaster
            ? ClientRoleType.ClientRoleBroadcaster
            : ClientRoleType.ClientRoleAudience,
        );

        agoraEngineRef.current.addListener('onUserJoined', (uid, elapsed) => {
          // If new user
          if (peerIds.indexOf(uid) === -1) {
            setState(prevState => ({...prevState, peerIds: [...peerIds, uid]}));
          }
        });
        agoraEngineRef.current.addListener(
          'onRemoteVideoStateChanged',
          (uid, state) => {
            if (uid === 1) setBroadcasterVideoState(state);
          },
        );
        _startCall();
      }
    });

    if (!isBroadcaster) {
      dispatch(
        joinNewUserApiAction({
          userId: userLoginList?.user?._id,
          roomId: channelToken,
        }),
      );
      socket.emit('live_session', {
        type: 'join_user',
        chat_id: channelToken,
        joinUserDetail: {
          type: 'join',
          id: userLoginList?.user?._id,
          name: userLoginList?.user?.name,
          profilePic: userLoginList?.user?.profile,
          level: userLoginList?.user?.level ?? 0,
        },
      });
    } else {
      socket.emit('live_session', {type: 'join_user', chat_id: channelToken});
    }

    getUserJoinedData();

    // return () => socket.close();
  }, []);

  useEffect(() => {
    if (joinUserCount > 0) {
      if (getJoinedUserDataTimeout) clearTimeout(getJoinedUserDataTimeout);
      getJoinedUserDataTimeout = setTimeout(() => {
        getUserJoinedData();
      }, 500);
    }
  }, [joinUserCount]);

  const getUserJoinedData = () => {
    dispatch(
      activeLiveUserListInStreamingAction(
        {
          start: 0,
          limit: 3,
          roomId: channelToken,
          userId: userLoginList?.user?._id,
        },
        data => {
          updateJoinedUserDataState(data?.data);
          const newList = data?.data?.filter(item => item?.isAdmin);
          setAdminList([...newList]);
        },
      ),
    );
  };

  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };

  const _initEngine = async () => {
    try {
      if (Platform.OS === 'android') {
        await getPermission();
      }

      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngineInit = agoraEngineRef.current;
      agoraEngineInit.registerEventHandler({
        onJoinChannelSuccess: () => {
          console.log('Successfully joined the channel ' + channelName);
        },
        onUserJoined: (_connection, Uid) => {
          console.log('Remote user joined with uid ' + Uid);
        },
        onUserOffline: (_connection, Uid) => {
          console.log('Remote user left the channel. uid: ' + Uid);
        },
      });
      agoraEngineInit.initialize({
        appId: rtmAgoraConfig.appId,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });
      agoraEngineInit.enableVideo();
      _addListeners();
      _startCall();
    } catch (e) {
      console.log('An error occurred', e);
    }
  };

  const reconnectAgro = async () => {
    agoraEngineRef.current?.leaveChannel();
    agoraEngineRef.current.initialize({
      appId: rtmAgoraConfig.appId,
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    });
    await agoraEngineRef.current.enableVideo();
    await agoraEngineRef.current.startPreview();
    await agoraEngineRef.current?.setClientRole(
      isBroadcaster
        ? ClientRoleType.ClientRoleBroadcaster
        : ClientRoleType.ClientRoleAudience,
    );

    updateFirebase();

    agoraEngineRef.current.addListener('onUserJoined', (uid, elapsed) => {
      if (peerIds.indexOf(uid) === -1) {
        setState(prevState => ({...prevState, peerIds: [...peerIds, uid]}));
      }
    });

    agoraEngineRef.current.addListener(
      'onRemoteVideoStateChanged',
      (uid, state) => {
        if (uid === 1) setBroadcasterVideoState(state);
      },
    );

    _startCall();
    UpdateHostScreenStatus(true);

    reconnectAlertStatus.current = false;

    socket.emit('live_session', {
      type: 'reconnect_live_stream',
      chat_id: channelToken,
      detail: {
        id: userLoginList?.user?._id,
      },
    });
  };

  const _fetchGifts = () => {
    setFetchingGifts(true);
    dispatch(
      getGiftDataAction('', data => {
        setFetchingGifts(false);
        if (data.status) {
          updateGiftData(data.giftTypes);
        }
      }),
    );
  };

  const _fetchFollowingList = () => {
    const param = {
      start: 0,
      limit: '20',
      userId: userLoginList?.user?._id,
      search: '',
    };
    dispatch(
      getFollowingListAction(param, result => {
        setViewersFollowing([...result?.data]);
        const userFound = result?.data.filter(
          item => item?.followToUserId == hostDetail?._id,
        );
        if (userFound?.length > 0) {
          setAlreadyFollowing(true);
        }
        dispatch(
          getFriendsListAction(param, result => {
            setViewersFollowing([...viewersFollowing, ...result?.data]);
            const userFound = result?.data.filter(
              item => item?.friendUserId?._id == hostDetail?._id,
            );
            if (userFound?.length > 0) {
              setAlreadyFollowing(true);
            }
          }),
        );
      }),
    );
  };

  const _scrollToEnd = () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      scrollRef?.current?.scrollToEnd();
    }, 400);
  };

  const _fetchGiftList = () => {
    _fetchGifts();
    showGift();
  };

  const _addListeners = () => {
    agoraEngineRef.current.addListener('Warning', warn => {
      console.log('Warning', warn);
    });

    agoraEngineRef.current.addListener('onError', err => {
      console.log('Error', err);
    });

    agoraEngineRef.current.addListener('onUserJoined', (uid, elapsed) => {
      // If new user
      if (peerIds.indexOf(uid) === -1) {
        setState(prevState => ({...prevState, peerIds: [...peerIds, uid]}));
      }
    });

    agoraEngineRef.current.addListener('onUserOffline', (uid, reason) => {
      // Remove peer ID from state array
      setState(prevState => ({
        ...prevState,
        peerIds: peerIds.filter(id => id !== uid),
      }));
    });

    // If Local user joins RTC channel
    agoraEngineRef.current.addListener(
      'onJoinChannelSuccess',
      (channel, uid, elapsed) => {
        // Set state variable to true

        if (!isBroadcaster) {
          dispatch(
            joinUserOnLiveStreamAction({
              token: channelToken,
              joinUserDetail: {
                type: 'join',
                id: userLoginList?.user?._id,
                name: userLoginList?.user?.name,
                profilePic: userLoginList?.user?.profile,
                level: userLoginList?.user?.level ?? 0,
              },
            }),
          );
        }

        const comment = {
          commentData: {
            type: 'welcomeText',
            comment: strings('live.welcomeMessage'),
          },
        };
        dispatch(commentOnLiveStreamAction(comment));
        setState(prevState => ({...prevState, joinSucceed: true}));
      },
    );

    agoraEngineRef.current.addListener(
      'onRemoteVideoStateChanged',
      (uid, state) => {
        if (uid === 1) setBroadcasterVideoState(state);
      },
    );
  };

  const _startCall = async () => {
    const uid = isBroadcaster ? 1 : 0;

    if (joinSucceed) {
      return;
    }
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileLiveBroadcasting,
      );
      if (isBroadcaster) {
        await agoraEngineRef.current.startPreview();
        agoraEngineRef.current?.joinChannel(channelToken, channelName, uid, {
          clientRoleType: ClientRoleType.ClientRoleBroadcaster,
        });
      } else {
        agoraEngineRef.current?.joinChannel(channelToken, channelName, uid, {
          clientRoleType: ClientRoleType.ClientRoleAudience,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const _endCallAudiance = async () => {
    try {
      await agoraEngineRef.current?.leaveChannel();
      dispatch(
        endLiveStreamingAction({
          userId: userLoginList?.user?._id,
          roomId: channelToken,
          roomName: channelName,
          type: isBroadcaster ? 'host' : 'audiance',
        }),
      );

      if (isBroadcaster) {
        database()
          .ref(`/liveStatus/${userLoginList?.user?._id}`)
          .set({isLive: false, isBusy: false});
        socket.emit('live_session', {
          type: 'leave_host',
          chat_id: channelToken,
          detail: {
            profile: hostDetail?.profile,
            name: hostDetail?.name,
            id: hostDetail?._id,
          },
        });

        dispatch(isLiveActiveAction(false));
        setState(prevState => ({
          ...prevState,
          peerIds: [],
          joinSucceed: false,
        }));
        dispatch(clearLiveStreamDataAction());
        navigation.navigate('LiveSection');
      } else {
        socket.emit('live_session', {
          type: 'leave_user',
          chat_id: channelToken,
          detail: {
            profile: userLoginList?.user?.profile,
            name: userLoginList?.user?.name,
            id: userLoginList?.user?._id,
          },
        });

        setState(prevState => ({
          ...prevState,
          peerIds: [],
          joinSucceed: false,
        }));
        setState(prevState => ({
          ...prevState,
          peerIds: [],
          joinSucceed: false,
        }));
        dispatch(clearLiveStreamDataAction());
        navigation.navigate('LiveSection');
      }
    } catch (error) {
      console.log('erroe while leaving streaming==>', error.message);
    }
  };

  const _endCall = async () => {
    try {
      await agoraEngineRef.current?.leaveChannel();
      dispatch(
        endLiveStreamingAction({
          userId: userLoginList?.user?._id,
          roomId: channelToken,
          roomName: channelName,
          type: isBroadcaster ? 'host' : 'audiance',
        }),
      );

      if (isBroadcaster) {
        database()
          .ref(`/liveStatus/${userLoginList?.user?._id}`)
          .set({isLive: false, isBusy: false});
        socket.emit('live_session', {
          type: 'leave_host',
          chat_id: channelToken,
          detail: {
            profile: hostDetail?.profile,
            name: hostDetail?.name,
            id: hostDetail?._id,
          },
        });

        dispatch(isLiveActiveAction(false));
        setState(prevState => ({
          ...prevState,
          peerIds: [],
          joinSucceed: false,
        }));
        dispatch(clearLiveStreamDataAction());
        navigation.navigate('LiveSection');
      } else {
        socket.emit('live_session', {
          type: 'leave_user',
          chat_id: channelToken,
          detail: {
            profile: userLoginList?.user?.profile,
            name: userLoginList?.user?.name,
            id: userLoginList?.user?._id,
          },
        });

        setState(prevState => ({
          ...prevState,
          peerIds: [],
          joinSucceed: false,
        }));
        dispatch(clearLiveStreamDataAction());
      }
    } catch (error) {
      console.log('erroe while leaving streaming==>', error.message);
    }
  };

  const endCallPopup = () => {
    if (isBroadcaster) {
      _endCall();
    } else setVisible(true);
  };

  const onChangeCameraDirection = async () => {
    await agoraEngineRef.current?.switchCamera();
  };

  const onToggleMicrophone = async () => {
    await agoraEngineRef.current?.muteLocalAudioStream(!isMute);
    updateMuteState(!isMute);
  };

  const onShare = () => {};

  const _openActiveUserList = () => {
    setSelectedUser({});
    setShowActiveUser(true);
  };

  const _closeActiveUserList = () => {
    setShowActiveUser(false);
  };
  const _closeReportUserList = () => {
    setReport(false);
  };
  const _closeRemoveAdminList = () => {
    setRemoveAdminVisible(false);
  };

  const _closeAllPopup = () => {
    dismissKeyboard();
    hideGift();
  };

  const _onFocusTextinput = () => {
    _scrollToEnd();
  };

  const showGift = () => setShowGift(true);

  const hideGift = () => setShowGift(false);

  const _renderJoinedUsers = () => {
    if (joinedUserData?.type === 'join') {
      return (
        <Animatable.View
          animation={animationType}
          easing="ease"
          duration={5000}
          onAnimationEnd={() => UpdateNewJoinneState(false)}
        >
          <MyLinearGradient
            colors={[COLORS.ORANGE, COLORS.ORANGE1]}
            style={styles.joinedThLiveContainer}>
            <MyLinearGradient
              colors={[COLORS.VOILET, COLORS.VOILET1]}
              style={styles.levelContainer}>
              <MyText style={styles.userLevel}>{`${strings('live.level')}.${
                joinedUserData.level
              }`}</MyText>
            </MyLinearGradient>
            <MyText numberOfLines={2} style={styles.joinedTheLiveText}>
              {`${joinedUserData.name} ${strings('live.joinedTheLive')}`}
            </MyText>
          </MyLinearGradient>
        </Animatable.View>
      );
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: Platform.select({
        default: () => true,
        android: (e, state) =>
          Math.abs(state.dx) > 10 || Math.abs(state.dy) > 10,
      }),
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (evt, gestureState) => {
        Animated.spring(
          pan, // Auto-multiplexed
          {toValue: {x: 0, y: 0}, useNativeDriver: false}, // Back to zero
        ).start();
        if (gestureState.dx > SCREEN_WIDTH / 2) {
          setShowComments(false);
        } else {
          setShowComments(true);
        }
      },
    }),
  ).current;

  const _renderComment = (item, index) => {
    if (item?.type === 'comment') {
      let follwing = viewersFollowing.filter(x => {
        if (
          x?.followToUserId == item?.joinedUsers?._id ||
          x?.friendUserId?._id == item?.joinedUsers?._id
        ) {
          return x;
        }
      });
      let admin = adminList.filter(x => {
        if (x?.joinedUsers?._id == item?.joinedUsers?._id) {
          return x;
        }
      });
      return (
        <TouchableOpacity
          disabled={
            item?.joinedUsers?._id == hostDetail?._id ||
            item?.joinedUsers?._id == userLoginList?.user?._id
          }
          onPress={evt => {
            getUserJoinedData();
            setSelectedUser(item);
            setIsAdmin(admin.length);
            follwing.length ? setIsFollowing(true) : setIsFollowing(false);
            if (item?.isAdmin || isBroadcaster) {
              setPageXY({x: evt.nativeEvent.pageX, y: evt.nativeEvent.pageY});
            }
          }}
          style={[styles.chatView]}>
          {item?.profilePic ? (
            <SmallProfilePic
              imageStyle={styles.chatPic}
              url={`${IMAGE_URL}${item?.profilePic}`}
            />
          ) : (
            <View style={styles.picContainer}>
              <SvgIcon.SmallProfilePlaceholder />
            </View>
          )}
          <View style={styles.chatRightConrtainer}>
            <MyText style={styles.username}>{item.name}</MyText>
            <View style={styles.msgBox}>
              <MyText style={styles.msg}>{item.comment}</MyText>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else if (item?.type == 'welcomeText') {
      return (
        <View style={[styles.welcomeContainer]}>
          <MyText style={styles.welcometxt}>{item.comment}</MyText>
        </View>
      );
    }
  };

  const renderLocal = () => (
    <React.Fragment key={0}>
      <RtcSurfaceView
        canvas={{uid: 0}}
        style={styles.localStreamingView}
        removeClippedSubviews={false}
      />
    </React.Fragment>
  );

  const renderHost = () =>
    broadcasterVideoState === RemoteVideoState.RemoteVideoStateDecoding ? (
      <React.Fragment key={1}>
        <RtcSurfaceView
          canvas={{uid: 1}}
          style={styles.localStreamingView}
          removeClippedSubviews={false}
          zOrderMediaOverlay={true}
        />
      </React.Fragment>
    ) : (
      <View style={styles.broadcasterVideoStateMessage}>
        <MyText style={styles.broadcasterVideoStateMessageText}>
          {videoStateMessage(broadcasterVideoState)}
        </MyText>
      </View>
    );

  const _onSearch = text => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      setFetchingGifts(true);
      dispatch(
        getGiftDataAction(text, data => {
          setFetchingGifts(false);
          if (data.status) {
            updateGiftData(data.giftTypes);
          }
        }),
      );
    }, 500);
  };

  const onCommentSend = () => {
    let isAdmin = adminList.filter(
      data => data?.joinedUsers?._id == userLoginList?.user?._id,
    );
    if (commentText !== '') {
      const data = {
        type: 'comment',
        chat_id: channelToken,
        commentData: {
          type: 'comment',
          comment: commentText,
          name: userLoginList?.user?.name,
          profilePic: userLoginList?.user?.profile,
          joinedUsers: userLoginList?.user,
          roomId: channelToken,
          isAdmin: isAdmin.length,
        },
      };
      socket.emit('live_session', data);

      dispatch(commentOnLiveStreamAction(data));
      _scrollToEnd();
    }
    UpdateCommentText('');
  };

  const onLikeStream = () => {
    setHeartFlag(true);
    if (!likeStatusStream) {
      socket.emit('live_session', {
        type: 'like_event',
        chat_id: channelToken,
        userId: userLoginList?.user?._id,
      });
      dispatch(
        likeStreamApiAction({
          userId: userLoginList?.user?._id,
          roomId: channelToken,
        }),
      );
    }
  };

  const _emitGift = data => {
    // do not remove this line @Front end developer , this code is commented for future use
    userLoginList.user.points =
      userLoginList.user.points - data.param.totalPrice;
    dispatch(refreshDataAction(!refreshData));

    socket.emit('live_session', {
      type: 'diamond_update',
      chat_id: channelToken,
      diamondData: {
        type: 'diamond_update',
        diamonds: data.param.totalPrice,
        senderID: userLoginList?.user?._id,
      },
    });

    setDiamondPoints(diamondPoints - data.param.totalPrice);

    let isAdmin = adminList.filter(
      data => data?.joinedUsers?._id == userLoginList?.user?._id,
    );

    const comentData = {
      type: 'comment',
      chat_id: channelToken,
      giftId: data?.param?.giftId[0]?.giftId,
      commentData: {
        type: 'comment',
        comment: `${data?.totalCount} gift's send by ${userLoginList?.user?.name} `,
        name: userLoginList?.user?.name,
        profilePic: userLoginList?.user?.profile,
        joinedUsers: userLoginList?.user,
        roomId: channelToken,
        isAdmin: isAdmin.length,
      },
    };
    socket.emit('live_session', comentData);

    dispatch(commentOnLiveStreamAction(comentData));
    dispatch(updateHostPointAction(data?.param?.totalPrice));
    hideGift();
  };

  const checkCallPossible = async type => {
    const data = {
      senderId: userLoginList?.user?._id,
      receiverId: route?.params?._id,
      type: type == CALLING_TYPE.VIDEO ? 'VIDEOCALL' : 'CALL',
    };

    try {
      const response = await getUserHaveBalance(data);
      if (response.data.data) {
        callingFunctionality(type);
      }
    } catch (error) {
      const data = error.response.data;
      Alert.alert(data.message);
    }
  };

  const callingFunctionality = async type => {
    const permissionGranted = await requestAudioPermission();

    if (permissionGranted && route?.params) {
      try {
        // const userBusyorNot = await checkNodePresentOrNot(route?.params?._id);
        // if (userBusyorNot) {
        //   HelperService.showToast('User is busy on another call.');
        //   return;
        // }

        // setStartCallIndicator(true);
        const param = {
          callerId: userLoginList?.user?._id,
          receiverId: route?.params?._id,
          type: type == CALLING_TYPE.VIDEO ? 'VIDEOCALL' : 'CALL',
        };
        dispatch(
          getCAllingDetailAction(param, result => {
            if (result) {
              const callingParams = {
                type: type,
                status: CALLING_STATUS.CALLING,
                liveName: result.roomName || 'WeechaTest',
                liveToken:
                  result?.token ||
                  '006151109dddcda44a0913ebd6abc899e45IAC49Tjv8mQr1lDa2gm+K/Hu6jq2IZsP6q/nx4Q8RgifuO8UH5UAAAAAEABMB+AnoaufYgEAAQChq59i',
                receiverId: route?.params?._id,
                receiverName: route?.params?.name,
                receiverProfilePic: route?.params?.profile,
                callerId: userLoginList?.user?._id,
                callerName: userLoginList?.user?.name,
                callerProfilePic: userLoginList?.user?.profile,
                callerPoints: userLoginList?.user?.points,
                receiverPoints: route?.params?.points,
              };
              incomingCallQuery(route?.params?._id).set(callingParams);
              navigation.navigate('VideoCall', callingParams);
            }
          }),
        );
      } catch (error) {
        console.log('error while call creation', error.message);
      }
    }
  };

  const _followUnfollow = toId => {
    const param = {
      followByUserId: userLoginList?.user?._id,
      followToUserId: toId,
    };
    dispatch(
      followUserAction(param, result => {
        if (result) {
          // joinedUserDataState.likedByMe = !joinedUserDataState.likedByMe;
          hostDetail?._id == toId && setAlreadyFollowing(true);
          visible && _endCallAudiance();
        }
        _fetchFollowingList();
        setShowActiveUser(false);
      }),
    );
  };

  const handleMore = type => {
    switch (type) {
      case 'Make Admin':
      case 'Remove Admin':
        if (adminList.length < 5) {
          dispatch(
            makeUserAdmin(
              {
                userId: selectedUser?.joinedUsers?._id,
                roomId: selectedUser?.roomId,
              },
              x => {
                _closeActiveUserList();
                getUserJoinedData();
              },
            ),
          );
        } else {
          _closeActiveUserList();
          setRemoveAdminVisible(true);
        }
        return null;
      case 'UnFollow':
      case 'Follow':
        return _followUnfollow(selectedUser?.joinedUsers?._id);
      case 'Block':
        return dispatch(
          userBlockFromLiveSession(
            {
              userId: selectedUser?.joinedUsers?._id,
              blockedBy: userLoginList?.user?._id,
              roomId: selectedUser?.roomId,
            },
            () => {
              socket.emit('live_session', {
                type: 'block_user',
                userId: selectedUser?.joinedUsers?._id,
                roomId: selectedUser?.roomId,
                chat_id: selectedUser?.roomId,
              });
              _closeActiveUserList();
            },
          ),
        );
      case 'Kickout':
        return dispatch(
          userKickoutFromLive(
            {
              userId: selectedUser?.joinedUsers?._id,
              roomId: selectedUser?.roomId,
            },
            () => {
              socket.emit('live_session', {
                type: 'kickout_user',
                userId: selectedUser?.joinedUsers?._id,
                roomId: selectedUser?.roomId,
                chat_id: selectedUser?.roomId,
              });
              _closeActiveUserList();
            },
          ),
        );
      case 'Mute/UnMute':
        return dispatch(
          userMute(
            {
              userId: selectedUser?.joinedUsers?._id,
              roomId: selectedUser?.roomId,
            },
            () => {
              socket.emit('live_session', {
                type: 'mute_user',
                userId: selectedUser?.joinedUsers?._id,
                roomId: selectedUser?.roomId,
                chat_id: selectedUser?.roomId,
              });
              _closeActiveUserList();
            },
          ),
        );
      case 'Report':
        setShowActiveUser(false);
        setReport(true);
        return null;
      case 'Private call':
        return checkCallPossible(CALLING_TYPE.AUDIO)();
      default:
        return null;
    }
  };

  const profileRedirection = userId => {
    dispatch(
      getAnotherUserProfile({userId}, data => {
        if (data?.user) {
          navigation.navigate('UserProfile', data?.user);
        }
      }),
    );
  };

  const closeModal = () => {
    setIsopen(false);
    // setOptionSelected('')
  };

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
      updateKeyboardShow(true);
    });
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      updateKeyboardShow(false);
    });
  }, []);

  const _joinAsAudience = item => {
    liveEndSuggestionRef.current.close();
    navigation.navigate('LiveSection');
  };

  return (
    <>
      <StatusBar hidden={true} />
      <SafeArea
        style={[
          styles.container,
          {paddingBottom: -useSafeAreaInsets().bottom},
        ]}>
        {showActiveUser && (
          <LiveStreamingActiveUserList
            channelToken={channelToken}
            isVisible={showActiveUser}
            onRequestClose={_closeActiveUserList}
            refresh={showActiveUser}
            isBroadcaster={isBroadcaster}
            handleMore={handleMore}
            setSelectedUser={item => setSelectedUser(item)}
            selectedUser={selectedUser}
            setAdminList={setAdminList}
            user={userLoginList?.user}
            viewersFollowing={viewersFollowing}
            setToFollowId={item => _followUnfollow(item)}
          />
        )}

        {showReport && (
          <ReportModal
            reportBy={userLoginList?.user?._id}
            isVisible={showReport}
            selectedUserId={selectedUser?.joinedUsers?._id}
            onRequestClose={_closeReportUserList}
          />
        )}

        {removeAdminVisible && (
          <MakeRemoveAdmin
            channelToken={channelToken}
            isVisible={removeAdminVisible}
            onRequestClose={_closeRemoveAdminList}
            data={adminList}
          />
        )}

        {!joinSucceed ? (
          <View style={styles.centerAlign}>
            <MyIndicator verticalSpace />
            <MyText style={styles.loadingText}>
              Joining Stream, Please Wait
            </MyText>
          </View>
        ) : (
          <>
            <>{isBroadcaster && hostScreenStatus ? renderLocal() : null}</>
            <>{isBroadcaster ? null : renderHost()}</>
          </>
        )}

        <View style={[styles.absoluteHeader, {top: useSafeAreaInsets().top}]}>
          <View style={styles.headerContainer}>
            <View style={styles.subHeaderContainer}>
              <Touchable
                onPress={() => profileRedirection(hostDetail?._id)}
                style={[
                  styles.profileContainer,
                  styles.profileDetailContainer,
                  {width: isBroadcaster ? '50%' : undefined},
                ]}>
                <View style={{alignItems: 'center'}}>
                  <View style={styles.absoluteCrown}>
                    <SvgIcon.SmallCrown />
                  </View>
                  {hostDetail?.profile ? (
                    <>
                      <SmallProfilePic
                        url={`${IMAGE_URL}${hostDetail?.profile}`}
                      />
                    </>
                  ) : (
                    <View style={styles.picContainer}>
                      <SvgIcon.SmallPicPlaceholder />
                    </View>
                  )}
                </View>

                <View style={[{flex: 1}, styles.padding]}>
                  <MyText numberOfLines={1} style={styles.nameContainer}>
                    {hostDetail?.name || ''}
                  </MyText>

                  <View style={styles.profileContainer}>
                    <SvgIcon.SmallEye />
                    <MyText style={[styles.nameContainer, styles.padding]}>
                      {joinUserCount || 0}
                    </MyText>
                  </View>
                </View>

                {!isBroadcaster && !alreadyFollowing ? (
                  <TouchableIcon
                    style={{padding: 5, zIndex: 100}}
                    onPress={() => _followUnfollow(hostDetail?._id)}
                    customIcon={<SvgIcon.GreenPlus />}
                  />
                ) : null}
              </Touchable>
              <View>
                {showComments && (
                  <View style={styles.profileContainer}>
                    {!!joinedUserDataState?.[0] && (
                      <View
                        style={[
                          {alignItems: 'center', width: SCREEN_HEIGHT * 0.03},
                          styles.imageContainer,
                        ]}>
                        {joinedUserDataState?.[0]?.gift ? (
                          <View style={styles.absoluteCrown}>
                            <SvgIcon.SmallCrown />
                          </View>
                        ) : null}
                        <SmallProfilePic
                          imageStyle={[
                            styles.picContainer,
                            joinedUserDataState?.[0]?.gift
                              ? styles.borderWidth
                              : styles.removeBorder,
                            {borderColor: COLORS.GOLD},
                          ]}
                          url={`${IMAGE_URL}${joinedUserDataState?.[0]?.joinedUsers?.profile}`}
                        />
                      </View>
                    )}

                    {!!joinedUserDataState?.[1] && (
                      <View
                        style={[
                          {alignItems: 'center', width: SCREEN_HEIGHT * 0.03},
                          styles.imageContainer,
                        ]}>
                        {joinedUserDataState?.[1]?.gift ? (
                          <View style={styles.absoluteCrown}>
                            <SvgIcon.SmallCrown />
                          </View>
                        ) : null}

                        <SmallProfilePic
                          imageStyle={[
                            styles.picContainer,
                            joinedUserDataState?.[1]?.gift
                              ? styles.borderWidth
                              : styles.removeBorder,
                            {borderColor: COLORS.SILVER},
                          ]}
                          url={`${IMAGE_URL}${joinedUserDataState?.[1]?.joinedUsers?.profile}`}
                        />
                      </View>
                    )}

                    {!!joinedUserDataState?.[2] && (
                      <View
                        style={[
                          {alignItems: 'center', width: SCREEN_HEIGHT * 0.03},
                          styles.imageContainer,
                        ]}>
                        {joinedUserDataState?.[2]?.gift ? (
                          <View style={styles.absoluteCrown}>
                            <SvgIcon.SmallCrown />
                          </View>
                        ) : null}

                        <SmallProfilePic
                          imageStyle={[
                            styles.picContainer,
                            joinedUserDataState?.[2]?.gift
                              ? styles.borderWidth
                              : styles.removeBorder,
                            {borderColor: COLORS.BRONZE},
                          ]}
                          url={`${IMAGE_URL}${joinedUserDataState?.[2]?.joinedUsers?.profile}`}
                        />
                      </View>
                    )}

                    <TouchableOpacity
                      style={{padding: 5, zIndex: 100}}
                      hitSlop={{top: 20, bottom: 20, right: 20, left: 20}}
                      onPress={_openActiveUserList}>
                      <SvgIcon.SmallPicPlaceholder />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>

            <View>
              {showComments && (
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={endCallPopup}>
                  <Icon
                    origin="AntDesign"
                    name="close"
                    size={16}
                    color={'#fff'}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <Animated.View
            style={{
              transform: [{translateX: pan.x}],
              width: SCREEN_WIDTH,
              backgroundColor: 'transparent',
            }}
            {...panResponder.panHandlers}>
            {showComments && (
              <View style={styles.localStreamingView}>
                <View style={styles.priceContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      alignItems: 'center',
                    }}>
                    <IconWithCount
                      count={hostDetail?.level || 0}
                      style={{
                        paddingVertical: SCREEN_HEIGHT * 0.005,
                      }}
                    />
                    <View style={styles.points}>
                      <IconWithCount
                        source={<SvgIcon.PinkBlueDiamond />}
                        tintColor={COLORS.TRANSPARENT}
                        count={todayEarning || 0}
                        style={{
                          marginLeft: dynamicSize(10),
                          paddingHorizontal: 0,
                        }}
                      />
                      <IconWithCount
                        source={<SvgIcon.SmallLike />}
                        tintColor={COLORS.TRANSPARENT}
                        count={likeCount || 0}
                        style={{marginLeft: dynamicSize(10), paddingLeft: 0}}
                      />
                    </View>
                  </View>
                  <IconWithCount
                    withGradient
                    colors={[COLORS.ORANGE, COLORS.ORANGE1]}
                    source={<SvgIcon.SmallGlowStar />}
                    tintColor={COLORS.TRANSPARENT}
                    text={`${hostExtraDetail?.star} star`}
                    textStyle={{marginLeft: 0}}
                    style={{
                      paddingVertical: SCREEN_HEIGHT * 0.005,
                      paddingHorizontal: dynamicSize(5),
                    }}
                  />
                </View>
              </View>
            )}
          </Animated.View>
          <View style={styles.idContainer}>
            <MyText style={styles.weechaId}>
              Weecha Id : {userLoginList?.user?.userId}
            </MyText>
            <MyText style={styles.weechaId}>
              {moment().format('DD.MM.YY')}
            </MyText>
          </View>
        </View>

        <Touchable
          activeOpacity={1}
          onPress={_closeAllPopup}
          style={{
            top: hp(56),
            position: 'absolute',
            width: SCREEN_WIDTH,
            justifyContent: 'flex-end',
          }}>
          {joinedUserData?.id && renderNewJoinne ? _renderJoinedUsers() : null}
        </Touchable>
        <Animated.View
          style={{
            transform: [{translateX: pan.x}],
            width: SCREEN_WIDTH,
            position: 'absolute',
            height: hp(80),
            bottom: 0,
          }}
          {...panResponder.panHandlers}>
          {showComments && (
            <View style={styles.chatMainContainer}>
              <View
                style={{
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: SCREEN_WIDTH,
                  height: SCREEN_HEIGHT,
                }}>
                {isVisible && imageSrc ? (
                  <MyImage
                    fast
                    source={{uri: imageSrc}}
                    style={{
                      width: SCREEN_WIDTH * 0.5,
                      height: SCREEN_WIDTH * 0.5,
                      backgroundColor: 'transparent',
                    }}
                  />
                ) : null}
              </View>
              <Touchable
                activeOpacity={1}
                onPress={_closeAllPopup}
                style={{
                  flex: 1,
                  width: SCREEN_WIDTH,
                  justifyContent: 'flex-end',
                }}
              />

              <View
                style={[
                  styles.likeVisiblityContainer,
                  {
                    bottom: isBroadcaster
                      ? SCREEN_HEIGHT * 0.12
                      : SCREEN_HEIGHT * 0.06 + useSafeAreaInsets().bottom,
                  },
                ]}>
                {heartFlag ? (
                  <View
                    style={{
                      bottom: hp(12),
                      left: wp(-4),
                      position: 'absolute',
                    }}>
                    <Lottie
                      source={HEART_ANIMATION}
                      autoPlay
                      loop={false}
                      style={styles.heartFlag}
                      onAnimationFinish={() =>
                        isBroadcaster ? setHeartFlag(false) : null
                      }
                    />
                  </View>
                ) : null}
                {!isBroadcaster ? (
                  <>
                    <TouchableIcon
                      style={styles.marginBottom}
                      onPress={onLikeStream}
                      customIcon={
                        likeStatusStream ? (
                          <SvgIcon.SmallLikees />
                        ) : (
                          <SvgIcon.SmallUnlike />
                        )
                      }
                    />
                    <TouchableIcon
                      style={styles.marginBottom}
                      customIcon={<SvgIcon.SmallCall />}
                      onPress={() => {
                        checkCallPossible(CALLING_TYPE.AUDIO);
                      }}
                    />
                    <TouchableIcon
                      style={styles.marginBottom}
                      customIcon={<VideoCallSmallIcon />}
                      onPress={() => {
                        checkCallPossible(CALLING_TYPE.VIDEO);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <Touchable style={styles.translucent}>
                      <MyText style={styles.pkText}>
                        {strings('live.pk')}
                      </MyText>
                    </Touchable>
                    <TouchableIcon
                      customIcon={<SvgIcon.BlueGame />}
                      onPress={() => setShowGames(true)}
                    />
                  </>
                )}
              </View>

              {showGifts ? (
                <GiftComponent
                  fetchingGifts={fetchingGifts}
                  mainContainer={{
                    zIndex: 10,
                    position: 'absolute',
                    bottom: useSafeAreaInsets().bottom,
                  }}
                  onSearch={_onSearch}
                  diamondCount={diamondPoints || 0}
                  topTitleList={giftData}
                  senderId={userLoginList?.user?._id}
                  receiverId={hostDetail?._id}
                  onSendSuccess={_emitGift}
                  onSendClick={() => setShowGift(false)}
                  roomID={channelToken}
                />
              ) : null}

              <KeyboardAwareScrollView
                behavior={isIOS ? 'position' : null}
                enabled
                keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={styles.chatKeyboardScrollViewContainer}
                style={{
                  height: 0,
                }}>
                <ScrollView
                  key="comment"
                  ref={scrollRef}
                  scrollEventThrottle={16}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps={'always'}
                  contentContainerStyle={[styles['scrollView']]}>
                  <View style={styles.chatContainer}>
                    {commentData?.map((item, index) =>
                      _renderComment(item, index),
                    )}
                  </View>
                </ScrollView>
                <View
                  style={[
                    styles.bottomChatRowContainer,
                    {
                      paddingBottom: !isBroadcaster
                        ? useSafeAreaInsets().bottom + SCREEN_HEIGHT * 0.015
                        : SCREEN_HEIGHT * 0.015,
                    },
                  ]}>
                  <Input
                    value={commentText}
                    onFocus={_onFocusTextinput}
                    onChangeText={UpdateCommentText}
                    placeholder={
                      userLiveMute
                        ? strings('live.saySomething')
                        : "You're muted"
                    }
                    svgSource={<SvgIcon.CommentIcon />}
                    style={{
                      minWidth: isKeyboardShow
                        ? SCREEN_WIDTH - dynamicSize(70)
                        : SCREEN_WIDTH / 2,
                    }}
                    textInputStyle={{fontSize: FONT_SIZE.MEDIUM, width: '100%'}}
                    onSubmitEditing={onCommentSend}
                    blurOnSubmit={false}
                    //multiline={true}
                    returnKeyType="done"
                    returnKeyLabel="done"
                    editable={userLiveMute}
                  />

                  {isKeyboardShow && (
                    <Touchable
                      onPress={onCommentSend}
                      style={{
                        padding: dynamicSize(8),
                        borderRadius: dynamicSize(50),
                        backgroundColor: COLORS.VIOLET,
                      }}>
                      <SendIcon width={18} />
                    </Touchable>
                  )}

                  {!isBroadcaster && !isKeyboardShow ? (
                    <View style={styles.subBottomChatRowContainer}>
                      <TouchableIcon
                        customIcon={<SvgIcon.BlueGame />}
                        onPress={() => setShowGames(true)}
                      />
                      <TouchableIcon
                        onPress={_fetchGiftList}
                        customIcon={<SvgIcon.SmallGiftIcon />}
                      />
                      <TouchableIcon customIcon={<SvgIcon.GreenMail />} />
                      <TouchableIcon
                        onPress={() => setIsopen(true)}
                        customIcon={<SvgIcon.SmallShare />}
                      />
                    </View>
                  ) : null}
                </View>
              </KeyboardAwareScrollView>
              {isBroadcaster && (
                <View
                  style={[
                    styles.bottomMenuContainer,
                    {
                      paddingBottom: useSafeAreaInsets().bottom,
                    },
                  ]}>
                  <Touchable
                    onPress={onToggleMicrophone}
                    style={styles.footerIcon}>
                    {isMute ? (
                      <SvgIcon.MuteMicrophoneIcon />
                    ) : (
                      <SvgIcon.MicrophoneIcon />
                    )}
                  </Touchable>
                  <Touchable
                    onPress={onChangeCameraDirection}
                    style={styles.footerIcon}>
                    <SvgIcon.FlipCameraIcon />
                  </Touchable>
                  <Touchable
                    onPress={() => setIsopen(true)}
                    style={styles.footerIcon}>
                    <SvgIcon.ShareIcon />
                  </Touchable>
                  <Touchable onPress={onShare} style={styles.footerIcon}>
                    <SvgIcon.MoreOption />
                  </Touchable>
                </View>
              )}
            </View>
          )}
        </Animated.View>
      </SafeArea>
      {visible && (
        <View
          style={{
            position: 'absolute',
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH,
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={[
              styles.modalContainer,
              alreadyFollowing && {
                flex: 0.39,
              },
            ]}>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
              }}
              style={{
                alignSelf: 'flex-end',
                marginBottom: dynamicSize(15),
                marginRight: dynamicSize(10),
              }}>
              <CrossPink width={dynamicSize(45)} height={dynamicSize(45)} />
            </TouchableOpacity>
            <Image
              source={{uri: `${IMAGE_URL}${hostDetail?.profile}`}}
              style={styles.modalImg}
            />
            {alreadyFollowing ? (
              <Text style={styles.modalText}>
                Are you sure you want to exit live streaming?
              </Text>
            ) : (
              <Text style={styles.modalText}>
                You've been watching for a while. Why not follow this talent so
                you can catch them next time?
              </Text>
            )}
            {!alreadyFollowing && (
              <Button
                onPress={() => _followUnfollow(hostDetail?._id)}
                buttonStyle={styles.buttonStyle}
                width={wp(80)}
                label={'Follow and leave'}
                labelStyle={styles.btntext}
              />
            )}
            <Button
              onPress={_endCallAudiance}
              buttonStyle={[
                styles.buttonStyle,
                {
                  backgroundColor: '#F5F6FA',
                },
              ]}
              width={wp(80)}
              label={'Leave'}
              labelStyle={[
                styles.btntext,
                {
                  color: COLORS.LIGHT_MAGENTA,
                },
              ]}
            />
          </View>
        </View>
      )}

      <RBSheet
        ref={liveEndSuggestionRef}
        height={SCREEN_HEIGHT}
        openDuration={250}
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}>
        <LinearGradient
          style={{width: '100%', height: '100%'}}
          colors={['rgb(255,234,253)', '#FFBCFC', '#5E94FF']}>
          <SafeAreaView />
          <Touchable
            onPress={() => navigation.navigate('LiveSection')}
            style={{
              alignItems: 'flex-end',
              marginRight: dynamicSize(20),
              marginTop: dynamicSize(20),
            }}>
            <SvgIcon.TranslucentClose />
          </Touchable>

          <View
            style={{
              width: 160,
              height: 160,
              borderRadius: 80,
              alignSelf: 'center',
              marginTop: 20,
            }}>
            <Image
              source={{
                uri:
                  IMAGE_URL + liveEndSuggestionData?.[0]?.userData[0]?.profile,
              }}
              style={{
                width: 160,
                height: 160,
                borderRadius: 80,
                alignSelf: 'center',
              }}
            />
            {!liveEndSuggestionData?.[0]?.followByMe && !alreadyFollowing && (
              <Touchable
                onPress={() => _followUnfollow(hostDetail?._id)}
                style={{
                  right: -20,
                  bottom: 0,
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  alignItems: 'center',
                  flexDirection: 'row',
                  position: 'absolute',
                  justifyContent: 'center',
                  backgroundColor: COLORS.BABY_PINK,
                }}>
                <MyText style={{color: 'white'}}>Follow</MyText>
                <SvgIcon.GreenPlus />
              </Touchable>
            )}
          </View>

          <MyText style={{marginTop: 8, textAlign: 'center', fontSize: 18}}>
            {liveEndSuggestionData?.[0]?.userData[0]?.name}
          </MyText>
          <MyText
            style={{
              marginTop: 36,
              textAlign: 'center',
              fontSize: 20,
              fontWeight: '600',
            }}>
            Live Ended
          </MyText>
          <View
            style={{
              width: SCREEN_WIDTH - dynamicSize(40),
              backgroundColor: 'white',
              alignSelf: 'center',
              paddingHorizontal: 14,
              flexDirection: 'row',
              borderRadius: 8,
              justifyContent: 'space-between',
              marginTop: 16,
              paddingVertical: 20,
            }}>
            <MyText style={{fontSize: 18}}>Live Duration</MyText>
            <MyText style={{fontSize: 18}}>
              {liveEndSuggestionData?.[0]?.liveDuration}
            </MyText>
          </View>

          <FlatList
            horizontal
            data={liveUserList}
            contentContainerStyle={{
              width: SCREEN_WIDTH - dynamicSize(40),
              height: '50%',
              marginLeft: dynamicSize(20),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            renderItem={data => {
              const {item, index} = data;

              if (index > 3) {
                return null;
              }
              return (
                <Touchable
                  onPress={() => _joinAsAudience(item)}
                  style={[
                    styles.liveimageContainer,
                    {marginTop: 20, backgroundColor: 'green'},
                  ]}>
                  {item.coverImage ? (
                    <MyImage
                      fast
                      borderRadius={5}
                      resizeMode={'cover'}
                      style={{width: '100%', height: '100%'}}
                      source={{uri: `${IMAGE_URL}${item.coverImage}`}}
                    />
                  ) : (
                    <MyImage
                      fast
                      borderRadius={5}
                      resizeMode={'cover'}
                      style={{width: '100%', height: '100%'}}
                      source={{uri: `${IMAGE_URL}${item.profile}`}}
                    />
                  )}
                </Touchable>
              );
            }}
          />
        </LinearGradient>
      </RBSheet>

      {pageXY && (
        <TouchableOpacity
          onPress={() => {
            setPageXY(null);
          }}
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT / 2,
            backgroundColor: COLORS.TRANSPARENT,
            position: 'absolute',
            bottom: SCREEN_HEIGHT - pageXY.y,
          }}>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: SCREEN_WIDTH - dynamicSize(300),
              width: wp(50),
              borderRadius: wp(2),
              backgroundColor: COLORS.WHITE,
              shadowOpacity: 0.2,
              shadowOffset: {width: wp(1), height: wp(1)},
              zIndex: 100000,
              paddingVertical: wp(3),
              paddingHorizontal: wp(2),
            }}>
            {OPTIONS[isBroadcaster].map(opt => {
              return (
                <Touchable
                  onPress={() => {
                    handleMore(opt);
                    setPageXY(null);
                  }}
                  style={{
                    paddingVertical: hp(0.5),
                    borderBottomWidth: 1,
                    borderColor: '#0000000D',
                  }}>
                  <MyText style={styles.options}>{opt}</MyText>
                </Touchable>
              );
            })}
          </View>
        </TouchableOpacity>
      )}
      <Actionsheet isOpen={isOpen} onClose={closeModal}>
        <Actionsheet.Content alignItems={'center'}>
          <View
            style={{
              justifyContent: 'center',
              width: '100%',
              paddingHorizontal: wp(4),
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                marginTop: hp(1),
              }}
              onPress={Invite}>
              <View
                style={{
                  width: wp(15),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <SvgIcon.inviteFrnd width={wp(4)} />
              </View>
              <Text style={[styles.options]}>Share </Text>
            </TouchableOpacity>
            <View style={styles.seperator} />
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                marginTop: hp(1),
              }}
              onPress={() => {
                setIsopen(false);
                navigation.navigate('ShareWeechaFriends', {
                  channelToken: channelToken,
                  channelName: channelName,
                  link: 'https://www.google.com',
                  hostId: hostDetail?._id,
                });
              }}>
              <View
                style={{
                  width: wp(15),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <SvgIcon.WeechaShare width={wp(4)} />
              </View>
              <Text style={[styles.options]}>Friends </Text>
            </TouchableOpacity>
          </View>
        </Actionsheet.Content>
      </Actionsheet>
      <Game visible={showGames} setVisible={setShowGames} />
    </>
  );
};

export default LiveStreaming;
