import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {View, Pressable, RefreshControl, Image, Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {styles} from './styles';
import {COLORS} from '../../../Utils/colors';
import RNModal from '../components/NewCallModal';
import {SCREEN_HEIGHT} from '../../../Utils/helper';
import {IMAGE_URL} from '../../../Services/Api/Common';
import {
  deleteSelectedChat,
  getChatListAction,
  updateClearChatFlag,
  updateDeleteChat,
} from '../../../Redux/Action';
import {CHAT_MESSAGE_TYPE} from '../../../Utils/chatHelper';

import {
  MyImage,
  MyIndicator,
  MyList,
  MyText,
  Touchable,
} from '../../../Component/commomComponent';
import icons from '../../../Component/icons';
import {dynamicSize} from '../../../Utils/responsive';
import moment from 'moment';

const dataLimit = 20;

const Chats = ({route}) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  const {clearChatFlag, deleteAll, selectAll} = state?.chatReducer;
  const {followingListModalVisible} = state.loaderReducer;

  const {userLoginList} = state.authReducer;

  const navigation = useNavigation();
  const [selected, setSelected] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [footerIndicator, setFooterIndicator] = useState(false);
  const [pullToRefreshIndicator, setPullToRefreshIndicator] = useState(false);

  const paginationOffset = useRef(0);
  const totalRecord = useRef(0);
  const waitTillFetchingData = useRef(true);

  useEffect(() => {
    paginationOffset.current = 0;
    setFetching(true);
    _fetchChatList();
  }, []);

  const _fetchChatList = () => {
    const param = {
      start: paginationOffset.current,
      limit: dataLimit,
      userId: userLoginList?.user?._id,
    };
    dispatch(
      getChatListAction(param, result => {
        if (result.totalCount) {
          totalRecord.current = result.totalCount;
          if (paginationOffset.current == 0) {
            setChatList(result?.data);
          } else {
            setChatList(prevState => [...prevState, ...result?.data]);
          }
        }
        _closeAllIndicator();
        waitTillFetchingData.current = true;
      }),
    );
  };

  const _onPullToRefresh = () => {
    paginationOffset.current = 0;
    setPullToRefreshIndicator(true);
    _fetchChatList();
  };

  const _closeAllIndicator = () => {
    setFetching(false);
    setFooterIndicator(false);
    setPullToRefreshIndicator(false);
  };

  const _onEndReached = () => {
    if (
      paginationOffset.current < totalRecord.current &&
      waitTillFetchingData.current &&
      navigation.isFocused()
    ) {
      waitTillFetchingData.current = false;
      paginationOffset.current = paginationOffset.current + 10;
      setFooterIndicator(true);
      _fetchChatList();
    }
  };

  const footerRender = () => {
    return (
      footerIndicator && (
        <MyIndicator verticalSpace color={COLORS.LIGHT_BABY_PINK} />
      )
    );
  };

  const onPress = (item, otherUserData) => () => {
    if (clearChatFlag) {
      setSelected(selected.concat([item?._id]));
      if ([...new Set(selected)].includes(item?._id)) {
        setSelected([...new Set(selected)].filter(s => s != item?._id));
      }
    } else {
      navigation.navigate('PersonalChat', {
        receiverId: otherUserData?._id,
        name: otherUserData?.name,
        profile: otherUserData?.profile,
        chatId: item._id,
      });
    }
  };

  const Item = ({item, index}) => {
    const otherUserData = item?.usersData;
    return (
      <Pressable
        android_ripple={{
          color: COLORS.LIGHT_GREY_OFFSET,
          radius: 200,
          foreground: true,
        }}
        style={[styles.chat]}
        onPress={onPress(item, otherUserData)}>
        <>
          <View style={styles.imgInfo}>
            <MyImage
              fast
              source={{uri: `${IMAGE_URL}${otherUserData?.profile}`}}
              style={styles.avatar}
            />
            <View style={styles.info}>
              <MyText style={styles.heading}>{otherUserData?.name}</MyText>
              <MyText style={styles.lastMsg} numberOfLines={1}>
                {item.latestMessage.type == CHAT_MESSAGE_TYPE.DOCUMENT
                  ? `${
                      item?.latestMessage?.sender == item?.usersData?._id
                        ? 'Received an Attachment'
                        : 'Sent an Attachment'
                    }`
                  : item.latestMessage?.content}
              </MyText>
            </View>
          </View>
          <MyText style={styles.time}>
            {moment(item?.updatedAt).calendar()}
          </MyText>
          {clearChatFlag ? (
            <View>
              {[...new Set(selected)].includes(item._id) ? (
                <MaterialCommunityIcons
                  color={COLORS.BLACK}
                  size={dynamicSize(18)}
                  name={'checkbox-outline'}
                />
              ) : (
                <MaterialCommunityIcons
                  color={COLORS.BLACK}
                  size={dynamicSize(18)}
                  name={'checkbox-blank-outline'}
                />
              )}
            </View>
          ) : null}
        </>
      </Pressable>
    );
  };
  const renderItem = ({item, index}) => {
    return <Item item={item} index={index} />;
  };

  const handleClearChat = () => {
    dispatch(updateClearChatFlag(!clearChatFlag));
  };

  useEffect(() => {
    if (selectAll) {
      let allId = chatList.map(item => item._id);
      setSelected(allId);
    } else {
      setSelected([]);
    }
  }, [selectAll]);

  useEffect(() => {
    if (deleteAll && selected.length > 0) {
      dispatch(updateDeleteChat(false));
      dispatch(
        deleteSelectedChat({chatId: selected}, () => {
          dispatch(updateClearChatFlag(!clearChatFlag));
          dispatch(updateDeleteChat(false));
          let newArr = chatList.filter(
            item => selected.indexOf(item._id) === -1,
          );
          setChatList(newArr);
          setSelected([]);
        }),
      );
    } else {
      dispatch(updateDeleteChat(false));
    }
  }, [deleteAll]);

  return (
    <View style={{flex: 1, backgroundColor: COLORS.WHITE}}>
      {followingListModalVisible && (
        <RNModal isVisible={followingListModalVisible} />
      )}
      {fetching ? (
        <MyIndicator
          style={{marginVertical: SCREEN_HEIGHT * 0.02}}
          color={COLORS.BABY_PINK}
        />
      ) : null}
      <Touchable
        onPress={() => {
          navigation.navigate('CustomerCare');
        }}
        activeOpacity={0.7}
        style={styles.label}>
        <View style={styles.avatar}>
          <Image source={icons.WeechaLogoIcon} style={styles.img} />
        </View>
        <MyText style={styles.labelTxt}>Online Customer Service</MyText>
      </Touchable>
      <MyList
        data={chatList}
        style={styles.flatList}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.chatListCon}
        refreshControl={
          <RefreshControl
            refreshing={pullToRefreshIndicator}
            onRefresh={_onPullToRefresh}
            tintColor={COLORS.LIGHT_BABY_PINK}
          />
        }
        maxToRenderPerBatch={dataLimit}
        ListFooterComponent={footerRender}
        onEndReachedThreshold={0.7}
        onEndReached={_onEndReached}
      />
      {chatList.length > 0 ? (
        <Touchable
          onPress={handleClearChat}
          activeOpacity={0.7}
          style={styles.clearChat}>
          <MyText style={styles.chatTxt}>Clear Chat</MyText>
        </Touchable>
      ) : null}
    </View>
  );
};

export default Chats;
