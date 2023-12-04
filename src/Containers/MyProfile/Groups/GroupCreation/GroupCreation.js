import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ImageView from 'react-native-image-viewing';
import {useDispatch, useSelector} from 'react-redux';
import React, {useCallback, useRef, useState} from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {RefreshControl, StatusBar, TouchableOpacity, View} from 'react-native';

import {styles} from './styles';
import {
  MyText,
  MyList,
  MyImage,
  Touchable,
  MyLinearGradient,
  MyIndicator,
} from '../../../../Component/commomComponent';
import {COLORS} from '../../../../Utils/colors';
import {SvgIcon} from '../../../../Component/icons';
import {getChatGroups} from '../../../../Redux/Action';
import {useFocusEffect} from '@react-navigation/native';
import Header from '../../../../Component/header/Header';
import {getFontSize} from '../../../../Utils/responsive';
import {FONT_FAMILY} from '../../../../Utils/fontFamily';
import {IMAGE_URL} from '../../../../Services/Api/Common';

const GRP_DATA = [
  {
    id: 1,
    title: 'Apna Pariwar ki baatein',
    lastMsg: 'Maja hamesha sb ke saath aata hai',
    participants: 30,
    unreadMsg: 20,
  },
  {
    id: 2,
    title: 'Apna Pariwar ki baatein',
    lastMsg: 'Maja hamesha sb ke saath aata hai',
    participants: 32,
    unreadMsg: 21,
  },
];
const dataLimit = 20;

const GroupCreation = ({navigation}) => {
  const [groups, setGroups] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [footerIndicator, setFooterIndicator] = useState(false);
  const [pullToRefreshIndicator, setPullToRefreshIndicator] = useState(false);
  const [muteFlag, setMuteFlag] = useState(false);
  const [muteArr, setMuteArr] = useState([]);
  const [visible, setIsVisible] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector(state => {
    return state;
  });
  const {userLoginList} = state.authReducer;

  const paginationOffset = useRef(0);
  const totalRecord = useRef(0);
  const waitTillFetchingData = useRef(true);

  useFocusEffect(
    useCallback(() => {
      paginationOffset.current = 0;
      setFetching(true);
      _fetchChatGroupList();
    }, []),
  );

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
      <MyText>Back</MyText>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    return (
      <Touchable
        onLongPress={() => {
          setMuteFlag(item?._id);
        }}
        onPress={() => navigation.navigate('GroupChat', item)}
        style={styles.item}>
        <View style={styles.profileInfoCon}>
          <MyLinearGradient style={styles.imgCon}>
            {item?.icon !== 'chat_group/default.png' ? (
              <Touchable
                onPress={() =>
                  setIsVisible([{uri: `${IMAGE_URL}${item?.icon}`}])
                }>
                <MyImage
                  source={{uri: `${IMAGE_URL}${item?.icon}`}}
                  style={styles.profile}
                />
              </Touchable>
            ) : (
              <FontAwesome5Icon
                name={'users'}
                color={COLORS.WHITE}
                size={wp(8)}
              />
            )}
          </MyLinearGradient>
          <View style={styles.infoCon}>
            <MyText style={styles.grpName}>
              {item?.groupName}
              {'  '}
              <MyText
                style={[
                  styles.grpName,
                  {
                    fontSize: getFontSize(10),
                    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
                    color: COLORS.LIGHT_MAGENTA,
                  },
                ]}>
                (
                <MyText
                  style={[
                    styles.grpName,
                    {
                      fontSize: getFontSize(10),
                      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
                      color: COLORS.PRIMARY_BLUE,
                    },
                  ]}>
                  {item?.usersData?.length}
                </MyText>
                /300)
              </MyText>
            </MyText>
            <MyText style={styles.grpMsg}>
              {item?.latestMessage[0]?.content}
            </MyText>
          </View>
        </View>
        {muteArr.includes(item?._id) ? (
          <SvgIcon.groupMute />
        ) : (
          <View style={styles.msgIcon}>
            <SvgIcon.unreadMsgIcon />
            <MyText style={styles.unreadMsgTxt}>
              {item?.latestMessage?.length}
            </MyText>
          </View>
        )}
      </Touchable>
    );
  };
  const handleCreateGrp = () => navigation.navigate('GroupInfo');

  const _fetchChatGroupList = () => {
    const param = {
      start: paginationOffset.current,
      limit: dataLimit,
      search: '',
      userId: userLoginList?.user?._id,
    };
    dispatch(
      getChatGroups(param, result => {
        if (result?.data?.count) {
          totalRecord.current = result.totalCount;
          if (paginationOffset.current == 0) {
            setGroups(result?.data?.result);
          } else {
            setGroups(prevState => [...prevState, ...result?.data?.result]);
          }
        }
        _closeAllIndicator();
        waitTillFetchingData.current = true;
      }),
    );
  };

  const _closeAllIndicator = () => {
    setFetching(false);
    setFooterIndicator(false);
    setPullToRefreshIndicator(false);
  };

  const _onPullToRefresh = () => {
    paginationOffset.current = 0;
    setPullToRefreshIndicator(true);
    _fetchChatGroupList();
  };

  const _onEndReached = () => {
    if (
      paginationOffset.current < totalRecord.current &&
      waitTillFetchingData.current &&
      navigation.isFocused()
    ) {
      waitTillFetchingData.current = false;
      paginationOffset.current = paginationOffset.current + 10;
      setFooterIndicator(true);
      _fetchChatGroupList();
    }
  };

  const footerRender = () => {
    return (
      footerIndicator && (
        <MyIndicator verticalSpace color={COLORS.LIGHT_BABY_PINK} />
      )
    );
  };

  const rightHeaderComponent = muteFlag ? (
    <Touchable
      style={styles.rightHeaderComponent}
      onPress={() => {
        const arr = muteArr;
        arr.push(muteFlag);
        setMuteArr([...new Set(arr)]);
        setMuteFlag(null);
      }}>
      <SvgIcon.groupUnmute />
    </Touchable>
  ) : null;

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        barStyle={'dark-content'}
        translucent={true}
      />
      <MyLinearGradient style={styles.container}>
        <Header
          title={String('Groups')}
          leftComponent={leftHeaderComponent}
          containerStyle={styles.header}
          titleStyle={styles.title}
          rightComponent={rightHeaderComponent}
        />
        <Touchable onPress={handleCreateGrp} style={styles.createGrpBtn}>
          <MyText style={styles.createGrpText}>+{'   '}Create Group</MyText>
        </Touchable>
        <MyList
          data={groups}
          renderItem={renderItem}
          style={styles.container}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={pullToRefreshIndicator}
              onRefresh={_onPullToRefresh}
              tintColor={COLORS.LIGHT_BABY_PINK}
            />
          }
          maxToRenderPerBatch={dataLimit}
          ListFooterComponent={footerRender}
          onEndReachedThreshold={0.7}
          onEndReached={_onEndReached}
        />
      </MyLinearGradient>
      <ImageView
        images={visible}
        imageIndex={0}
        visible={visible.length ? true : false}
        onRequestClose={() => setIsVisible([])}
      />
    </View>
  );
};

export default GroupCreation;
