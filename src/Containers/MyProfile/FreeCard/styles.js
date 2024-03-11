import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';

import {COLORS} from '../../../Utils/colors';
import {FONT_FAMILY} from '../../../Utils/fontFamily';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../Utils/helper';
import {dynamicSize, getFontSize} from '../../../Utils/responsive';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: COLORS.TRANSPARENT,
    paddingTop: hp(3),
    height: hp(8),
  },
  itemText: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  list: {
    paddingHorizontal: wp(3),
    flexGrow: 1,
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
  },
  buttonStyle: {
    position: 'absolute',
    bottom: hp(5),
    backgroundColor: COLORS.BABY_PINK,
    alignSelf: 'center',
    height: hp(7),
  },
  text: {
    fontSize: 36,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    color: COLORS.WHITE,
  },
  FlatList: {
    flex: 1,
  },
  flatListCon: {
    flexGrow: 1,
    paddingBottom: hp(10),
  },
  flex1: {
    flex: 1,
  },
  exitModal: {
    zIndex: 1000,
    bottom: 0,
    position: 'absolute',
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.4,
    padding: dynamicSize(18),
    backgroundColor: COLORS.WHITE,
    borderRadius: dynamicSize(8),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  exitText: {
    fontSize: getFontSize(20),
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
  },
  exitTextDesc: {
    fontSize: getFontSize(15),
    color: COLORS.TEXT_GRAY,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
  },
  share: {
    fontSize: getFontSize(24),
    color: COLORS.LIGHT_BABY_PINK,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    marginTop: dynamicSize(40),
  },
  socialCon: {
    marginTop: dynamicSize(17),
    width: SCREEN_WIDTH * 0.4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shared: {
    fontSize: getFontSize(16),
    color: '#219653',
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    marginTop: dynamicSize(5),
  },
  btn: {
    alignItems: 'center',
  },
  claimBadge: {
    backgroundColor: COLORS.LIGHT_MAGENTA,
    height: hp(5),
    width: wp(88.5),
    alignSelf: 'center',
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
