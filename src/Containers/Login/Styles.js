import {StyleSheet} from 'react-native';
import {COLORS} from '../../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../../Utils/fontFamily';
import {SCREEN_HEIGHT} from '../../Utils/helper';
import {dynamicSize} from '../../Utils/responsive';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: dynamicSize(25),
    alignItems: 'center',
  },
  marginTop: {
    width: '90%',
    marginTop: SCREEN_HEIGHT * 0.04,
  },
  marginMidTop: {
    width: '90%',
    marginTop: SCREEN_HEIGHT * 0.02,
  },
  forgotText: {
    paddingVertical: dynamicSize(7),
    paddingHorizontal: dynamicSize(25),
    color: COLORS.VIOLET,
    alignSelf: 'flex-end',
    fontSize: FONT_SIZE.SEMI,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
  },
  loginButton: {
    marginTop: SCREEN_HEIGHT * 0.05,
  },
  or: {
    marginVertical: SCREEN_HEIGHT * 0.02,
  },
  socialIconContainer: {
    width: '75%',
    justifyContent: 'space-evenly',
    paddingVertical: dynamicSize(6),
    backgroundColor: COLORS.WHITE,
    borderRadius: dynamicSize(50),
  },
  newMewmber: {
    marginVertical: SCREEN_HEIGHT * 0.04,
  },
  bold: {
    marginVertical: SCREEN_HEIGHT * 0.01,
    lineHeight: FONT_SIZE.REGULAR * 2,
    textAlign: 'center',
    width: '100%',
    fontSize: FONT_SIZE.REGULAR,
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
    color: COLORS.WHITE,
  },
  regular: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  underline: {
    textDecorationLine: 'underline',
  },
});
