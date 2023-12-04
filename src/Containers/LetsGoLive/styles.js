import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {COLORS} from '../../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../../Utils/fontFamily';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Utils/helper';
import {dynamicSize} from '../../Utils/responsive';
const IS_ANDROID = Platform.OS === 'android';

const styles = StyleSheet.create({
  backIcon: {
    position: 'absolute',
    alignSelf: 'flex-start',
    left: dynamicSize(25),
    zIndex: 5,
  },
  gradient: {
    padding: 3,
    borderRadius: SCREEN_WIDTH / 2 / 2,
    width: SCREEN_WIDTH / 2,
    height: SCREEN_WIDTH / 2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  imageContainer: {
    width: SCREEN_WIDTH / 2 - dynamicSize(15),
    height: SCREEN_WIDTH / 2 - dynamicSize(15),
    borderRadius: SCREEN_WIDTH / 2 / 2,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: SCREEN_WIDTH / 2 - dynamicSize(15),
    height: SCREEN_WIDTH / 2 - dynamicSize(15),
    borderRadius: SCREEN_WIDTH / 2 / 2,
  },
  title: {
    fontSize: FONT_SIZE.MID_BOLD,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    marginTop: SCREEN_HEIGHT * 0.03,
    marginBottom: SCREEN_HEIGHT * 0.03,
  },
  touchContainer: {
    width: SCREEN_WIDTH - dynamicSize(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    paddingVertical: dynamicSize(10),
    borderBottomColor: COLORS.MID_LIGHT_GREY,
    marginTop: SCREEN_HEIGHT * 0.02,
  },
  dropDownText: {
    fontSize: FONT_SIZE.SEMI,
    fontFamily: FONT_FAMILY.ROBOTO_REGULAR,
  },
  input: {
    width: SCREEN_WIDTH - dynamicSize(50),
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.MID_LIGHT_GREY,
    marginVertical: SCREEN_HEIGHT * 0.02,
  },
  flag: {
    width: dynamicSize(22),
    height: dynamicSize(18),
  },
  inputContainer: {
    paddingHorizontal: 0,
  },
  textInput: {
    maxHeight: SCREEN_HEIGHT / 9,
    marginLeft: 0,
    color: COLORS.BLACK,
    fontSize: FONT_SIZE.SEMI,
    fontFamily: FONT_FAMILY.ROBOTO_REGULAR,
  },
  intrest: {
    fontFamily: FONT_FAMILY.ROBOTO_MEDIUM,
    alignSelf: 'flex-start',
    marginHorizontal: dynamicSize(25),
    fontSize: FONT_SIZE.SEMI,
    marginTop: SCREEN_HEIGHT * 0.03,
  },
  buttonStyle: {
    backgroundColor: COLORS.BABY_PINK,
    marginVertical: SCREEN_HEIGHT * 0.04,
  },
  buttonText: {
    color: COLORS.WHITE,
  },
  item: {
    backgroundColor: COLORS.MID_GREY,
    paddingHorizontal: dynamicSize(5),
    paddingVertical: dynamicSize(3),
    borderRadius: dynamicSize(50),
    marginBottom: dynamicSize(7),
    marginRight: dynamicSize(7),
  },
  list: {
    paddingVertical: SCREEN_HEIGHT * 0.015,
    width: SCREEN_WIDTH - dynamicSize(50),
  },
  intrestText: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.MEDIUM,
  },
  seperator: {
    backgroundColor: COLORS.WHITE,
    borderBottomColor: COLORS.LIGHT_GREY,
    borderBottomWidth: 0.5,
  },
  liveLogoContainer: {
    width: SCREEN_WIDTH,
    borderTopLeftRadius: dynamicSize(5),
    borderTopRightRadius: dynamicSize(5),
    paddingVertical: SCREEN_HEIGHT * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BABY_PINK,
  },
  levelUpAlert: {
    padding: wp(5),
    justifyContent: 'center',
    width: SCREEN_WIDTH / 1.2,
    borderRadius: dynamicSize(5),
    backgroundColor: COLORS.WHITE,
  },
  liveOptions: {
    backgroundColor: COLORS.WHITE,
    paddingLeft: dynamicSize(24),
    paddingRight: dynamicSize(18),
    paddingVertical: dynamicSize(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  liveText: {
    fontSize: FONT_SIZE.EXTRA_LARGE,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  blurImage: {
    alignItems: 'center',
    justifyContent: 'center',
    height: SCREEN_HEIGHT / 1.8,
    width: SCREEN_WIDTH,
    marginBottom: SCREEN_HEIGHT * 0.02,
  },
  rowname: {
    marginVertical: SCREEN_HEIGHT * 0.01,
    marginBottom: dynamicSize(4),
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 5,
    justifyContent:'center'
  },
  name: {
    marginLeft: wp(2),
    fontSize: FONT_SIZE.SEMI,
    fontFamily: IS_ANDROID ? 'SFProText-Medium' : FONT_FAMILY.SF_PRO_MEDIUM,
  },
  weechaId: {
    fontSize: FONT_SIZE.SEMI,
    fontFamily: FONT_FAMILY.SF_PRO_REGULAR,
    zIndex: 5,
  },
  knowMore: {
    marginTop: dynamicSize(40),
    fontSize: FONT_SIZE.SEMI,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    color: COLORS.BABY_PINK,
  },
  desc: {
    fontSize: FONT_SIZE.SEMI,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  level: {
    width: wp(55),
    fontSize: FONT_SIZE.SEMI,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: SCREEN_HEIGHT / 1.8,
    backgroundColor: COLORS.TRANSLUCENT_WHITE,
  },
  bottom: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.WHITE,
  },
  buttonClose: {
    top: 0,
    right: 0,
    position: 'absolute',
  },
});

export default styles;