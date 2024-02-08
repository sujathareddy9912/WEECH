import {StatusBar} from 'native-base';
import ImageView from 'react-native-image-viewing';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import styles from './styles';
import {COLORS} from '../../Utils/colors';
import {SvgIcon} from '../../Component/icons';
import {FONT_SIZE} from '../../Utils/fontFamily';
import {strings} from '../../localization/config';
import {dynamicSize} from '../../Utils/responsive';
import {IMAGE_URL} from '../../Services/Api/Common';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GiftIcon from '../../Assets/Icons/profileGift.svg';
import {HelperService} from '../../Services/Utils/HelperService';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Icon from '../../Component/Icons/Icon';
import Video from 'react-native-video';

import {
  incomingCallQuery,
  checkNodePresentOrNot,
} from '../../firebase/nodeQuery';

import {
  followUserAction,
  viewedProfileAction,
  getCAllingDetailAction,
  getUserStatsAction,
  userBlockFromLive,
  getGalleryListAction,
  createChatRoomAction,
} from '../../Redux/Action';

import requestCameraAndAudioPermission, {
  getAge,
  CALLING_TYPE,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  CALLING_STATUS,
  requestAudioPermission,
  getCountryDetailWithKey,
} from '../../Utils/helper';

import {
  Button,
  MyImage,
  MyList,
  MyText,
  SafeArea,
  Touchable,
  TouchableIcon,
  IconWithCount,
  CardCountLabel,
  ActivtabBorder,
} from '../../Component/commomComponent';
import ReportModal from '../../Component/ReportModal';
import {navigateToScreen} from '../../Navigator/navigationHelper';
import {getUserHaveBalance} from '../../Services/Api/LiveStreaming';

const description =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ";
const TAB_TYPE = {ONE: 'one', TWO: 'two', THREE: 'three'};

const data = [
  {
    type: 'image',
  },
  {
    type: 'image',
  },
  {
    type: 'image',
  },
  {
    type: 'image',
  },
];

