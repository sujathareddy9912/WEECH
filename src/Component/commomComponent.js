import React, {forwardRef, useEffect, useRef, useState} from 'react';

import {
  StatusBar,
  Text,
  TouchableOpacity,
  Modal,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  PanResponder,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import {COLORS} from '../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../Utils/fontFamily';
import commonStyle from './commonStyles';
import {dynamicSize} from '../Utils/responsive';
import {SvgIcon} from './icons';
import BottomSheet from 'reanimated-bottom-sheet';
import {strings} from '../localization/config';
import {useDispatch, useSelector} from 'react-redux';
import {
  getGiftDataAction,
  showGiftComponentOnCallAction,
} from '../Redux/Action';
import GiftComponent from './giftComponent';
import {socket} from '../Services/Sockets/sockets';

import {
  SCREEN_WIDTH,
  CALLING_TYPE,
  SCREEN_HEIGHT,
  dismissKeyboard,
  isIOS,
} from '../Utils/helper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Input from './Input';
import {IMAGE_URL} from '../Services/Api/Common';
import {commentOnDuringCall} from '../Redux/Action';

export const MyText = props => {
  return (
    <Text
      {...props}
      allowFontScaling={false}
      style={[{fontFamily: FONT_FAMILY.POPPINS_REGULAR}, props.style]}>
      {props.children}
    </Text>
  );
};

export const GradientBackground = props => {
  return (
    <LinearGradient
      {...props}
      colors={
        props?.colors
          ? props?.colors
          : [
              COLORS.GRADIENT_TOP_PINK,
              COLORS.GRADIENT_MID_PINK,
              COLORS.GRADIENT_BLUE,
            ]
      }
      style={[
        {
          flex: 1,
          paddingTop: useSafeAreaInsets().top,
          paddingBottom: useSafeAreaInsets().bottom,
        },
        props.style,
      ]}>
      <StatusBar
        backgroundColor={COLORS.GRADIENT_TOP_PINK}
        barStyle="dark-content"
      />
      {props.children}
    </LinearGradient>
  );
};

export const KeyboardAwareScroll = props => {
  const {
    children,
    style,
    contentContainerStyle,
    scrollInnerRef,
    scrollEnabled,
  } = props;

  const _disableKeyboard = () => dismissKeyboard();

  return (
    <View style={[commonStyle.commonContainer, style]}>
      <TouchableWithoutFeedback onPress={_disableKeyboard}>
        <KeyboardAwareScrollView
          {...props}
          scrollEnabled={scrollEnabled}
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={20}
          enableOnAndroid={true}
          contentContainerStyle={contentContainerStyle}
          showsVerticalScrollIndicator={false}
          ref={scrollInnerRef}>
          {children}
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export const Touchable = props => {
  return <TouchableOpacity {...props}>{props.children}</TouchableOpacity>;
};

export const Button = props => {
  const {
    label,
    buttonStyle,
    labelStyle,
    onPress,
    isDark,
    width,
    indicator,
    disabled,
  } = props;

  return (
    <Touchable
      disabled={indicator || disabled}
      onPress={onPress}
      style={[
        commonStyle.buttonContainer,
        isDark ? commonStyle.darkButton : undefined,
        {width},
        buttonStyle,
      ]}>
      {indicator ? (
        <MyIndicator verticalSpace />
      ) : (
        <MyText
          style={[
            commonStyle.buttonLabel,
            isDark ? commonStyle.darkButtonlabel : undefined,
            labelStyle,
          ]}>
          {label}
        </MyText>
      )}
    </Touchable>
  );
};

export const IconButton = props => {
  const {
    label,
    buttonStyle,
    labelStyle,
    onPress,
    isDark,
    width,
    indicator,
    disabled,
    leftComponent,
  } = props;

  return (
    <Touchable
      disabled={indicator || disabled}
      onPress={onPress}
      style={[
        commonStyle.buttonContainer,
        isDark ? commonStyle.darkButton : undefined,
        {width},
        buttonStyle,
      ]}>
      {leftComponent && leftComponent}
      {indicator ? (
        <MyIndicator verticalSpace />
      ) : (
        <MyText
          style={[
            commonStyle.buttonLabel,
            isDark ? commonStyle.darkButtonlabel : undefined,
            labelStyle,
          ]}>
          {label}
        </MyText>
      )}
    </Touchable>
  );
};

export const CustomModal = props => {
  const {
    isVisible,
    children,
    style,
    animationType,
    transparent,
    onRequestClose,
  } = props;

  const _onReqClose = () => {};
  return (
    <Modal
      visible={isVisible}
      transparent={transparent || true}
      animationType={animationType || 'fade'}
      onRequestClose={onRequestClose || _onReqClose}>
      <View
        style={[
          {
            flex: 1,
            height: SCREEN_HEIGHT,
            backgroundColor: COLORS.TRANSPARENT_BLACK,
            alignItems: 'center',
            justifyContent: 'center',
          },
          style,
        ]}>
        {children}
      </View>
    </Modal>
  );
};

export const MyImage = props => {
  return props.fast ? <FastImage {...props} /> : <Image {...props} />;
};

export const TouchableIcon = props => {
  const {
    onPress,
    source,
    style,
    resizeMode,
    imageStyle,
    disabled,
    activeOpacity,
    customIcon,
    indicator,
    color,
  } = props;
  return (
    <Touchable
      {...props}
      activeOpacity={activeOpacity}
      disabled={disabled}
      onPress={onPress}
      style={style}>
      {indicator ? (
        <MyIndicator color={color} />
      ) : customIcon ? (
        customIcon
      ) : (
        <MyImage
          source={source}
          resizeMode={resizeMode || 'contain'}
          style={imageStyle}
          fast={true}
        />
      )}
    </Touchable>
  );
};

export const MyList = props => {
  const _keyExtractor = (_, index) => index.toString();

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      keyExtractor={_keyExtractor}
      {...props}
    />
  );
};

export const MyTextInput = forwardRef((props, ref) => {
  const {returnKeyType, style, placeholderTextColor, autoCorrect} = props;
  return (
    <TextInput
      {...props}
      ref={ref}
      underlineColorAndroid={'transparent'}
      autoCorrect={autoCorrect} // for autocorrect suggestion
      style={style}
      placeholderTextColor={placeholderTextColor || COLORS.TEXT_INPUT}
      allowFontScaling={false}
      returnKeyType={returnKeyType || 'done'}
    />
  );
});

export const MyIndicator = props => {
  const {size, color, verticalSpace, style} = props;
  return (
    <View style={[{marginVertical: verticalSpace ? dynamicSize(5) : 0}, style]}>
      <ActivityIndicator size={size || 'small'} color={color || COLORS.WHITE} />
    </View>
  );
};

export const FilePick = props => {
  const {title, subtitle, data, renderItem, style, isRequired, onPress} = props;

  const [activeIndex, setActiveIndex] = useState(0);

  const _snapToItem = index => setActiveIndex(index);

  const _keyExtractor = (_, index) => index.toString();

  const _renderSeperator = () => (
    <View style={{height: SCREEN_WIDTH * 0.025}} />
  );

  return (
    <View style={style}>
      <MyText style={commonStyle.filePickTitle}>
        {title}
        <MyText style={commonStyle.filePickerAsterisk}>
          {isRequired ? '  *' : ''}
        </MyText>
      </MyText>
      <View style={commonStyle.filePickeRowContainer}>
        <MyText style={commonStyle.filePickSubtitle}>{subtitle}</MyText>
      </View>
      <MyList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={{
          width: '100%',
          // backgroundColor:'red',
          paddingVertical: SCREEN_HEIGHT * 0.01,
        }}
        ItemSeparatorComponent={_renderSeperator}
        // style={{flexWrap: 'wrap'}}
        // ListFooterComponent={_renderFooter}
        numColumns={3}
      />
    </View>
  );
};

export const MyLinearGradient = props => {
  const {children, colors} = props;
  return (
    <LinearGradient
      colors={
        colors || [
          COLORS.GRADIENT_TOP_PINK,
          COLORS.GRADIENT_MID_PINK,
          COLORS.GRADIENT_BLUE,
        ]
      }
      style={props.style}
      {...props}>
      {children}
    </LinearGradient>
  );
};

export const SafeArea = props => {
  const {children, style} = props;
  return (
    <SafeAreaView
      style={[
        {flex: 1, backgroundColor: COLORS.WHITE, width: SCREEN_WIDTH},
        style,
      ]}>
      {children}
    </SafeAreaView>
  );
};

export const SmallProfilePic = props => {
  const {url, imageStyle, resizeMode = 'cover'} = props;
  return (
    <Image
      source={{uri: `${url}`}}
      resizeMode={resizeMode}
      style={[
        {
          width: SCREEN_HEIGHT * 0.03,
          height: SCREEN_HEIGHT * 0.03,
          borderRadius: dynamicSize(20),
        },
        imageStyle,
      ]}
    />
  );
};

export const Counter = props => {
  const {count, style, onDecrement, onIncrement} = props;

  const _getcount = () => {
    if (count == 0 || count == '00') return '00';
    else if (!count) return '00';
    if (count && count < 10) {
      return `0${count}`;
    } else return `${count}`;
  };

  return (
    <View style={[commonStyle.counterContainer, style]}>
      <Touchable
        onPress={onDecrement}
        style={{
          paddingHorizontal: dynamicSize(7),
          borderTopLeftRadius: dynamicSize(10),
          borderBottomLeftRadius: dynamicSize(10),
        }}>
        <MyText style={commonStyle.pulsMinus}>{'-'}</MyText>
      </Touchable>
      <MyText style={commonStyle.Countercount}>{_getcount()}</MyText>
      <Touchable
        onPress={onIncrement}
        style={{
          paddingHorizontal: dynamicSize(7),
          borderTopRightRadius: dynamicSize(10),
          borderBottomRightRadius: dynamicSize(10),
        }}>
        <MyText style={commonStyle.pulsMinus}>+</MyText>
      </Touchable>
    </View>
  );
};

export const IconWithCount = props => {
  const {
    count,
    style,
    textStyle,
    colors,
    source,
    tintColor,
    withGradient,
    gradientStyle,
    text,
  } = props;

  const _getCount = () => {
    if (count) return `${count}`;
    else return '0';
  };

  return withGradient ? (
    <MyLinearGradient
      colors={colors}
      style={[{borderRadius: dynamicSize(100)}, gradientStyle]}>
      <View
        style={[
          commonStyle.levelContainer,
          {backgroundColor: tintColor || COLORS.LIGHT_MAGENTA},
          style,
        ]}>
        {source ? source : <SvgIcon.CrownIcon />}
        <MyText style={[commonStyle.levelText, textStyle]}>
          {text || _getCount()}
        </MyText>
      </View>
    </MyLinearGradient>
  ) : (
    <View
      style={[
        commonStyle.levelContainer,
        {backgroundColor: tintColor || COLORS.LIGHT_MAGENTA},
        style,
      ]}>
      {source ? source : <SvgIcon.CrownIcon />}
      <MyText style={[commonStyle.levelText, textStyle]}>
        {text || _getCount()}
      </MyText>
    </View>
  );
};

export const CardCountLabel = props => {
  const {label, count} = props;
  return (
    <View style={commonStyle.labelWithCountContainer}>
      <MyText style={commonStyle.headerLabel}>{label || ''}</MyText>
      <MyText style={commonStyle.headerLabelcount}>{count || 0}</MyText>
    </View>
  );
};

export const ActivtabBorder = props => {
  const {style} = props;
  return <View style={[commonStyle.tabBorder, style]} />;
};

export const CallActionBottonSheet = props => {
  const {
    onCameraPress,
    onSpeakerPress,
    onVideoPress,
    onMicPress,
    onCancelPress,
    type,
    points,
    detail,
  } = props;

  let timeout = null;

  const scrollRef = useRef();

  const dispatch = useDispatch();
  const state = useSelector(state => {
    return state;
  });

  const {userLoginList} = state.authReducer;
  const {callCommentData} = state.streamingReducer;
  const {showGiftComponentOnCall} = state.loaderReducer;

  const [giftData, updateGiftData] = useState([]);
  const [isMute, updateMuteState] = useState(false);
  const [isSpeaker, updateIsSpeaker] = useState(false);
  const [commentText, UpdateCommentText] = useState('');
  const [isVideo, setVideoStatus] = useState(true);
  const [fetchingGifts, setFetchingGifts] = useState(false);
  const [marginBottonOnGiftInputFocus, setMarginBottonOnGiftInputFocus] =
    useState(0);
  const [showComments, setShowComments] = useState(true);

  const sheetRef = useRef();
  const pan = useRef(new Animated.ValueXY()).current;

  // const socket = io(SERVER_API, {
  //   reconnection: true,
  //   reconnectionDelay: 1000,
  //   transports: ['websocket'],
  // });

  const onToggleVideo = () => {
    setVideoStatus(!isVideo);
    onVideoPress(!isVideo);
  };

  const _scrollToEnd = () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      scrollRef?.current?.scrollToEnd();
    }, 400);
  };

  const onToggleSpeaker = () => {
    updateIsSpeaker(!isSpeaker);
    onSpeakerPress(!isSpeaker);
  };

  const onToggleMicrophone = () => {
    updateMuteState(!isMute);
    onMicPress(!isMute);
  };

  const _fetchGiftList = () => {
    _fetchGifts();
    dispatch(showGiftComponentOnCallAction(true));
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

  const _onGiftChatInputFocus = () => {
    setMarginBottonOnGiftInputFocus(dynamicSize(50));
  };

  const _onGiftChatInputBlur = () => {
    setMarginBottonOnGiftInputFocus(dynamicSize(0));
  };

  useEffect(() => {
    socket.off('comment').on('comment', response => {
      if (!!response.commentData.comment) {
        dispatch(commentOnDuringCall(response));
        _scrollToEnd();
      }
    });
  }, []);

  const onCommentSend = () => {
    if (commentText !== '') {
      const data = {
        token: detail?.liveToken,
        commentData: {
          type: 'comment',
          comment: commentText,
          name: userLoginList?.user?.name,
          profilePic: userLoginList?.user?.profile,
          joinedUsers: userLoginList?.user,
          senderId: detail?.callerId,
        },
      };
      socket.emit('comment', data);
      dispatch(commentOnDuringCall(data));
      _scrollToEnd();
      UpdateCommentText('');
    }
  };

  const silentCommentForConnection = () => {
    const data = {
      token: detail?.liveToken,
      commentData: {
        type: 'comment',
        name: userLoginList?.user?.name,
        profilePic: userLoginList?.user?.profile,
        joinedUsers: userLoginList?.user,
      },
    };
    socket.emit('comment', data);
    const comment = {
      commentData: {
        type: 'welcomeText',
        comment: strings('live.welcomeMessage'),
      },
    };
    dispatch(commentOnDuringCall(comment));
  };

  useEffect(() => {
    silentCommentForConnection();
  }, []);

  const closeKeyboard = () => {
    Keyboard.dismiss();
  };

  const _renderComment = (item, index) => {
    if (item?.type === 'comment') {
      return (
        <TouchableOpacity style={[commonStyle.chatView]}>
          {item?.profilePic ? (
            <SmallProfilePic
              imageStyle={commonStyle.chatPic}
              url={`${IMAGE_URL}${item?.profilePic}`}
            />
          ) : (
            <View style={commonStyle.picContainer}>
              <SvgIcon.SmallProfilePlaceholder />
            </View>
          )}
          <View style={commonStyle.chatRightConrtainer}>
            <MyText style={commonStyle.username}>{item.name}</MyText>
            <View style={commonStyle.msgBox}>
              <MyText style={commonStyle.msg}>{item.comment}</MyText>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else if (item?.type == 'welcomeText') {
      return (
        <View style={[commonStyle.welcomeContainer]}>
          <MyText style={commonStyle.welcometxt}>{item.comment}</MyText>
        </View>
      );
    }
  };

  return (
    <View
      style={[
        commonStyle.callSheetContainer,
        {
          paddingBottom: useSafeAreaInsets().bottom,
        },
      ]}
      {...panResponder.panHandlers}>
      {showGiftComponentOnCall ? (
        <View style={{position: 'absolute', bottom: 40, alignSelf: 'center'}}>
          <GiftComponent
            onFocus={_onGiftChatInputFocus}
            onBlur={_onGiftChatInputBlur}
            fetchingGifts={fetchingGifts}
            onSearch={_onSearch}
            diamondCount={userLoginList?.user?.points || 0}
            topTitleList={giftData}
            senderId={userLoginList?.user?._id}
            receiverId={detail?.receiverId}
            // onSendSuccess={_emitGift}
            onSendClick={() => dispatch(showGiftComponentOnCallAction(false))}
            onSendSuccess={() => {}}
          />
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={closeKeyboard}
            style={[commonStyle.callActionTop]}>
            {/* <IconWithCount
              style={{paddingVertical: SCREEN_HEIGHT * 0.005}}
              source={<SvgIcon.CallDiamond />}
              text={points}
              tintColor={COLORS.VIOLET}
            /> */}

            <Touchable
              onPress={onCancelPress}
              style={[
                commonStyle.callActionButton,
                {
                  marginTop: 0,
                  backgroundColor: COLORS.MAGENTA_ONE,
                },
              ]}>
              <MaterialCommunityIcons
                name={'phone-hangup'}
                size={wp(6)}
                color={COLORS.WHITE}
              />
            </Touchable>
            <Animated.View
              style={{
                transform: [{translateX: pan.x}],
              }}
              {...panResponder.panHandlers}>
              {showComments && (
                <View>
                  <Touchable
                    onPress={onToggleVideo}
                    style={commonStyle.callActionButton}>
                    {isVideo ? (
                      <MaterialCommunityIcons
                        name={'video'}
                        size={wp(6)}
                        color={COLORS.WHITE}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name={'video-off'}
                        size={wp(6)}
                        color={COLORS.WHITE}
                      />
                    )}
                  </Touchable>
                  <TouchableIcon
                    onPress={onCameraPress}
                    style={commonStyle.callActionButton}
                    customIcon={<SvgIcon.CallCamera />}
                  />

                  <Touchable
                    style={[commonStyle.callActionButton]}
                    onPress={onToggleSpeaker}>
                    {isSpeaker ? (
                      <MaterialCommunityIcons
                        name={'volume-off'}
                        size={wp(6)}
                        color={COLORS.WHITE}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name={'volume-high'}
                        size={wp(6)}
                        color={COLORS.WHITE}
                      />
                    )}
                  </Touchable>
                </View>
              )}
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity onPress={closeKeyboard} style={{flex: 1}} />
          <Animated.View
            style={{
              transform: [{translateX: pan.x}],
              width: SCREEN_WIDTH,
              position: 'absolute',
              bottom: 0,
              backgroundColor: 'red',
            }}
            {...panResponder.panHandlers}>
            {showComments && (
              <KeyboardAvoidingView
                behavior={isIOS ? 'padding' : null}
                keyboardVerticalOffset={isIOS ? 60 : 0}
                enabled
                style={{
                  height: SCREEN_HEIGHT / 2,
                  position: 'absolute',
                  bottom: dynamicSize(50),
                  // paddingTop: isAndroid ? dynamicSize(200) : 0,
                }}>
                <ScrollView
                  key="comment"
                  ref={scrollRef}
                  scrollEventThrottle={16}
                  // style={{flex: 1}}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingHorizontal: dynamicSize(10),
                  }}>
                  <View
                    style={{
                      width: SCREEN_WIDTH,
                      flex: 1,
                      justifyContent: 'flex-end',
                      marginVertical: dynamicSize(10),
                    }}>
                    {callCommentData?.map((item, index) =>
                      _renderComment(item, index),
                    )}
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            )}
          </Animated.View>
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              commonStyle.bottomChatRowContainer,
              {transform: [{translateX: pan.x}]},
            ]}>
            <Input
              value={commentText}
              // onFocus={_onFocusTextinput}
              // onBlur={_onBlurTextinput}
              onChangeText={UpdateCommentText}
              placeholder={true ? strings('live.saySomething') : "You're muted"}
              svgSource={<SvgIcon.CommentIcon />}
              style={{width: SCREEN_WIDTH / 2}}
              textInputStyle={{fontSize: FONT_SIZE.MEDIUM}}
              onSubmitEditing={onCommentSend}
              blurOnSubmit={false}
              returnKeyType={'send'}
              returnKeyLabel="send"
              // editable={userLiveMute}
            />
            <View style={commonStyle.subBottomChatRowContainer}>
              <Touchable
                style={[
                  commonStyle.callActionButton,
                  {
                    width: wp(9),
                    height: wp(9),
                    marginTop: 0,
                  },
                ]}>
                <MaterialCommunityIcons
                  name={'image-filter-vintage'}
                  size={wp(5)}
                  color={COLORS.WHITE}
                />
              </Touchable>
              <Touchable
                onPress={onToggleMicrophone}
                style={[
                  commonStyle.callActionButton,
                  {width: wp(9), height: wp(9), marginTop: 0},
                ]}>
                {isMute ? (
                  <MaterialCommunityIcons
                    name={'microphone-off'}
                    size={wp(5)}
                    color={COLORS.WHITE}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name={'microphone'}
                    size={wp(5)}
                    color={COLORS.WHITE}
                  />
                )}
              </Touchable>
              <TouchableIcon
                onPress={_fetchGiftList}
                customIcon={<SvgIcon.SmallGiftIcon />}
              />
            </View>
          </Animated.View>
        </View>
      )}
    </View>
  );

  // return renderContent();
  // <BottomSheet
  //   ref={sheetRef}
  //   snapPoints={[SCREEN_HEIGHT / 5, SCREEN_HEIGHT / 13]}
  //   enabledInnerScrolling={false}
  //   renderContent={renderContent}
  //   borderRadius={10}
  // />
};

