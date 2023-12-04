import {
  Text,
  View,
  Alert,
  FlatList,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from 'react-native';
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {TabView, SceneMap, TabBarItem, TabBar} from 'react-native-tab-view';

import {styles} from './styles';
import {COLORS} from '../../../Utils/colors';
import {getAgencyList} from '../../../Redux/Action';
import Header from '../../../Component/header/Header';
import {FONT_FAMILY} from '../../../Utils/fontFamily';
import Icons, {SvgIcon} from '../../../Component/icons';
import {getCountryDetailWithKey} from '../../../Utils/helper';
import {dynamicSize, getFontSize} from '../../../Utils/responsive';

import {
  MyText,
  MyImage,
  Touchable,
  MyTextInput,
} from '../../../Component/commomComponent';
import {sendWhatsappMsg} from '../../../Utils/sendWhatsappMsg';

const FirstRoute = ({searchText}) => {
  const [agencyData, setAgencyData] = useState([]);

  const state = useSelector(state => {
    return state;
  });

  const {userLoginList} = state.authReducer;

  const dispatch = useDispatch();
  const renderItem = ({item, index}) => <Item {...{item, index}} />;
  const renderItemForSearch = ({item, index}) => (
    <ItemWithoutLevel {...{item, index}} />
  );

  const fetchAgencyList = () => {
    let params = {
      length: 20,
      start: 0,
      type: 'total',
      gender: userLoginList?.user?.gender,
    };
    dispatch(getAgencyList(params, list => setAgencyData(list?.data)));
  };

  useFocusEffect(
    useCallback(() => {
      fetchAgencyList();
    }, []),
  );

  const searchAgency = () => {
    let params = {
      length: 20,
      start: 0,
      type: 'total',
      search: searchText,
      gender: userLoginList?.user?.gender,
    };
    dispatch(getAgencyList(params, list => setAgencyData(list?.data)));
  };

  useEffect(() => {
    if (searchText !== '') {
      searchAgency();
    }
  }, [searchText]);

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={agencyData}
        renderItem={searchText === '' ? renderItem : renderItemForSearch}
        style={styles.FlatList}
        keyExtractor={item => item?._id}
      />
    </View>
  );
};

const SecondRoute = ({searchText}) => {
  const [agencyData, setAgencyData] = useState([]);

  const state = useSelector(state => {
    return state;
  });

  const {userLoginList} = state.authReducer;

  const dispatch = useDispatch();
  const renderItem = ({item, index}) => <Item {...{item, index}} />;
  const renderItemForSearch = ({item, index}) => (
    <ItemWithoutLevel {...{item, index}} />
  );

  const fetchAgencyList = () => {
    let params = {
      length: 20,
      start: 0,
      type: 'weekly',
      gender: userLoginList?.user?.gender,
    };
    dispatch(getAgencyList(params, list => setAgencyData(list?.data)));
  };

  useFocusEffect(
    useCallback(() => {
      fetchAgencyList();
    }, []),
  );

  const searchAgency = () => {
    let params = {
      length: 20,
      start: 0,
      type: 'weekly',
      search: searchText,
      gender: userLoginList?.user?.gender,
    };
    dispatch(getAgencyList(params, list => setAgencyData(list?.data)));
  };

  useEffect(() => {
    if (searchText !== '') {
      searchAgency();
    }
  }, [searchText]);
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={agencyData}
        renderItem={searchText === '' ? renderItem : renderItemForSearch}
        style={styles.FlatList}
        keyExtractor={item => item?._id}
      />
    </View>
  );
};

const ThirdRoute = ({searchText}) => {
  const [agencyData, setAgencyData] = useState([]);

  const state = useSelector(state => {
    return state;
  });

  const {userLoginList} = state.authReducer;

  const dispatch = useDispatch();
  const renderItem = ({item, index}) => <Item {...{item, index}} />;
  const renderItemForSearch = ({item, index}) => (
    <ItemWithoutLevel {...{item, index}} />
  );

  const fetchAgencyList = () => {
    let params = {
      length: 20,
      start: 0,
      type: 'today',
      gender: userLoginList?.user?.gender,
    };
    dispatch(getAgencyList(params, list => setAgencyData(list?.data)));
  };

  useFocusEffect(
    useCallback(() => {
      fetchAgencyList();
    }, []),
  );

  const searchAgency = () => {
    let params = {
      length: 20,
      start: 0,
      type: 'today',
      search: searchText,
      gender: userLoginList?.user?.gender,
    };
    dispatch(getAgencyList(params, list => setAgencyData(list?.data)));
  };

  useEffect(() => {
    if (searchText !== '') {
      searchAgency();
    }
  }, [searchText]);
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={agencyData}
        renderItem={searchText === '' ? renderItem : renderItemForSearch}
        style={styles.FlatList}
        keyExtractor={item => item?._id}
      />
    </View>
  );
};

