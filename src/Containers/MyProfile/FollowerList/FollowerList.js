import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React, {useState} from 'react';
import {Image} from 'react-native-animatable';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';

import {styles} from './styles';
import {COLORS} from '../../../Utils/colors';
import {SvgIcon} from '../../../Component/icons';
import Gender from '../../../Assets/Icons/Gender.svg';
import Header from '../../../Component/header/Header';
import {IMAGE_URL} from '../../../Services/Api/Common';
import CrownIcon from '../../../Assets/Icons/crown.svg';
import {
  followUserAction,
  getAnotherUserProfile,
  getFollowerListAction,
} from '../../../Redux/Action';
import {getAge, getCountryDetailWithKey} from '../../../Utils/helper';
import {MyImage, MyText, Touchable} from '../../../Component/commomComponent';

const FollowerList = ({navigation}) => {
  const [followers, setFollowers] = useState([]);
  const [followList, setFollowList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector(state => {
    return state;
  });

  const {userLoginList} = state.authReducer;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(
      getFollowerListAction(
        {
          start: 0,
          limit: 100,
          userId: userLoginList?.user?._id,
          search: '',
        },
        list => {
          setFollowers(list);
          setRefreshing(false);
        },
      ),
    );
  }, []);

  const leftHeaderComponent = (
    <TouchableOpacity
      style={styles.backContainer}
      onPress={() => navigation?.goBack()}>
      <FontAwesome5Icon
        name={'chevron-left'}
        color={COLORS.BLACK}
        size={wp(4)}
        style={{
          marginRight: wp(1),
        }}
      />
      <Text>Back</Text>
    </TouchableOpacity>
  );

  const handleFollow = id => {
    const param = {
      followByUserId: userLoginList?.user?._id,
      followToUserId: id,
    };
    dispatch(
      followUserAction(param, result => {
        if (result) {
          if (followList.includes(id)) {
            const filtered = followList.filter(e => e !== id);
            setFollowList(filtered);
          } else {
            let arr = followList;
            arr.push(id);
            setFollowList([...new Set(arr)]);
          }
        }
      }),
    );
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

  const renderItem = ({item}) => {
    const {followByUser} = item;
    return (
      <Touchable
        onPress={() => profileRedirection(followByUser?._id)}
        style={styles.item}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          {followByUser?.profile ? (
            <Image
              source={{uri: `${IMAGE_URL}${followByUser?.profile}`}}
              style={styles.userImg}
            />
          ) : (
            <FontAwesome
              name={'user-circle-o'}
              color={COLORS.TAB_BORDER}
              size={wp(11)}
              style={{
                marginRight: wp(3),
              }}
            />
          )}
          <View style={styles.nameContainer}>
            <MyText style={{}}>{followByUser?.name}</MyText>
            <View style={styles.flagContainer}>
              <MyImage
                source={
                  getCountryDetailWithKey({
                    key: 'name',
                    value: followByUser?.country,
                  }).icon
                }
                style={styles.flag}
              />
              <View style={styles.crownContainer}>
                <CrownIcon
                  width={hp(1.5)}
                  height={hp(1.5)}
                  marginRight={wp(1)}
                />
                <Text
                  style={{
                    color: 'white',
                  }}>
                  {followByUser?.level || 0}
                </Text>
              </View>
              <View
                style={[
                  styles.crownContainer,
                  {
                    backgroundColor: COLORS.LIGHT_VIOLET,
                  },
                ]}>
                <Gender width={hp(1.5)} height={hp(1.5)} marginRight={wp(1)} />
                <Text
                  style={{
                    color: 'white',
                  }}>
                  {getAge(followByUser?.DateOfBirth)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {!followList.includes(followByUser?._id) && !item?.isFriend ? (
          <Touchable onPress={() => handleFollow(followByUser?._id)}>
            <SvgIcon.followIcon />
          </Touchable>
        ) : (
          <Touchable onPress={() => handleFollow(followByUser?._id)}>
            <SvgIcon.followingIcon />
          </Touchable>
        )}
      </Touchable>
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        getFollowerListAction(
          {
            start: 0,
            limit: 100,
            userId: userLoginList?.user?._id,
            search: '',
          },
          list => {
            setFollowers(list);
          },
        ),
      );
    }, []),
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Header
        title={String('Followers')}
        leftComponent={leftHeaderComponent}
        containerStyle={styles.header}
        titleStyle={styles.title}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={followers}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        style={{
          flex: 1,
        }}
      />
    </View>
  );
};

export default FollowerList;
