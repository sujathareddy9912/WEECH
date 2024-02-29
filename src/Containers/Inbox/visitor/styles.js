import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {COLORS} from '../../../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../../../Utils/fontFamily';

export const styles = StyleSheet.create({
  chat: {
    paddingVertical: wp(4),
    flexDirection: 'row',
    paddingHorizontal: wp(3),
    justifyContent: 'space-between',
  },
  avatar: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(100),
  },
  heading: {
    fontSize: 15,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
  },
  info: {
    flexDirection: 'row',
    width: wp(55),
    marginLeft: wp(2),
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  lastMsg: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    color: COLORS.BLACK,
  },
  imgInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 13,
    width: wp(22),
    color: COLORS.TEXT_GRAY,
  },
  flatList: {
    backgroundColor: COLORS.WHITE,
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
