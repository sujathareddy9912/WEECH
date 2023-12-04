import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../../../Utils/fontFamily';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../Utils/helper';
import {dynamicSize} from '../../../Utils/responsive';

export const styles = StyleSheet.create({
  topCont: {
    height: hp(60),
    backgroundColor: COLORS.PINKY,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    fontSize: FONT_SIZE.EXTRA_LARGE,
  },
  desc: {
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    fontSize: FONT_SIZE.LARGE,
  },
  infoContainer: {
    padding: wp(5),
  },
  item: {
    flexDirection: 'row',
    marginTop: hp(2),
  },
  levelTextView: {
    position: 'absolute',
    bottom: hp(0),
    zIndex: 1000,
    backgroundColor: COLORS.WHITE,
    height: hp(2),
  },
  levelText: {
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    fontSize: FONT_SIZE.SMALL,
    paddingHorizontal: wp(6),
    color: COLORS.PINKY,
  },
  count: {
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.PINKY,
  },
  starCon: {
    marginTop: hp(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 100,
  },
  rightHeaderComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  levelCon: {
    position: 'absolute',
    width: wp(90),
    bottom: hp(2),
  },
  levelLimitText: {
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    fontSize: FONT_SIZE.SMALL,
    paddingHorizontal: wp(2),
    color: COLORS.WHITE,
  },
  levelLimitTextCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  limitView: {
    backgroundColor: COLORS.WHITE,
    height: hp(0.8),

    borderRadius: wp(5),
  },
  textCon: {
    marginTop: hp(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(1),
  },
  label: {
    width: wp(25),
    height: hp(2.5),
    backgroundColor: COLORS.WHITE,
    borderRadius: wp(5),
    marginLeft: wp(2),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
