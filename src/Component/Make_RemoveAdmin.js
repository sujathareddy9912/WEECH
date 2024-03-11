import {useDispatch} from 'react-redux';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  View,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../Utils/colors';

import {
  MyText,
  MyImage,
  Touchable,
  IconWithCount,
  MyIndicator,
  CustomModal,
} from '../Component/commomComponent';
import {SvgIcon} from '../Component/icons';
import CrossPink from '../Assets/Icons/crossPink.svg';
import Delete from '../Assets/Icons/delete.svg';
import {getAge, SCREEN_WIDTH} from '../Utils/helper';
import {strings} from '../localization/config';
import {dynamicSize} from '../Utils/responsive';
import {IMAGE_URL} from '../Services/Api/Common';
import {SCREEN_HEIGHT} from '../Utils/helper';
import {FONT_FAMILY, FONT_SIZE} from '../Utils/fontFamily';
import {makeUserAdmin} from '../Redux/Action';

const limitValue = 15;

const MakeRemoveAdmin = props => {
  const {channelToken, data, onRequestClose, isVisible} = props;
  const dispatch = useDispatch();

  const removeAdmin = selectedUser => {
    dispatch(
      makeUserAdmin(
        {
          userId: selectedUser?.joinedUsers?._id,
          roomId: selectedUser?.roomId,
        },
        x => {},
        onRequestClose(),
      ),
    );
  };

  const _renderAdminUsers = ({item, index}) => {
    return (
      <View style={styles.item}>
        {item?.joinedUsers?.profile ? (
          <MyImage
            source={{
              uri: `${IMAGE_URL}${item?.joinedUsers?.profile}`,
            }}
            style={styles.pic}
          />
        ) : (
          <View style={styles.picContainer}>
            <SvgIcon.SmallProfilePlaceholder />
          </View>
        )}
        <View style={styles.itemRight}>
          <View
            style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
            <MyText numberOfLines={1} style={[styles.name, {flex: 1}]}>
              {item?.joinedUsers?.name}
            </MyText>
            <TouchableOpacity
              onPress={() => {
                removeAdmin(item);
              }}>
              <Delete width={dynamicSize(20)} height={dynamicSize(20)} />
            </TouchableOpacity>
          </View>
          <View style={styles.subRightContainer}>
            <Image
              source={require('../Assets/countryImages/ad.png/')}
              style={styles.flag}
            />
            <IconWithCount
              count={item?.joinedUsers?.level}
              source={<SvgIcon.SmallestCrown />}
              textStyle={{fontSize: FONT_SIZE.REGULAR}}
              style={{
                paddingHorizontal: SCREEN_HEIGHT * 0.005,
              }}
            />
            <IconWithCount
              tintColor={COLORS.LIGHT_VIOLET}
              source={<SvgIcon.SmallGenderIcon />}
              count={getAge(item?.joinedUsers?.DateOfBirth)}
              textStyle={{fontSize: FONT_SIZE.REGULAR}}
              style={{
                marginLeft: dynamicSize(10),
                paddingHorizontal: SCREEN_HEIGHT * 0.005,
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  const _renderSeperator = () => <View style={styles.seperator} />;

  return (
    <CustomModal
      style={{justifyContent: 'center', backgroundColor: COLORS.TRANSPARENT}}
      onRequestClose={onRequestClose}
      isVisible={isVisible}>
      <View
        style={{
          width: SCREEN_WIDTH - dynamicSize(50),
        }}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onRequestClose}
            style={{
              alignSelf: 'flex-end',
            }}>
            <CrossPink width={dynamicSize(35)} height={dynamicSize(35)} />
          </TouchableOpacity>
          <MyText style={styles.viewers}>{strings('live.adminLimit')}</MyText>
          <MyText style={styles.removeAdmin}>
            {strings('live.removeAdmin')}
          </MyText>
        </View>
        <FlatList
          scrollEnabled={false}
          key="activeUsers"
          data={data}
          renderItem={_renderAdminUsers}
          contentContainerStyle={styles.userList}
          ItemSeparatorComponent={_renderSeperator}
        />
      </View>
    </CustomModal>
  );
};

export default MakeRemoveAdmin;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND_COLOR_BLUE,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    borderTopLeftRadius: dynamicSize(10),
    borderTopRightRadius: dynamicSize(10),
    alignSelf: 'center',
    backgroundColor: COLORS.WHITE,
    width: '85%',
    paddingLeft: dynamicSize(15),
    paddingRight: dynamicSize(10),
    paddingTop: dynamicSize(10),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: dynamicSize(10),
    padding: dynamicSize(10),
  },
  viewers: {
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    // marginLeft: dynamicSize(20),
    fontSize: FONT_SIZE.LARGE,
    width: dynamicSize(200),
  },
  removeAdmin: {
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    fontSize: FONT_SIZE.MEDIUM,
    width: dynamicSize(250),
  },
  liveCount: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    marginLeft: dynamicSize(3),
    fontSize: FONT_SIZE.SEMI_MEDIUM,
  },
  textInput: {
    marginTop: SCREEN_HEIGHT * 0.01,
    marginBottom: SCREEN_HEIGHT * 0.02,
    marginHorizontal: dynamicSize(20),
    borderRadius: dynamicSize(5),
    backgroundColor: COLORS.LIGHT_GREY_OFFSET,
    paddingHorizontal: dynamicSize(10),
  },
  textInputStyle: {
    paddingVertical: SCREEN_HEIGHT * 0.01,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: FONT_SIZE.SEMI_LARGE,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pic: {
    height: SCREEN_HEIGHT / 19,
    width: SCREEN_HEIGHT / 19,
    borderRadius: SCREEN_HEIGHT / 19 / 2,
  },
  flag: {
    height: SCREEN_HEIGHT / 60,
    width: SCREEN_HEIGHT / 60,
    marginRight: dynamicSize(5),
  },
  userList: {
    width: '85%',
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: dynamicSize(20),
    alignSelf: 'center',
    paddingVertical: SCREEN_HEIGHT * 0.02,
    borderBottomLeftRadius: dynamicSize(10),
    borderBottomRightRadius: dynamicSize(10),
  },
  noText: {
    color: COLORS.DARK_RED,
    textAlign: 'center',
  },
  seperator: {
    height: SCREEN_HEIGHT * 0.035,
  },
  itemRight: {
    flex: 1,
    height: SCREEN_HEIGHT / 19,
    justifyContent: 'space-between',
    paddingLeft: dynamicSize(10),
  },
  name: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: FONT_SIZE.MEDIUM,
  },
  subRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picContainer: {
    // justifyContent: 'center',
    borderWidth: 0.5,
    alignItems: 'center',
    width: dynamicSize(36),
    height: dynamicSize(36),
    paddingTop: dynamicSize(3),
    borderRadius: dynamicSize(20),
  },
});
