import React, {useEffect} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PlusIcon from 'react-native-vector-icons/MaterialIcons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Chats from './chats/Chats';
import Visitor from './visitor/Visitor';
import Recents from './recents/Recents';
import {COLORS} from '../../Utils/colors';
import {SCREEN_HEIGHT} from '../../Utils/helper';
import {FONT_FAMILY, FONT_SIZE} from '../../Utils/fontFamily';
import {dynamicSize} from '../../Utils/responsive';
import {
  followingListModalAction,
  updateDeleteChat,
  updateSelectAllChat,
} from '../../Redux/Action';
import {MyText, Touchable} from '../../Component/commomComponent';

const MaterialTopTab = createMaterialTopTabNavigator();

export const HeaderPlusComponent = () => {
  const dispatch = useDispatch();

  return (
    <Touchable
      style={{padding: dynamicSize(10)}}
      onPress={() => dispatch(followingListModalAction(true))}>
      <PlusIcon name="add" size={wp(6)} color={COLORS.WHITE} />
    </Touchable>
  );
};

export const InboxNavigator = () => {
  const value = new Animated.Value(wp(-100));
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const {clearChatFlag, selectAll} = state?.chatReducer;

  const moveRL = () => {
    Animated.timing(value, {
      toValue: 0,
      duration: 200, // the duration of the animation
      easing: Easing.linear, // the style of animation
      useNativeDriver: false,
    }).start(); // starts this annimation once this method is called
  };

  const handleSelectAll = () => {
    dispatch(updateSelectAllChat());
  };

  const handleDelete = () => {
    dispatch(updateDeleteChat(true));
  };

  useEffect(() => {
    if (clearChatFlag) {
      moveRL();
    }
  }, [clearChatFlag]);

  return (
    <>
      {clearChatFlag ? (
        <Animated.View style={[styles.headerHider, {right: value}]}>
          <Touchable onPress={handleDelete} activeOpacity={0.5}>
            <Ionicons
              color={COLORS.WHITE}
              size={dynamicSize(22)}
              name={'trash'}
            />
          </Touchable>
          <Touchable
            activeOpacity={0.5}
            onPress={handleSelectAll}
            style={styles.rightCon}>
            <MyText style={styles.selectTxt}>Select all</MyText>
            {selectAll ? (
              <MaterialCommunityIcons
                color={COLORS.WHITE}
                size={dynamicSize(22)}
                name={'checkbox-outline'}
              />
            ) : (
              <MaterialCommunityIcons
                color={COLORS.WHITE}
                size={dynamicSize(22)}
                name={'checkbox-blank-outline'}
              />
            )}
          </Touchable>
        </Animated.View>
      ) : null}
      <MaterialTopTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: COLORS.WHITE,
          tabBarInactiveTintColor: COLORS.MID_GREY,
          tabBarIndicatorStyle: {
            paddingBottom: 3,
            marginBottom: 3,
            borderRadius: 10,
            backgroundColor: COLORS.WHITE,
          },
          tabBarIndicatorContainerStyle: {
            backgroundColor: COLORS.LIGHT_BABY_PINK,
          },
          tabBarLabelStyle: {
            color: COLORS.WHITE,
            fontSize: SCREEN_HEIGHT * 0.017,
            fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
          },
        }}>
        <MaterialTopTab.Screen
          name="Chat"
          component={Chats}
          options={{
            tabBarLabel: 'CHATS',
          }}
        />
        <MaterialTopTab.Screen
          name="Visitors"
          component={Visitor}
          options={{
            tabBarLabel: 'VISITOR',
          }}
        />
        <MaterialTopTab.Screen
          name="Recents"
          component={Recents}
          options={{
            tabBarLabel: 'RECENTS',
          }}
        />
      </MaterialTopTab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  headerHider: {
    position: 'absolute',
    backgroundColor: COLORS.LIGHT_BABY_PINK,
    width: wp(100),
    height: hp(6.5),
    top: 0,
    zIndex: 10000,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
  },
  selectTxt: {
    marginRight: wp(2),
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.MEDIUM,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  rightCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
