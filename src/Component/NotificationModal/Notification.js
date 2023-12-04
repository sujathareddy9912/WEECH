import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Image, RefreshControl, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {SvgIcon} from '../icons';
import {getAge, SCREEN_HEIGHT} from '../../Utils/helper';
import {dynamicSize} from '../../Utils/responsive';

import {
  getMomentsNotification,
  getLiveUserNotification,
} from '../../Services/Api/LiveStreaming';
import {
  IconWithCount,
  MyIndicator,
  MyLinearGradient,
  MyText,
} from '../commomComponent';
import {COLORS} from '../../Utils/colors';
import moment from 'moment';
import {IMAGE_URL} from '../../Services/Api/Common';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAnotherUserProfile,
  getHostExtraDetailAction,
  hostDetailAction,
} from '../../Redux/Action';
import {STREAM_TYPE} from '../../Utils/agoraConfig';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {Modal} from 'react-native-paper';

export function NotificationModal(props) {
  const {isVisible, notificationPress} = props;

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const [momentData, updateMomentData] = useState([]);
  const [liveUserData, updateLiveUserData] = useState([]);
  const [momentLoader, updateMomentLoader] = useState(false);
  const [liveUserLoader, updateLiveUserLoader] = useState(false);
  const [selectNotificationIndex, setSelectNotificationIndex] = useState('1');

  const {kickedOutRooms, blockedLiveRooms} = useSelector(
    state => state.streamingReducer,
  );

  const changeNotificationType = index => () => {
    updateMomentData([]);
    updateLiveUserData([]);
    updateMomentLoader(true);
    updateLiveUserLoader(true);
    setSelectNotificationIndex(index);

    if (index == '1') {
      getLiveDetails();
    } else {
      getMomentDetails();
    }
  };

  useEffect(() => {
    updateLiveUserLoader(true);
    getLiveDetails();
  }, []);

  const getLiveDetails = async () => {
    try {
      const data = {
        length: 10,
        start: liveUserData.length,
      };
      const response = await getLiveUserNotification(data);
      updateLiveUserData(response.data.data.data);
    } catch (error) {
      console.log('error message getLiveDetails', error);
    } finally {
      updateLiveUserLoader(false);
    }
  };

  const getMomentDetails = async () => {
    try {
      const response = await getMomentsNotification();
      updateMomentData(response.data.data);
    } catch (error) {
      console.log('error message getMomentDetails', error);
    } finally {
      updateMomentLoader(false);
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
    notificationPress();
    navigation.navigate('liveStreaming', {
      ...item,
      type: STREAM_TYPE.AUDIENCE,
      channel: item?.liveName,
      token: item?.liveToken,
    });
    dispatch(getHostExtraDetailAction(item?._id));
  };

  const profileRedirection = item => {
    dispatch(
      getAnotherUserProfile({userId: item?.fromUserData?._id}, data => {
        if (data?.user) {
          notificationPress();
          navigation.navigate('UserProfile', data?.user);
        }
      }),
    );
  };

  const renderLiveUserData = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => _joinAsAudience(item)}
        style={styles.renderLiveUserContainer}>
        <Image
          resizeMode={'contain'}
          style={styles.coverPicLiveUser}
          source={{uri: `${IMAGE_URL}${item.coverImage}`}}
        />
        <View style={{marginLeft: dynamicSize(8)}}>
          <View style={styles.liveTypeText}>
            <Text style={{fontSize: 8, fontWeight: '500'}}>LIVE</Text>
          </View>

          <Text style={[styles.liveUserName, {marginTop: dynamicSize(4)}]}>
            {item.name}
          </Text>
          <View
            style={[styles.flexDirection, {paddingVertical: dynamicSize(6)}]}>
            <IconWithCount count={item?.level || 0} />

            <MyLinearGradient
              colors={[COLORS.GRADIENT_VIOLET, COLORS.GRADIENT_VIOLET]}
              style={styles.ageContainer}>
              <MyText style={{color: COLORS.WHITE}}>
                {getAge(item?.DateOfBirth)}
              </MyText>
            </MyLinearGradient>
          </View>
          <View style={styles.flexDirection}>
            <SvgIcon.FlameIcon />
            <Text style={{marginLeft: dynamicSize(5)}}>{item?.letsJoin}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const emptyListingData = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text>No Data Found</Text>
      </View>
    );
  };

  const _renderMomentData = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => profileRedirection(item)}
        style={styles.momentContainer}>
        <View style={styles.flexDirection}>
          {!!item.fromUserData.profile ? (
            <Image
              source={{uri: `${IMAGE_URL}${item.fromUserData.profile}`}}
              style={styles.momentPic}
            />
          ) : (
            <View style={styles.momentPic}>
              <SvgIcon.SmallProfilePlaceholder />
            </View>
          )}

          <View style={{marginLeft: 5}}>
            <Text style={styles.liveUserName}>{item.fromUserData.name}</Text>
            <Text style={styles.subjectName}>{item.subject}</Text>
            <Text style={styles.date}>
              {moment(item.updatedAt).format('dd mm yyyy, HH:MM')}
            </Text>
          </View>
        </View>

        {!!item.postData && (
          <Image
            source={{uri: `${IMAGE_URL}${item.postData}`}}
            style={styles.postImage}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      onDismiss={notificationPress}
      contentContainerStyle={styles.modalContainer}>
      <View style={styles.mainContainer}>
        <TouchableOpacity activeOpacity={1} style={styles.headerContainer}>
          <View style={styles.headingStyle}>
            <Text style={{color: '#979797', fontWeight: '600'}}>
              Notification
            </Text>
          </View>
          <TouchableOpacity
            style={styles.notificationContainer}
            onPress={notificationPress}>
            <SvgIcon.NotificationRedIcon />
          </TouchableOpacity>
        </TouchableOpacity>

        <View style={styles.subHeaderContainer}>
          <TouchableOpacity
            onPress={changeNotificationType('1')}
            style={{
              paddingVertical: 10,
            }}
            containerStyle={[
              styles.notificationType,
              {
                backgroundColor:
                  selectNotificationIndex == '1' ? COLORS.DARK_RED : 'white',
              },
            ]}>
            <Text
              style={{
                color: selectNotificationIndex == '1' ? 'white' : 'black',
              }}>
              Live
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={changeNotificationType('2')}
            style={{
              paddingVertical: 10,
            }}
            containerStyle={[
              styles.notificationType,
              {
                backgroundColor:
                  selectNotificationIndex == '2' ? COLORS.DARK_RED : 'white',
              },
            ]}>
            <Text
              style={{
                color: selectNotificationIndex == '2' ? 'white' : 'black',
              }}>
              Moments
            </Text>
          </TouchableOpacity>
        </View>

        {selectNotificationIndex == '1' && (
          <>
            {!liveUserLoader && (
              <FlatList
                data={liveUserData}
                renderItem={renderLiveUserData}
                ListEmptyComponent={emptyListingData}
                // refreshControl={
                //   <RefreshControl
                //     refreshing={pullToRefreshIndicator}
                //     onRefresh={_onPullToRefresh}
                //     tintColor={COLORS.WHITE}
                //   />
                // }
                // ListFooterComponent={footerRender}
                // onEndReachedThreshold={0.7}
                // onEndReached={_onEndReached}
              />
            )}

            {liveUserLoader && (
              <MyIndicator
                color={COLORS.DARK_RED}
                style={{marginTop: dynamicSize(40)}}
              />
            )}
          </>
        )}

        {selectNotificationIndex == '2' && (
          <>
            {!momentLoader && (
              <FlatList
                data={momentData}
                renderItem={_renderMomentData}
                ListEmptyComponent={emptyListingData}
              />
            )}

            {momentLoader && (
              <MyIndicator
                color={COLORS.DARK_RED}
                style={{marginTop: dynamicSize(40)}}
              />
            )}
          </>
        )}
      </View>
    </Modal>
  );
}
