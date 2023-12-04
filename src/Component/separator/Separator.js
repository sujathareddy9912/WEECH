import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../Utils/colors';

const Separator = ({height = hp(0.2), width = wp(100), style}) => {
  return <View style={[styles.Separator(width, height), style]} />;
};

export const styles = StyleSheet.create({
  Separator: (width, height) => ({
    width: width,
    height: height,
    alignSelf: 'center',
    marginVertical: wp(5),
    backgroundColor: COLORS.GALLERY_PLACEHOLDER_GREY,
  }),
});

export default Separator;
