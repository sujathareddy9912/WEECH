import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, View, RefreshControl} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import styles from './styles';
import Input from '../../Component/Input';
import {COLORS} from '../../Utils/colors';
import {SvgIcon} from '../../Component/icons';
import {SCREEN_WIDTH} from '../../Utils/helper';
import {strings} from '../../localization/config';
import {dynamicSize} from '../../Utils/responsive';
import {IMAGE_URL} from '../../Services/Api/Common';
import {
  activeLiveUserListInStreamingAction,
  getAnotherUserProfile,
} from '../../Redux/Action';

import {
  MyText,
  MyImage,
  Touchable,
  MyIndicator,
  IconWithCount,
  GradientBackground,
} from '../../Component/commomComponent';

const limitValue = 15;

const LiveStreamingUserList = ({navigation, route}) => {
  const dispatch = useDispatch();
  const paginationOffset = useRef(0);
  const callNextRecord = useRef(true);
  const holdApiCalltillResponse = useRef(true);
  const [fetching, setFetching] = useState(false);
  const [activeUserList, setActiveUserList] = useState([]);
  const [footerIndicator, setFooterIndicator] = useState(false);
  const [pullToRefreshIndicator, setPullToRefreshIndicator] = useState(false);


  useEffect(() => {
    paginationOffset.current = 0;
    setFetching(true);
    _fetchLiveUserList();
  }, []);

  const _fetchLiveUserList = () => {
    const param = {
      roomId: route?.params || '',
      start: paginationOffset.current,
      limit: limitValue,
    };
    dispatch(
      activeLiveUserListInStreamingAction(param, result => {
        if (result?.data?.length) {
          if (paginationOffset.current == 0) {
            setActiveUserList(result?.data);
          } else {
            setActiveUserList(prevState => [...prevState, ...result?.data]);
          }
          callNextRecord.current = true;
          holdApiCalltillResponse.current = true;
        } else {
          callNextRecord.current = false;
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
    _fetchLiveUserList();
  };

  const _onEndReached = () => {
    if (callNextRecord.current && holdApiCalltillResponse.current) {
      holdApiCalltillResponse.current = false;
      paginationOffset.current = paginationOffset.current + limitValue;
      setFooterIndicator(true);
      _fetchLiveUserList();
    }
  };

  const _goBack = () => navigation.goBack();

  const _renderActiveUsers = ({item, index}) => {
    return (
      <View style={styles.item}>
        {item?.joinedUsers?.profile ? (
          <MyImage
            source={{uri: `${IMAGE_URL}${item?.joinedUsers?.profile}`}}
            style={styles.pic}
          />
        ) : (
          <View style={styles.picContainer}>
            <SvgIcon.SmallProfilePlaceholder />
          </View>
        )}

        <View style={styles.itemRight}>
          <MyText numberOfLines={1} style={styles.name}>
            {item?.joinedUsers?.name}
          </MyText>
          <View style={styles.subRightContainer}>
            <IconWithCount count={item?.joinedUsers?.level} />

            {item?.joinedUsers?.age && (
              <IconWithCount
                tintColor={COLORS.LIGHT_VIOLET}
                source={<SvgIcon.Gender />}
                count={item?.joinedUsers?.age}
                style={{marginLeft: dynamicSize(10)}}
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  const _renderSeperator = () => <View style={styles.seperator} />;

  const footerRender = () => {
    if (!fetching) {
      if (footerIndicator) return <MyIndicator verticalSpace />;
      else return <View />;
    } else return <View />;
  };

  return (
    <GradientBackground style={{paddingBottom: -useSafeAreaInsets().bottom}}>
      <View style={styles.header}>
        <Touchable onPress={_goBack} style={styles.headerLeft}>
          <SvgIcon.BackIcon />
        </Touchable>
        <View style={styles.headerRight}>
          <SvgIcon.BlackView />
          <MyText style={styles.liveCount}>{activeUserList?.length}</MyText>
        </View>
      </View>
      <Input
        svgSource={<SvgIcon.SearchGrey />}
        mainContainer={styles.textInput}
        textInputStyle={styles.textInputStyle}
        width={SCREEN_WIDTH - dynamicSize(40)}
        placeholder={`${strings('liveUsers.viewer')}...`}
        placeholderTextColor={COLORS.LIGHT_GREY_MID}
      />
      <View style={styles.mainContainer}>
        <FlatList
          key="activeUsers"
          data={activeUserList}
          renderItem={_renderActiveUsers}
          contentContainerStyle={styles.userList}
          ItemSeparatorComponent={_renderSeperator}
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
        />
      </View>
    </GradientBackground>
  );
};

export default LiveStreamingUserList;
