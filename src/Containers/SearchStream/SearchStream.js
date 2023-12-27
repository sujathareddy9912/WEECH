import {useDispatch} from 'react-redux';
import React, {useRef, useState} from 'react';
import FastImage from 'react-native-fast-image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {StatusBar, Text,View, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {
  getAge,
  SCREEN_HEIGHT,
  getCountryDetailWithKey,
} from '../../Utils/helper';
import {
  MyList,
  MyText,
  MyImage,
  Touchable,
  MyTextInput,
  IconWithCount,
} from '../../Component/commomComponent';
import {COLORS} from '../../Utils/colors';
import {SvgIcon} from '../../Component/icons';
import Header from '../../Component/header/Header';
import {dynamicSize} from '../../Utils/responsive';
import {IMAGE_URL} from '../../Services/Api/Common';
import {getAnotherUserProfile, getSearchUserAction} from '../../Redux/Action';
import {FONT_SIZE, FONT_FAMILY} from '../../Utils/fontFamily';

const SearchStream = ({navigation}) => {
  const [searchText, setSearch] = useState('');
  const [country, setCountry] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [totalDataCount, UpdateTotalDataCount] = useState(0);
  const [footerIndicator, setFooterIndicator] = useState(false);
  const [pullToRefreshIndicator, setPullToRefreshIndicator] = useState(false);

  const dispatch = useDispatch();

  const paginationOffset = useRef(0);

  const _getLiveUserList = () => {
    setLoading(true);
    const params = {
      pageNumber: paginationOffset.current,
      searchKey: searchText,
    };
    dispatch(
      getSearchUserAction(params, async data => {
        setSearchResult(data?.data);
        setLoading(false);
      }),
    );
  };

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
      <MyText style={{color: COLORS.WHITE}}>Back</MyText>
    </TouchableOpacity>
  );

  const _onChangeText = text => {
    setSearch(text);
    // if (text.trim().length) {
    //   const filteredList = countryCode.filter(item => {
    //     if (item['name'].includes(text)) return item;
    //   });

    //   setCountryList(filteredList);
    // } else setCountryList(countryCode);
  };

  const _profileRedirection = userId => () => {
    dispatch(
      getAnotherUserProfile({userId}, data => {
        if (data?.user) {
          navigation.navigate('UserProfile', data?.user);
        }
      }),
    );
  };

  const renderItem = ({item}) => {
    return (
      <Touchable onPress={_profileRedirection(item._id)} style={styles.item}>
        {item?.profile ? (
          <FastImage
            style={[styles.profilePic, {marginStart: dynamicSize(10)}]}
            source={{
              uri: `${IMAGE_URL}${item?.profile}`,
              priority: FastImage.priority.normal,
            }}
          />
        ) : (
          <FontAwesome
            name={'user-circle-o'}
            color={COLORS.WHITE}
            size={wp(8.5)}
          />
        )}
        <View style={styles.infoCon}>
          <MyText style={styles.name}>{item?.name}</MyText>
          <MyText style={styles.weechaId}>Weecha ID: {item?.userId}</MyText>
          <View style={styles.flagCon}>
            <MyImage
              source={
                getCountryDetailWithKey({
                  key: 'name',
                  value: item?.country,
                }).icon
              }
              style={styles.flag}
            />
            <IconWithCount
              count={item?.level}
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
              count={getAge(item?.DateOfBirth)}
              textStyle={{fontSize: FONT_SIZE.REGULAR}}
              style={{
                paddingHorizontal: SCREEN_HEIGHT * 0.005,
              }}
            />
          </View>
        </View>
        {item?.isLive && <SvgIcon.liveIconSearch />}
      </Touchable>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <Header
          title={''}
          leftComponent={leftHeaderComponent}
          containerStyle={styles.header}
          titleStyle={styles.title}
        />
        <View style={styles.inputCon}>
          <MyTextInput
            value={searchText}
            style={styles.input}
            placeholder={'Search'}
            onChangeText={_onChangeText}
            selectionColor={COLORS.LIGHT_BABY_PINK}
            placeholderTextColor={COLORS.LIGHT_GREY_MID}
          />
          <Touchable onPress={_getLiveUserList}>
            <SvgIcon.streamSearch />
          </Touchable>
        </View>
        {
        isLoading ?
          <ActivityIndicator color={COLORS.DARK_RED} style={{ marginTop: hp(5) }} />
          :
            <>
              {searchResult?.length ?
                <MyList
                  data={searchResult}
                  renderItem={renderItem}
                  contentContainerStyle={styles.listCon}
                />
                :
                <Text style={{ color: COLORS.BLACK, textAlign: 'center', marginTop: hp(5) }}>No Data Available</Text>
              }
            </>
        }
      </View>
    </>
  );
};

export default SearchStream;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    backgroundColor: COLORS.BABY_PINK,
    paddingTop: hp(5),
    height: hp(12),
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: COLORS.BLACK,
    fontWeight: '700',
  },
  input: {
    width: dynamicSize(265),
    height: dynamicSize(40),
    borderTopRightRadius: dynamicSize(11),
    borderBottomRightRadius: dynamicSize(11),
    // backgroundColor: 'red',
  },
  inputCon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: dynamicSize(343),
    height: dynamicSize(36),
    alignSelf: 'center',
    marginTop: dynamicSize(10),
    backgroundColor: '#EDEDED',
    borderRadius: dynamicSize(11),
    justifyContent: 'space-between',
    paddingLeft: dynamicSize(20),
    paddingRight: dynamicSize(12),
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 8,
  },
  profilePic: {
    width: dynamicSize(61),
    height: dynamicSize(61),
    borderRadius: wp(100),
  },
  listCon: {
    padding: dynamicSize(16),
  },
  infoCon: {
    marginLeft: 8,
    width: wp(45),
  },
  flag: {
    width: hp(2.5),
    height: hp(2),
  },
  flagCon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  weechaId: {
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    fontSize: dynamicSize(11),
  },
  name: {
    fontSize: dynamicSize(18),
    fontFamily: FONT_FAMILY.SF_PRO_SEMIBOLD,
  },
});
