import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';

import {COLORS} from '../../../../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../../../../Utils/fontFamily';
import {dynamicSize, getFontSize} from '../../../../Utils/responsive';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    backgroundColor: COLORS.TRANSPARENT,
    paddingTop: hp(5),
    height: hp(12),
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: COLORS.BLACK,
    fontWeight: '700',
  },
  next: {
    alignSelf: 'flex-end',
  },
  profileCon: {
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: wp(100),
    width: dynamicSize(187),
    justifyContent: 'center',
    height: dynamicSize(187),
    marginTop: dynamicSize(66),
    backgroundColor: '#F6F7F9',
  },
  avatar: {
    borderRadius: wp(100),
    width: dynamicSize(187),
    height: dynamicSize(187),
  },
  input: {
    alignSelf: 'center',
    width: dynamicSize(336),
    height: dynamicSize(39),
    marginTop: dynamicSize(19),
  },
  form: {
    marginTop: dynamicSize(31),
  },
  galleryIcon: {
    position: 'absolute',
  },
});
