import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';

import {COLORS} from '../../../Utils/colors';
import {FONT_FAMILY} from '../../../Utils/fontFamily';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: COLORS.TRANSPARENT,
    paddingTop: hp(5),
    height: hp(12),
  },
  item: {
    borderWidth: 1,
    borderColor: COLORS.BABY_PINK,
    borderRadius: 5,
    marginVertical: hp(1),
    alignItems: 'center',
    paddingVertical: hp(1),
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
    fontWeight: '700',
  },
  dimondContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
  },
  cardTitle: {
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    fontSize: 18,
  },
  cardSub: {
    color: COLORS.TEXT_GRAY,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    fontSize: 14,
  },
  edit: {
    position: 'absolute',
    right: wp(-5),
    top: hp(-3.5),
  },
  buttonStyle: {
    width: wp(25),
    height: hp(5),
    backgroundColor: COLORS.LIGHT_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  btnLabel: {
    fontSize: 16,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
  },
  seperator: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: COLORS.MID_LIGHT_GREY,
  },
  options: {
    marginVertical: hp(1.5),
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    opacity: 0.5,
    fontSize: 16,
  },
});
