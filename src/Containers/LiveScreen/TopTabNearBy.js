import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, FlatList, RefreshControl, Platform} from 'react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Geolocation from 'react-native-geolocation-service';
import {useIsFocused} from '@react-navigation/native';

import styles from './styles';
import {COLORS} from '../../Utils/colors';
import {MyIndicator, Touchable} from '../../Component/commomComponent';
import {getData} from '../../Utils/helper';
import {
  endLiveStreamingAction,
  getHostExtraDetailAction,
  getLiveUserListAction,
  hostDetailAction,
} from '../../Redux/Action';
import useFetchListLiveStream from '../../hooks/useFetchListLiveStream';
import {STREAM_TYPE} from '../../Utils/agoraConfig';
import LiveStreamingCard from './LiveStreamingCard';
import {SvgIcon} from '../../Component/icons';
import {UserServices} from '../../Services/Api/userServices';
import {LOCAL_KEY} from '../../Utils/localStorage';
import {requestLocationPermission} from '../../Utils/permissionLocation';

export default function TopTabNearBy({navigation}) {
  const dispatch = useDispatch();
  const {kickedOutRooms, blockedLiveRooms} = useSelector(
    state => state.streamingReducer,
  );
  const {userLoginList} = useSelector(state => state.authReducer);

  const paginationOffset = useRef(0);
  const waitTillFetchingData = useRef(true);
  const [selectedTab, UpdateSelectedtab] = useState(2);
  const [liveUserList, setLiveUserList] = useState([]);

  const [fetching, setFetching] = useState(false);
  const [pullToRefreshIndicator, setPullToRefreshIndicator] = useState(false);
  const [footerIndicator, setFooterIndicator] = useState(false);
  const [totalDataCount, UpdateTotalDataCount] = useState(0);
  const [country, setCountry] = useState(null);
  const [currentLoc, setCurrentLoc] = useState();
  const [nearbyLive, setNearbyLive] = useState();
  const isScreenFocused = useIsFocused();

  useEffect(() => {
    getGeoLoaction();
  }, [selectedTab, isScreenFocused]);

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

  const renderLiveUserProfile = ({item, index}) => {
    return LiveStreamingCard(item, index, _joinAsAudience);
  };

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
          let getedArray = data?.data; // this array is got from API
          let newArray = [];
          UpdateTotalDataCount(data?.totalData);

          for (let i = 0; i < getedArray.length; i++) {
            if (i === 1) {
              if (getedArray.length === 2) {
                newArray.push([getedArray[i]]);
              } else {
                newArray.push([getedArray[i], getedArray[i + 1]]);
              }
              i++;
            } else {
              newArray.push(getedArray[i]);
            }
          }
          setNearbyLive([...newArray]);
        } else {
          setNearbyLive([]);
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
    _getLiveUserList();
  };

  const footerRender = () => {
    return footerIndicator && <MyIndicator verticalSpace />;
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

  const _navToLive = () => navigation.navigate('LetsGoLive');

  return (
    <>
      <View style={styles.scrollContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={nearbyLive}
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
      <Touchable onPress={_navToLive} style={styles.absolute}>
        <SvgIcon.StartLiveIcon />
      </Touchable>
    </>
  );
}