const LiveStreamCenter = ({navigation}) => {
  const [index, setIndex] = React.useState(0);
  const [searchText, setSearch] = useState('');

  const state = useSelector(state => {
    return state;
  });
  const {userLoginList} = state.authReducer;

  const layout = useWindowDimensions();

  const [routes] = React.useState([
    {key: 'total', title: 'Total'},
    {key: 'weekly', title: 'Weekly'},
    {key: 'daily', title: 'Daily'},
  ]);

  const leftHeaderComponent = (
    <TouchableOpacity
      style={styles.backContainer}
      onPress={() => navigation?.goBack()}>
      <FontAwesome5Icon
        name={'chevron-left'}
        color={COLORS.WHITE}
        size={wp(4)}
        style={{
          marginRight: wp(1),
        }}
      />
      <Text style={{color: COLORS.WHITE}}>Back</Text>
    </TouchableOpacity>
  );

  const _onChangeText = text => {
    setSearch(text);
    if (text.trim().length) {
      //   const filteredList = countryCode.filter(item => {
      //     if (item['name'].includes(text)) return item;
      //   });
      //   setCountryList(filteredList);
    } else {
      // setCountryList(countryCode);
    }
  };

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'total':
        return <FirstRoute searchText={searchText} />;
      case 'weekly':
        return <SecondRoute searchText={searchText} />;
      case 'daily':
        return <ThirdRoute searchText={searchText} />;
      default:
        return null;
    }
  };

  const renderLabel = ({focused, route}) => {
    return (
      <MyText
        style={{
          textAlign: 'center',
          width: focused ? dynamicSize(100) : dynamicSize(100),
          color: focused ? COLORS.LIGHT_MAGENTA : COLORS.WHITE,
          fontFamily: focused
            ? FONT_FAMILY.POPPINS_BOLD
            : FONT_FAMILY.POPPINS_REGULAR,
          fontSize: getFontSize(16),
        }}>
        {route.title}
      </MyText>
    );
  };

  const renderTabBarItem = props => <TabBarItem {...props} />;

  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        style={styles.tabBar}
        searchText={searchText}
        renderLabel={renderLabel}
        renderTabBarItem={renderTabBarItem}
        renderIndicator={() => null}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <Header
        title={''}
        containerStyle={styles.header}
        leftComponent={leftHeaderComponent}
      />
      <View style={styles.wrapDark}>
        <View style={styles.inputCon}>
          <View
            style={{marginBottom: Platform.OS === 'ios' ? 0 : dynamicSize(5)}}>
            <SvgIcon.searchAgency />
          </View>
          <MyTextInput
            value={searchText}
            placeholder={'Search Agency'}
            placeholderTextColor={'#8E8E93'}
            selectionColor={COLORS.WHITE}
            style={styles.input}
            onChangeText={_onChangeText}
          />
          {/* <Touchable>
            <SvgIcon.agencyMic />
          </Touchable> */}
        </View>
        <MyText style={styles.title}>Global Agency’s Ranking</MyText>
        <View style={styles.separator} />
      </View>
      <TabView
        lazy
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        navigationState={{index, routes}}
        initialLayout={{width: layout.width}}
      />
    </View>
  );
};

export default LiveStreamCenter;

