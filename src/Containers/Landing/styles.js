import {StyleSheet} from 'react-native';
import {COLORS} from '../../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../../Utils/fontFamily';
import {SCREEN_HEIGHT} from '../../Utils/helper';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    marginTop: SCREEN_HEIGHT * 0.01,
  },
  titleContainer: {
    alignItems: 'center',
  },
  welcome: {
    color: COLORS.PRIMARY_BLUE,
    fontSize: FONT_SIZE.BLACK,
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
  },
  glad: {
    color: COLORS.MAGENTA,
    fontSize: FONT_SIZE.EXTRA_LARGE,
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
  },
  middleContainer: {
    width: '100%',
    alignItems: 'center',
  },
  buttonStyle: {
    width: '80%',
    justifyContent: 'center',
  },
  signupButtonStyle: {
    width: '80%',
    justifyContent: 'center',
    marginTop: SCREEN_HEIGHT * 0.03,
  },
});
