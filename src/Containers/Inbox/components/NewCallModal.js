import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import React, {memo, useEffect, useRef, useState} from 'react';
import {View, Pressable, StyleSheet, RefreshControl} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {COLORS} from '../../../Utils/colors';
import {callList} from '../chats/dummyChatList';
import {strings} from '../../../localization/config';
import {FONT_FAMILY} from '../../../Utils/fontFamily';
import {dynamicSize} from '../../../Utils/responsive';
import {IMAGE_URL} from '../../../Services/Api/Common';
import CallIcon from '../../../Assets/Icons/callBlue.svg';
import CrossPink from '../../../Assets/Icons/EndCall.svg';
import SearchIcon from '../../../Assets/Icons/SearchIcon.svg';
import {HelperService} from '../../../Services/Utils/HelperService';
import VideoCallIcon from '../../../Assets/Icons/videoCallBlue.svg';
import {navigateToScreen} from '../../../Navigator/navigationHelper';

import {
  createChatRoomAction,
  getFollowingListAction,
  getCAllingDetailAction,
  followingListModalAction,
} from '../../../Redux/Action';

import {
  MyList,
  MyText,
  MyImage,
  Touchable,
  MyTextInput,
  MyIndicator,
  KeyboardAwareScroll,
} from '../../../Component/commomComponent';

import requestCameraAndAudioPermission, {
  CALLING_TYPE,
  CALLING_STATUS,
  requestAudioPermission,
  SCREEN_HEIGHT,
  isIOS,
} from '../../../Utils/helper';

import {
  incomingCallQuery,
  checkNodePresentOrNot,
} from '../../../firebase/nodeQuery';
import {SvgIcon} from '../../../Component/icons';
import {getUserHaveBalance} from '../../../Services/Api/LiveStreaming';

