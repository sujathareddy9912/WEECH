import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {COLORS} from '../../../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../../../Utils/fontFamily';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-between',
  },
  header: {
    height: hp(12),
    paddingTop: hp(5),
  },
  heading: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
    marginEnd: wp(2),
  },
  inventoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(5),
    justifyContent: 'center',
  },
  amount: {
    fontSize: 25,
    marginEnd: wp(2),
    textAlign: 'center',
    color: COLORS.BABY_PINK,
    marginVertical: wp(2),
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
  },
  inputCon: {
    paddingHorizontal: wp(5),
  },
  input: {
    borderWidth: 1,
    borderRadius: wp(2),
    borderColor: COLORS.BLACK,
    paddingHorizontal: wp(2),
  },
  textInputStyle: {
    flex: 0,
    borderRadius: wp(2),
    color: COLORS.TEXT_GRAY,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
  },
  labelStyle: {
    color: COLORS.BABY_PINK,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
  },
  customInputCon: {
    borderWidth: 1,
    height: hp(10),
    marginTop: wp(5),
    borderRadius: wp(2),
    paddingBottom: wp(2),
    paddingHorizontal: wp(3),
    justifyContent: 'space-between',
  },
  label: {
    marginTop: wp(1),
    color: COLORS.BABY_PINK,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
  },
  checkboxLabel: {
    marginLeft: wp(2),
    color: COLORS.TEXT_GRAY,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
  },
  footer: {
    bottom: wp(10),
    alignItems: 'center',
  },
  btn: {
    width: wp(90),
    height: hp(7),
    marginTop: wp(5),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: wp(100),
    justifyContent: 'center',
    backgroundColor: COLORS.BABY_PINK,
  },
  btnText: {
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    fontSize: FONT_SIZE.LARGE,
  },
  description: {
    width: wp(90),
    textAlign: 'justify',
    color: COLORS.TEXT_GRAY,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
  },
});
