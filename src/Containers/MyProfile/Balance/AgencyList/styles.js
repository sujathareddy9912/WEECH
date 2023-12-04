import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';

import {COLORS} from '../../../../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../../../../Utils/fontFamily';
import {dynamicSize} from '../../../../Utils/responsive';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-between',
    paddingBottom: wp(10),
  },
  title: {
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.SF_PRO_REGULAR,
  },
  avatarTxt: {
    color: COLORS.MALEbLUE,
    fontSize: FONT_SIZE.EXTRA_LARGE,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
  },
  right: {
    alignSelf: 'flex-end',
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    marginLeft: wp(2.5),
  },
  header: {
    paddingTop: hp(5),
    height: hp(12),
    backgroundColor: COLORS.MALEbLUE,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    justifyContent: 'center',
    paddingHorizontal: wp(5),
    paddingTop: wp(5),
    borderWidth: 1,
    borderColor: COLORS.VIOLET,
    backgroundColor: COLORS.WHITE,
    borderRadius: wp(2),
    width: wp(99),
    height: hp(33),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  heading: {
    fontSize: 22,
    marginRight: wp(2),
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
  },
  heading3: {
    fontSize: 18,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  btnText: {
    fontSize: 18,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    textDecorationLine: 'underline',
  },
  avatar: {
    width: wp(15),
    height: wp(15),
    alignItems: 'center',
    borderRadius: wp(100),
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
  },
  avatarCon: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  agencyName: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
  },
  footer: {
    bottom: 0,
    padding: wp(5),
    width: wp(100),
    position: 'absolute',
    borderRadius: wp(5),
    backgroundColor: '#0E0E0E2B',
  },
  item: {
    backgroundColor: '#EDEDED',
    marginHorizontal: wp(3),
    marginVertical: wp(1.5),
    paddingHorizontal: wp(2),
    borderRadius: wp(2),
    minHeight: hp(9),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  phoneCon: {
    marginTop: wp(1),
    flexDirection: 'row',
  },
  phone: {
    color: '#AAB2BF',
    marginLeft: wp(2),
  },
  name: {
    fontSize: dynamicSize(17),
    color: COLORS.BLACK,
    marginRight: wp(1),
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  FlatList: {
    marginTop: hp(2),
  },
});