const dataLimit = 20;
let timeout = null;
function RNModal({isVisible}) {
  const dispatch = useDispatch();

  const state = useSelector(state => state);
  const {userLoginList} = state.authReducer;

  const paginationOffset = useRef(0);
  const waitTillFetchingData = useRef(true);
  const totlaDataRef = useRef(0);

  const [fetching, setFetching] = useState(false);
  const [search, setSearch] = useState('');
  const [followingList, setFollowingList] = useState([]);
  const [searchIndicator, setSearchIndicator] = useState(false);
  const [footerIndicator, setFooterIndicator] = useState(false);
  const [selectedChatUserId, setSelectedChatUserId] = useState('');
  const [startCallIndicator, setStartCallIndicator] = useState(false);
  const [pullToRefreshIndicator, setPullToRefreshIndicator] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setFetching(true);
      _fetchFollowingList();
    }
  }, []);

  const _fetchFollowingList = (searchText = search) => {
    const param = {
      start: paginationOffset.current,
      limit: dataLimit,
      userId: userLoginList?.user?._id,
      search: searchText,
    };

    dispatch(
      getFollowingListAction(param, result => {
        if (result) {
          if (paginationOffset.current == 0) {
            setFollowingList(result.data);
          } else setFollowingList(prevState => [...prevState, ...result.data]);
        }
        totlaDataRef.current = result.totalCount;
        paginationOffset.current = paginationOffset.current + dataLimit;
        _closeAllIndicator();
      }),
    );
  };

  const _closeAllIndicator = () => {
    setFetching(false);
    setFooterIndicator(false);
    setPullToRefreshIndicator(false);
    setSearchIndicator(false);
  };

  const _onPullToRefresh = () => {
    paginationOffset.current = 0;
    setPullToRefreshIndicator(true);
    _fetchFollowingList();
  };

  const _onEndReached = () => {
    if (
      waitTillFetchingData.current &&
      paginationOffset.current < totlaDataRef.current
    ) {
      waitTillFetchingData.current = false;
      setFooterIndicator(true);
      _fetchFollowingList();
    }
  };

  const _onClose = () => {
    setSearch('');
    setFollowingList([]);
    dispatch(followingListModalAction(false));
  };

  const _onSearch = text => {
    setSearch(text);
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      setSearchIndicator(true);
      paginationOffset.current = 0;
      _fetchFollowingList(text);
    }, 500);
  };

  const _createRoom = item => () => {
    setSelectedChatUserId(item?.followToUser?._id);
    const param = {
      receiverId: item?.followToUser?._id,
    };
    dispatch(
      createChatRoomAction(param, result => {
        if (result) {
          dispatch(followingListModalAction(false));
          setTimeout(() => {
            navigateToScreen('PersonalChat', {
              receiverId: item?.followToUser?._id,
              name: item?.followToUser?.name,
              profile: item?.followToUser?.profile,
              chatId: result._id,
            });
          }, 500);
        }
        setSelectedChatUserId('');
      }),
    );
  };

  const checkCallPossible = (type, detail) => async () => {
    const data = {
      senderId: userLoginList?.user?._id,
      receiverId: detail?.followToUser?._id,
      type: type == CALLING_TYPE.VIDEO ? 'VIDEOCALL' : 'CALL',
    };

    try {
      const response = await getUserHaveBalance(data);
      if (response.data.data) {
        callingFunctionality(type, detail);
      }
    } catch (error) {
      const data = error.response.data;
      alert(data.message);
    }
  };

  const callingFunctionality = async (type, detail) => {
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
          receiverId: detail?.followToUser?._id,
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
                receiverId: detail?.followToUser?._id,
                receiverName: detail?.followToUser?.name,
                receiverProfilePic: detail?.followToUser?.profile,
                callerId: userLoginList?.user?._id,
                callerName: userLoginList?.user?.name,
                callerProfilePic: userLoginList?.user?.profile,
                callerPoints: userLoginList?.user?.points,
                receiverPoints: detail?.followToUser?.walletAmount,
              };

              incomingCallQuery(detail?.followToUser?._id).set(callingParams);
              _onClose();
              navigateToScreen('VideoCall', callingParams);
            }
            setStartCallIndicator(false);
          }),
        );
      } catch (error) {
        console.log('error while call creation', error.message);
      }
    }
  };

  const Item = ({item}) => {
    return (
      <Touchable
        disabled={selectedChatUserId == item?.followToUser?._id}
        onPress={_createRoom(item)}
        style={[styles.chat]}>
        {selectedChatUserId == item?.followToUser?._id ? (
          <MyIndicator style={styles.indicator} />
        ) : null}
        <View style={styles.imgInfo}>
          {item?.followToUser?.profile ? (
            <MyImage
              fast
              source={{uri: `${IMAGE_URL}${item?.followToUser?.profile}`}}
              style={styles.avatar}
            />
          ) : (
            <View
              style={[
                styles.avatar,
                {
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: COLORS.TEXT_GRAY,
                },
              ]}>
              <SvgIcon.SmallProfilePlaceholder />
            </View>
          )}
          <View style={styles.info}>
            <MyText style={styles.heading}>{item?.followToUser?.name}</MyText>
            <MyText style={styles.lastMsg} numberOfLines={1}>
              {item.followToUser.bio}
            </MyText>
          </View>
        </View>
        <View style={styles.callBtnCon}>
          <Touchable onPress={checkCallPossible(CALLING_TYPE.AUDIO, item)}>
            <CallIcon width={wp(15)} height={wp(15)} />
          </Touchable>
          <Touchable onPress={checkCallPossible(CALLING_TYPE.VIDEO, item)}>
            <VideoCallIcon width={wp(15)} height={wp(15)} />
          </Touchable>
        </View>
      </Touchable>
    );
  };

  const renderItem = ({item, index}) => {
    return <Item item={item} index={index} key={index} />;
  };

  const footerRender = () => {
    return (
      footerIndicator && <MyIndicator verticalSpace color={COLORS.VIOLET} />
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      isVisible={isVisible}
      style={{
        margin: 0,
      }}>
      <KeyboardAwareScroll
        style={{width: wp(100), height: SCREEN_HEIGHT}}
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <MyText style={styles.headerText}>
                {strings('createCall.newCall').toUpperCase()}
              </MyText>
              <Pressable style={styles.buttonClose} onPress={_onClose}>
                <CrossPink width={wp(8)} height={wp(8)} />
              </Pressable>
            </View>
            <View style={styles.content}>
              {/* <View style={styles.inputCon}>
                <SearchIcon width={wp(5)} height={wp(5)} />
                <MyTextInput style={styles.input} onChangeText={_onSearch} />
              </View> */}
              {searchIndicator || fetching ? (
                <MyIndicator verticalSpace color={COLORS.VOILET} />
              ) : null}
              <MyList
                data={followingList}
                style={styles.flatList}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
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
          </View>
        </View>
      </KeyboardAwareScroll>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    height: SCREEN_HEIGHT,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    padding: wp(5),
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: wp(5),
    borderTopRightRadius: wp(5),
    width: wp(100),
    height: isIOS ? SCREEN_HEIGHT * 0.95 : SCREEN_HEIGHT * 0.98,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    width: wp(90),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: COLORS.RED_COLOR,
  },
  headerText: {
    color: COLORS.BABY_PINK,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
  },
  buttonClose: {
    top: 0,
    right: 0,
    position: 'absolute',
  },
  content: {
    padding: wp(2),
  },
  inputCon: {
    width: wp(90),
    borderRadius: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    backgroundColor: COLORS.VIOLET,
  },
  input: {
    color: COLORS.WHITE,
    flex: 1,
    paddingLeft: dynamicSize(10),
    height: hp(5),
    borderRadius: wp(2),
  },
  chat: {
    paddingVertical: wp(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(100),
  },
  heading: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
  },
  info: {
    width: wp(40),
    marginLeft: wp(2),
  },
  lastMsg: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: COLORS.TEXT_GRAY,
  },
  imgInfo: {
    flexDirection: 'row',
  },
  time: {
    color: COLORS.TEXT_GRAY,
  },
  flatList: {
    marginTop: wp(2),
    backgroundColor: COLORS.WHITE,
  },
  callBtnCon: {
    flexDirection: 'row',
  },
  indicator: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
// RNModal = memo(RNModal);
export default RNModal;
