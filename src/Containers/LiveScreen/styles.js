import {StyleSheet} from 'react-native';

import {COLORS} from '../../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../../Utils/fontFamily';
import {dynamicSize, getFontSize} from '../../Utils/responsive';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Utils/helper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export const fileWidth = SCREEN_WIDTH / 2 - dynamicSize(6);

const styles = StyleSheet.create({
  absoluteImage: {
    position: 'absolute',
    width: fileWidth,
    height: fileWidth,
    backgroundColor: COLORS.BABY_PINK,
    borderRadius: dynamicSize(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  one: {
    width: fileWidth,
    height: fileWidth * 2 + dynamicSize(4),
  },
  imageContainer: {
    width: fileWidth,
    height: fileWidth,
    backgroundColor: COLORS.BABY_PINK,
    borderRadius: dynamicSize(5),
  },
  imageSubContainer: {
    flex: 1,
    width: fileWidth,
    height: fileWidth,
    padding: dynamicSize(10),
    justifyContent: 'space-between',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  myStarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: dynamicSize(12),
    paddingHorizontal: dynamicSize(10),
    paddingVertical: dynamicSize(5),
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinTextStyle: {
    color: 'white',
    marginLeft: dynamicSize(5),
    fontWeight: 'bold',
    fontSize: FONT_SIZE.REGULAR_MEDIUM,
  },
  nameStyle: {
    color: 'white',
    width: dynamicSize(100),
    marginLeft: dynamicSize(5),
    marginTop: dynamicSize(4),
    fontWeight: '500',
    fontSize: FONT_SIZE.SMALL,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  scrollContainer: {
    width: SCREEN_WIDTH,
    marginTop: dynamicSize(5),
  },
  columnContainer: {
    justifyContent: 'space-between',
    paddingVertical: dynamicSize(2),
  },
  contentStyle: {
    paddingHorizontal: dynamicSize(4),
    paddingBottom: dynamicSize(100),
  },
  myStarValue: {
    fontWeight: '900',
    fontSize: FONT_SIZE.SMALL,
    marginLeft: dynamicSize(4),
    color: 'white',
  },
  valueText: {
    fontWeight: '600',
    fontSize: FONT_SIZE.SMALL,
    marginLeft: dynamicSize(3),
  },
  absolute: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT / 8,
    right: dynamicSize(25),
    width: SCREEN_WIDTH / 7,
    height: SCREEN_WIDTH / 7,
    borderRadius: dynamicSize(100),
    backgroundColor: COLORS.BABY_PINK,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  starContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  starCount: {
    color: COLORS.LIGHT_BROWN,
  },
  groupContainer: {
    marginTop: dynamicSize(5),
    paddingVertical: dynamicSize(2),
    paddingHorizontal: dynamicSize(10),
    backgroundColor: COLORS.WHITE,
    borderRadius: dynamicSize(10),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starText: {
    width: SCREEN_HEIGHT * 0.023,
    height: SCREEN_HEIGHT * 0.023,
    alignItems: 'center',
    justifyContent: 'center',
    // padding: SCREEN_HEIGHT * 0.0025,
    position: 'absolute',
    backgroundColor: COLORS.TRANSLUCENT_WHITE,
    borderRadius: dynamicSize(100),
  },
  groupCount: {
    fontSize: FONT_SIZE.SMALL,
    paddingTop: dynamicSize(1),
    marginLeft: dynamicSize(3),
  },
  exitModal: {
    zIndex: 1000,
    bottom: 0,
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.4,
    padding: dynamicSize(18),
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
  exitText: {
    fontSize: getFontSize(20),
    textAlign: 'center',
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
  },
  list: {},
  item: {
    width: dynamicSize(320),
    height: dynamicSize(30),
    backgroundColor: '#EDEDED',
    paddingVertical: dynamicSize(5),
    paddingHorizontal: dynamicSize(20),
    borderRadius: dynamicSize(11),
    marginLeft: dynamicSize(10),
    marginTop: dynamicSize(11),
  },
  inputCon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: dynamicSize(320),
    height: dynamicSize(30),
    alignSelf: 'center',
    marginTop: dynamicSize(10),
    backgroundColor: '#EDEDED',
    borderRadius: dynamicSize(11),
    justifyContent: 'space-between',
    paddingLeft: dynamicSize(10),
  },
  input: {
    width: dynamicSize(285),
    height: dynamicSize(40),
    borderTopRightRadius: dynamicSize(11),
    borderBottomRightRadius: dynamicSize(11),
  },
  btn: {
    height: dynamicSize(36),
    width: dynamicSize(320),
    backgroundColor: '#FF0D55',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: dynamicSize(19),
    alignSelf: 'center',
  },
  btnTxt: {
    fontSize: getFontSize(15),
    textAlign: 'center',
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
  },
  textStyle: {
    fontFamily: FONT_FAMILY.SF_PRO_REGULAR,
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.MEDIUM,
    fontWeight: '400',
    marginLeft: SCREEN_HEIGHT * 0.02,
  },
  iconContainer: {},
  rightCon: {
    flexDirection: 'row',
    width: wp(25),
    justifyContent: 'space-around',
    marginRight: SCREEN_HEIGHT * 0.02,
  },
});

export default styles;
