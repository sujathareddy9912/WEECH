import {useDispatch, useSelector} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React, {useEffect, useState} from 'react';
// import ClearCache from 'oa-react-native-clear-cache';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {getVersion, getBuildNumber} from 'react-native-device-info';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  Alert,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {styles} from './styles';
import {COLORS} from '../../../Utils/colors';
import {logOutAction} from '../../../Redux/Action';
import Header from '../../../Component/header/Header';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../Utils/helper';
import {MyText, Touchable} from '../../../Component/commomComponent';
import { UserServices } from '../../../Services/Api/userServices';
import { GET_PROFILE_IMAGE_RESET,GET_PROFILE_VIDEO_RESET } from '../../../ActionConstant/profile.constant';

const Settings = ({navigation}) => {
  const [cache, setCache] = useState(null);
  const [logout, setLogout] = useState(false);
  const [deleteAccount, setDeleteLogout] = useState(false);


  const state = useSelector(state => {
    return state;
  });

  const {userLoginList} = state.authReducer;

  const dispatch = useDispatch();

  const DATA = [
    {
      id: 0,
      title: 'Account and Security',
    },
    {
      id: 1,
      title: 'Clear the cache',
      subText: `${cache || 0} / Clear`,
    },
    {
      id: 2,
      title: 'Block List',
    },
    {
      id: 3,
      title: 'Rate WeeCha',
    },
    {
      id: 4,
      title: 'About WeeCha',
    },
    {
      id: 5,
      title: 'Privacy Policy',
    },
    {
      id: 6,
      title: 'User Agreement',
    },
    {
      id: 7,
      title: 'Help Center',
    },
    {
      id: 8,
      title: 'Version',
      subText: `${getVersion() + '.' + getBuildNumber()} / Update`,
    },
    {
      id: 9,
      title: 'Delete Account',
      titleColor: 'red'
    },
  ];

  const onLogOut = async () => {
    dispatch({type:GET_PROFILE_IMAGE_RESET})
    dispatch({type:GET_PROFILE_VIDEO_RESET})
    dispatch(logOutAction());
  };

  const onDeleteAccountPress = async() => {
     await UserServices.deleteUserAccount(userLoginList?.user?._id)
     dispatch({type:GET_PROFILE_IMAGE_RESET})
     dispatch({type:GET_PROFILE_VIDEO_RESET})
     dispatch(logOutAction());
  };

  const handleClearCache = async () => {
    // ClearCache.clearAppCache(data => {
    //   HelperService.showToast('Cache Cleared');
    //   setCache(data); // will set the new size
    // });
  };

  const handleRedirection = id => {
    switch (id) {
      case 0:
        return navigation.navigate('AccountSecurity');
      case 1:
        return handleClearCache();
      case 2:
        return navigation.navigate('BlockList');
      case 4:
        return navigation.navigate('AboutWeecha');
      case 5:
        return navigation.navigate('PrivacyPolicy');
      case 6:
        return navigation.navigate('UserAgreement');
      case 7:
        return navigation.navigate('HelpCenter');
      case 9:
        return setDeleteLogout(true);
      default:
        break;
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <Touchable
        onPress={() => handleRedirection(item?.id)}
        style={styles.item}>
        <MyText style={[styles.itemText,{color: item?.titleColor}]}>{item.title}</MyText>
        {item?.id == 1 || item.id == 8 || item.id == 9? (
          <MyText style={[item?.id == 1 ? styles?.clear : styles.update]}>
            {item?.subText}
          </MyText>
        ) : (
          <FontAwesome
            name={'angle-right'}
            color={COLORS.MID_GREY}
            size={wp(7)}
          />
        )}
      </Touchable>
    );
  };

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

  useEffect(() => {
    // ClearCache.getAppCacheSize(data => {
    //   setCache(data); // will show the App's storage usage in the app's cache.
    // });
  }, []);

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <Header
          title={String('Settings')}
          leftComponent={leftHeaderComponent}
          containerStyle={styles.header}
          titleStyle={styles.title}
        />
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
          />
        <View
          style={{
            alignItems: 'center',
          }}>
          <Touchable onPress={() => setLogout(true)} style={styles.item}>
            <MyText
              style={[
                styles.itemText,
                {
                  marginHorizontal: wp(2),
                },
              ]}>
              Logout
            </MyText>
            <FontAwesome
              name={'angle-right'}
              color={COLORS.MID_GREY}
              size={wp(7)}
              style={{
                paddingBottom: hp(0.5),
              }}
            />
          </Touchable>
        </View>
      </View>
      {deleteAccount && (
        <View
          style={{
            position: 'absolute',
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={styles.logoutContainer}>
            <Text
              style={[
                styles.logoutNo,
                {
                  color: COLORS.BLACK,
                  width: wp(50),
                },
              ]}>
              Do You Want to Delete Your Account?
            </Text>
            <View style={styles.NoContainer}>
              <TouchableOpacity onPress={() => setDeleteLogout(false)}>
                <Text style={styles.logoutNo}>NO</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onDeleteAccountPress}>
                <Text
                  style={[
                    styles.logoutNo,
                    {
                      color: COLORS.BACKGROUND_COLOR_BLUE,
                    },
                  ]}>
                  Yes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {logout && (
        <View
          style={{
            position: 'absolute',
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={styles.logoutContainer}>
            <Text
              style={[
                styles.logoutNo,
                {
                  color: COLORS.BLACK,
                  width: wp(50),
                },
              ]}>
              Do You Want to Logout The Account?
            </Text>
            <View style={styles.NoContainer}>
              <TouchableOpacity onPress={() => setLogout(false)}>
                <Text style={styles.logoutNo}>NO</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onLogOut}>
                <Text
                  style={[
                    styles.logoutNo,
                    {
                      color: COLORS.BACKGROUND_COLOR_BLUE,
                    },
                  ]}>
                  Yes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default Settings;
