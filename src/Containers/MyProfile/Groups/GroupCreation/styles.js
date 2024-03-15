import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';

import {COLORS} from '../../../../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../../../../Utils/fontFamily';
import {dynamicSize, getFontSize} from '../../../../Utils/responsive';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: COLORS.TRANSPARENT,
    paddingTop: hp(5),
    height: hp(12),
  },
  rightHeaderComponent: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: COLORS.BLACK,
    fontWeight: '700',
  },
  createGrpBtn: {
    width: wp(100),
    height: dynamicSize(71),
    justifyContent: 'center',
    marginBottom: dynamicSize(5),
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: dynamicSize(18),
  },
  createGrpText: {
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    fontSize: FONT_SIZE.LARGE,
  },
  item: {
    width: wp(100),
    flexDirection: 'row',
    alignItems: 'center',
    height: dynamicSize(91),
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-between',
    paddingHorizontal: dynamicSize(13),
  },
  profileInfoCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgCon: {
    width: dynamicSize(50),
    height: dynamicSize(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: dynamicSize(10),
  },
  profile: {
    width: dynamicSize(50),
    borderRadius: wp(100),
    height: dynamicSize(50),
  },
  infoCon: {
    marginLeft: dynamicSize(14),
  },
  grpName: {
    fontSize: FONT_SIZE.SEMI_MEDIUM,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  grpMsg: {
    color: '#B0B0B0',
    fontSize: getFontSize(12),
    marginTop: dynamicSize(3),
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  msgIcon: {
    marginRight: dynamicSize(12),
  },
  unreadMsgTxt: {
    color: '#219653',
    position: 'absolute',
    top: dynamicSize(1.8),
    left: dynamicSize(5),
    fontSize: getFontSize(8),
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
  },
});
