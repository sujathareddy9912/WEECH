import {Platform, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../Utils/fontFamily';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../Utils/helper';
import {dynamicSize} from '../Utils/responsive';
const isAndroid = Platform.OS == 'android';

const commonStyle = StyleSheet.create({
  commonContainer: {
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: dynamicSize(50),
    padding: SCREEN_HEIGHT * 0.01,
    justifyContent: 'center',
  },
  buttonLabel: {
    color: COLORS.LIGHT_GREY,
    fontSize: FONT_SIZE.EXTRA_LARGE,
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
  },
  darkButton: {
    backgroundColor: COLORS.VIOLET,
    borderWidth: 4,
    borderColor: COLORS.WHITE,
    padding: SCREEN_HEIGHT * 0.013,
  },
  darkButtonlabel: {
    color: COLORS.WHITE,
    fontSize: SCREEN_HEIGHT * 0.023 || FONT_SIZE.SEMI,
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
  },
  mediumWhite: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.SEMI,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
  },
  rowWithAlignJustifyCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filePickTitle: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.LARGE,
  },
  filePickeRowContainer: {
    width: '100%',
    marginBottom: SCREEN_HEIGHT * 0.03,
  },
  filePickSubtitle: {
    color: COLORS.VIOLET,
    fontSize: FONT_SIZE.REGULAR_MEDIUM,
  },
  filePickerAsterisk: {
    color: COLORS.LIGHT_MAGENTA,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    fontSize: FONT_SIZE.EXTRA_LARGE,
  },
  paginationContainer: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    paddingTop: SCREEN_HEIGHT * 0.02,
    paddingBottom: 0,
    paddingHorizontal: dynamicSize(0),
  },
  dotStyle: {
    padding: 0,
    margin: 0,
    width: 5,
    height: 5,
    borderRadius: 5,
  },
  profilePicPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    width: SCREEN_WIDTH / 3.7,
    height: SCREEN_WIDTH / 3.7,
    borderRadius: dynamicSize(10),
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SCREEN_WIDTH / 5.5,
    borderRadius: dynamicSize(20),
    justifyContent: 'space-between',
    backgroundColor: COLORS.LIGHT_BABY_PINK,
  },
  Countercount: {
    paddingHorizontal: dynamicSize(5),
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.REGULAR_MEDIUM,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
  },
  pulsMinus: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.REGULAR_MEDIUM,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: dynamicSize(100),
    paddingHorizontal: dynamicSize(10),
    backgroundColor: COLORS.LIGHT_MAGENTA,
  },
  levelText: {
    color: COLORS.WHITE,
    marginLeft: dynamicSize(8),
  },
  plusFooter: {
    width: SCREEN_WIDTH / 4,
    height: SCREEN_WIDTH / 4,
    borderRadius: dynamicSize(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BLACK_OFFSET_THREE,
  },
  overlay: {
    position: 'absolute',
    backgroundColor: COLORS.BLACK + '70',
    width: SCREEN_WIDTH / 4,
    height: SCREEN_WIDTH / 4,
    borderRadius: dynamicSize(10),
  },
  playIcon: {
    position: 'absolute',
    zIndex: 100,
  },
  labelWithCountContainer: {
    alignItems: 'center',
    paddingVertical: SCREEN_HEIGHT * 0.015,
  },
  headerLabel: {
    color: COLORS.VIOLET,
    fontSize: FONT_SIZE.REGULAR_MEDIUM,
    fontWeight: isAndroid ? 'bold' : '600',
  },
  headerLabelcount: {
    fontWeight: isAndroid ? 'bold' : '600',
    fontSize: FONT_SIZE.SEMI,
  },
  tabBorder: {
    width: '85%',
    height: SCREEN_HEIGHT * 0.005,
    backgroundColor: COLORS.TAB_BORDER,
    borderRadius: dynamicSize(50),
  },
  callSheetContainer: {
    width: '100%',
    borderTopLeftRadius: dynamicSize(15),
    borderTopRightRadius: dynamicSize(15),
    // overflow: 'hidden',
    height: SCREEN_HEIGHT-dynamicSize(50),
    // backgroundColor: COLORS.WHITE,
    paddingHorizontal: dynamicSize(15),
    paddingVertical: SCREEN_HEIGHT * 0.02,
  },
  bottomChatRowContainer: {
    paddingVertical: SCREEN_HEIGHT * 0.015,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subBottomChatRowContainer: {
    flex: 0.9,
    justifyContent: 'space-between',
    marginLeft: wp(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  callSheetContainerAudio: {
    width: '100%',
    borderTopLeftRadius: dynamicSize(15),
    borderTopRightRadius: dynamicSize(15),
    // overflow: 'hidden',
    // height: SCREEN_HEIGHT / 5,
    paddingHorizontal: dynamicSize(15),
    paddingVertical: SCREEN_HEIGHT * 0.02,
  },
  callActionTop: {
    width: '100%',
    // justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  callActionTopAudio: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  callActionButton: {
    marginTop: SCREEN_HEIGHT * 0.01,
    width: SCREEN_WIDTH / 8,
    height: SCREEN_WIDTH / 8,
    borderRadius: dynamicSize(50),
    backgroundColor: COLORS.WHITE + '40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callActionAudio: {
    // width: '100%',
    // alignItems: 'flex-end',
    // justifyContent: 'center',
  },
  chatView: {
    maxWidth: '45%',
    flexDirection: 'row',
    borderRadius: dynamicSize(20),
    paddingVertical: dynamicSize(4),
  },
  chatPic: {
    width: SCREEN_HEIGHT * 0.035,
    height: SCREEN_HEIGHT * 0.035,
    borderRadius: dynamicSize(100),
    marginTop: SCREEN_HEIGHT * 0.005,
  },
  picContainer: {
    // justifyContent: 'center',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_HEIGHT * 0.03,
    height: SCREEN_HEIGHT * 0.03,
    borderRadius: dynamicSize(20),
  },
  chatRightConrtainer: {
    marginLeft: dynamicSize(12),
  },
  username: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.REGULAR,
    textTransform: 'capitalize',
  },
  msgBox: {
    marginTop: SCREEN_HEIGHT * 0.0025,
    backgroundColor: COLORS.TRANSLUCENT_LIGHT_WHITE,
    paddingHorizontal: SCREEN_HEIGHT * 0.01,
    paddingVertical: SCREEN_HEIGHT * 0.0025,
    borderRadius: dynamicSize(50),
  },
  msg: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.REGULAR,
  },
  welcomeContainer: {
    maxWidth: '45%',
    backgroundColor: COLORS.TRANSLUCENT_PINK,
    borderRadius: dynamicSize(10),
    padding: SCREEN_HEIGHT * 0.01,
  },

  welcometxt: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.REGULAR,
    lineHeight: dynamicSize(20),
    fontWeight: '600',
  },
});

export default commonStyle;
