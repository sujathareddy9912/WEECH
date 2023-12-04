import {useDispatch} from 'react-redux';
import Swiper from 'react-native-deck-swiper';
import {View, Text, StatusBar, BackHandler} from 'react-native';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

import React, {
  useEffect,
  useState,
  useRef,
  createRef,
  useCallback,
} from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import RtcEngine, {ClientRole, ChannelProfile} from 'react-native-agora';

import Card from './Card';
import styles from './styles';
import {COLORS} from '../../Utils/colors';
import FilterIcon from '../../Assets/Icons/filter.svg';
import {
  MyList,
  MyText,
  MyTextInput,
  Touchable,
} from '../../Component/commomComponent';
import {rtmAgoraConfig} from '../../Utils/agoraConfig';

import {
  getLiveUserListAction,
  agoraInitialisedStatusAction,
} from '../../Redux/Action';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SvgIcon} from '../../Component/icons';
import {SCREEN_HEIGHT} from '../../Utils/helper';
import {dynamicSize} from '../../Utils/responsive';
import {countryCode} from '../../Utils/countryCode';

export const agoraEngine = createRef();

const DiscoverScreen = props => {
  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  const refRBSheet = useRef();
  const paginationOffset = useRef(0);
  // const agoraEngine = useRef();

  const [liveUserList, setLiveUserList] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [footerIndicator, setFooterIndicator] = useState(false);
  const [pullToRefreshIndicator, setPullToRefreshIndicator] = useState(false);
  const [backgroundText, setbackgroundText] = useState('');
  const [initialised, setInitialised] = useState(false);

  const [country, setCountry] = useState(null);
  const [searchText, setSearch] = useState('');
  const [countryList, setCountryList] = useState(countryCode);

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
  //   return () => {
  //     BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
  //   };
  // }, [backButtonHandler]);

  useEffect(() => {
    dispatch(agoraInitialisedStatusAction(false));
    _initEngine();
  }, []);

  useEffect(async () => {
    filterdata = props.getUserFilterList?.user?.data;
  }, [props.getUserFilterList]);

  useFocusEffect(
    useCallback(() => {
      setFetching(true);
      _getLiveUserList();
    }, []),
  );

  function backButtonHandler() {
    if (isFocused) {
      BackHandler.exitApp();
      return true;
    }
  }

  const _getLiveUserList = () => {
    const params = {
      pageNumber: paginationOffset.current,
      country: country?.name || 'India',
    };
    dispatch(
      getLiveUserListAction(params, data => {
        if (paginationOffset.current == 0) {
          setLiveUserList([...data?.data]);
        } else {
          setLiveUserList(prevState => [...prevState, ...data?.data]);
        }
        setFetching(false);
        setPullToRefreshIndicator(false);
        setFooterIndicator(false);
      }),
    );
  };

  const _initEngine = async () => {
    agoraEngine.current = await RtcEngine.create(rtmAgoraConfig.appId);
    await agoraEngine.current.enableVideo();
    await agoraEngine.current.startPreview();
    await agoraEngine.current?.setChannelProfile(
      ChannelProfile.LiveBroadcasting,
    );
    await agoraEngine.current?.setClientRole(ClientRole.Audience);
    // setInitialised(true)
    dispatch(agoraInitialisedStatusAction(true));
  };

  const _onSwiped = async () => {
    await agoraEngine.current?.leaveChannel();
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

  const handleApplyFilter = () => {
    _getLiveUserList();
    refRBSheet.current.close();
  };

  const _onChangeText = text => {
    setSearch(text);
    if (text.trim().length) {
      const filteredList = countryCode.filter(item => {
        if (item['name'].includes(text)) return item;
      });

      setCountryList(filteredList);
    } else setCountryList(countryCode);
  };

  const onFilterPress = () => refRBSheet.current.open();

  return (
    <>
      <StatusBar backgroundColor={COLORS.BABY_PINK} />
      <View style={{flex: 1, backgroundColor: COLORS.WHITE}}>
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <View style={styles.left}></View>
            <View style={styles.alignCenter}>
              <MyText style={styles.headerTitle}>DISCOVER</MyText>
            </View>
            <Touchable onPress={onFilterPress} style={styles.right}>
              <FilterIcon
                width={wp('7%')}
                height={wp('7%')}
                fill={COLORS.WHITE}
              />
            </Touchable>
          </View>
        </View>
        <View style={{height: '87%'}}>
          <View
            style={[
              styles.swiperContainer,
              backgroundText.length > 0 ? {zIndex: 2} : {zIndex: 0},
            ]}>
            <Text>{backgroundText}</Text>
          </View>
          {!!liveUserList.length ? (
            <Swiper
              key={liveUserList.length}
              onSwiped={_onSwiped}
              onSwipedAll={() => setbackgroundText("You're done for today!")}
              cardIndex={0}
              cards={liveUserList}
              cardVerticalMargin={0}
              renderCard={(card, cardIndex) => (
                <Card
                  data={card}
                  cardIndex={cardIndex}
                  agoraInitialised={initialised}
                  {...props}
                />
              )}
              stackSize={1}
              stackSeparation={0}
              cardHorizontalMargin={0}
              containerStyle={{height: '100%'}}
              backgroundColor={COLORS.WHITE}
              animateOverlayLabelsOpacity
              animateCardOpacity
              infinite={false}
              showSecondCard={false}
              goBackToPreviousCardOnSwipeBottom
            />
          ) : (
            <View style={[styles.swiperContainer, {zIndex: 2}]}>
              <Text>No Data Found</Text>
            </View>
          )}
        </View>
        <View
          style={[
            styles.header,
            {
              bottom: 0,
              height: '12%',
              backgroundColor: COLORS.WHITE,
            },
          ]}
        />
      </View>
      {/* country filter */}
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
    </>
  );
};

export default DiscoverScreen;
