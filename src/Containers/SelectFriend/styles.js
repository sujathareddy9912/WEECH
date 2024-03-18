import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../../Utils/fontFamily';
import {dynamicSize, getFontSize} from '../../Utils/responsive';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: COLORS.LIGHT_PINK,
    paddingTop: hp(5),
    height: hp(12),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(1.5),
  },
  itemText: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  list: {
    paddingHorizontal: wp(3),
    flexGrow: 1,
    paddingBottom: wp(25),
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: COLORS.BLACK,
    fontWeight: '700',
  },
  userImg: {
    width: hp(5),
    height: hp(5),
    marginRight: wp(3),
    borderRadius: wp(100),
  },
  nameContainer: {},
  flagContainer: {
    flexDirection: 'row',
  },
  flag: {
    width: hp(2),
    height: hp(2),
  },
  groupMembers: {
    fontSize: getFontSize(10),
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  grpName: {
    fontSize: FONT_SIZE.MEDIUM,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    color: COLORS.BLACK,
  },
  crownContainer: {
    flexDirection: 'row',
    paddingHorizontal: wp(3),
    backgroundColor: COLORS.BABY_PINK,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(1),
  },
  buttonStyle: {
    position: 'absolute',
    bottom: hp(5),
    backgroundColor: COLORS.BABY_PINK,
    alignSelf: 'center',
    height: hp(7),
  },
});
