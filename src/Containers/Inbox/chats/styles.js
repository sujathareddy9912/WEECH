import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {COLORS} from '../../../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../../../Utils/fontFamily';

export const styles = StyleSheet.create({
  chat: {
    paddingVertical: wp(3),
    flexDirection: 'row',
    paddingHorizontal: wp(3),
    justifyContent: 'space-between',
  },
  label: {
    width: wp(100),
    height: hp(9),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    backgroundColor: COLORS.MALEbLUE,
  },
  labelTxt: {
    marginLeft: wp(2),
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
    fontSize: FONT_SIZE.MEDIUM,
  },
  img: {
    width: 40,
    height: 40,
  },
  avatar: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
  },
  heading: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
  },
  info: {
    width: wp(55),
    marginLeft: wp(2),
  },
  lastMsg: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: COLORS.TEXT_GRAY,
  },
  imgInfo: {
    flexDirection: 'row',
  },
  time: {
    width: wp(20),
    fontSize: 13,
    color: COLORS.TEXT_GRAY,
  },
  flatList: {
    backgroundColor: COLORS.WHITE,
  },
  chatListCon: {
    paddingBottom: hp(10),
  },
  clearChat: {
    width: wp(35),
    height: hp(5),
    bottom: hp(11),
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: wp(10),
    justifyContent: 'center',
    backgroundColor: '#D9D9D9',
  },
  chatTxt: {
    color: COLORS.BLACK,
    fontSize: FONT_SIZE.MEDIUM,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
  },
});
