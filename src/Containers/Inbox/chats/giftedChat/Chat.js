import SocketIOClient from 'socket.io-client';
import {Alert, Animated, Platform, StyleSheet, View} from 'react-native';
import {GiftedChat, MessageText} from 'react-native-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import React, {useState, useEffect, useMemo, useRef} from 'react';
import {io} from 'socket.io-client';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import initialMessages from './messages';
import {COLORS} from '../../../../Utils/colors';
import ChatHeader from '../../components/ChatHeader';
import {dynamicSize} from '../../../../Utils/responsive';
import {
  IMAGE_URL,
  SERVER_API,
  SOCKET_URL,
} from '../../../../Services/Api/Common';
import {HelperService} from '../../../../Services/Utils/HelperService';
import {CHAT_MESSAGE_TYPE, SOCKET_EVENTS} from '../../../../Utils/chatHelper';
import {
  CustomModal,
  MyIndicator,
  MyText,
  Touchable,
} from '../../../../Component/commomComponent';

import {
  getChatHistoryAction,
  getCAllingDetailAction,
  updateChatHistoryAction,
  appendSocketChatDataAction,
  uploadChatMediaFileAction,
  getAnotherUserProfile,
  deleteOneMessage,
  updatingChatOnRemoveOneMsg,
  followUserAction,
  getFollowingListAction,
  userBlockFromLive,
  getBlockListAction,
  unBlockUserAction,
  getGiftDataAction,
  hostDetailAction,
  getHostExtraDetailAction,
} from '../../../../Redux/Action';

import requestCameraAndAudioPermission, {
  CALLING_STATUS,
  CALLING_TYPE,
  SCREEN_HEIGHT,
  requestAudioPermission,
  imagePicker,
  uuid,
  openCamera,
  dismissKeyboard,
  isIOS,
} from '../../../../Utils/helper';

import {
  renderSend,
  renderActions,
  renderComposer,
  renderChatFooter,
  renderInputToolbar,
} from './InputToolbar';

import {
  renderAvatar,
  renderBubble,
  renderMessage,
  renderCustomView,
  renderSystemMessage,
  CustomMessageText,
} from './MessageContainer';

import {
  incomingCallQuery,
  checkNodePresentOrNot,
} from '../../../../firebase/nodeQuery';
import {FONT_FAMILY, FONT_SIZE} from '../../../../Utils/fontFamily';
import SelectImageDialog from '../../../../Component/SelectImageDialog';
import ReportModal from '../../../../Component/ReportModal';
// import {socket} from '../../../../Services/Sockets/sockets';
import {
  getEndUserDetailApi,
  getUserHaveBalance,
} from '../../../../Services/Api/LiveStreaming';
import GiftComponent from '../../../../Component/giftComponent';
import {STREAM_TYPE} from '../../../../Utils/agoraConfig';

const dataLimit = 20,
  initialReply = {
    replyId: null,
    text: '',
    user: null,
  };

let timeout = null;

