import moment from 'moment';
import {EmojiKeyboard} from 'rn-emoji-keyboard';
import FastImage from 'react-native-fast-image';
import ImageView from 'react-native-image-viewing';
import {useDispatch, useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import React, {useEffect, useRef, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  View,
  Keyboard,
  FlatList,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';

import {styles} from './styles';
import {
  MyText,
  MyImage,
  Touchable,
  MyTextInput,
} from '../../../../Component/commomComponent';
import {COLORS} from '../../../../Utils/colors';
import {SvgIcon} from '../../../../Component/icons';
import Header from '../../../../Component/header/Header';
import {dynamicSize} from '../../../../Utils/responsive';
import {IMAGE_URL} from '../../../../Services/Api/Common';
import CrownIcon from '../../../../Assets/Icons/crown.svg';
import {socket} from '../../../../Services/Sockets/sockets';
import CameraIcon from '../../../../Assets/Icons/CameraChatIcon.svg';
import GalleryIcon from '../../../../Assets/Icons/GalleryChatIcon.svg';
import {SOCKET_EVENTS, CHAT_MESSAGE_TYPE} from '../../../../Utils/chatHelper';

import {
  removeGrpMember,
  getGrpMsgsAction,
  getAnotherUserProfile,
  uploadChatMediaFileAction,
  appendSocketGroupChatDataAction,
  hostDetailAction,
  getHostExtraDetailAction,
} from '../../../../Redux/Action';
import requestCameraAndAudioPermission, {
  getCountryDetailWithKey,
} from '../../../../Utils/helper';
import {HelperService} from '../../../../Services/Utils/HelperService';
import {getEndUserDetailApi} from '../../../../Services/Api/LiveStreaming';
import {FONT_FAMILY} from '../../../../Utils/fontFamily';
import {STREAM_TYPE} from '../../../../Utils/agoraConfig';

const GIRL_IMG = require('../../../../Assets/Images/girl.png');

const emojiStyle = {
  container: {
    borderRadius: 0,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
};

const dataLimit = 20,
  initialReply = {
    replyId: null,
    text: '',
    user: null,
  };

const options = {
  selectionLimit: 1,
  mediaType: 'photo',
  includeBase64: true,
};

const GroupChat = ({navigation, route}) => {
  const {params: groupInfo} = route;
  const [text, setText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [emoji, setEmoji] = useState('');
  const [emojiArr, setEmojiArr] = useState('');
  const [flatListReady, setFlatListReady] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);
  const [replyMsg, setReplyMsg] = useState(initialReply);
  const [visible, setIsVisible] = useState(false);
  const [exitModal, setExitModal] = useState(false);
  const [grpModal, setGrpModal] = useState(false);
  const [mute, setUnmute] = useState(false);

  const flatListRef = useRef(0);
  const paginationOffset = useRef(0);
  const totalRecord = useRef(0);
  const waitTillFetchingData = useRef(true);
  const refImageDialog = useRef();

  const dispatch = useDispatch();
  const state = useSelector(state => {
    return state;
  });

  const {userLoginList} = state.authReducer;
  const {grpChatHistory} = state.chatReducer;
  const {kickedOutRooms, blockedLiveRooms} = useSelector(
    state => state.streamingReducer,
  );

  const GRP_ACTIONS = [
    'Edit Group',
    'Exit Group',
    `${!mute ? 'Mute' : 'Unmute'}`,
  ];

  useEffect(() => {
    paginationOffset.current = 0;
    if (groupInfo?._id) {
      _readMessage();
      _receiveListners();
      _fetchChatHistory();
    }
  }, [groupInfo?._id]);

  const _readMessage = () => {
    socket
      .off(SOCKET_EVENTS.READ_GRP_MESSAGE)
      .on(SOCKET_EVENTS.READ_GRP_MESSAGE, data => {});
  };

  const _receiveListners = () => {
    socket
      .off(SOCKET_EVENTS.SEND_GRP_MESSAGE)
      .on(SOCKET_EVENTS.SEND_GRP_MESSAGE, data => {
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
          dispatch(appendSocketGroupChatDataAction(localMessage));
        } else if (data.type == CHAT_MESSAGE_TYPE.DOCUMENT) {
          const localMessage = {
            _id: data._id,
            text: '',
            createdAt: data.createdAt,
            user: data?.user,
            image: data?.image,
            type: data?.type,
          };
          if (data?.isReply?.replyId) {
            localMessage.isReply = data?.isReply;
          }
          dispatch(appendSocketGroupChatDataAction(localMessage));
        }
      });
  };

  const leftHeaderComponent = (
    <View style={styles.backContainer}>
      <Touchable
        style={{padding: dynamicSize(2)}}
        onPress={() => navigation?.goBack()}>
        <FontAwesome5Icon
          name={'chevron-left'}
          color={COLORS.WHITE}
          size={dynamicSize(18)}
          style={{
            paddingRight: wp(1),
          }}
        />
      </Touchable>
      <Touchable
        style={styles.backContainer}
        onPress={() => navigation?.navigate('GroupDetails', {groupInfo})}>
        {groupInfo?.icon !== 'chat_group/default.png' ? (
          <FastImage
            style={styles.profilePic}
            source={{
              uri: `${IMAGE_URL}${groupInfo?.icon}`,
              priority: FastImage.priority.normal,
            }}
          />
        ) : (
          <View style={[styles.profilePic, styles.grpIcon]}>
            <FontAwesome5Icon
              name={'users'}
              color={COLORS.WHITE}
              size={wp(4)}
            />
          </View>
        )}
        <MyText numberOfLines={1} style={styles.grpName}>
          {groupInfo?.groupName}
        </MyText>
      </Touchable>
    </View>
  );
  const rightHeaderComponent = (
    <Touchable onPress={() => setGrpModal(!grpModal)} style={styles.next}>
      <Entypo
        color={COLORS.WHITE}
        size={dynamicSize(18)}
        name={'dots-three-vertical'}
      />
    </Touchable>
  );

  const handlePick = emojiObject => {
    setEmoji(emojiObject.emoji);
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
    const fetchedResponse = await fetchEndLiveDetails(
      item?.liveRoomData?.channel_token,
    );

    for (const prop in fetchedResponse) {
      item[prop] = fetchedResponse[prop];
    }

    if (kickedOutRooms?.includes(item?.liveRoomData?.channel_token)) {
      return Alert.alert('You have been kicked out from this live');
    }
    if (blockedLiveRooms?.includes(item?.liveRoomData?.channel_token)) {
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
      channel: item?.liveRoomData?.channel_name,
      token: item?.liveRoomData?.channel_token,
    });
    dispatch(getHostExtraDetailAction(item?._id));
  };

  const renderItem = ({item}) => (
    <View
      style={[
        styles.itemContainer,
        item?.user?._id === userLoginList?.user?._id && {
          alignItems: 'flex-end',
        },
      ]}>
      <View
        style={[
          styles.itemHeader,
          item?.user?._id === userLoginList?.user?._id && {
            backgroundColor: '#C2E2FF',
          },
        ]}>
        <View style={styles.senderInfo}>
          {item?.user?.avatar ? (
            <FastImage
              style={styles.senderPic}
              source={{
                uri: item?.user?.avatar,
                priority: FastImage.priority.normal,
              }}
            />
          ) : (
            <MyImage style={styles.senderPic} source={GIRL_IMG} />
          )}
          <MyText style={styles.senderName}>{item?.user?.name}</MyText>
        </View>
        <View style={styles.flagContainer}>
          {item?.isOwner && (
            <Touchable>
              <SvgIcon.adminOutline />
            </Touchable>
          )}
          {item?.isAdmin && (
            <Touchable>
              <SvgIcon.grpAdmin />
            </Touchable>
          )}
          <View style={styles.crownContainer}>
            <CrownIcon width={13} height={11} marginRight={5} />
            <MyText
              style={{
                color: 'white',
              }}>
              {item?.level}
            </MyText>
          </View>
          <MyImage
            source={
              getCountryDetailWithKey({
                key: 'name',
                value: item?.country,
              }).icon
            }
            style={styles.flag}
          />
        </View>
      </View>
      <View style={styles.itemInfo}>
        {item?.type === CHAT_MESSAGE_TYPE.DOCUMENT ? (
          <Touchable onPress={() => setIsVisible([{uri: item?.image}])}>
            <FastImage
              style={[
                styles.msgPic,
                item?.user?._id === userLoginList?.user?._id
                  ? {
                      backgroundColor: '#C2E2FF',
                      borderBottomRightRadius: dynamicSize(0),
                    }
                  : {
                      borderBottomLeftRadius: dynamicSize(0),
                    },
              ]}
              source={{uri: item?.image, priority: FastImage.priority.normal}}
            />
            <MyText style={styles.imgTime}>
              {moment(item?.createdAt).format('hh:mm A')}
            </MyText>
          </Touchable>
        ) : item?.type === CHAT_MESSAGE_TYPE.LIVE_LINK ? (
          <View
            style={[
              styles.msgCon,
              item?.user?._id === userLoginList?.user?._id
                ? {
                    backgroundColor: '#C2E2FF',
                    borderBottomRightRadius: dynamicSize(0),
                  }
                : {
                    borderBottomLeftRadius: dynamicSize(0),
                  },
            ]}>
            <Touchable onPress={() => _joinAsAudience(item)}>
              <MyText
                style={{
                  fontFamily: FONT_FAMILY.POPPINS_REGULAR,
                  fontSize: 13,
                  lineHeight: 24,
                  color: COLORS.PRIMARY_BLUE,
                }}>
                Join Live
              </MyText>
            </Touchable>
            <MyText style={styles.time}>
              {moment(item?.createdAt).format('hh:mm A')}
            </MyText>
          </View>
        ) : (
          <View
            style={[
              styles.msgCon,
              item?.user?._id === userLoginList?.user?._id
                ? {
                    backgroundColor: '#C2E2FF',
                    borderBottomRightRadius: dynamicSize(0),
                  }
                : {
                    borderBottomLeftRadius: dynamicSize(0),
                  },
            ]}>
            <MyText style={styles.msg}>{item?.text}</MyText>
            <MyText style={styles.time}>
              {moment(item?.createdAt).format('hh:mm A')}
            </MyText>
          </View>
        )}
      </View>
    </View>
  );

  const handleEmojiOpen = () => {
    if (!isOpen) {
      Keyboard.dismiss();
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setEmojiArr(emojiArr.concat(emoji));
    setEmoji('');
  }, [emoji]);

  useEffect(() => {
    setText(text.concat(emojiArr));
    setEmojiArr('');
  }, [emojiArr]);

  const _fetchChatHistory = () => {
    const param = {
      start: paginationOffset.current,
      limit: dataLimit,
      chatId: groupInfo?._id,
      search: '',
      status: 'Sent',
    };
    dispatch(
      getGrpMsgsAction(param, paginationOffset.current, result => {
        if (result.totalCount) {
          totalRecord.current = result.totalCount;
        }
        if (!result.data.length) setShowIndicator(false);
        waitTillFetchingData.current = true;
      }),
    );
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

  const _sendMessage = () => {
    Keyboard.dismiss();
    setIsOpen(false);
    if (text) {
      const param = {
        chatId: groupInfo?._id,
        senderId: userLoginList?.user?._id,
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
      socket.emit(SOCKET_EVENTS.SEND_GRP_MESSAGE, param);
      setText('');
    }
  };

  const handleGrpAct = key => {
    switch (key) {
      case 'Exit Group':
        setGrpModal(false);
        setExitModal(true);
        break;

      case 'Edit Group':
        setGrpModal(false);
        handleEdit();
        break;
      case 'Mute':
      case 'Unmute':
        setUnmute(!mute);
        setGrpModal(false);

      default:
        break;
    }
  };

  const _onScroll = () => {
    setFlatListReady(true);
  };

  const handleExitYes = () => {
    const params = {
      userId: userLoginList?.user?._id,
      id: groupInfo?._id,
    };
    dispatch(
      removeGrpMember(params, res => {
        if (res) {
          HelperService.showToast(res?.message);
          navigation.navigate('GroupCreation');
        }
      }),
    );
    setExitModal(false);
  };
  const handleExitNo = () => setExitModal(false);
  const handleEdit = () => navigation.navigate('GroupInfo', groupInfo);

  const _profileRedirection = userId => () => {
    dispatch(
      getAnotherUserProfile({userId}, data => {
        if (data?.user) {
          navigation.navigate('UserProfile', data?.user);
        }
      }),
    );
  };

  const sendMedia = med => {
    const file = `data:image/png;base64,${med[0]?.base64}`;
    const param = {
      file,
      fileId: groupInfo?._id,
      chatId: groupInfo?._id,
    };
    if (med[0]?.base64) {
      dispatch(
        uploadChatMediaFileAction(param, result => {
          if (result) {
            const sendParam = {
              chatId: groupInfo?._id,
              senderId: userLoginList?.user?._id,
              content: `${IMAGE_URL}${result?.data}`,
              type: CHAT_MESSAGE_TYPE.DOCUMENT,
              user: {
                _id: userLoginList?.user?._id,
                name: userLoginList?.user?.name,
                avatar: `${IMAGE_URL}${userLoginList?.user?.profile}`,
              },
              userName: userLoginList?.user?.name,
              userProfile: `${IMAGE_URL}${userLoginList?.user?.profile}`,
              image: `${IMAGE_URL}${result?.data}`,
            };
            if (replyMsg?.replyId) {
              sendParam.replyMessageId = replyMsg.replyId;
              sendParam.isReply = replyMsg;
              setReplyMsg(initialReply);
            }
            socket.emit(SOCKET_EVENTS.SEND_GRP_MESSAGE, sendParam);
          }
        }),
      );
    }
  };

  const handleCamera = async () => {
    try {
      const permission = await requestCameraAndAudioPermission();
      if (permission) {
        const result = await launchCamera(options);
        if (result) {
          sendMedia(result.assets);
        }
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleGallery = async () => {
    try {
      const imageGallery = await launchImageLibrary(options);
      if (imageGallery) {
        sendMedia(imageGallery.assets);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.LIGHT_BABY_PINK} />
      <Header
        title={''}
        containerStyle={styles.header}
        leftComponent={leftHeaderComponent}
        rightComponent={rightHeaderComponent}
      />
      <View style={styles.grpMembersPic}>
        {groupInfo?.usersData?.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.memPic}>
            {groupInfo?.usersData?.map(item => (
              <Touchable onPress={_profileRedirection(item._id)}>
                {item?.profile ? (
                  <FastImage
                    style={[styles.profilePic, {marginStart: dynamicSize(10)}]}
                    source={{
                      uri: `${IMAGE_URL}${item?.profile}`,
                      priority: FastImage.priority.normal,
                    }}
                  />
                ) : (
                  <FontAwesome
                    name={'user-circle-o'}
                    color={COLORS.WHITE}
                    size={wp(8.5)}
                  />
                )}
              </Touchable>
            ))}
          </ScrollView>
        ) : null}
      </View>
      <FlatList
        inverted
        ref={flatListRef}
        key={'group_chat'}
        data={grpChatHistory}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        onEndReached={_fetchOldChatMessages}
      />
      <View style={[styles.footer, {bottom: 0}]}>
        <View style={styles.inputCon}>
          <Touchable onPress={handleEmojiOpen}>
            <SvgIcon.emojiIcon />
          </Touchable>
          <MyTextInput
            value={text}
            onChangeText={setText}
            selectionColor={'#7287EA'}
            style={styles.input}
          />
          <Touchable onPress={_sendMessage} style={styles.sendBtn}>
            <MyText style={styles.send}>Send</MyText>
          </Touchable>
        </View>
      </View>
      <ImageView
        imageIndex={0}
        images={visible}
        visible={visible.length ? true : false}
        onRequestClose={() => setIsVisible([])}
      />
      {grpModal && (
        <>
          <Touchable
            style={styles.overlay1}
            onPress={() => setGrpModal(false)}
          />
          <View style={styles.modal}>
            {GRP_ACTIONS.map((item, i) => (
              <Touchable
                key={`${item}_act`}
                onPress={() => handleGrpAct(item)}
                style={[
                  styles.optCon,
                  GRP_ACTIONS.length - 1 !== i && {
                    borderBottomWidth: 1,
                  },
                ]}>
                <MyText style={styles.opt}>{item}</MyText>
              </Touchable>
            ))}
          </View>
        </>
      )}
      {exitModal && (
        <>
          <Touchable
            style={styles.overlay1}
            onPress={() => setExitModal(false)}
          />
          <View style={styles.exitModal}>
            <MyText style={styles.exitText}>
              Do you really want to exit the group ?
            </MyText>
            <View style={styles.modalActCon}>
              <Touchable onPress={handleExitYes}>
                <MyText style={styles.modalAct}>Yes</MyText>
              </Touchable>
              <Touchable onPress={handleExitNo}>
                <MyText style={styles.modalAct}>No</MyText>
              </Touchable>
            </View>
          </View>
        </>
      )}
      {isOpen ? (
        <>
          <View style={styles.emojiCon}>
            <EmojiKeyboard
              hideHeader
              styles={emojiStyle}
              allowMultipleSelections
              categoryPosition={'bottom'}
              onEmojiSelected={handlePick}
            />
          </View>
        </>
      ) : (
        <View style={styles.mediaCon}>
          <Touchable onPress={handleCamera}>
            <CameraIcon width={wp(8)} height={wp(8)} fill={COLORS.BLACK} />
          </Touchable>
          <Touchable onPress={handleGallery}>
            <GalleryIcon width={wp(8)} height={wp(8)} fill={COLORS.BLACK} />
          </Touchable>
        </View>
      )}
      {isOpen && (
        <Touchable style={styles.overlay} onPress={() => setIsOpen(!isOpen)} />
      )}
    </View>
  );
};

export default GroupChat;
