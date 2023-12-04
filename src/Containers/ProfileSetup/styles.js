import {StyleSheet} from 'react-native';
import {COLORS} from '../../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../../Utils/fontFamily';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Utils/helper';
import {dynamicSize, getFontSize} from '../../Utils/responsive';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  topImageContainer: {
    width: '100%',
    alignItems: 'center',
    height: SCREEN_WIDTH / 2 + SCREEN_HEIGHT * 0.1,
  },
  imageContainer: {
    backgroundColor: COLORS.WHITE,
    borderRadius: SCREEN_WIDTH / 2 / 2,
    width: SCREEN_WIDTH / 2,
    height: SCREEN_WIDTH / 2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  imagePic: {
    borderRadius: SCREEN_WIDTH / 2 / 2,
    width: SCREEN_WIDTH / 2,
    height: SCREEN_WIDTH / 2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  overlayPic: {
    width: SCREEN_WIDTH,
    paddingVertical: SCREEN_HEIGHT * 0.05,
    height: SCREEN_WIDTH / 2 + SCREEN_HEIGHT * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  absoluteCamera: {
    position: 'absolute',
    right: dynamicSize(30),
    flexDirection: 'row',
    bottom: 0,
    zIndex: 10,
  },
  title: {
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    marginVertical: SCREEN_HEIGHT * 0.02,
    color: COLORS.TEXT_INPUT,
    fontSize: FONT_SIZE.EXTRA_LARGE,
    zIndex: 7,
  },
  lowerContainer: {
    width: '95%',
    paddingHorizontal: dynamicSize(10),
    marginTop: SCREEN_HEIGHT * 0.04,
  },
  marginTop: {
    marginTop: SCREEN_HEIGHT * 0.02,
  },
  countryPicker: {
    paddingVertical: dynamicSize(5),
    paddingHorizontal: SCREEN_HEIGHT * 0.005,
    borderRadius: dynamicSize(5),
    backgroundColor: COLORS.WHITE,
    marginTop: SCREEN_HEIGHT * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: FONT_SIZE.REGULAR_MEDIUM,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
  },
  countryContainer: {
    flex: 1,
    height: dynamicSize(50),
    justifyContent: 'space-between',
  },
  countryName: {
    marginTop: dynamicSize(5),
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: FONT_SIZE.MEDIUM,
  },
  about: {
    textAlignVertical: 'top',
    height: SCREEN_HEIGHT / 8,
  },
  imageItem: {
    width: '100%',
  },
  image: {
    width: SCREEN_WIDTH / 4,
    height: SCREEN_WIDTH / 4,
    borderRadius: dynamicSize(10),
  },
  fileContainer: {
    marginTop: SCREEN_HEIGHT * 0.02,
  },
  buttonStyle: {
    alignSelf: 'center',
    marginVertical: SCREEN_HEIGHT * 0.05,
  },
  errorMessage: {
    paddingVertical: dynamicSize(2),
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    color: COLORS.RED_OFFSET,
    fontSize: FONT_SIZE.REGULAR,
  },
  asterisk: {
    color: COLORS.LIGHT_MAGENTA,
    marginLeft: dynamicSize(2),
    marginTop: dynamicSize(-10),
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    fontSize: getFontSize(24),
  },
  cross: {
    position: 'absolute',
    // zIndex:1,
    // right: 0,
    // top: 0,
    borderWidth: 1,
  },
  absolute: {
    position: 'absolute',
    width: '100%',
  },
});

export default styles;
