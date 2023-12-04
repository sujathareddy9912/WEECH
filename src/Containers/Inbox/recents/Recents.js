import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {SwipeListView} from 'react-native-swipe-list-view';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {
  View,
  Image,
  Animated,
  Pressable,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';

import {styles} from './styles';
import {COLORS} from '../../../Utils/colors';
import {SCREEN_WIDTH} from '../../../Utils/helper';
import {getTimeFormat} from '../../../Utils/helper';
import {strings} from '../../../localization/config';
import {IMAGE_URL} from '../../../Services/Api/Common';
import DeleteAllModal from '../components/DeleteAllModal';
import MissCallIcon from '../../../Assets/Icons/missCall.svg';
import VideoCallIcon from '../../../Assets/Icons/videoCallIcon.svg';

import {
  deleteRecentCallAction,
  getAnotherUserProfile,
  getRecentChatListAction,
} from '../../../Redux/Action';

import {
  MyIndicator,
  MyText,
  Touchable,
} from '../../../Component/commomComponent';
import moment from 'moment';

const dataLimit = 20;

const Recents = props => {
  const {callback} = props;

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const state = useSelector(state => state);

  const {userLoginList} = state.authReducer;
  const paginationOffset = useRef(0);
  const totalRecord = useRef(0);
  const waitTillFetchingData = useRef(true);

  const [fetching, setFetching] = useState(false);
  const [listData, setRecentList] = useState([]);
  const [footerIndicator, setFooterIndicator] = useState(false);
  const [pullToRefreshIndicator, setPullToRefreshIndicator] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [deletingIndicator, setDeletingIndicator] = useState(false);

  const swipeListRef = useRef('swipeListRef');

  useEffect(() => {
    paginationOffset.current = 0;
    setFetching(true);
    _fetchRecentChatList();
  }, []);

  const _fetchRecentChatList = () => {
    const param = {
      start: paginationOffset.current,
      limit: dataLimit,
      userId: userLoginList?.user?._id,
      search: '',
    };
    dispatch(
      getRecentChatListAction(param, result => {
        if (result.totalCount) {
          totalRecord.current = result.totalCount;
          if (paginationOffset.current == 0) {
            setRecentList(result?.data);
          } else {
            setRecentList(prevState => [...prevState, ...result?.data]);
          }
        }
        _closeAllIndicator();
        waitTillFetchingData.current = true;
      }),
    );
  };

  const deleteRow = (item, index, rowMap) => () => {
    setDeletingIndicator(true);
    const prevIndex = listData.findIndex(each => each._id === item._id);
    const param = {
      callId: item._id,
    };
    dispatch(
      deleteRecentCallAction(param, result => {
        setDeletingIndicator(false);
      }),
    );
    setRefresh(!refresh);
    listData.splice(prevIndex, 1);
    setDeletingIndicator(false);
    rowMap[index].closeRow();
  };

  const renderCallStatus = item => {
    if (item.receivedStatus) {
      if (userLoginList?.user?._id == item?.callerUserId) {
        return 'Outgoing';
      } else {
        return 'Incoming';
      }
    } else {
      return 'Missed';
    }
  };

  const renderItem = ({item}) => {
    const newItem =
      item?.callerUser?._id === userLoginList?.user?._id
        ? item?.receiverUser
        : item?.callerUser;
    return (
      <Pressable
        android_ripple={{
          color: COLORS.LIGHT_GREY_OFFSET,
          radius: 200,
          foreground: true,
        }}
        onPress={() => {
          dispatch(
            getAnotherUserProfile({userId: newItem?._id}, data => {
              if (data?.user) {
                navigation.navigate('UserProfile', data?.user);
              }
            }),
          );
        }}
        style={[styles.rowFront]}>
        <>
          <View style={styles.imgInfo}>
            <Image
              source={{uri: `${IMAGE_URL}${newItem.profile}`}}
              style={styles.avatar}
            />
            <View style={styles.info}>
              <MyText style={styles.heading}>{newItem.name}</MyText>
              <View style={styles.callInfoCon}>
                {item.callType === 'CALL' ? (
                  <MissCallIcon width={wp(5)} height={wp(5)} />
                ) : (
                  <VideoCallIcon width={wp(4)} height={wp(4)} />
                )}
                <MyText style={styles.lastMsg}>{renderCallStatus(item)}</MyText>
              </View>
            </View>
          </View>
          <MyText style={styles.time}>
            {moment(item?.createdAt).calendar()}
          </MyText>
        </>
      </Pressable>
    );
  };

  const renderHiddenItem = ({item, index}, rowMap) => (
    <Touchable style={styles.rowBack}>
      {deletingIndicator ? (
        <MyIndicator color={COLORS.WHITE} />
      ) : (
        <TouchableOpacity
          style={styles.backRightBtn}
          onPress={deleteRow(item, index, rowMap)}>
          <MyText style={styles.delete}>{strings('chat.delete')}</MyText>
        </TouchableOpacity>
      )}
    </Touchable>
  );

  const _closeAllIndicator = () => {
    setFetching(false);
    setFooterIndicator(false);
    setPullToRefreshIndicator(false);
  };

  const _onPullToRefresh = () => {
    paginationOffset.current = 0;
    setPullToRefreshIndicator(true);
    _fetchRecentChatList();
  };

  const _keyExtractor = useCallback((item, index) => `${index}`, []);

  const _onEndReached = () => {
    if (
      paginationOffset.current < totalRecord.current &&
      waitTillFetchingData.current &&
      navigation.isFocused()
    ) {
      waitTillFetchingData.current = false;
      paginationOffset.current = paginationOffset.current + 10;
      setFooterIndicator(true);
      _fetchRecentChatList();
    }
  };

  const _onDeleteSuccess = () => {
    paginationOffset.current = 0;
    setRecentList([]);
  };

  const footerRender = () => {
    return (
      footerIndicator && (
        <MyIndicator verticalSpace color={COLORS.LIGHT_BABY_PINK} />
      )
    );
  };

  return (
    <View style={styles.container}>
      <DeleteAllModal onDeleteSuccess={_onDeleteSuccess} />
      <SwipeListView
        data={listData}
        ref={swipeListRef}
        useFlatList
        keyExtractor={_keyExtractor}
        previewOpenValue={-40}
        renderItem={renderItem}
        previewOpenDelay={3000}
        rightOpenValue={-SCREEN_WIDTH * 0.2}
        refreshControl={
          <RefreshControl
            refreshing={pullToRefreshIndicator}
            onRefresh={_onPullToRefresh}
            tintColor={COLORS.LIGHT_BABY_PINK}
          />
        }
        maxToRenderPerBatch={dataLimit}
        renderHiddenItem={renderHiddenItem}
        ListFooterComponent={footerRender}
        onEndReachedThreshold={0.7}
        onEndReached={_onEndReached}
      />
    </View>
  );
};

export default Recents;
