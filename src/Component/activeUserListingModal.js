import {useDispatch, useSelector} from 'react-redux';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  View,
  RefreshControl,
  StyleSheet,
  Alert,
  StatusBar,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../Utils/colors';

import {
  MyText,
  MyImage,
  Touchable,
  IconWithCount,
  MyIndicator,
  CustomModal,
} from '../Component/commomComponent';
import {SvgIcon} from '../Component/icons';
import {getAge, SCREEN_WIDTH} from '../Utils/helper';
import {strings} from '../localization/config';
import {dynamicSize} from '../Utils/responsive';
import {IMAGE_URL} from '../Services/Api/Common';
import {SCREEN_HEIGHT} from '../Utils/helper';
import {FONT_FAMILY, FONT_SIZE} from '../Utils/fontFamily';
import {
  activeLiveUserListInStreamingAction,
  getAnotherUserProfile,
} from '../Redux/Action';
import Entypo from 'react-native-vector-icons/Entypo';
import ViewerFollow from '../Assets/Icons/viewerFollow.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const limitValue = 15;

const LiveStreamingActiveUserList = props => {
  const {
    user,
    channelToken,
    onRequestClose,
    isVisible,
    refresh,
    isBroadcaster,
    handleMore,
    selectedUser,
    setSelectedUser,
    setToFollowId,
    setAdminList,
    viewersFollowing,
  } = props;
  const dispatch = useDispatch();
  const state = useSelector(state => {
    return state;
  });

  const paginationOffset = useRef(0);
  const callNextRecord = useRef(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [pageXY, setPageXY] = useState(null);
  const holdApiCalltillResponse = useRef(true);
  const [fetching, setFetching] = useState(false);
  const [activeUserList, setActiveUserList] = useState([]);
  const [footerIndicator, setFooterIndicator] = useState(false);
  const [pullToRefreshIndicator, setPullToRefreshIndicator] = useState(false);
  const [admins, setAdmins] = useState([]);

  const navigation = useNavigation();

  const BROAD_OPTIONS = [
    `${isAdmin ? 'Remove Admin' : 'Make Admin'}`,
    `${isFollowing ? 'UnFollow' : 'Follow'}`,
    'Block',
    'Kickout',
    'Mute/UnMute',
    'Report',
    'Message',
    'Voice Call',
    'Video Call',
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

  const {userLoginList} = state.authReducer;

  useEffect(() => {
    if (refresh) {
      paginationOffset.current = 0;
      setFetching(true);
      _fetchLiveUserList();
    }
  }, [refresh]);

  // useEffect(() => {
  //   getAdminList();
  // }, [activeUserList]);

  // const getAdminList = () => {
  //   if (activeUserList?.length > 0) {
  //     let newList = activeUserList?.filter(item => item?.isAdmin);
  //     setAdminList([...newList]);
  //     const newArr = newList.map(e => e._id);
  //     setAdmins(newArr);
  //   }
  // };

  const _fetchLiveUserList = () => {
    const param = {
      roomId: channelToken,
      start: paginationOffset.current,
      limit: limitValue,
      userId: userLoginList?.user?._id,
    };
    dispatch(
      activeLiveUserListInStreamingAction(param, result => {
        if (result?.data?.length) {
          callNextRecord.current = true;
          holdApiCalltillResponse.current = true;
          const newList = result?.data?.filter(item => item?.isAdmin);
          setAdminList([...newList]);
          const newArr = newList.map(e => e?.joinedUsers?._id);
          setAdmins(newArr);
        } else {
          callNextRecord.current = false;
        }
        if (paginationOffset.current == 0) {
          setActiveUserList(result?.data);
        } else {
          setActiveUserList(prevState => [...prevState, ...result?.data]);
        }
        setFetching(false);
        setPullToRefreshIndicator(false);
        setFooterIndicator(false);
      }),
    );
  };

  const _onPullToRefresh = () => {
    paginationOffset.current = 0;
    setPullToRefreshIndicator(true);
    _fetchLiveUserList();
  };

  const _onEndReached = () => {
    if (callNextRecord.current && holdApiCalltillResponse.current) {
      holdApiCalltillResponse.current = false;
      paginationOffset.current = paginationOffset.current + limitValue;
      setFooterIndicator(true);
      _fetchLiveUserList();
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

  const _renderActiveUsers = ({item, index}) => {
    let follwing = viewersFollowing.filter(x => {
      if (
        x?.followToUserId == item?.joinedUsers?._id ||
        x?.followToUserId == item?.friendUserId?._id
      ) {
        return x;
      }
    });

    return (
      <Touchable
        onPress={() => profileRedirection(item?.joinedUsers?._id)}
        style={styles.item}>
        {item?.joinedUsers?.profile ? (
          <MyImage
            source={{
              uri: `${IMAGE_URL}${item?.joinedUsers?.profile}`,
            }}
            style={styles.pic}
          />
        ) : (
          <View style={styles.picContainer}>
            <SvgIcon.SmallProfilePlaceholder />
          </View>
        )}
        <View style={styles.itemRight}>
          <View style={{width: '100%', flexDirection: 'row'}}>
            <MyText numberOfLines={1} style={[styles.name, {flex: 1}]}>
              {item?.joinedUsers?.name}
            </MyText>
          </View>
          <View style={styles.subRightContainer}>
            <IconWithCount
              count={item?.joinedUsers?.level}
              source={<SvgIcon.SmallestCrown />}
              textStyle={{fontSize: FONT_SIZE.REGULAR}}
              style={{
                paddingHorizontal: SCREEN_HEIGHT * 0.005,
              }}
            />
            <IconWithCount
              tintColor={COLORS.LIGHT_VIOLET}
              source={<SvgIcon.SmallGenderIcon />}
              count={getAge(item?.joinedUsers?.DateOfBirth)}
              textStyle={{fontSize: FONT_SIZE.REGULAR}}
              style={{
                marginLeft: dynamicSize(10),
                paddingHorizontal: SCREEN_HEIGHT * 0.005,
              }}
            />
            <IconWithCount
              source={<SvgIcon.SmallDiamond />}
              tintColor={COLORS.LIGHT_VIOLET}
              count={item.gift || 0}
              textStyle={styles.name}
              style={{
                marginLeft: dynamicSize(10),
                paddingHorizontal: SCREEN_HEIGHT * 0.005,
              }}
            />
          </View>
        </View>
        {item?.isAdmin ? <SvgIcon.adminIcon /> : null}
        {user?._id !== item?.joinedUsers?._id && !item?.followByMe && (
          <Touchable
            onPress={() => {
              setToFollowId(item?.joinedUsers?._id);
              handleMore('Follow');
            }}>
            <ViewerFollow />
          </Touchable>
        )}
        {item?.isMute ? <SvgIcon.muteIcon /> : null}
        {(!admins.includes(item?.joinedUsers?._id) &&
          admins.includes(user?._id)) ||
        isBroadcaster ? (
          <Touchable
            style={{marginLeft: wp(1)}}
            onPress={evt => {
              setSelectedUser(item);
              setIsAdmin(item?.isAdmin);
              item?.followByMe ? setIsFollowing(true) : setIsFollowing(false);
              setPageXY({
                x: evt.nativeEvent.pageX,
                y: evt.nativeEvent.pageY,
              });
            }}>
            <Entypo name={'dots-three-vertical'} size={dynamicSize(18)} />
          </Touchable>
        ) : null}
      </Touchable>
    );
  };

  const _renderSeperator = () => <View style={styles.seperator} />;

  const footerRender = () => {
    if (!fetching) {
      if (footerIndicator) return <MyIndicator verticalSpace />;
      else return <View />;
    } else return <View />;
  };

  const onCloseModal = () => {
    if (!!Object.keys(selectedUser).length) {
      setPageXY(null);
      setSelectedUser({});
    } else onRequestClose();
  };

  return (
    <View
      style={{
        width: SCREEN_WIDTH,
        height: WINDOW_HEIGHT,
        zIndex: 10000,
        justifyContent: 'flex-end',
        backgroundColor: COLORS.TRANSPARENT,
        position: 'absolute',
      }}
      // onRequestClose={onRequestClose}
      // isVisible={isVisible}
    >
      {pageXY ? (
        <View
          style={{
            position: 'absolute',
            bottom: SCREEN_HEIGHT - pageXY.y,
            right: SCREEN_WIDTH - pageXY.x,
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
      ) : null}
      <Touchable
        onPress={onCloseModal}
        style={{flex: 1, width: SCREEN_WIDTH}}
      />
      <View
        style={{
          paddingBottom: useSafeAreaInsets().bottom,
          width: SCREEN_WIDTH,
        }}>
        <View style={styles.header}>
          <MyText style={styles.viewers}>{strings('live.viewers')}</MyText>
          <View style={styles.headerRight}>
            <SvgIcon.BlackView />
            <MyText style={styles.liveCount}>{activeUserList?.length}</MyText>
          </View>
        </View>
        {activeUserList?.length ? (
          <FlatList
            key="activeUsers"
            data={activeUserList}
            renderItem={_renderActiveUsers}
            contentContainerStyle={styles.userList}
            ItemSeparatorComponent={_renderSeperator}
            refreshControl={
              <RefreshControl
                refreshing={pullToRefreshIndicator}
                onRefresh={_onPullToRefresh}
                tintColor={COLORS.WHITE}
              />
            }
            ListFooterComponent={footerRender}
            onEndReachedThreshold={0.7}
            onEndReached={_onEndReached}
          />
        ) : (
          <View style={styles.userList}>
            <MyText style={styles.noText}>
              {strings('live.noActiveUsers')}
            </MyText>
          </View>
        )}
      </View>
    </View>
  );
};

export default LiveStreamingActiveUserList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND_COLOR_BLUE,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    borderTopLeftRadius: dynamicSize(10),
    borderTopRightRadius: dynamicSize(10),
    alignSelf: 'center',
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BLACK_OFFSET,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: dynamicSize(10),
    padding: dynamicSize(10),
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: dynamicSize(10),
    padding: dynamicSize(10),
  },
  viewers: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    marginLeft: dynamicSize(20),
    fontSize: FONT_SIZE.SEMI_MEDIUM,
  },
  liveCount: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    marginLeft: dynamicSize(3),
    fontSize: FONT_SIZE.SEMI_MEDIUM,
  },
  textInput: {
    marginTop: SCREEN_HEIGHT * 0.01,
    marginBottom: SCREEN_HEIGHT * 0.02,
    marginHorizontal: dynamicSize(20),
    borderRadius: dynamicSize(5),
    backgroundColor: COLORS.LIGHT_GREY_OFFSET,
    paddingHorizontal: dynamicSize(10),
  },
  textInputStyle: {
    paddingVertical: SCREEN_HEIGHT * 0.01,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: FONT_SIZE.SEMI_LARGE,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pic: {
    height: SCREEN_HEIGHT / 19,
    width: SCREEN_HEIGHT / 19,
    borderRadius: SCREEN_HEIGHT / 19 / 2,
  },
  userList: {
    width: '85%',
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: dynamicSize(20),
    alignSelf: 'center',
    paddingVertical: SCREEN_HEIGHT * 0.02,
    borderBottomLeftRadius: dynamicSize(10),
    borderBottomRightRadius: dynamicSize(10),
    paddingBottom: STATUSBAR_HEIGHT,
  },
  noText: {
    color: COLORS.DARK_RED,
    textAlign: 'center',
  },
  seperator: {
    height: SCREEN_HEIGHT * 0.035,
  },
  itemRight: {
    flex: 1,
    height: SCREEN_HEIGHT / 19,
    justifyContent: 'space-between',
    paddingLeft: dynamicSize(10),
  },
  name: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: FONT_SIZE.MEDIUM,
  },
  subRightContainer: {
    flexDirection: 'row',
  },
  picContainer: {
    // justifyContent: 'center',
    borderWidth: 0.5,
    alignItems: 'center',
    width: dynamicSize(36),
    height: dynamicSize(36),
    paddingTop: dynamicSize(3),
    borderRadius: dynamicSize(20),
  },
  options: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: FONT_SIZE.EXTRA_LARGE,
  },
});
