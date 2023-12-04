import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {COLORS} from '../../../../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../../../../Utils/fontFamily';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    height: hp(12),
    paddingTop: hp(5),
  },
  card: {
    flexDirection: 'row',
    paddingVertical: wp(2),
    marginVertical: wp(2),
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
  },
  infoContainer: {
    marginLeft: wp(2),
    flexDirection: 'row',
  },
  balanceCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusCon: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: wp(40),
  },
  userName: {
    color: COLORS.BLACK,
    fontSize: FONT_SIZE.MEDIUM,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
  },
  userId: {
    color: COLORS.BLACK,
    fontSize: FONT_SIZE.SEMI_MEDIUM,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  status: {
    color: COLORS.TEXT_GRAY,
    fontSize: FONT_SIZE.REGULAR_MEDIUM,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
  },
  transactionTime: {
    color: COLORS.TEXT_GRAY,
    fontSize: FONT_SIZE.REGULAR_MEDIUM,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  btnCon: {
    flexDirection: 'row',
  },
  btn: {
    width: wp(20),
    height: hp(4),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: wp(100),
    justifyContent: 'center',
    backgroundColor: COLORS.BABY_PINK,
  },
  btnWhite: {
    width: wp(20),
    height: hp(4),
    borderWidth: 1,
    marginLeft: wp(1),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: wp(100),
    justifyContent: 'center',
    borderColor: COLORS.BLACK,
    backgroundColor: COLORS.WHITE,
  },
  btnText: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.SMALL,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
  },
  btnTextBlack: {
    color: COLORS.BLACK,
    fontSize: FONT_SIZE.SMALL,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
  },
});
