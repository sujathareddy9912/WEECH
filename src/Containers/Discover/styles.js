import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {COLORS} from '../../Utils/colors';
import {dynamicSize, getFontSize} from '../../Utils/responsive';
import {FONT_FAMILY, FONT_SIZE} from '../../Utils/fontFamily';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Utils/helper';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: '10%',
  },
  left: {
    width: wp('20%'),
    alignItems: 'center',
    alignSelf: 'center',
  },
  headerTitle: {
    fontSize: wp('5.2%'),
    fontFamily: FONT_FAMILY.GILROY_BOLD,
    color: 'white',
  },
  right: {
    width: wp('18%'),
    alignItems: 'center',
    alignSelf: 'center',
  },
  swiperContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },
  showLiveContainer: {
    backgroundColor: COLORS.OFFWHITE,
    position: 'absolute',
    top: '10%',
    left: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: wp(2),
  },
  container: {
    height: SCREEN_HEIGHT,
    paddingBottom: dynamicSize(170),
    backgroundColor: COLORS.WHITE,
  },
  header: {
    zIndex: 10,
    height: '9%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: COLORS.BABY_PINK,
  },
  alignCenter: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
  },
  coverImageContainer: {
    height: '100%',
    width: SCREEN_WIDTH,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: dynamicSize(25),
    borderBottomRightRadius: dynamicSize(25),
    overflow: 'hidden',
    elevation: 0.3,
  },
  smallVideoCard: {
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.BLACK_OFFSET_THREE,
    borderWidth: 2,
    borderColor: COLORS.WHITE,
    // position: 'absolute',
    // right: dynamicSize(15),
    alignItems: 'center',
    justifyContent: 'center',
    // top: '13%',
    borderRadius: dynamicSize(10),
    overflow: 'hidden',
    zIndex: 0,
  },
  smallVideoCardContainer: {
    height: '23%',
    width: '38%',
    // backgroundColor: COLORS.TRANSPARENT,
    position: 'absolute',
    right: dynamicSize(15),
    alignItems: 'center',
    // justifyContent: 'center',
    top: '10%',
  },
  liveText: {
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.LARGE,
    color: COLORS.BACKGROUND_COLOR_BLUE,
    marginLeft: wp(1),
  },
  bottomContainer: {
    width: '100%',
    alignSelf: 'baseline',
    position: 'absolute',
    bottom: '14%',
    zIndex: 2,
    paddingHorizontal: dynamicSize(10),
    backgroundColor: COLORS.BLACK_OFFSET,
  },
  name: {
    fontFamily: FONT_FAMILY.GILROY_BOLD,
    fontSize: FONT_SIZE.LARGE,
    color: 'white',
    alignSelf: 'baseline',
  },
  durationContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: SCREEN_HEIGHT * 0.008,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallText: {
    fontFamily: FONT_FAMILY.GILROY_BOLD,
    fontSize: FONT_SIZE.REGULAR_MEDIUM,
    color: COLORS.WHITE,
    marginLeft: 5,
  },
  bottomCall: {
    marginVertical: SCREEN_HEIGHT * 0.005,
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
    justifyContent: 'space-around',
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
    width: dynamicSize(328),
    backgroundColor: '#FF0D55',
    justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: dynamicSize(19),
    alignSelf: 'center',
  },
  btnTxt: {
    fontSize: getFontSize(15),
    textAlign: 'center',
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
  },
  remoteView: {
    height: '100%',
    width: '100%',
    zIndex: 10,
  },
});

export default styles;
