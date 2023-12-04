import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';

import {COLORS} from '../../../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../../../Utils/fontFamily';
import {dynamicSize, getFontSize} from '../../../Utils/responsive';
import { SCREEN_WIDTH } from '../../../Utils/helper';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  title: {
    color: COLORS.WHITE,
    fontSize: getFontSize(24),
    textAlign: 'center',
    marginTop: dynamicSize(20),
  },
  avatarTxt: {
    color: COLORS.BLACK,
    fontSize: FONT_SIZE.EXTRA_LARGE,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
  },
  header: {
    backgroundColor: '#211D31',
    paddingTop: hp(5),
    height: hp(12),
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapDark: {
    // marginTop: dynamicSize(10),
    backgroundColor: '#211D31',
  },
  inputCon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SCREEN_WIDTH - dynamicSize(40),
    alignSelf: 'center',
    borderRadius: dynamicSize(11),
    justifyContent: 'space-between',
    paddingLeft: dynamicSize(10),
    paddingRight: dynamicSize(8),
    backgroundColor: '#8E8E931F',
  },
  input: {
    color: COLORS.WHITE,
    width: SCREEN_WIDTH - dynamicSize(80),
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    // borderTopRightRadius: dynamicSize(11),
    // borderBottomRightRadius: dynamicSize(11),
  },
  logo: {
    width: dynamicSize(70),
    height: dynamicSize(70),
  },
  separator: {
    height: 0.8,
    backgroundColor: COLORS.WHITE,
    marginTop: dynamicSize(15),
    marginBottom: dynamicSize(10),
    width: dynamicSize(338),
    alignSelf: 'center',
  },
  tabBar: {
    backgroundColor: '#211D31',
  },
  logoTitle: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: getFontSize(17),
    color: COLORS.BLACK,
  },
  logoDesc: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: getFontSize(12),
    color: '#AAB2BF',
  },
  btnText: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: getFontSize(16),
  },
  joinBtn: {
    width: dynamicSize(52),
    height: dynamicSize(30),
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: dynamicSize(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: dynamicSize(8),
    backgroundColor: '#F3F3F3',
  },
  avatar: {
    width: dynamicSize(46),
    height: dynamicSize(46),
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: wp(100),
    borderColor: '#DDDDDD',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
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
    backgroundColor: COLORS.WHITE,
    // marginHorizontal: wp(3),
    // marginVertical: wp(1.5),
    paddingHorizontal: wp(4),
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
    // marginLeft: wp(2),
  },
  name: {
    fontSize: dynamicSize(17),
    color: COLORS.BLACK,
    marginRight: wp(1),
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    textTransform: 'capitalize',
  },
  FlatList: {
    // marginTop: hp(2),
  },
  flag: {
    width: hp(2),
    height: hp(2),
  },
  infoItemCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    width: '55%',
    marginLeft: dynamicSize(5),
  },
});
