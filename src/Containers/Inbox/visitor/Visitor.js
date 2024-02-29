import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  View,
  Image,
  Pressable,
  RefreshControl,
  Alert,
} from 'react-native';

import {styles} from './styles';
import {COLORS} from '../../../Utils/colors';
import {IMAGE_URL} from '../../../Services/Api/Common';
import {
  deleteVisitor,
  getAnotherUserProfile,
  getVisitorListAction,
} from '../../../Redux/Action';
import {getTimeFormat, SCREEN_HEIGHT} from '../../../Utils/helper';
import {MyIndicator, MyList, MyText} from '../../../Component/commomComponent';
import moment from 'moment';

const dataLimit = 20;

const Visitor = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const state = useSelector(state => state);

  const {userLoginList} = state.authReducer;
  const paginationOffset = useRef(0);
  const totalRecord = useRef(0);
  const waitTillFetchingData = useRef(true);

  const [fetching, setFetching] = useState(false);
  const [visitorList, setVisitorList] = useState([]);
  const [footerIndicator, setFooterIndicator] = useState(false);
  const [pullToRefreshIndicator, setPullToRefreshIndicator] = useState(false);

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
      getVisitorListAction(param, result => {
        if (result.totalCount) {
          totalRecord.current = result.totalCount;
          if (paginationOffset.current == 0) {
            setVisitorList(result?.data);
          } else {
            setVisitorList(prevState => [...prevState, ...result?.data]);
          }
        }
        _closeAllIndicator();
        waitTillFetchingData.current = true;
      }),
    );
  };

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

  const Item = ({item}) => {
    return (
      <Pressable
        android_ripple={{
          color: COLORS.LIGHT_GREY_OFFSET,
          radius: 200,
          foreground: true,
        }}
        onPress={() => {
          dispatch(
            getAnotherUserProfile({userId: item?.fromUsers?._id}, data => {
              if (data?.user) {
                navigation.navigate('UserProfile', data?.user);
              }
            }),
          );
        }}
        onLongPress={() => {
          let data = {
            id: item?._id,
          };
          dispatch(
            deleteVisitor(data, resp => {
              if (resp?.code === 200) {
                _fetchRecentChatList();
              }
            }),
          );
        }}
        style={[styles.chat]}>
        <>
          <View style={styles.imgInfo}>
            <Image
              source={{uri: `${IMAGE_URL}${item?.fromUsers?.profile}`}}
              style={styles.avatar}
            />
            <View style={styles.info}>
              <MyText style={styles.heading}>{item?.fromUsers?.name} </MyText>
              <MyText style={styles.lastMsg} numberOfLines={1}>
                {item.fromUsers.name && 'viewed your profile'}
              </MyText>
            </View>
          </View>
          <MyText style={styles.time}>
            {moment(item?.createdAt).calendar()}
          </MyText>
        </>
      </Pressable>
    );
  };

  const renderItem = ({item}) => {
    return <Item item={item} />;
  };

  const footerRender = () => {
    return (
      footerIndicator && (
        <MyIndicator verticalSpace color={COLORS.LIGHT_BABY_PINK} />
      )
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.WHITE}}>
      {fetching ? (
        <MyIndicator
          style={{marginVertical: SCREEN_HEIGHT * 0.02}}
          color={COLORS.BABY_PINK}
        />
      ) : null}
      <MyList
        data={visitorList}
        renderItem={renderItem}
        style={styles.flatList}
        keyExtractor={item => item.key}
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
    </View>
  );
};

export default Visitor;
