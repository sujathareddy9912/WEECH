import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';

import {COLORS} from '../../../../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../../../../Utils/fontFamily';
import {dynamicSize, getFontSize} from '../../../../Utils/responsive';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../Utils/helper';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7F9',
  },
  header: {
    backgroundColor: COLORS.TRANSPARENT,
    paddingTop: hp(5),
    height: hp(12),
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  next: {
    alignSelf: 'flex-end',
  },
  profileCon: {
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: wp(100),
    width: dynamicSize(142),
    justifyContent: 'center',
    height: dynamicSize(142),
    marginTop: dynamicSize(3),
  },
  profilePic: {
    width: dynamicSize(142),
    height: dynamicSize(142),
    borderRadius: wp(100),
  },
  editIcon: {
    bottom: dynamicSize(0),
    right: dynamicSize(8),
    position: 'absolute',
    alignItems: 'center',
    borderRadius: wp(100),
    width: dynamicSize(38),
    height: dynamicSize(38),
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  grpName: {
    textAlign: 'center',
    color: COLORS.MALEbLUE,
    marginTop: dynamicSize(8),
    fontSize: getFontSize(18),
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
  },
  participantsCount: {
    textAlign: 'center',
    color: COLORS.BLACK,
    marginTop: dynamicSize(2),
    fontSize: getFontSize(16),
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: dynamicSize(15),
  },
  itemText: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  list: {
    paddingHorizontal: dynamicSize(18),
    marginTop: dynamicSize(18),
    backgroundColor: COLORS.WHITE,
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
    marginTop: dynamicSize(5),
  },
  flag: {
    width: hp(2.5),
    height: hp(2),
  },
  crownContainer: {
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(1),
    paddingHorizontal: wp(3),
    justifyContent: 'space-between',
    backgroundColor: COLORS.BABY_PINK,
  },
  rightCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    right: dynamicSize(33),
    bottom: dynamicSize(43),
    width: dynamicSize(104),
    height: dynamicSize(56),
    justifyContent: 'center',
    backgroundColor: '#219653',
    borderRadius: dynamicSize(90),
  },
  addTxt: {
    color: COLORS.WHITE,
    fontSize: getFontSize(16),
    marginLeft: dynamicSize(10),
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  CustomModal: {
    justifyContent: 'flex-start',
  },
  modal: {
    position: 'absolute',
    top: dynamicSize(65),
    left: dynamicSize(188),
    width: dynamicSize(155),
    height: dynamicSize(124),
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
  exitModal: {
    position: 'absolute',
    top: dynamicSize(332),
    left: dynamicSize(47),
    width: dynamicSize(281),
    height: dynamicSize(163),
    padding: dynamicSize(30),
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
  overlay: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: COLORS.TRANSPARENT,
  },
  optCon: {
    borderColor: '#0000000D',
    paddingVertical: dynamicSize(8),
    paddingHorizontal: dynamicSize(15),
  },
  opt: {
    fontSize: getFontSize(18),
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  exitText: {
    fontSize: getFontSize(18),
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
  },
  modalActCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalAct: {
    fontSize: getFontSize(18),
    marginTop: dynamicSize(30),
    color: COLORS.MEHRUN_COLOR,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
  },
  xyModal: {
    position: 'absolute',
    width: wp(50),
    borderRadius: wp(2),
    backgroundColor: COLORS.WHITE,
    zIndex: 100000,
    paddingVertical: wp(3),
    paddingHorizontal: wp(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  grpIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.TAB_BORDER,
  },
});
