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
import {FlatList, StatusBar, Text, TouchableOpacity, View} from 'react-native';

import {styles} from './styles';
import {COLORS} from '../../../Utils/colors';
import {SvgIcon} from '../../../Component/icons';
import Gender from '../../../Assets/Icons/Gender.svg';
import Header from '../../../Component/header/Header';
import {IMAGE_URL} from '../../../Services/Api/Common';
import CrownIcon from '../../../Assets/Icons/crown.svg';
import {
  getAnotherUserProfile,
  getFollowingListAction,
} from '../../../Redux/Action';
import {getAge, getCountryDetailWithKey} from '../../../Utils/helper';
import {MyImage, MyText, Touchable} from '../../../Component/commomComponent';

const FollowingList = ({navigation}) => {
  const [followers, setFollowers] = useState([]);
  const dispatch = useDispatch();
  const state = useSelector(state => {
    return state;
  });

  const {userLoginList} = state.authReducer;

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
    const {followToUser} = item;
    return (
      <Touchable
        onPress={() => profileRedirection(followToUser?._id)}
        style={styles.item}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          {followToUser?.profile ? (
            <Image
              source={{uri: `${IMAGE_URL}${followToUser?.profile}`}}
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
            <MyText style={{}}>{followToUser?.name}</MyText>
            <View style={styles.flagContainer}>
              <MyImage
                source={
                  getCountryDetailWithKey({
                    key: 'name',
                    value: followToUser?.country,
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
                  {followToUser?.level || 0}
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
                  {getAge(followToUser?.DateOfBirth)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Touchable>
          <SvgIcon.followingCheck />
        </Touchable>
      </Touchable>
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        getFollowingListAction(
          {
            start: 0,
            limit: 100,
            userId: userLoginList?.user?._id,
            search: '',
          },
          list => {
            setFollowers(list?.data);
          },
        ),
      );
    }, []),
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Header
        title={String('Following')}
        leftComponent={leftHeaderComponent}
        containerStyle={styles.header}
        titleStyle={styles.title}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={followers}
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

export default FollowingList;
