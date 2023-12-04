import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StatusBar, StyleSheet, Text, View} from 'react-native';

import {COLORS} from '../../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../../Utils/fontFamily';
import { dynamicSize } from '../../Utils/responsive';

const Header = ({
  title = 'Home',
  leftComponent,
  rightComponent,
  containerStyle,
  titleStyle,
}) => {
  return (
    <>
      <View style={[styles.containerStyle, containerStyle]}>
        <View style={styles.leftComponent}>
          {leftComponent ? <>{leftComponent}</> : null}
        </View>
        <View style={styles.headingCon}>
          <Text style={[styles.heading, titleStyle]}>{title}</Text>
        </View>
        <View style={styles.leftComponent}>
          {rightComponent ? <>{rightComponent}</> : null}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: wp(5),
    justifyContent: 'space-between',
    backgroundColor: COLORS.LIGHT_BABY_PINK,
    width: wp(100),
    paddingTop: wp(12),
    flexDirection: 'row',
    height: dynamicSize(94),
    alignItems: 'center',
  },
  leftComponent: {
    flex: 0.35,
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 20,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
  },
});

export default Header;
