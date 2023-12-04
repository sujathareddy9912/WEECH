import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';

import {COLORS} from '../../../../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../../../../Utils/fontFamily';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-between',
  },
  leftComponent: {
    width: wp(8),
    height: wp(8),
  },
  header: {
    height: hp(12),
    paddingTop: hp(5),
  },
  msgContainer: {
    flexGrow: 1,
    alignItems: 'flex-end',
    paddingHorizontal: wp(4),
    marginVertical: hp(1),
  },
  msgBox: {
    maxWidth: wp(70),
    backgroundColor: COLORS.VIOLET,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: hp(1.5),
  },
  msgText: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.REGULAR,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    lineHeight: hp(2.5),
  },
  msgTime: {
    color: COLORS.WHITE,
    alignSelf: 'flex-end',
    fontSize: FONT_SIZE.SMALL,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.LOW_GRAY,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    justifyContent: 'space-between',
    backgroundColor: COLORS.WHITE,
  },
  input: {
    backgroundColor: COLORS.RED_COLOR,
    width: wp(80),
    borderRadius: 10,
    // height:hp(5),
    paddingHorizontal: wp(2),
    color: COLORS.WHITE,
  },
  sendContainer: {
    width: hp(5),
    height: hp(5),
    borderRadius: hp(2.5),
    backgroundColor: COLORS.VIOLET,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
