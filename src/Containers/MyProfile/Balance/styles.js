import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';

import {COLORS} from '../../../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../../../Utils/fontFamily';
import {dynamicSize} from '../../../Utils/responsive';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-between',
    // paddingBottom: wp(10),
  },
  leftComponent: {
    width: wp(8),
    height: wp(8),
  },
  title: {
    color: COLORS.BLACK,
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    paddingTop: hp(5),
    height: hp(12),
    borderBottomWidth: 0.5,
    backgroundColor: COLORS.OFFWHITE,
  },
  heading: {
    fontSize: dynamicSize(20),
    textAlign: 'center',
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    marginLeft: wp(2),
    color: COLORS.WHITE,
  },
  inventoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
    justifyContent: 'center',
  },
  amount: {
    marginTop: hp(1),
    textAlign: 'center',
    color: COLORS.WHITE,
    fontSize: dynamicSize(38),
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  card: {
    width: wp(42),
    height: wp(40),
    marginEnd: wp(5),
    marginTop: wp(5),
    borderRadius: wp(1),
    paddingVertical: wp(1),
    paddingHorizontal: wp(2),
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-around',
  },
  circle: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(100),
    backgroundColor: '#F9F9F9',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  FlatList: {
    paddingHorizontal: wp(5),
    justifyContent: 'center',
  },
  topUpAgencyOpt: {
    borderRadius: wp(1),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(5),
    height: dynamicSize(66),
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-between',
    paddingHorizontal: dynamicSize(10),
  },
  agencyText: {
    fontSize: 15,
    textAlign: 'center',
    color: COLORS.MEHRUN_COLOR,
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
  },
  agreement: {
    fontSize: dynamicSize(12),
    textAlign: 'center',
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    marginTop: dynamicSize(8),
  },
  offerDiamond: {
    textAlign: 'center',
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    fontSize: FONT_SIZE.SEMI_LARGE,
  },
  diamond: {
    textAlign: 'center',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
  },
  diamondInfo: {
    textAlign: 'center',
    justifyContent: 'space-between',
  },
  diamondPriceContainer: {
    backgroundColor: COLORS.GALLERY_PLACEHOLDER_GREY,
  },
  diamondText: {
    textAlign: 'center',
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    fontSize: FONT_SIZE.MEDIUM,
  },
  diamondIcon: {
    width: dynamicSize(45),
    height: dynamicSize(45),
  },
  footer: {
    justifyContent: 'space-between',
  },
});
