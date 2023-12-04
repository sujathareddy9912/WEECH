import {StyleSheet} from 'react-native';
import {COLORS} from '../../Utils/colors';
import {SCREEN_HEIGHT} from '../../Utils/helper';
import {dynamicSize} from '../../Utils/responsive';
import {FONT_FAMILY, FONT_SIZE} from '../../Utils/fontFamily';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: dynamicSize(25),
    alignItems: 'center',
  },
  forgotLabel: {
    fontSize: FONT_SIZE.LARGE,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    color: COLORS.MAGENTA,
  },
  marginTop: {
    width: '90%',
    marginTop: SCREEN_HEIGHT * 0.015,
  },
  textCenter: {
    textAlign: 'center',
  },
  marginMidTop: {
    marginTop: SCREEN_HEIGHT * 0.02,
  },
  rowContainer: {
    width: '50%',
    marginRight: '5%',
    // flexDirection: 'row',
    alignItems: 'flex-end',
    // justifyContent: 'space-between',
    alignSelf: 'flex-end',
    marginVertical: SCREEN_HEIGHT * 0.01,
  },
  smallText: {
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    color: COLORS.WHITE,
  },
  buttonStyle: {
    marginTop: SCREEN_HEIGHT * 0.025,
  },
  or: {
    marginVertical: SCREEN_HEIGHT * 0.01,
  },
  socialIconContainer: {
    width: '75%',
    justifyContent: 'space-evenly',
    paddingVertical: dynamicSize(6),
    backgroundColor: COLORS.WHITE,
    borderRadius: dynamicSize(50),
  },
  alreadyMember: {
    marginVertical: SCREEN_HEIGHT * 0.02,
    fontSize: FONT_SIZE.SEMI,
  },
  underline: {
    textDecorationLine: 'underline',
  },
});

export default styles;
