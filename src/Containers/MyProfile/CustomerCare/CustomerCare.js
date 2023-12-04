import {
  Text,
  View,
  Keyboard,
  FlatList,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import moment from 'moment';
import {EmojiKeyboard} from 'rn-emoji-keyboard';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useRef, useState} from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {
  getCustomerMsgsAction,
  getCustomerMsgSendAction,
} from '../../../Redux/Action';
import {
  MyText,
  MyImage,
  Touchable,
  MyTextInput,
} from '../../../Component/commomComponent';

import {styles} from './styles';
import {COLORS} from '../../../Utils/colors';
import {SvgIcon} from '../../../Component/icons';
import Header from '../../../Component/header/Header';
import {IMAGE_URL} from '../../../Services/Api/Common';
import {dynamicSize} from '../../../Utils/responsive';
import CrownIcon from '../../../Assets/Icons/crown.svg';
import {CHAT_MESSAGE_TYPE} from '../../../Utils/chatHelper';
import CameraIcon from '../../../Assets/Icons/CameraChatIcon.svg';
import GalleryIcon from '../../../Assets/Icons/GalleryChatIcon.svg';
import requestCameraAndAudioPermission from '../../../Utils/helper';

const emojiStyle = {
  container: {
    borderRadius: 0,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
};

const options = {
  selectionLimit: 1,
  mediaType: 'photo',
  includeBase64: true,
};

const CustomerCare = ({navigation}) => {
  const flatListRef = useRef(0);
  const [text, setText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [emoji, setEmoji] = useState('');
  const [emojiArr, setEmojiArr] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const dispatch = useDispatch();
  const {userLoginList} = useSelector(state => state.authReducer);

  const getMsgs = () => {
    const body = {
      start: 0,
      limit: 15,
      userId: userLoginList?.user?._id,
      search: '',
      status: 'Sent',
    };
    dispatch(getCustomerMsgsAction(body, res => setChatHistory(res?.data)));
  };

  useEffect(() => {
    getMsgs();
  }, []);

  useEffect(() => {
    setEmojiArr(emojiArr.concat(emoji));
    setEmoji('');
  }, [emoji]);

  useEffect(() => {
    setText(text.concat(emojiArr));
    setEmojiArr('');
  }, [emojiArr]);

  const leftHeaderComponent = (
    <TouchableOpacity
      style={styles.backContainer}
      onPress={() => navigation?.goBack()}>
      <FontAwesome5Icon
        name={'chevron-left'}
        color={COLORS.WHITE}
        size={wp(5)}
        style={{
          marginRight: wp(1),
        }}
      />
      <Text style={styles.title}>Customer Care</Text>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => (
    <View
      style={[
        styles.itemContainer,
        item?.sender === userLoginList?.user?._id && {
          alignItems: 'flex-end',
        },
      ]}>
      <View style={styles.itemInfo}>
        {item?.type === CHAT_MESSAGE_TYPE.DOCUMENT ? (
          <Touchable onPress={() => setIsVisible([{uri: item?.image}])}>
            <FastImage
              style={[
                styles.msgPic,
                item?.sender === userLoginList?.user?._id
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
        ) : (
          <View
            style={[
              styles.msgCon,
              item?.sender === userLoginList?.user?._id
                ? {
                    backgroundColor: '#F0F1F5',
                    borderBottomRightRadius: dynamicSize(0),
                  }
                : {
                    borderBottomLeftRadius: dynamicSize(0),
                  },
            ]}>
            <MyText style={styles.msg}>{item?.content}</MyText>
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

  const handlePick = emojiObject => {
    setEmoji(emojiObject.emoji);
  };

  const _sendMessage = () => {
    Keyboard.dismiss();
    setIsOpen(false);
    const body = {
      content: text,
      type: CHAT_MESSAGE_TYPE.CONTENT,
      senderId: userLoginList?.user?._id,
      userName: userLoginList?.user?.name,
      userProfile: userLoginList?.user?.profile,
    };
    dispatch(getCustomerMsgSendAction(body, res => getMsgs()));
    setText('');
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

  const sendMedia = med => {};

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <Header
        title={''}
        leftComponent={leftHeaderComponent}
        containerStyle={styles.header}
        titleStyle={styles.title}
      />
      <FlatList
        inverted
        data={chatHistory}
        ref={flatListRef}
        key={'group_chat'}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        // onEndReached={_fetchOldChatMessages}
      />
      <SafeAreaView>
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
      </SafeAreaView>
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
        []
      )}
    </View>
  );
};

export default CustomerCare;
