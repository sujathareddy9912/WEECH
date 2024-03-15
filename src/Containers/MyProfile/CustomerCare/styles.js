import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';

import {COLORS} from '../../../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../../../Utils/fontFamily';
import {dynamicSize, getFontSize} from '../../../Utils/responsive';
import {SCREEN_WIDTH} from '../../../Utils/helper';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: COLORS.BABY_PINK,
    paddingTop: hp(5),
    height: hp(12),
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(50),
  },
  title: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: FONT_SIZE.LARGE,
    marginLeft: wp(1),
  },
  buttonStyle: {
    position: 'absolute',
    bottom: hp(5),
    backgroundColor: COLORS.BABY_PINK,
    alignSelf: 'center',
    height: hp(7),
  },
  footer: {
    width: wp(100),
    borderTopWidth: 1,
    borderColor: '#E8EAF3',
    // height: dynamicSize(105),
    backgroundColor: '#F0F1F5',
    // position: 'absolute',
  },
  inputCon: {
    flexDirection: 'row',
    alignItems: 'center',
    height: dynamicSize(48),
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-between',
    paddingHorizontal: dynamicSize(20),
  },
  mediaCon: {
    flexDirection: 'row',
    alignItems: 'center',
    height: dynamicSize(57),
    justifyContent: 'space-around',
  },
  input: {
    width: wp(60),
    marginLeft: dynamicSize(10),
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: getFontSize(15),
  },
  sendBtn: {
    width: dynamicSize(65),
    height: dynamicSize(32),
    backgroundColor: '#7287EA12',
    borderRadius: dynamicSize(200),
    justifyContent: 'center',
    alignItems: 'center',
  },
  send: {
    color: '#7287EA',
    fontSize: dynamicSize(16),
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  emojiCon: {
    height: dynamicSize(240),
  },
  overlay: {
    width: SCREEN_WIDTH,
    backgroundColor: COLORS.TRANSPARENT,
  },
  itemContainer: {
    alignItems: 'flex-start',
    padding: dynamicSize(15),
  },
  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  senderPic: {
    width: dynamicSize(20),
    height: dynamicSize(20),
    borderRadius: wp(100),
  },
  crownContainer: {
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(1),
    paddingHorizontal: wp(2),
    justifyContent: 'space-between',
    backgroundColor: COLORS.BABY_PINK,
  },
  senderName: {
    width: wp(30),
    fontSize: dynamicSize(12),
    marginLeft: dynamicSize(5),
    color: COLORS.LIGHT_BABY_PINK,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
  },
  msgPic: {
    width: dynamicSize(234),
    height: dynamicSize(142),
    borderTopLeftRadius: dynamicSize(12),
    borderTopRightRadius: dynamicSize(12),
    borderBottomLeftRadius: dynamicSize(12),
    borderBottomRightRadius: dynamicSize(12),
  },
  itemInfo: {
    marginTop: dynamicSize(5),
  },
  msgCon: {
    backgroundColor: COLORS.WHITE,
    paddingVertical: dynamicSize(6),
    paddingHorizontal: dynamicSize(18),
    borderTopLeftRadius: dynamicSize(12),
    borderTopRightRadius: dynamicSize(12),
    borderBottomLeftRadius: dynamicSize(12),
    borderBottomRightRadius: dynamicSize(12),
  },
  time: {
    color: '#777777',
    textAlign: 'right',
    marginTop: dynamicSize(5),
    fontSize: getFontSize(11),
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  imgTime: {
    color: '#C4C4C4',
    textAlign: 'right',
    position: 'absolute',
    right: dynamicSize(5),
    bottom: dynamicSize(5),
    fontSize: getFontSize(11),
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  msg: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: getFontSize(13),
  },
});
