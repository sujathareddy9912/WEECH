import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';

import {COLORS} from '../../../../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../../../../Utils/fontFamily';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingBottom: wp(10),
  },
  info: {
    marginTop: hp(5),
    paddingHorizontal: wp(5),
  },
  header: {
    backgroundColor: 'transparent',
  },
  list: {
    marginTop: wp(10),
    paddingHorizontal: wp(3),
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: COLORS.BLACK,
  },
  topicTitle: {
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    fontSize: FONT_SIZE.LARGE,
  },
  topicDesc: {
    marginTop: hp(1),
    color: COLORS.TEXT_GRAY,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
  },
  buttonStyle: {
    position: 'absolute',
    bottom: hp(5),
    backgroundColor: COLORS.BABY_PINK,
    alignSelf: 'center',
    height: hp(7),
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
