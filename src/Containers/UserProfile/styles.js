import {StyleSheet, Platform} from 'react-native';

import {COLORS} from '../../Utils/colors';
import {dynamicSize, getFontSize} from '../../Utils/responsive';
import {FONT_FAMILY, FONT_SIZE} from '../../Utils/fontFamily';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Utils/helper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const isAndroid = Platform.OS == 'android';
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  headerContainer: {
    height: SCREEN_HEIGHT * 0.07,
    justifyContent: 'center',
    backgroundColor: COLORS.LIGHT_BABY_PINK,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    textAlign: 'center',
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    color: COLORS.WHITE,
    fontWeight: isAndroid ? 'bold' : '700',
    fontSize: FONT_SIZE.LARGE,
    flex: 0.8,
  },
  flag: {
    width: dynamicSize(22),
    height: dynamicSize(16),
  },
  backIcon: {
    // position: 'absolute',
    // alignSelf: 'flex-start',
    // left: dynamicSize(25),
    // zIndex: 5,
    flex: 0.1,
  },
  profilePic: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: SCREEN_HEIGHT / 3,
    zIndex: 2,
  },
  dataContainer: {
    width: '100%',
    zIndex: 10,
    top: -dynamicSize(10),
    borderTopLeftRadius: dynamicSize(15),
    borderTopRightRadius: dynamicSize(15),
    backgroundColor: COLORS.WHITE,
    paddingVertical: SCREEN_HEIGHT * 0.03,
    zIndex: 10,
  },
  nameContainer: {
    paddingHorizontal: dynamicSize(15),
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  name: {
    width: wp(60),
    fontWeight: '500',
    fontSize: FONT_SIZE.SEMI_BLACK,
    color: COLORS.BLACK,
  },
  followButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: dynamicSize(15),
    backgroundColor: COLORS.BABY_PINK,
    height: dynamicSize(40),
    width: dynamicSize(110),
  },
  followText: {
    fontSize: FONT_SIZE.REGULAR,
    fontWeight: isAndroid ? 'bold' : '500',
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    color: COLORS.WHITE,
  },
  subContainer: {
    paddingHorizontal: dynamicSize(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    paddingHorizontal: dynamicSize(15),
    paddingVertical: SCREEN_HEIGHT * 0.01,
    fontSize: FONT_SIZE.REGULAR,
    fontWeight: '400',
  },
  countCard: {
    paddingHorizontal: dynamicSize(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: COLORS.BLACK_OFFSET_TWO,
    borderBottomColor: COLORS.BLACK_OFFSET_TWO,
  },
  tabIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: dynamicSize(15),
    justifyContent: 'space-between',
  },
  tabIconStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH / 3 - dynamicSize(30),
    height: SCREEN_HEIGHT * 0.1,
  },
  tabIndicator: {
    position: 'absolute',
    zIndex: 10,
    bottom: 0,
  },
  abosoluteVideoButtonContainer: {
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  galleryList: {
    width: '100%',
    paddingHorizontal: dynamicSize(15),
    paddingVertical: SCREEN_HEIGHT * 0.025,
  },
  galleryItem: {
    width: SCREEN_WIDTH / 3 - dynamicSize(15),
    height: SCREEN_WIDTH / 3 - dynamicSize(15),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: dynamicSize(10),
    backgroundColor: COLORS.TRANSPARENT,
  },
  image: {
    width: SCREEN_WIDTH / 3 - dynamicSize(15),
    height: SCREEN_WIDTH / 3 - dynamicSize(15),
    borderRadius: dynamicSize(10),
  },
  absoluteVideo: {
    position: 'absolute',
    top: dynamicSize(7),
    right: dynamicSize(7),
    zIndex: 10,
    backgroundColor: COLORS.TRANSPARENT,
  },
  seperator: {
    height: dynamicSize(10),
  },
  videoCallIcon: {
    marginHorizontal: dynamicSize(15),
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
  popUp: {
    position: 'absolute',
    backgroundColor: COLORS.WHITE,
    right: dynamicSize(20),
    top: dynamicSize(50),
    zIndex: 1,
    paddingVertical: dynamicSize(15),
    // paddingHorizontal: dynamicSize(10),
    shadowOffset: {
      height: 4,
      width: 1,
    },
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 10,
    borderRadius: 10,
    width: dynamicSize(160),
  },
  popUpText: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: FONT_SIZE.MEDIUM,
    marginLeft: dynamicSize(10),
  },
  weechaId: {
    color: COLORS.BLACK,
    fontSize: getFontSize(12),
    paddingHorizontal: dynamicSize(15),
    fontFamily: isAndroid ? 'SFProText-Medium' : FONT_FAMILY.POPPINS_REGULAR,
  },
});

export default styles;