export const CallActionBottonSheetAudio = props => {
  const {
    onCameraPress,
    onSpeakerPress,
    onVideoPress,
    onMicPress,
    onCancelPress,
    type,
    points,
    detail,
  } = props;

  const dispatch = useDispatch();
  const state = useSelector(state => {
    return state;
  });

  let timeout = null;

  const scrollRef = useRef();

  const {userLoginList} = state.authReducer;
  const {showGiftComponentOnCall} = state.loaderReducer;
  const {callCommentData} = state.streamingReducer;

  const [giftData, updateGiftData] = useState([]);
  const [isMute, updateMuteState] = useState(false);
  const [isSpeaker, updateIsSpeaker] = useState(false);
  const [isVideo, setVideoStatus] = useState(true);
  const [commentText, UpdateCommentText] = useState('');
  const [fetchingGifts, setFetchingGifts] = useState(false);
  const [marginBottonOnGiftInputFocus, setMarginBottonOnGiftInputFocus] =
    useState(0);

  const sheetRef = useRef();

  const _scrollToEnd = () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      scrollRef?.current?.scrollToEnd();
    }, 400);
  };

  const onToggleVideo = () => {
    setVideoStatus(!isVideo);
    onVideoPress(!isVideo);
  };

  const onToggleMicrophone = () => {
    updateMuteState(!isMute);
    onMicPress(!isMute);
  };

  const onToggleSpeaker = () => {
    updateIsSpeaker(!isSpeaker);
    onSpeakerPress(!isSpeaker);
  };

  const _fetchGiftList = () => {
    _fetchGifts();
    dispatch(showGiftComponentOnCallAction(true));
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

  useEffect(() => {
    socket.off('comment').on('comment', response => {
      if (!!response.commentData.comment) {
        dispatch(commentOnDuringCall(response));
        _scrollToEnd();
      }
    });
  }, []);

  const onCommentSend = () => {
    if (commentText !== '') {
      const data = {
        token: detail?.liveToken,
        commentData: {
          type: 'comment',
          comment: commentText,
          name: userLoginList?.user?.name,
          profilePic: userLoginList?.user?.profile,
          joinedUsers: userLoginList?.user,
          senderId: detail?.callerId,
        },
      };
      socket.emit('comment', data);
      dispatch(commentOnDuringCall(data));
      _scrollToEnd();
      UpdateCommentText('');
    }
  };

  const closeKeyboard = () => {
    Keyboard.dismiss();
  };

  const _renderComment = (item, index) => {
    if (item?.type === 'comment') {
      return (
        <TouchableOpacity style={[commonStyle.chatView, {maxWidth: '65%'}]}>
          {item?.profilePic ? (
            <SmallProfilePic
              imageStyle={commonStyle.chatPic}
              url={`${IMAGE_URL}${item?.profilePic}`}
            />
          ) : (
            <View style={commonStyle.picContainer}>
              <SvgIcon.SmallProfilePlaceholder />
            </View>
          )}
          <View style={commonStyle.chatRightConrtainer}>
            <MyText style={commonStyle.username}>{item.name}</MyText>
            <View style={commonStyle.msgBox}>
              <MyText style={commonStyle.msg}>{item.comment}</MyText>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else if (item?.type == 'welcomeText') {
      return (
        <View style={[commonStyle.welcomeContainer, {maxWidth: '65%'}]}>
          <MyText style={commonStyle.welcometxt}>{item.comment}</MyText>
        </View>
      );
    }
  };

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

  const _onGiftChatInputFocus = () => {
    setMarginBottonOnGiftInputFocus(dynamicSize(50));
  };

  const _onGiftChatInputBlur = () => {
    setMarginBottonOnGiftInputFocus(dynamicSize(0));
  };

  return (
    <View style={[commonStyle.callSheetContainerAudio]}>
      {showGiftComponentOnCall ? (
        <GiftComponent
          onFocus={_onGiftChatInputFocus}
          onBlur={_onGiftChatInputBlur}
          fetchingGifts={fetchingGifts}
          onSearch={_onSearch}
          diamondCount={userLoginList?.user?.points || 0}
          topTitleList={giftData}
          senderId={userLoginList?.user?._id}
          receiverId={detail?.receiverId}
          onSendClick={() => dispatch(showGiftComponentOnCallAction(false))}
          onSendSuccess={() => {}}
        />
      ) : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <KeyboardAvoidingView
              behavior={isIOS ? 'padding' : null}
              keyboardVerticalOffset={isIOS ? 60 : 0}
              enabled
              style={{
                height: SCREEN_HEIGHT / 2.8,
                position: 'absolute',
                bottom: 0,
                // paddingTop: isAndroid ? dynamicSize(200) : 0,
              }}>
              <ScrollView
                key="comment"
                ref={scrollRef}
                scrollEventThrottle={16}
                // style={{flex: 1}}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: dynamicSize(10),
                }}>
                <View
                  style={{
                    width: SCREEN_WIDTH,
                    flex: 1,
                    justifyContent: 'flex-end',
                    marginVertical: dynamicSize(10),
                  }}>
                  {callCommentData?.map((item, index) =>
                    _renderComment(item, index),
                  )}
                </View>
              </ScrollView>

              <Input
                value={commentText}
                // onFocus={_onFocusTextinput}
                // onBlur={_onBlurTextinput}
                onChangeText={UpdateCommentText}
                placeholder={
                  true ? strings('live.saySomething') : "You're muted"
                }
                svgSource={<SvgIcon.CommentIcon />}
                style={{width: '65%'}}
                textInputStyle={{fontSize: FONT_SIZE.MEDIUM}}
                onSubmitEditing={onCommentSend}
                blurOnSubmit={false}
                returnKeyType={'send'}
                returnKeyLabel="send"
                editable={true}
              />
            </KeyboardAvoidingView>
          </View>
          <View style={commonStyle.callActionAudio}>
            <Touchable
              onPress={onToggleSpeaker}
              style={[
                commonStyle.callActionButton,
                {
                  backgroundColor: isSpeaker
                    ? COLORS.WHITE
                    : COLORS.WHITE + '40',
                },
              ]}>
              {isSpeaker ? (
                <FontAwesome
                  name={'volume-up'}
                  size={wp(6)}
                  color={COLORS.BLACK}
                />
              ) : (
                <MaterialCommunityIcons
                  name={'volume-high'}
                  size={wp(6)}
                  color={COLORS.WHITE}
                />
              )}
            </Touchable>
            <Touchable
              onPress={onToggleMicrophone}
              style={commonStyle.callActionButton}>
              {isMute ? (
                <MaterialCommunityIcons
                  name={'microphone-off'}
                  size={wp(6)}
                  color={COLORS.WHITE}
                />
              ) : (
                <MaterialCommunityIcons
                  name={'microphone'}
                  size={wp(6)}
                  color={COLORS.WHITE}
                />
              )}
            </Touchable>
            <Touchable
              style={[commonStyle.callActionButton]}
              onPress={_fetchGiftList}>
              <MaterialCommunityIcons
                name={'gift'}
                size={wp(6)}
                color={COLORS.WHITE}
              />
            </Touchable>
            {/* <IconWithCount
              style={{paddingVertical: SCREEN_HEIGHT * 0.005}}
              source={<SvgIcon.CallDiamond />}
              text={points}
              tintColor={COLORS.VIOLET}
            /> */}

            <Touchable
              onPress={onCancelPress}
              style={[
                commonStyle.callActionButton,
                {
                  backgroundColor: COLORS.MAGENTA_ONE,
                },
              ]}>
              <MaterialCommunityIcons
                name={'phone-hangup'}
                size={wp(6)}
                color={COLORS.WHITE}
              />
            </Touchable>
          </View>
        </View>
      )}
    </View>
  );
};
