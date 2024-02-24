import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import Geolocation from 'react-native-geolocation-service';

import {
  View,
  Alert,
  Platform,
  FlatList,
  StatusBar,
  ScrollView,
  RefreshControl,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {TouchableOpacity} from 'react-native-gesture-handler';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const TopTab = createMaterialTopTabNavigator();

import {
  hostDetailAction,
  getLiveUserListAction,
  endLiveStreamingAction,
  getHostExtraDetailAction,
} from '../../Redux/Action';

import {
  MyText,
  MyList,
  MyImage,
  Touchable,
  MyIndicator,
  CustomModal,
  MyTextInput,
} from '../../Component/commomComponent';

import {COLORS} from '../../Utils/colors';
import styles, {fileWidth} from './styles';
import CallModal from '../../Component/CallModal';
import {dynamicSize} from '../../Utils/responsive';
import {LOCAL_KEY} from '../../Utils/localStorage';
import {IMAGE_URL} from '../../Services/Api/Common';
import {STREAM_TYPE} from '../../Utils/agoraConfig';
import {countryCode} from '../../Utils/countryCode';
import icons, {SvgIcon} from '../../Component/icons';
import * as Animatable from 'react-native-animatable';
import {UserServices} from '../../Services/Api/userServices';
import ProfileGift from '../../Assets/Icons/profileGift.svg';
import {LiveScreenHeader} from '../../Component/LiveScreenHeader';
import useFetchListLiveStream from '../../hooks/useFetchListLiveStream';
import {getAge, getData, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Utils/helper';
import {NotificationModal} from '../../Component/NotificationModal/Notification';
import {requestLocationPermission} from '../../Utils/permissionLocation';
import {useIsFocused} from '@react-navigation/native';
import TopTabTrendingLive from './TopTabTrendingLive';
import TopTabNearBy from './TopTabNearBy';
import TopTabPKBattle from './TopTabPKBattle';

export default LiveUserListing = ({navigation}) => {
  const dispatch = useDispatch();
  const isScreenFocused = useIsFocused();

  const {kickedOutRooms, blockedLiveRooms} = useSelector(
    state => state.streamingReducer,
  );

  const {userLoginList} = useSelector(state => state.authReducer);

  const scrollViewRef = useRef();
  const refRBSheet = useRef();
  const paginationOffset = useRef(0);
  const waitTillFetchingData = useRef(true);

  const [searchText, setSearch] = useState('');
  const [country, setCountry] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [selectedTab, UpdateSelectedtab] = useState(0);
  const [liveUserList, setLiveUserList] = useState([]);
  const [totalDataCount, UpdateTotalDataCount] = useState(0);
  const [countryList, setCountryList] = useState(countryCode);
  const [footerIndicator, setFooterIndicator] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [pullToRefreshIndicator, setPullToRefreshIndicator] = useState(false);

  const [currentLoc, setCurrentLoc] = useState();
  const [nearbyLive, setNearbyLive] = useState();

  const handleDynamicLink = link => {
    // Handle dynamic link inside your own application
    let url = link?.url.split('?')[0];
    let data = link?.url.split('?')[1];
    if (url === 'https://www.google.com') {
      let urlParam = data.split('&');
      let param = {};
      urlParam.map(item => {
        param[item.split('=')[0]] = item.split('=')[1];
      });
      if (param?.liveToken) {
        _joinAsAudience(param);
      }
    }
  };

  useEffect(() => {
    // const backHandler = BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   backAction,
    // );
    updateFcmToken();

    paginationOffset.current = 0;
    setFetching(true);
    _getLiveUserList();
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        let url = link?.url.split('?')[0];
        let data = link?.url.split('?')[1];
        if (url === 'https://www.google.com') {
          let urlParam = data.split('&');
          let param = {};
          urlParam.map(item => {
            param[item.split('=')[0]] = item.split('=')[1];
          });
          if (param?.liveToken) {
            _joinAsAudience(param);
          }
        }
      })
      .catch(err => {});
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
    // return () => backHandler.remove();
  }, [isScreenFocused]);

  // const backAction = () => {
  //   BackHandler.exitApp();
  //   return true;
  // };

  const getGeoLoaction = async () => {
    if (selectedTab === 2) {
      const hasLocationPermission = await requestLocationPermission();
      if (hasLocationPermission) {
        Geolocation.getCurrentPosition(
          position => {
            setCurrentLoc({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            _getLiveUserList();
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          },
        );
      }
    }
  };

  useEffect(() => {
    getGeoLoaction();
  }, [selectedTab, isScreenFocused]);

  const _getLiveUserList = () => {
    const params = {
      pageNumber: paginationOffset.current,
      country: country?.name || 'India',
    };
    if (selectedTab === 2) {
      params.latitude = currentLoc?.latitude;
      params.longitude = currentLoc?.longitude;
    }
    dispatch(
      getLiveUserListAction(params, async data => {
        if (data?.data?.length) {
          let replicaData = [];
          if (paginationOffset.current == 0) {
            UpdateTotalDataCount(data?.totalData);
            const result = data?.data?.map(async (item, index) => {
              const dataNode = await useFetchListLiveStream(item);
              if (dataNode?.status) {
                if (replicaData.length == 0) {
                  replicaData[0] = {...item, isLive: dataNode?.status || false};
                } else if (replicaData.length == 1) {
                  replicaData[1] = [
                    {...item, isLive: dataNode?.status || false},
                  ];
                } else if (replicaData.length == 2) {
                  replicaData[1].push({
                    ...item,
                    isLive: dataNode?.status || false,
                  });
                } else
                  replicaData.push({
                    ...item,
                    isLive: dataNode?.status || false,
                  });
              } else {
                dispatch(
                  endLiveStreamingAction({
                    userId: item?._id,
                    roomId: item?.liveToken,
                    roomName: item?.liveName,
                  }),
                );
              }
              return replicaData;
            });
            await Promise.all(result);
            setLiveUserList([...replicaData]);
            if (selectedTab === 2) {
              setNearbyLive([...replicaData]);
            }
          } else {
            const result = data?.data?.map(async item => {
              const dataNode = await useFetchListLiveStream(item);
              if (dataNode?.status) {
                replicaData.push({...item, isLive: dataNode?.status || false});
              } else {
                dispatch(
                  endLiveStreamingAction({
                    userId: item?._id,
                    roomId: item?.liveToken,
                    roomName: item?.liveName,
                  }),
                );
              }
            });
            await Promise.all(result);
            setLiveUserList([...replicaData]);
            if (selectedTab === 2) {
              setNearbyLive([...replicaData]);
            }
          }
        } else {
          setLiveUserList([]);
          if (selectedTab === 2) {
            setNearbyLive([]);
          }
        }
        setFetching(false);
        setPullToRefreshIndicator(false);
        setFooterIndicator(false);
      }),
    );
  };

  const updateFcmToken = async () => {
    const fcmToken = await getData(LOCAL_KEY.FCM_TOKEN);

    if (fcmToken) {
      const data = {
        type: Platform.OS,
        fcmToken: fcmToken,
        userId: userLoginList?.user?._id,
      };

      UserServices.updateFcmTokenApi(data);
    }
  };

  const _onPullToRefresh = () => {
    paginationOffset.current = 0;
    setPullToRefreshIndicator(true);
    _getLiveUserList();
  };

  const _onEndReached = () => {
    if (
      waitTillFetchingData.current &&
      navigation.isFocused() &&
      totalDataCount > paginationOffset.current + 10
    ) {
      waitTillFetchingData.current = false;
      paginationOffset.current = paginationOffset.current + 10;
      setFooterIndicator(true);
      _getLiveUserList();
    }
  };

  const onChangeTab = async index => {
    if (index === 2) {
      const grant = await requestLocationPermission();
      if (!grant) {
        return;
      }
    }
    UpdateSelectedtab(index);
    scrollViewRef.current?.scrollTo({x: index * SCREEN_WIDTH, animated: true});
  };

  const _navToLive = () => navigation.navigate('LetsGoLive');

  const _joinAsAudience = item => {
    if (kickedOutRooms?.includes(item?.liveToken)) {
      return Alert.alert('You have been kicked out from this live');
    }
    if (blockedLiveRooms?.includes(item?.liveToken)) {
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
      channel: item?.liveName,
      token: item?.liveToken,
    });
    dispatch(getHostExtraDetailAction(item?._id));
  };

  const footerRender = () => {
    return footerIndicator && <MyIndicator verticalSpace />;
  };

  const _renderCoverImage = (item, index) => {
    if (item?.coverImage) {
      return (
        <MyImage
          fast
          borderRadius={5}
          resizeMode={'cover'}
          style={[styles.imageContainer, index == 0 ? styles.one : undefined]}
          source={{uri: `${IMAGE_URL}${item.coverImage}`}}
        />
      );
    } else if (item?.profile)
      return (
        <MyImage
          fast
          borderRadius={5}
          resizeMode={'cover'}
          style={[styles.imageContainer, index == 0 ? styles.one : undefined]}
          source={{uri: `${IMAGE_URL}${item.profile}`}}
        />
      );
    else return <SvgIcon.profilePlaceholder />;
  };

  // moved to LiveStreamingCard
  const renderCard = (item, index) => {
    console.log(item);
    if (index == 0) {
      return item?._id ? (
        <TouchableOpacity onPress={() => _joinAsAudience(item)}>
          <View style={[styles.absoluteImage, styles.one]}>
            {_renderCoverImage(item, index)}
          </View>
          <View style={[styles.imageSubContainer, styles.one]}>
            <View style={styles.topContainer}>
              {/* {!!item.adminBadge ? ( */}
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#FF2E55', '#FE9E02']}
                style={styles.myStarContainer}>
                <View style={{bottom: 2}}>
                  <SvgIcon.PoperHeart />
                </View>
                <MyText style={styles.myStarValue}>{item.adminBadge}</MyText>
              </LinearGradient>
              {/* ) : (
                <View />
              )} */}

              <View style={[styles.myStarContainer]}>
                <ProfileGift />
                <MyText style={styles.groupCount}>{item?.todayEarning}</MyText>
              </View>
            </View>
            <View style={styles.row}>
              <View>
                <View style={styles.nameContainer}>
                  <SvgIcon.FlameIcon />
                  <MyText style={styles.joinTextStyle}>{item?.letsJoin}</MyText>
                </View>

                <MyText style={styles.nameStyle}>
                  {item.name}, {getAge(item?.DateOfBirth)}
                </MyText>
              </View>
              <View style={styles.starContainer}>
                {/* {item.star != 0 && ( */}
                <View style={styles.starContainer}>
                  <MyImage source={icons.starIcon} />
                  <View style={styles.starText}>
                    <MyText style={styles.starCount}>{item.star}</MyText>
                  </View>
                </View>
                {/* )} */}
                <View style={styles.groupContainer}>
                  <SvgIcon.OrangeEyeIcon />
                  <MyText style={styles.valueText}>
                    {item.totalLiveUser || 0}
                  </MyText>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ) : null;
    } else if (index == 1) {
      return item?.length ? (
        <View
          style={{
            flexDirection: 'column',
            height: styles.one.height,
            width: styles.one.width,
            // justifyContent:'space-between'
          }}>
          {item.map((eachItem, eachIndex) => {
            console.log('ppppppppp', eachItem);
            return (
              <TouchableOpacity
                style={{
                  marginTop: eachIndex == 1 ? dynamicSize(4) : 0,
                  width: fileWidth,
                  height: fileWidth,
                }}
                onPress={() => _joinAsAudience(eachItem)}>
                <View style={styles.absoluteImage}>
                  {_renderCoverImage(eachItem, index)}
                </View>
                <View style={styles.imageSubContainer}>
                  <View style={styles.topContainer}>
                    {!!eachItem.adminBadge ? (
                      <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        colors={['#FF2E55', '#FE9E02']}
                        style={styles.myStarContainer}>
                        <View style={{bottom: 2}}>
                          <SvgIcon.PoperHeart />
                        </View>
                        <MyText style={styles.myStarValue}>
                          {eachItem.adminBadge}
                        </MyText>
                      </LinearGradient>
                    ) : (
                      <View />
                    )}

                    <View style={styles.myStarContainer}>
                      <MyText style={styles.groupCount}>
                        {eachItem?.todayEarning}
                      </MyText>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View>
                      <View style={styles.nameContainer}>
                        <SvgIcon.FlameIcon />
                        <MyText style={styles.joinTextStyle}>
                          {eachItem?.letsJoin}
                        </MyText>
                      </View>

                      <MyText style={styles.nameStyle}>
                        {eachItem.name}, {getAge(eachItem?.DateOfBirth) || 23}
                      </MyText>
                    </View>
                    <View style={styles.starContainer}>
                      {eachItem.star != 0 && (
                        <View style={styles.starContainer}>
                          <MyImage source={icons.starIcon} />
                          <View style={styles.starText}>
                            <MyText style={styles.starCount}>
                              {eachItem.star}
                            </MyText>
                          </View>
                        </View>
                      )}
                      <View style={styles.groupContainer}>
                        <SvgIcon.OrangeEyeIcon />
                        <MyText style={styles.valueText}>
                          {eachItem.totalLiveUser || 0}
                        </MyText>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null;
    } else
      return item?._id ? (
        <TouchableOpacity onPress={() => _joinAsAudience(item)}>
          <View style={styles.absoluteImage}>
            {_renderCoverImage(item, index)}
          </View>
          <View style={styles.imageSubContainer}>
            <View style={styles.topContainer}>
              {!!item.adminBadge ? (
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#FF2E55', '#FE9E02']}
                  style={styles.myStarContainer}>
                  <View style={{bottom: 2}}>
                    <SvgIcon.PoperHeart />
                  </View>
                  <MyText style={styles.myStarValue}>{item.adminBadge}</MyText>
                </LinearGradient>
              ) : (
                <View />
              )}

              <View style={styles.myStarContainer}>
                <MyText style={styles.groupCount}>{item?.todayEarning}</MyText>
              </View>
            </View>
            <View style={styles.row}>
              <View>
                <View style={styles.nameContainer}>
                  <SvgIcon.FlameIcon />
                  <MyText style={styles.joinTextStyle}>{item?.letsJoin}</MyText>
                </View>

                <MyText style={styles.nameStyle}>
                  {item.name}, {getAge(item?.DateOfBirth) || 23}
                </MyText>
              </View>
              <View style={styles.starContainer}>
                {item.star != 0 && (
                  <View style={styles.starContainer}>
                    <MyImage source={icons.starIcon} />
                    <View style={styles.starText}>
                      <MyText style={styles.starCount}>{item.star}</MyText>
                    </View>
                  </View>
                )}
                <View style={styles.groupContainer}>
                  <SvgIcon.OrangeEyeIcon />
                  <MyText style={styles.valueText}>
                    {item.totalLiveUser || 0}
                  </MyText>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ) : null;
  };

  const renderLiveUserProfile = ({item, index}) => {
    return renderCard(item, index);
  };

  const renderCountry = ({item}) => (
    <Touchable
      onPress={() => setCountry(item)}
      style={[
        styles.item,
        country?.name === item?.name && {
          borderWidth: 1,
          borderColor: COLORS.LIGHT_BABY_PINK,
        },
      ]}>
      <MyText style={{textAlign: 'center'}}>{item.name}</MyText>
    </Touchable>
  );
  const onFilterPress = () => refRBSheet.current.open();
  const onSearchPress = () => navigation.navigate('SearchStream');

  const _onChangeText = text => {
    setSearch(text);
    if (text.trim().length) {
      const filteredList = countryCode.filter(item => {
        if (item['name'].includes(text)) return item;
      });

      setCountryList(filteredList);
    } else setCountryList(countryCode);
  };

  const handleApplyFilter = () => {
    _getLiveUserList();
    refRBSheet.current.close();
  };

  const onActivateNotificationModal = () => {
    setNotificationModal(!notificationModal);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.BABY_PINK} />
      <Animatable.View
        animation="fadeIn"
        easing="ease"
        duration={3000}
        style={styles.container}>
        {/* <LiveScreenHeader
          selectedTab={selectedTab}
          onFilterPress={onFilterPress}
          onHeaderTextPress={onChangeTab}
          onSearchPress={onSearchPress}
          onNotificationPress={onActivateNotificationModal}
        /> */}
        <TapTabNav
          onFilterPress={onFilterPress}
          onSearchPress={onSearchPress}
          onNotificationPress={onActivateNotificationModal}
        />
        {/* <ScrollView
          horizontal
          bounces={false}
          ref={scrollViewRef}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {selectedTab === 0 && (
            <View style={styles.scrollContainer}>
              <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={liveUserList}
                keyExtractor={item => item.id}
                renderItem={renderLiveUserProfile}
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
                columnWrapperStyle={styles.columnContainer}
                contentContainerStyle={styles.contentStyle}
              />
            </View>
          )}
          {selectedTab === 2 && (
            <View style={styles.scrollContainer}>
              <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={liveUserList}
                keyExtractor={item => item.id}
                renderItem={renderLiveUserProfile}
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
                columnWrapperStyle={styles.columnContainer}
                contentContainerStyle={styles.contentStyle}
              />
            </View>
          )}

          {selectedTab === 1 && <View></View>}
          <Touchable onPress={_navToLive} style={styles.absolute}>
            <SvgIcon.StartLiveIcon />
          </Touchable>
        </ScrollView> */}
      </Animatable.View>
      {notificationModal && (
        <NotificationModal
          isVisible={notificationModal}
          notificationPress={onActivateNotificationModal}
        />
      )}

      {/* <CallModal /> */}
      <RBSheet ref={refRBSheet} openDuration={250} height={SCREEN_HEIGHT * 0.4}>
        <View style={styles.exitModal}>
          <MyText style={styles.exitText}>Filter your Country/Region</MyText>
          <View style={styles.inputCon}>
            <SvgIcon.countrySearch />
            <MyTextInput
              value={searchText}
              placeholder={'Search'}
              placeholderTextColor={COLORS.LIGHT_BABY_PINK}
              selectionColor={COLORS.LIGHT_BABY_PINK}
              style={styles.input}
              onChangeText={_onChangeText}
            />
          </View>
          <MyList
            // numColumns={2}
            data={countryList}
            renderItem={renderCountry}
            style={{
              marginVertical: dynamicSize(18),
            }}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
          <Touchable onPress={handleApplyFilter} style={styles.btn}>
            <MyText style={styles.btnTxt}>Apply Filter</MyText>
          </Touchable>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

function MyTabBar({
  state,
  descriptors,
  navigation,
  position,
  onSearchPress,
  onFilterPress,
  onHeaderTextPress,
  onNotificationPress,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingTop: dynamicSize(15),
        paddingBottom: dynamicSize(15),
        backgroundColor: COLORS.BABY_PINK,
      }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          return (
            <Touchable
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}>
              <MyText
                style={[
                  styles.textStyle,
                  {
                    fontWeight: isFocused ? 'bold' : '',
                  },
                ]}>
                {label}
              </MyText>
            </Touchable>
          );
        })}
      </ScrollView>
      <View style={styles.rightCon}>
        <Touchable onPress={onSearchPress} style={styles.iconContainer}>
          <SvgIcon.SearchIcon />
        </Touchable>

        <Touchable onPress={onFilterPress} style={styles.iconContainer}>
          <SvgIcon.FilterIcon />
        </Touchable>

        <Touchable onPress={onNotificationPress} style={styles.iconContainer}>
          <SvgIcon.NotificationIcon />
        </Touchable>
      </View>
    </View>
  );
}

const TapTabNav = props => {
  const {onSearchPress, onFilterPress, onNotificationPress} = props;
  return (
    <TopTab.Navigator
      tabBar={props => (
        <MyTabBar
          {...props}
          onSearchPress={onSearchPress}
          onFilterPress={onFilterPress}
          onNotificationPress={onNotificationPress}
        />
      )}>
      <TopTab.Screen
        name="TrendingLive"
        component={TopTabTrendingLive}
        options={{
          title: 'Trending Live',
        }}
      />
      <TopTab.Screen
        name="PKBattle"
        component={TopTabPKBattle}
        options={{
          title: 'PK Battle',
        }}
      />
      <TopTab.Screen
        name="NearBy"
        component={TopTabNearBy}
        options={{
          title: 'Near By',
        }}
      />
    </TopTab.Navigator>
  );
};

// In future we can reduce code of this file after some days of testing like as now we are integrating toptap navigations if its not give any error then we'll remove some code which is not in use as we split in multipe files