const PersonalChat = props => {
  // const socket = useMemo(() => {
  //   return SocketIOClient(SERVER_API, {
  //     reconnectionDelay: 1000,
  //     reconnection: true,
  //     jsonp: false,
  //     transports: ['websocket'],
  //   });
  // }, []);

  const socket = useMemo(() => {
    return io(SOCKET_URL, {
      reconnection: true,
      jsonp: false,
      reconnectionDelay: 1000,
      transports: ['websocket'],
    });
  }, [chatId]);

  const liveEndSuggestionRef = useRef();
  const dispatch = useDispatch();
  const state = useSelector(state => {
    return state;
  });
  const {kickedOutRooms, blockedLiveRooms} = useSelector(
    state => state.streamingReducer,
  );

  const safeArea = useSafeAreaInsets();

  const {userLoginList} = state.authReducer;
  const {chatHistory} = state.chatReducer;
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [sendMedia, setSendMedia] = useState('');
  const [loading, setLoading] = useState(false);
  const [reportVisible, setReportVisible] = useState(false);
  const [startCallIndicator, setStartCallIndicator] = useState(false);
  const [flatListReady, setFlatListReady] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);
  const [replyMsg, setReplyMsg] = useState(initialReply);
  const [deleteOneMsg, setDeleteOneMsg] = useState('');
  const [isFollow, setIsFollow] = useState(false);
  const [isBlock, setIsBlock] = useState(false);
  const [showGifts, UpdateShowGift] = useState(false);
  const [fetchingGifts, setFetchingGifts] = useState(false);
  const [giftData, updateGiftData] = useState([]);
  const [mute, setMute] = useState(false);
  const [liveEndSuggestionData, updateEndLiveSuggestionData] = useState();

  const [diamondPoints, setDiamondPoints] = useState(
    userLoginList?.user?.myBalance,
  );

  const [marginBottonOnGiftInputFocus, setMarginBottonOnGiftInputFocus] =
    useState(0);

  const paginationOffset = useRef(0);
  const totalRecord = useRef(0);
  const waitTillFetchingData = useRef(true);
  const refImageDialog = useRef();

  let MORE_DATA = [
    !isFollow ? 'follow' : 'Unfollow',
    !isBlock ? 'Block' : 'Unblock',
    'Report',
    !mute ? 'Mute' : 'Unmute',
  ];

  const detail = useMemo(() => {
    return props?.route?.params || {};
  }, [props?.route?.params]);

  const chatId = useMemo(() => {
    if (detail?.chatId) return detail?.chatId;
    else return null;
  }, [detail?.chatId]);

  const receiverId = useMemo(() => {
    if (detail?.receiverId) {
      return detail?.receiverId;
    } else return '';
  }, [detail?.receiverId]);

  useEffect(() => {
    paginationOffset.current = 0;
    if (chatId) {
      _joinChat();
      _receiveListners();
      _fetchChatHistory();
    }
  }, [chatId]);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  const _fetchChatHistory = () => {
    const param = {
      start: paginationOffset.current,
      limit: dataLimit,
      chatId: chatId,
      search: '',
      status: 'Sent',
    };
    dispatch(
      getChatHistoryAction(param, paginationOffset.current, result => {
        if (result.totalCount) {
          totalRecord.current = result.totalCount;
        }
        if (!result.data.length) setShowIndicator(false);
        waitTillFetchingData.current = true;
      }),
    );
  };

  const _joinChat = () => {
    // if (socket.connected) {
    const param = {
      chat_id: chatId,
    };
    socket.emit(SOCKET_EVENTS.CHAT_JOIN, param);
    // }
  };

  const _receiveListners = () => {
    socket
      .off(SOCKET_EVENTS.SEND_MESSAGE)
      .on(SOCKET_EVENTS.SEND_MESSAGE, data => {
        if (data.type == CHAT_MESSAGE_TYPE.CONTENT) {
          const localMessage = {
            _id: data._id,
            text: data.content,
            createdAt: data.createdAt,
            user: data?.user,
          };
          if (data?.isReply?.replyId) {
            localMessage.isReply = data?.isReply;
          }
          dispatch(appendSocketChatDataAction(localMessage));
        } else if (data.type == CHAT_MESSAGE_TYPE.DOCUMENT) {
          const localMessage = {
            _id: data._id,
            text: '',
            createdAt: data.createdAt,
            user: data?.user,
            image: data?.image,
          };
          if (data?.isReply?.replyId) {
            localMessage.isReply = data?.isReply;
          }
          dispatch(appendSocketChatDataAction(localMessage));
        }
      });
  };

  const _onScroll = () => {
    setFlatListReady(true);
  };

  const _fetchOldChatMessages = () => {
    if (!flatListReady) return;
    if (
      paginationOffset.current < totalRecord.current &&
      waitTillFetchingData.current &&
      navigation.isFocused()
    ) {
      setShowIndicator(true);
      paginationOffset.current = paginationOffset.current + dataLimit;
      _fetchChatHistory();
    }
  };

  const checkMessageSendPossible = async () => {
    const data = {
      senderId: userLoginList?.user?._id,
      receiverId: detail.receiverId,
      type: 'CHAT',
    };

    try {
      const response = await getUserHaveBalance(data);
      if (response.data.data) {
        _sendMessage();
      }
    } catch (error) {
      const data = error.response.data;
      alert(data.message);
    }
  };

  const _sendMessage = () => {
    if (text) {
      const param = {
        chatId: chatId,
        senderId: userLoginList?.user?._id,
        receiverId: receiverId,
        content: text,
        type: CHAT_MESSAGE_TYPE.CONTENT,
        user: {
          _id: userLoginList?.user?._id,
          name: userLoginList?.user?.name,
          avatar: `${IMAGE_URL}${userLoginList?.user?.profile}`,
        },
        userName: userLoginList?.user?.name,
        userProfile: `${IMAGE_URL}${userLoginList?.user?.profile}`,
      };
      if (replyMsg?.replyId) {
        param.replyMessageId = replyMsg.replyId;
        param.replyMessage = replyMsg.text;
        param.isReply = {...replyMsg, name: replyMsg.user};
        setReplyMsg(initialReply);
      }
      socket.emit(SOCKET_EVENTS.SEND_MESSAGE, param);
      setText('');
    }
  };

  const callBack = selected => {
    setSendMedia(selected);
  };

  const renderBubbleCallBack = reply => {
    setReplyMsg(reply);
  };

  const setReplyCallback = reply => {
    setReplyMsg(reply);
  };

  const _renderIndicator = () => (
    <MyIndicator
      style={{marginVertical: SCREEN_HEIGHT * 0.02}}
      color={COLORS.PRIMARY_BLUE}
    />
  );

  const checkCallPossible = type => async () => {
    const data = {
      senderId: userLoginList?.user?._id,
      receiverId: detail.receiverId,
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

    if (permissionGranted && detail) {
      try {
        const userBusyorNot = await checkNodePresentOrNot(detail.receiverId);
        if (userBusyorNot) {
          HelperService.showToast('User is busy on another call.');
          return;
        }

        setStartCallIndicator(true);
        const param = {
          callerId: userLoginList?.user?._id,
          receiverId: detail.receiverId,
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
                receiverId: detail.receiverId,
                receiverName: detail.name,
                receiverProfilePic: detail.profile,
                callerId: userLoginList?.user?._id,
                callerName: userLoginList?.user?.name,
                callerProfilePic: userLoginList?.user?.profile,
                callerPoints: userLoginList?.user?.points,
                receiverPoints: detail?.points,
              };
              incomingCallQuery(detail.receiverId).set(callingParams);
              props.navigation.navigate('VideoCall', callingParams);
            }
            setStartCallIndicator(false);
          }),
        );
      } catch (error) {
        console.log('error while call creation', error.message);
      }
    }
  };

  const _performAction = async onPressType => {
    try {
      setShowMore(false);
      dismissKeyboard();
      if (onPressType == 'CAMERA' || onPressType == 'GALLERY') {
        const file =
          onPressType == 'CAMERA'
            ? await openCamera('photo', true, true)
            : await imagePicker('photo', true, true);
        const param = {
          file: file.base64,
          fileId: chatId,
          chatId: chatId,
        };
        if (param?.file) {
          dispatch(
            uploadChatMediaFileAction(param, result => {
              if (result) {
                const sendParam = {
                  chatId: chatId,
                  senderId: userLoginList?.user?._id,
                  receiverId: receiverId,
                  content: `${IMAGE_URL}${result?.data}`,
                  type: CHAT_MESSAGE_TYPE.DOCUMENT,
                  user: {
                    _id: userLoginList?.user?._id,
                    name: userLoginList?.user?.name,
                    avatar: `${IMAGE_URL}${userLoginList?.user?.profile}`,
                  },
                  image: `${IMAGE_URL}${result?.data}`,
                };
                if (replyMsg?.replyId) {
                  sendParam.replyMessageId = replyMsg.replyId;
                  sendParam.isReply = replyMsg;
                  setReplyMsg(initialReply);
                }
                socket.emit(SOCKET_EVENTS.SEND_MESSAGE, sendParam);
              }
            }),
          );
        }
      } else if (onPressType == 'GIFT') {
        _fetchGifts();
        showGift();
      }
    } catch (error) {
      console.log('error=>', error);
    }
  };

  const profileRedirection = () => {
    dispatch(
      getAnotherUserProfile({userId: detail?.receiverId}, data => {
        if (data?.user) {
          props.navigation.navigate('UserProfile', data?.user);
        }
      }),
    );
  };

  const _followUnfollow = () => {
    setLoading(true);
    const param = {
      followByUserId: userLoginList?.user?._id,
      followToUserId: detail?.receiverId,
    };
    dispatch(
      followUserAction(param, result => {
        if (result) {
          setIsFollow(!isFollow);
        }
        setLoading(false);
        setShowMore(false);
      }),
    );
  };

  const _Block = () => {
    const param = {
      userId: detail?.receiverId,
      blockedBy: userLoginList?.user?._id,
    };
    dispatch(
      userBlockFromLive(param, result => {
        if (result) {
          setIsBlock(!isBlock);
        }
        setShowMore(false);
      }),
    );
  };

  const _UnBlock = () => {
    let blockIdsArr = [];
    blockIdsArr.push(detail?.receiverId);
    dispatch(
      unBlockUserAction(blockIdsArr, result => {
        if (result) {
          setIsBlock(!isBlock);
        }
        setShowMore(false);
      }),
    );
  };

  const handleMore = () => {
    setShowMore(!showMore);
  };

  const handleReport = () => {
    setReportVisible(true);
    setShowMore(false);
  };

  const handleMute = () => {
    setMute(!mute);
    setShowMore(false);
  };

  const handleMoreItem = key => {
    switch (key) {
      case 'follow':
        return _followUnfollow();
      case 'Unfollow':
        return _followUnfollow();
      case 'Block':
        return _Block();
      case 'Unblock':
        return _UnBlock();
      case 'Report':
        return handleReport();

      case 'Mute':
      case 'Unmute':
        return handleMute();

      default:
        break;
    }
  };

  const _closeReportVisible = () => {
    setReportVisible(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        getFollowingListAction(
          {
            start: 0,
            limit: 100,
            userId: userLoginList?.user?._id,
            search: '',
          },
          list => {
            const newList = list?.data?.map(ele => ele?.followToUser?._id);
            let isFollowed = newList.includes(detail?.receiverId);
            setIsFollow(isFollowed);
          },
        ),
      );
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        getBlockListAction(
          {
            start: 0,
            limit: 100,
            userId: userLoginList?.user?._id,
            search: '',
          },
          list => {
            const newList = list?.data?.map(ele => ele?.userData?._id);
            let isBlocked = newList.includes(detail?.receiverId);
            setIsBlock(isBlocked);
          },
        ),
      );
    }, []),
  );

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

  const _onGiftChatInputFocus = () => {
    setMarginBottonOnGiftInputFocus(dynamicSize(50));
  };

  const _onGiftChatInputBlur = () => {
    setMarginBottonOnGiftInputFocus(dynamicSize(0));
  };

  const showGift = () => UpdateShowGift(true);

  const hideGift = () => UpdateShowGift(false);

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

  const fetchEndLiveDetails = async channelToken => {
    const data = {
      roomId: channelToken,
    };

    const responseData = await getEndUserDetailApi(data);
    if (responseData.code === 201 || responseData.code === 200) {
      return responseData?.data[0]?.userData[0];
    }
  };

  const _joinAsAudience = async item => {
    const fetchedResponse = await fetchEndLiveDetails(item?.channelToken);

    for (const prop in fetchedResponse) {
      if (prop !== '_id') {
        item[prop] = fetchedResponse[prop];
      }
    }

    if (kickedOutRooms?.includes(item?.channelToken)) {
      return Alert.alert('You have been kicked out from this live');
    }
    if (blockedLiveRooms?.includes(item?.channelToken)) {
      return Alert.alert('You have been Blocked from this live');
    }
    dispatch(
      hostDetailAction({
        ...item,
      }),
    );
    navigation.navigate('liveStreaming', {
      ...item,
      type: STREAM_TYPE.AUDIENCE,
      channel: item?.channelName,
      token: item?.channelToken,
    });
    dispatch(getHostExtraDetailAction(item?._id));
  };

  const renderMessage = props => {
    if (props.currentMessage.isReply) {
      return <CustomMessageText {...props} />;
    }
    if (props.currentMessage.type === 'Live') {
      return (
        <Touchable
          onPress={() => _joinAsAudience(props.currentMessage)}
          style={{
            paddingHorizontal: dynamicSize(10),
            paddingVertical: dynamicSize(5),
          }}>
          <MyText
            style={{
              fontFamily: FONT_FAMILY.POPPINS_REGULAR,
              fontSize: 13,
              lineHeight: 24,
              color: COLORS.PRIMARY_BLUE,
            }}>
            This is Live Link
          </MyText>
        </Touchable>
      );
    }
    return (
      <>
        <MessageText
          {...props}
          containerStyle={{
            left: {
              // backgroundColor: COLORS.WHITE,
              // borderRadius: wp(4),
              // backgroundColor:
              //   props.currentMessage?.type === 'Live' ? 'red' : 'blue',
            },
            right: {
              // backgroundColor: COLORS.BABY_PINK,
              // borderRadius: wp(4),
              // backgroundColor:
              //   props.currentMessage?.type === 'Live' ? 'red' : 'blue',
            },
          }}
          textStyle={{
            left: {
              color: COLORS.BLACK,
            },
            right: {color: COLORS.BLACK},
          }}
          linkStyle={{
            left: {color: COLORS.PRIMARY_BLUE},
            right: {color: COLORS.PRIMARY_BLUE},
          }}
          customTextStyle={{
            fontFamily: FONT_FAMILY.POPPINS_REGULAR,
            fontSize: 13,
            lineHeight: 24,
          }}
        />
      </>
    );
  };

  return (
    <>
      <ChatHeader
        title={detail?.name}
        handleTitle={profileRedirection}
        handleBack={() => navigation.goBack()}
        handleMore={handleMore}
        avatarSource={{uri: `${IMAGE_URL}${detail?.profile}`}}
        handleVideoCall={checkCallPossible(CALLING_TYPE.VIDEO)}
        handleAudioCall={checkCallPossible(CALLING_TYPE.AUDIO)}
      />
      {showMore ? (
        <View style={[styles.moreModal]}>
          {MORE_DATA.map((item, i) => (
            <Touchable
              disabled={loading}
              onPress={() => handleMoreItem(item)}
              style={[
                styles.moreItem,
                i !== MORE_DATA.length - 1 && {
                  borderBottomWidth: 1,
                },
              ]}>
              <MyText style={styles.moreTxt}>{item}</MyText>
            </Touchable>
          ))}
        </View>
      ) : null}

      {showGifts ? (
        <View
          style={{
            zIndex: 1,
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: 'transparent',
          }}>
          <Touchable
            onPress={hideGift}
            activeOpacity={1}
            style={{
              width: '100%',
              backgroundColor: 'rgba(255,255,255,0.4)',
              height: SCREEN_HEIGHT - SCREEN_HEIGHT / 2.8,
            }}
          />
          <GiftComponent
            onBlur={_onGiftChatInputBlur}
            fetchingGifts={fetchingGifts}
            onFocus={_onGiftChatInputFocus}
            mainContainer={{
              position: 'absolute',
              opacity: 1,
              bottom: useSafeAreaInsets().bottom,
              // SCREEN_HEIGHT * 0.015,
              borderWidth: 1,

              zIndex: 10,
            }}
            onSearch={_onSearch}
            diamondCount={diamondPoints || 0}
            topTitleList={giftData}
            senderId={userLoginList?.user?._id}
            receiverId={detail?.receiverId}
            onSendSuccess={data => {
              const param = {
                chatId: chatId,
                senderId: userLoginList?.user?._id,
                receiverId: receiverId,
                content: `${data?.totalCount} gift's send`,
                type: CHAT_MESSAGE_TYPE.CONTENT,
                user: {
                  _id: userLoginList?.user?._id,
                  name: userLoginList?.user?.name,
                  avatar: `${IMAGE_URL}${userLoginList?.user?.profile}`,
                },
                userName: userLoginList?.user?.name,
                userProfile: `${IMAGE_URL}${userLoginList?.user?.profile}`,
              };
              if (replyMsg?.replyId) {
                param.replyMessageId = replyMsg.replyId;
                param.replyMessage = replyMsg.text;
                param.isReply = {...replyMsg, name: replyMsg.user};
                setReplyMsg(initialReply);
              }
              socket.emit(SOCKET_EVENTS.SEND_MESSAGE, param);
            }}
            onSendClick={hideGift}
            // roomID={channelToken}
          />
        </View>
      ) : null}

      <GiftedChat
        messages={chatHistory}
        text={text}
        onInputTextChanged={setText}
        user={{
          _id: userLoginList?.user?._id,
          name: userLoginList?.user?.name,
          avatar: `${IMAGE_URL}${userLoginList?.user?.profile}`,
        }}
        sendMessage={checkMessageSendPossible}
        alwaysShowSend
        bottomOffset={0}
        minInputToolbarHeight={0}
        onPressAvatar={() => {}}
        renderInputToolbar={props =>
          renderInputToolbar({safeArea, sendMedia, ...props}, _performAction)
        }
        renderChatFooter={props =>
          renderChatFooter({replyMsg, setReplyCallback, ...props})
        }
        renderLoading={_renderIndicator}
        renderLoadEarlier={_renderIndicator}
        loadEarlier={showIndicator}
        renderAvatar={null}
        renderBubble={props =>
          renderBubble({
            renderBubbleCallBack,
            ...props,
            deleteOneMsg,
            userId: userLoginList?.user?._id,
          })
        }
        renderSystemMessage={null}
        onPress={(context, message) => setDeleteOneMsg('')}
        onLongPress={(context, message) => {
          const options = ['copy', 'Delete Message', 'Cancel'];
          const cancelButtonIndex = options.length - 1;
          context.actionSheet().showActionSheetWithOptions(
            {
              options,
              cancelButtonIndex,
            },
            buttonIndex => {
              switch (buttonIndex) {
                case 0:
                  Clipboard.setString(message.text);
                  break;
                case 1:
                  dispatch(
                    deleteOneMessage({messageId: message?._id}, () => {
                      dispatch(updatingChatOnRemoveOneMsg(message?._id));
                    }),
                  );
                  break;
              }
            },
          );
        }}
        renderMessageText={renderMessage}
        messagesContainerStyle={{
          paddingBottom: isIOS
            ? safeArea.bottom + dynamicSize(50)
            : safeArea.bottom + dynamicSize(90),
          backgroundColor: COLORS.WHITE,
        }}
        listViewProps={{
          onScroll: _onScroll,
          // scrollEventThrottle: 400,
          // onEndReachedThreshold: 0.1, // When the top of the content is within 3/10 of the visible length of the content
          onEndReached: _fetchOldChatMessages,
        }}
        parsePatterns={linkStyle => [
          {
            pattern: /#(\w+)/,
            style: linkStyle,
            onPress: tag => {},
          },
        ]}
        isKeyboardInternallyHandled={true}
      />
      {reportVisible && (
        <ReportModal
          isVisible={reportVisible}
          onRequestClose={_closeReportVisible}
          reportBy={userLoginList?.user?._id}
          selectedUserId={detail?.receiverId}
        />
      )}
      {/* {sendMedia === 'GIFT' ? (
        <CustomModal isVisible children={<GiftComponent />} />
      ) : null} */}
    </>
  );
};

export default PersonalChat;

const styles = StyleSheet.create({
  moreModal: {
    zIndex: 100,
    elevation: 5,
    right: wp(7),
    width: wp(40),
    height: hp(20),
    borderRadius: wp(2),
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: COLORS.WHITE,
    top: Platform.OS === 'ios' ? hp(8) : hp(3),
  },
  moreItem: {
    paddingVertical: hp(1),
    borderColor: COLORS.BLACK + '10',
  },
  moreTxt: {
    paddingHorizontal: wp(2),
    fontSize: FONT_SIZE.MEDIUM,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
});
