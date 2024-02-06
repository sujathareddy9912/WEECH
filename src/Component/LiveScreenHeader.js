import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {SvgIcon} from './icons';
import {COLORS} from '../Utils/colors';
import {SCREEN_HEIGHT} from '../Utils/helper';
import {strings} from '../localization/config';
import {dynamicSize} from '../Utils/responsive';
import {MyText, Touchable} from './commomComponent';
import {FONT_FAMILY, FONT_SIZE} from '../Utils/fontFamily';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const headerData = [
  strings('home.trendingLive'),
  strings('home.pkBattle'),
  strings('home.nearBy'),
];

export const LiveScreenHeader = props => {
  const {
    selectedTab,
    onSearchPress,
    onFilterPress,
    onHeaderTextPress,
    onNotificationPress,
  } = props;

  const renderHeaderValue = ({item, index}) => {
    const selectedValue = selectedTab === index;
    return (
      <Touchable onPress={() => onHeaderTextPress(index)}>
        <MyText
          style={[
            styles.textStyle,
            {opacity: selectedValue ? 1 : 0.57},
            selectedValue && {
              fontWeight: 'bold',
            },
          ]}>
          {item}
        </MyText>
      </Touchable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={headerData}
        renderItem={renderHeaderValue}
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.rightCon}>
        <Touchable onPress={onSearchPress} style={styles.iconContainer}>
          <SvgIcon.SearchIcon />
        </Touchable>

        <Touchable onPress={onFilterPress} style={styles.iconContainer}>
          <SvgIcon.FilterIcon />
        </Touchable>

        <Touchable onPress={onNotificationPress} style={styles.iconContainer}>
          <SvgIcon.NotificationIcon />
        </Touchable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: dynamicSize(20),
    paddingBottom: dynamicSize(20),
    // justifyContent: 'space-between',
    backgroundColor: COLORS.BABY_PINK,
    alignItems: 'center',
  },

  textStyle: {
    fontFamily: FONT_FAMILY.SF_PRO_REGULAR,
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.MEDIUM,
    fontWeight: '400',
    marginLeft: SCREEN_HEIGHT * 0.02,
  },

  iconContainer: {},

  rightCon: {
    flexDirection: 'row',
    width: widthPercentageToDP(25),
    justifyContent: 'space-around',
    marginRight: SCREEN_HEIGHT * 0.02,
  },
});
