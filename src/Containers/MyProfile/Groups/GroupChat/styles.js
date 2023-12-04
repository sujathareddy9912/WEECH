import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';

import {COLORS} from '../../../../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../../../../Utils/fontFamily';
import {dynamicSize, getFontSize} from '../../../../Utils/responsive';
import {isAndroid, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../Utils/helper';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7F9',
  },
  header: {
    height: hp(12),
    paddingTop: hp(5),
    paddingHorizontal: wp(3),
    backgroundColor: COLORS.LIGHT_BABY_PINK,
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  next: {
    alignSelf: 'flex-end',
  },
  profilePic: {
    width: dynamicSize(30),
    height: dynamicSize(30),
    marginLeft: dynamicSize(5),
    borderRadius: wp(100),
  },
  grpIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.WHITE + '80',
  },
  grpName: {
    color: COLORS.WHITE,
    fontSize: dynamicSize(18),
    marginLeft: dynamicSize(5),
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
  },
  grpMembersPic: {
    flexDirection: 'row',
    paddingTop: hp(0.5),
    paddingBottom: hp(1.5),
    backgroundColor: COLORS.LIGHT_BABY_PINK,
  },
  memPic: {
    alignItems: 'center',
    paddingLeft: dynamicSize(25),
  },
  footer: {
    width: wp(100),
    borderTopWidth: 1,
    borderColor: '#E8EAF3',
    // height: dynamicSize(105),
    backgroundColor: '#F0F1F5',
    // position: 'absolute',
  },
  inputCon: {
    flexDirection: 'row',
    alignItems: 'center',
    height: dynamicSize(48),
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-between',
    paddingHorizontal: dynamicSize(20),
  },
  mediaCon: {
    flexDirection: 'row',
    alignItems: 'center',
    height: dynamicSize(57),
    justifyContent: 'space-around',
  },
  input: {
    width: wp(60),
    marginLeft: dynamicSize(10),
    fontFamily: FONT_FAMILY.SF_PRO_REGULAR,
    fontSize: getFontSize(15),
  },
  sendBtn: {
    width: dynamicSize(65),
    height: dynamicSize(32),
    backgroundColor: '#7287EA12',
    borderRadius: dynamicSize(200),
    justifyContent: 'center',
    alignItems: 'center',
  },
  send: {
    color: '#7287EA',
    fontSize: dynamicSize(16),
    fontFamily: FONT_FAMILY.SF_PRO_REGULAR,
  },
  itemContainer: {
    alignItems: 'flex-start',
    padding: dynamicSize(15),
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: dynamicSize(2),
    paddingHorizontal: dynamicSize(8),
    width: dynamicSize(235),
    backgroundColor: COLORS.WHITE,
    borderRadius: dynamicSize(44),
    justifyContent: 'space-between',
  },
  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  senderPic: {
    width: dynamicSize(20),
    height: dynamicSize(20),
    borderRadius: wp(100),
  },
  flagContainer: {
    flexDirection: 'row',
    marginTop: dynamicSize(5),
    alignItems: 'center',
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
    paddingHorizontal: wp(2),
    justifyContent: 'space-between',
    backgroundColor: COLORS.BABY_PINK,
  },
  senderName: {
    width: wp(30),
    fontSize: dynamicSize(12),
    marginLeft: dynamicSize(5),
    color: COLORS.LIGHT_BABY_PINK,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
  },
  msgPic: {
    width: dynamicSize(234),
    height: dynamicSize(142),
    borderTopLeftRadius: dynamicSize(12),
    borderTopRightRadius: dynamicSize(12),
    borderBottomLeftRadius: dynamicSize(12),
    borderBottomRightRadius: dynamicSize(12),
  },
  itemInfo: {
    marginTop: dynamicSize(5),
  },
  msgCon: {
    backgroundColor: COLORS.WHITE,
    paddingVertical: dynamicSize(6),
    paddingHorizontal: dynamicSize(18),
    borderTopLeftRadius: dynamicSize(12),
    borderTopRightRadius: dynamicSize(12),
    borderBottomLeftRadius: dynamicSize(12),
    borderBottomRightRadius: dynamicSize(12),
  },
  time: {
    color: '#777777',
    textAlign: 'right',
    marginTop: dynamicSize(5),
    fontSize: getFontSize(11),
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  imgTime: {
    color: '#C4C4C4',
    textAlign: 'right',
    position: 'absolute',
    right: dynamicSize(5),
    bottom: dynamicSize(5),
    fontSize: getFontSize(11),
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  msg: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: getFontSize(13),
  },
  emojiCon: {
    height: dynamicSize(240),
  },
  overlay: {
    // position: 'absolute',
    width: SCREEN_WIDTH,
    // height: SCREEN_HEIGHT - dynamicSize(300),
    backgroundColor: COLORS.TRANSPARENT,
  },
  overlay1: {
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
    fontFamily: FONT_FAMILY.SF_PRO_REGULAR,
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
});
