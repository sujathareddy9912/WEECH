import {StyleSheet} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {COLORS} from '../../Utils/colors';
import {dynamicSize} from '../../Utils/responsive';
import {FONT_FAMILY, FONT_SIZE} from '../../Utils/fontFamily';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Utils/helper';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.STREAM_BACKGROUND,
  },

  absoluteHeader: {
    position: 'absolute',
    zIndex: 10,
  },

  headerContainer: {
    width: SCREEN_WIDTH,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: dynamicSize(6),
    paddingHorizontal: dynamicSize(10),
  },

  subHeaderContainer: {
    flex: 1,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileDetailContainer: {
    backgroundColor: COLORS.TRANSPARENT_LIGHT_BLACK,
    borderRadius: dynamicSize(100),
    paddingHorizontal: SCREEN_HEIGHT * 0.01,
    paddingVertical: SCREEN_HEIGHT * 0.005,
    maxWidth: '50%',
  },

  nameContainer: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.SMALL,
    fontFamily: FONT_FAMILY.SF_PRO_REGULAR,
    fontWeight: '400',
  },
  padding: {
    paddingHorizontal: SCREEN_HEIGHT * 0.005,
  },
  imageContainer: {
    marginLeft: SCREEN_HEIGHT * 0.005,
  },

  localStreamingView: {
    flex: 1,
    backgroundColor: COLORS.STREAM_BACKGROUND,
  },

  priceContainer: {
    zIndex: 1,
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    marginTop: dynamicSize(5),
    paddingHorizontal: dynamicSize(10),
    justifyContent: 'space-between',
  },
  idContainer: {
    zIndex: 1,
    right: dynamicSize(10),
    marginTop: dynamicSize(40),
    paddingHorizontal: dynamicSize(10),
  },
  weechaId: {
    color: '#7E7E7E',
    fontSize: FONT_SIZE.SMALL,
    textAlign: 'right',
  },
  absoluteCrown: {
    position: 'absolute',
    zIndex: 10,
    top: -SCREEN_HEIGHT * 0.013,
  },
  diamondContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: dynamicSize(10),
    paddingHorizontal: dynamicSize(10),
  },

  diamondText: {
    marginLeft: dynamicSize(10),
  },

  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: dynamicSize(10),
    borderRadius: dynamicSize(10),
    paddingHorizontal: dynamicSize(10),
    backgroundColor: COLORS.LIGHT_MAGENTA,
  },

  levelText: {
    color: COLORS.WHITE,
    marginLeft: dynamicSize(10),
  },

  remote: {
    flex: 1,
  },

  bottomMenuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: dynamicSize(20),
    borderTopLeftRadius: dynamicSize(10),
    borderTopRightRadius: dynamicSize(10),
  },

  loadingText: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.LARGE,
  },

  broadcasterVideoStateMessage: {
    flex: 1,
    bottom: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },

  broadcasterVideoStateMessageText: {
    color: '#fff',
    fontSize: 20,
  },

  centerAlign: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  chatMainContainer: {
    paddingTop: SCREEN_HEIGHT * 0.02,
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    bottom: 0,
    flex: 1,
  },

  scrollView: {
    paddingHorizontal: dynamicSize(10),
  },

  chatView: {
    maxWidth: '75%',
    flexDirection: 'row',
    borderRadius: dynamicSize(20),
    paddingVertical: dynamicSize(4),
    paddingHorizontal: dynamicSize(10),
  },

  username: {
    fontFamily: FONT_FAMILY.SF_PRO_REGULAR,
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.REGULAR,
    textTransform: 'capitalize',
  },

  msg: {
    fontFamily: FONT_FAMILY.SF_PRO_REGULAR,
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.REGULAR,
  },

  chatRightConrtainer: {
    marginLeft: dynamicSize(12),
  },

  bottomChatRowContainer: {
    // paddingVertical: SCREEN_HEIGHT * 0.015,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: dynamicSize(10),
    justifyContent: 'space-between',
  },

  subBottomChatRowContainer: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },

  count: {
    color: COLORS.WHITE,
  },

  likeVisiblityContainer: {
    paddingHorizontal: dynamicSize(4),
    zIndex: 5,
    right: 10,
    position: 'absolute',
  },

  visiblityContainer: {
    marginTop: SCREEN_HEIGHT * 0.02,
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

  borderWidth: {
    borderWidth: 2,
  },

  removeBorder: {
    borderWidth: 0,
  },

  footerIcon: {
    backgroundColor: COLORS.LIGHT_GREYISH,
    borderRadius: 100,
  },
  hostRightOptionsContainer: {
    marginBottom: dynamicSize(20)
  },

  translucent: {
    padding: SCREEN_HEIGHT * 0.012,
    borderRadius: dynamicSize(500),
    backgroundColor: COLORS.TRANSLUCENT_LIGHT_WHITE,
    marginBottom: SCREEN_HEIGHT * 0.025,
  },

  pkText: {
    fontFamily: FONT_FAMILY.SF_PRO_REGULAR,
    fontWeight: '900',
    color: COLORS.YELLOW,
  },

  marginBottom: {
    marginBottom: SCREEN_HEIGHT * 0.025,
  },

  points: {
    paddingVertical: SCREEN_HEIGHT * 0.005,
    marginHorizontal: dynamicSize(10),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.TRANSPARENT_LIGHT_BLACK,
    borderRadius: dynamicSize(100),
  },

  joinedThLiveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    borderRadius: dynamicSize(100),
  },

  levelContainer: {
    borderRadius: dynamicSize(100),
    paddingVertical: SCREEN_HEIGHT * 0.01,
    paddingHorizontal: SCREEN_HEIGHT * 0.015,
  },

  userLevel: {
    fontFamily: FONT_FAMILY.SF_PRO_REGULAR,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: FONT_SIZE.MEDIUM,
    color: COLORS.WHITE,
  },

  joinedTheLiveText: {
    marginLeft: SCREEN_HEIGHT * 0.02,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.SF_PRO_REGULAR,
    fontSize: FONT_SIZE.LARGE,
    width: wp(50),
  },

  welcomeContainer: {
    width: '75%',
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

  chatPic: {
    width: SCREEN_HEIGHT * 0.035,
    height: SCREEN_HEIGHT * 0.035,
    borderRadius: dynamicSize(100),
    marginTop: SCREEN_HEIGHT * 0.005,
  },

  msgBox: {
    marginTop: SCREEN_HEIGHT * 0.0025,
    backgroundColor: COLORS.TRANSLUCENT_LIGHT_WHITE,
    paddingHorizontal: SCREEN_HEIGHT * 0.01,
    paddingVertical: SCREEN_HEIGHT * 0.0025,
    borderRadius: dynamicSize(50),
  },
  modalContainer: {
    flex: 0.5,
    backgroundColor: COLORS.WHITE,
    width: wp(90),
    height: hp(50),
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: hp(2),
  },
  modalText: {
    width: wp(75),
    textAlign: 'center',
    fontSize: FONT_SIZE.LARGE,
    marginVertical: hp(1),
  },
  buttonStyle: {
    backgroundColor: COLORS.BABY_PINK,
    alignSelf: 'center',
    height: hp(7),
    marginTop: hp(1),
  },
  btnLabel: {
    fontSize: 16,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
  },
  btntext: {
    fontSize: FONT_SIZE.SEMI,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
  },
  modalImg: {
    width: hp(15),
    height: hp(15),
    borderRadius: hp(7.5),
  },
  heartFlag: {
    width: wp(55),
    height: wp(55),
  },
  seperator: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: COLORS.MID_LIGHT_GREY,
  },
  options: {
    marginVertical: hp(1.5),
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    opacity: 0.5,
    fontSize: 16,
  },
  liveimageContainer: {
    alignSelf: 'center',
    width: dynamicSize(80),
    height: dynamicSize(120),
    marginLeft: dynamicSize(20),
    borderRadius: dynamicSize(16),
    backgroundColor: COLORS.BABY_PINK,
  },
  closeBtn: {
    zIndex: 100,
    backgroundColor: '#000',
    height: 24,
    width: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  chatKeyboardScrollViewContainer: {
    flex: 1,
    marginTop: 150,
  },
  chatContainer: {
    width: SCREEN_WIDTH,
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: 10,
  },
  heartFlagContainer: {
    bottom: hp(17),
    left: wp(-22),
    position: 'absolute',
  },
});

export default styles;