const UserProfile = props => {
  const dispatch = useDispatch();
  const state = useSelector(state => {
    return state;
  });
  const {userLoginList} = state.authReducer;

  // const detail = useMemo(() => {
  //   return props?.route?.params || {};
  // }, [props?.route?.params]);
  const detail = props?.route?.params || {};
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [galeryData, setGalleryData] = useState([]);
  const [otherUserDetail, setOtherUserDetail] = useState();
  const [userStats, setUserStats] = useState({});
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [reportVisible, setReportVisible] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [showVideo, setShowVideo] = useState({});
  const [opacity, setOpacity] = useState(1);
  const [paused, setPaused] = useState(true);

  const refRBSheet = useRef();

  useEffect(() => {
    getUserStats();
    getGalleryData();
    // getGalleryVideo();
  }, []);

  useEffect(() => {
    if (detail?._id) {
      setOtherUserDetail(detail);
      const params = {
        toUserId: detail?._id,
        fromUserId: userLoginList?.user?._id,
      };
      dispatch(viewedProfileAction(params));
    }
  }, [detail]);

  const navigation = useNavigation();

  const [activetab, setActiveTab] = useState(TAB_TYPE.ONE);

  useEffect(() => {
    _galleryDataMapping();
  }, [activetab]);

  const _galleryDataMapping = () => {};
  const galleryData = () => {
    switch (activetab) {
      case TAB_TYPE.ONE:
        return galeryData;
      case TAB_TYPE.TWO:
        return galeryData.filter(item => item.type == 'image');
      case TAB_TYPE.THREE:
        return galeryData.filter(item => item.type == 'video');
      default:
        return data;
    }
  };

  const getUserStats = () => {
    dispatch(
      getUserStatsAction(
        {
          userId: detail?._id,
        },
        result => {
          setUserStats({...result});
        },
      ),
    );
  };

  const getGalleryData = () => {
    dispatch(
      getGalleryListAction(
        {
          userId: detail?._id,
        },
        x => {
          setGalleryData([...x?.user]);
        },
      ),
    );
  };

  // const getGalleryVideo = () => {
  //   dispatch(
  //     getUserVideoListAction(detail?._id, res => {
  //       setGalleryData([...galeryData,res?.user[0]])
  //     }),
  //   );
  // };

  const blockUser = () => {
    dispatch(
      userBlockFromLive(
        {
          userId: detail?._id,
          blockedBy: userLoginList?.user?._id,
        },
        x => navigation.goBack(),
      ),
    );
  };

  const _followUnfollow = () => {
    setLoading(true);
    const param = {
      followByUserId: userLoginList?.user?._id,
      followToUserId: detail?._id,
    };
    dispatch(
      followUserAction(param, result => {
        if (result) {
          otherUserDetail.followByMe = !otherUserDetail.followByMe;
        }
        getUserStats();
        setLoading(false);
      }),
    );
  };

  const onLoadStart = () => {
    setOpacity(1);
  };

  const onLoad = () => {
    setOpacity(0);
  };

  const onBuffer = ({isBuffering}) => {
    setOpacity(isBuffering ? 1 : 0);
  };

  const _selectTab = type => () => setActiveTab(type);
  const _renderCoverImage = () => {
    if (detail?.coverImage) {
      return (
        <MyImage
          fast
          resizeMode={'cover'}
          style={styles.profilePic}
          source={{
            uri: checkURL(detail?.coverImage)
              ? `${IMAGE_URL}${detail?.coverImage}`
              : detail?.coverImage,
          }}
        />
      );
    } else if (detail?.profile)
      return (
        <MyImage
          fast
          resizeMode={'cover'}
          style={styles.profilePic}
          source={{
            uri: checkURL(detail?.profile)
              ? `${IMAGE_URL}${detail?.profile}`
              : detail?.profile,
          }}
        />
      );
    else
      return (
        <View style={styles.profilePic}>
          <SvgIcon.profilePlaceholder />
        </View>
      );
  };

  const handleVideo = item => {
    setShowVideo(IMAGE_URL + item?.file);
    refRBSheet.current.open();
  };

  const _renderGallery = ({item, index}) => {
    return (
      <Touchable
        onPress={() => {}}
        style={[
          styles.galleryItem,
          {marginHorizontal: index % 3 == 1 ? dynamicSize(10) : 0},
        ]}>
        {item.type == 'video' && (
          <View style={styles.absoluteVideo}>
            <SvgIcon.SmallVideoIcon />
          </View>
        )}
        {!item?.file ? (
          <SvgIcon.GalleryPlaceholder />
        ) : (
          <Touchable
            onPress={() =>
              item?.file && !(item.type == 'video')
                ? setIsVisible([{uri: `${IMAGE_URL}${item?.file}`}])
                : item.type == 'video'
                ? handleVideo(item)
                : null
            }>
            <Image
              source={{uri: IMAGE_URL + item?.file}}
              style={styles.image}
            />
          </Touchable>
        )}
      </Touchable>
    );
  };

  const _seperator = () => <View style={styles.seperator} />;

  const _goBack = () => {
    navigation.goBack();
  };

  const checkCallPossible = type => async () => {
    const data = {
      senderId: userLoginList?.user?._id,
      receiverId: detail._id,
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
        //  const userBusyorNot = await checkNodePresentOrNot(detail._id);
        //   if (userBusyorNot) {
        //     HelperService.showToast('User is busy on another call.');
        //     return;
        //   }
        const param = {
          callerId: userLoginList?.user?._id,
          receiverId: detail._id,
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
                receiverId: detail._id,
                receiverName: detail.name,
                receiverProfilePic: detail.profile,
                callerId: userLoginList?.user?._id,
                callerName: userLoginList?.user?.name,
                callerProfilePic: userLoginList?.user?.profile,
                callerPoints: userLoginList?.user?.points,
                receiverPoints: detail.points,
              };
              incomingCallQuery(detail._id).set(callingParams);
              props.navigation.navigate('VideoCall', callingParams);
            }
          }),
        );
      } catch (error) {
        console.log('error while call creation', error.message);
      }
    }
  };

  const _createRoom = () => {
    const param = {
      receiverId: detail._id,
    };
    dispatch(
      createChatRoomAction(param, result => {
        if (result) {
          setTimeout(() => {
            navigateToScreen('PersonalChat', {
              receiverId: detail._id,
              name: detail.name,
              profile: detail.profile,
              chatId: result._id,
            });
          }, 500);
        }
      }),
    );
  };

  const _closeReportVisible = () => {
    setReportVisible(false);
  };

  function checkURL(url) {
    return url?.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  function rechargePopup() {
    Alert.alert('', 'Your account balance is low,Please Recharge.', [
      {
        text: 'OK',
      },
    ]);
  }

  return (
    <>
      <SafeArea
        style={{
          backgroundColor:
            detail?.gender == 'male' ? COLORS.MALEbLUE : COLORS.LIGHT_BABY_PINK,
          paddingBottom: -useSafeAreaInsets().bottom,
        }}>
        <StatusBar
          backgroundColor={
            detail?.gender == 'male' ? COLORS.MALEbLUE : COLORS.LIGHT_BABY_PINK
          }
        />
        {/* <NotEnoughDiamondModal /> */}
        <View style={styles.mainContainer}>
          <View
            style={[
              styles.headerContainer,
              detail?.gender == 'male' && {
                backgroundColor: COLORS.MALEbLUE,
              },
            ]}>
            <TouchableIcon
              customIcon={
                <Ionicons
                  name={'chevron-back'}
                  size={dynamicSize(30)}
                  color={COLORS.WHITE}
                />
              }
              style={[
                styles.backIcon,
                // {top: useSafeAreaInsets().top + SCREEN_HEIGHT * 0.01},
              ]}
              onPress={_goBack}
            />
            <MyText style={styles.headerText}>
              {strings('profile.profileCaps')}
            </MyText>
            {userLoginList?.user?._id !== detail?._id && (
              <TouchableOpacity
                onPress={() => {
                  setPopUpVisible(!popUpVisible);
                }}
                style={{}}>
                <SimpleLineIcons
                  name={'options-vertical'}
                  size={dynamicSize(20)}
                  color={COLORS.WHITE}
                />
              </TouchableOpacity>
            )}
            {popUpVisible && (
              <View style={styles.popUp}>
                <TouchableOpacity
                  onPress={() => {
                    setPopUpVisible(false);
                    blockUser();
                  }}>
                  <Text style={styles.popUpText}>Block</Text>
                </TouchableOpacity>
                <View
                  style={{
                    borderBottomWidth: 0.5,
                    marginVertical: dynamicSize(5),
                    borderColor: COLORS.LIGHT_GREY_OFFSET,
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    setPopUpVisible(false);
                    setReportVisible(true);
                  }}>
                  <Text style={styles.popUpText}>Report</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: dynamicSize(60),
            }}
            style={{
              zIndex: -10,
            }}>
            {_renderCoverImage()}
            <View style={styles.dataContainer}>
              <MyText style={styles.weechaId}>
                Weecha Id : {detail?.userId}
              </MyText>
              <View style={styles.nameContainer}>
                <MyText numberOfLines={1} style={styles.name}>
                  {detail.name}
                </MyText>
                {userLoginList?.user?._id !== detail?._id && (
                  <Button
                    indicator={loading}
                    label={strings(
                      otherUserDetail?.followByMe
                        ? 'profile.unFollow'
                        : 'profile.followCaps',
                    )}
                    buttonStyle={[
                      styles.followButton,
                      detail?.gender == 'male' &&
                        !otherUserDetail?.followByMe && {
                          backgroundColor: COLORS.MALEbLUE,
                        },
                      detail?.gender == 'female' &&
                        otherUserDetail?.followByMe && {
                          backgroundColor: COLORS.MALEbLUE,
                        },
                    ]}
                    labelStyle={styles.followText}
                    onPress={_followUnfollow}
                  />
                )}
              </View>
              <View style={styles.subContainer}>
                <MyImage
                  source={
                    getCountryDetailWithKey({
                      key: 'name',
                      value: detail?.country,
                    }).icon
                  }
                  style={styles.flag}
                />
                <IconWithCount
                  count={detail?.level}
                  source={<SvgIcon.SmallestCrown />}
                  textStyle={{fontSize: FONT_SIZE.REGULAR}}
                  style={{
                    marginHorizontal: dynamicSize(5),
                    paddingHorizontal: SCREEN_HEIGHT * 0.005,
                  }}
                />
                <IconWithCount
                  tintColor={COLORS.LIGHT_VIOLET}
                  source={<SvgIcon.SmallGenderIcon />}
                  count={getAge(detail.DateOfBirth)}
                  textStyle={{fontSize: FONT_SIZE.REGULAR}}
                  style={{
                    paddingHorizontal: SCREEN_HEIGHT * 0.005,
                  }}
                />
              </View>
              <MyText style={styles.description}>{detail?.bio}</MyText>
              <View style={styles.countCard}>
                <CardCountLabel
                  label={strings('profile.followingCaps')}
                  count={userStats?.following}
                />
                <CardCountLabel
                  label={strings('profile.followersCaps')}
                  count={userStats?.follower}
                />
                <CardCountLabel
                  label={strings('profile.groupCaps')}
                  count={userStats?.group}
                />
                <View style={styles.labelWithCountContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <MyText style={styles.headerLabel}>
                      {strings('profile.sentCaps')}
                    </MyText>
                    <GiftIcon marginLeft={5} />
                  </View>
                  <MyText style={styles.headerLabelcount}>
                    {userStats?.gifts}
                  </MyText>
                </View>
              </View>
              <View style={styles.tabIconContainer}>
                <View
                  style={[styles.tabIconStyle.width, {alignItems: 'center'}]}>
                  <TouchableIcon
                    style={styles.tabIconStyle}
                    customIcon={<SvgIcon.Collection />}
                    onPress={_selectTab(TAB_TYPE.ONE)}
                  />
                  {activetab == TAB_TYPE.ONE && (
                    <ActivtabBorder style={styles.tabIndicator} />
                  )}
                </View>
                <View
                  style={[styles.tabIconStyle.width, {alignItems: 'center'}]}>
                  <TouchableIcon
                    style={styles.tabIconStyle}
                    customIcon={<SvgIcon.GalleryBlue />}
                    onPress={_selectTab(TAB_TYPE.TWO)}
                  />
                  {activetab == TAB_TYPE.TWO && (
                    <ActivtabBorder style={styles.tabIndicator} />
                  )}
                </View>
                <View
                  style={[styles.tabIconStyle.width, {alignItems: 'center'}]}>
                  <TouchableIcon
                    style={styles.tabIconStyle}
                    customIcon={<SvgIcon.Video />}
                    onPress={_selectTab(TAB_TYPE.THREE)}
                  />
                  {activetab == TAB_TYPE.THREE && (
                    <ActivtabBorder style={styles.tabIndicator} />
                  )}
                </View>
              </View>
              <MyList
                data={galleryData()}
                renderItem={_renderGallery}
                numColumns={3}
                contentContainerStyle={styles.galleryList}
                scrollEnabled={false}
                ItemSeparatorComponent={_seperator}
              />
            </View>
          </ScrollView>
          {userLoginList?.user?._id !== detail?._id && (
            <View
              style={[
                styles.abosoluteVideoButtonContainer,
                {bottom: useSafeAreaInsets().bottom + SCREEN_HEIGHT * 0.03},
              ]}>
              <TouchableIcon
                customIcon={<SvgIcon.AudioCallBlue />}
                onPress={() => {
                  console.log(detail);
                  if (detail?.callCharge < userLoginList?.user?.myBalance) {
                    callingFunctionality(CALLING_TYPE.AUDIO);
                  } else {
                    rechargePopup();
                  }
                }}
              />
              <TouchableIcon
                onPress={() => {
                  if (detail?.videoCharge < userLoginList?.user?.myBalance) {
                    callingFunctionality(CALLING_TYPE.VIDEO);
                  } else {
                    rechargePopup();
                  }
                }}
                style={styles.videoCallIcon}
                customIcon={<SvgIcon.VideoCallPink />}
              />
              <TouchableIcon
                onPress={() => {
                  console.log(detail.messageCharge);
                  console.log(userLoginList.user.myBalance);
                  if (detail?.messageCharge < userLoginList?.user?.myBalance) {
                    _createRoom();
                  } else {
                    rechargePopup();
                  }
                }}
                customIcon={<SvgIcon.TextMsgBlue />}
              />
            </View>
          )}
        </View>
      </SafeArea>
      {reportVisible && (
        <ReportModal
          isVisible={reportVisible}
          onRequestClose={_closeReportVisible}
          reportBy={userLoginList?.user?._id}
          selectedUserId={detail?._id}
        />
      )}
      <ImageView
        images={visible}
        imageIndex={0}
        visible={visible.length ? true : false}
        onRequestClose={() => setIsVisible([])}
      />
      <RBSheet
        ref={refRBSheet}
        openDuration={250}
        height={SCREEN_HEIGHT}
        customStyles={sheetCustomStyles}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={[
              videoStyles.videoContainer,
              {paddingBottom: useSafeAreaInsets().bottom},
            ]}>
            <TouchableOpacity
              style={videoStyles.videoCloseBtn}
              onPress={() => {
                refRBSheet.current.close();
              }}>
              <Icon
                origin="AntDesign"
                name="close"
                size={16}
                color={COLORS.WHITE}
              />
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={() => setPaused(!paused)}>
              <Video
                source={{uri: showVideo}}
                style={videoStyles.video}
                repeat={false}
                // paused={paused}
                onBuffer={onBuffer}
                onLoadStart={onLoadStart}
                onLoad={onLoad}
                bufferConfig={{
                  minBufferMs: 10000,
                  maxBufferMs: 30000,
                  bufferForPlaybackMs: 2500,
                  bufferForPlaybackAfterRebufferMs: 5000,
                }}
              />
            </TouchableWithoutFeedback>
            <ActivityIndicator
              animating
              size="large"
              color={COLORS.PINK}
              style={[videoStyles.activityIndicator, {opacity: opacity}]}
            />
          </View>
        </View>
      </RBSheet>
    </>
  );
};

export default UserProfile;

const videoStyles = {
  activityIndicator: {
    position: 'absolute',
    left: (SCREEN_WIDTH * 0.7) / 2,
    top: (SCREEN_WIDTH * 0.65) / 2,
  },
  video: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.55,
    backgroundColor: COLORS.BLACK,
    alignSelf: 'center',
  },
  videoContainer: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.7,
    alignSelf: 'center',
    backgroundColor: COLORS.WHITE,
  },
  videoCloseBtn: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: COLORS.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 8,
    marginVertical: 4,
  },
};

const sheetCustomStyles = {
  wrapper: {
    justifyContent: 'center',
  },
  container: {
    alignSelf: 'center',
    position: 'absolute',
    width: SCREEN_WIDTH,
    backgroundColor: COLORS.TRANSPARENT,
  },
};