const Item = ({item, index}) => {
  const state = useSelector(state => {
    return state;
  });
  const {userLoginList} = state.authReducer;

  const {
    params: {agencyJoined},
  } = useRoute();

  const navigation = useNavigation();

  const navigateToAddBank = item => () => {
    navigation.navigate('AddBankDetailPage', {agencyId: item._id});
  };

  const navigateToChat = item => () => {
    sendWhatsappMsg(
      item.countryCode + item.phone,
      `Hello! My WeeCha user ID is ${userLoginList?.user?.userId}. I am member of your agency Family. I need your support...`,
    );
  };

  return (
    <Touchable activeOpacity={0.5} style={styles.item}>
      <View style={styles.infoItemCon}>
        <View
          style={{
            width: '30%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <View style={[styles.avatar, {borderWidth: 0}]}>
            {index === 0 ? (
              <MyImage source={Icons.agencyWeechaLogo} style={styles.logo} />
            ) : index === 1 ? (
              <SvgIcon.goldMedal />
            ) : index === 2 ? (
              <SvgIcon.silverMedal />
            ) : index === 3 ? (
              <SvgIcon.bronzeMedal />
            ) : (
              <MyText style={styles.avatarTxt}>{index}</MyText>
            )}
          </View>
          {index != 0 && (
            <View style={[styles.avatar]}>
              {index === 1 ? (
                <SvgIcon.firstRank />
              ) : index === 2 ? (
                <SvgIcon.secRank />
              ) : (
                <SvgIcon.thirdRank />
              )}
            </View>
          )}
        </View>

        <View style={styles.info}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MyText style={styles.name}>{item?.name}</MyText>
            <MyImage
              source={
                getCountryDetailWithKey({
                  key: 'name',
                  value: item?.country,
                }).icon
              }
              style={styles.flag}
            />
          </View>
          <View style={styles.phoneCon}>
            {/* <SvgIcon.WhatsappIcon /> */}
            <MyText style={styles.phone}>{'Lorem Ipsumum Lorem'}</MyText>
          </View>
        </View>
      </View>
      {!agencyJoined && (
        <Touchable onPress={navigateToAddBank(item)} style={styles.joinBtn}>
          <MyText style={styles.btnText}>Join</MyText>
        </Touchable>
      )}

      {agencyJoined && item?.isJoined && (
        <Touchable onPress={navigateToChat(item)} style={styles.joinBtn}>
          <MyText style={styles.btnText}>Chat</MyText>
        </Touchable>
      )}
    </Touchable>
  );
};

const ItemWithoutLevel = ({item, index}) => {
  const {
    params: {agencyJoined},
  } = useRoute();

  const navigation = useNavigation();

  const navigateToAddBank = item => () => {
    navigation.navigate('AddBankDetailPage', {agencyId: item._id});
  };

  const navigateToChat = item => () => {
    //put whatsaaap with dummy text
    const countryCode = getCountryDetailWithKey({
      key: 'name',
      value: item?.country,
    }).dialCode;
    if (countryCode) {
      sendWhatsappMsg(countryCode + item.phone, 'msg');
    } else {
      Alert.alert('country code missing');
    }
    console.log(countryCode + item.phone, 'msg');
  };

  return (
    <Touchable activeOpacity={0.5} style={styles.item}>
      <View style={styles.infoItemCon}>
        <View
          style={{
            width: '30%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <View style={[styles.avatar, {borderWidth: 0}]}>
            <MyText style={styles.avatarTxt}>{index + 1}</MyText>
          </View>
          <View style={[styles.avatar]}>
            <SvgIcon.thirdRank />
          </View>
        </View>
        <View style={styles.info}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MyText style={styles.name}>{item?.name}</MyText>
            <MyImage
              source={
                getCountryDetailWithKey({
                  key: 'name',
                  value: item?.country,
                }).icon
              }
              style={styles.flag}
            />
          </View>
          <View style={styles.phoneCon}>
            {/* <SvgIcon.WhatsappIcon /> */}
            <MyText style={styles.phone}>{'Lorem Ipsumum Lorem'}</MyText>
          </View>
        </View>
      </View>
      {!agencyJoined && (
        <Touchable onPress={navigateToAddBank(item)} style={styles.joinBtn}>
          <MyText style={styles.btnText}>Join</MyText>
        </Touchable>
      )}

      {agencyJoined && item?.isJoined && (
        <Touchable onPress={navigateToChat(item)} style={styles.joinBtn}>
          <MyText style={styles.btnText}>Chat</MyText>
        </Touchable>
      )}
    </Touchable>
  );
};
