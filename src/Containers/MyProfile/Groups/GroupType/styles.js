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
  typeCon: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: dynamicSize(63),
    justifyContent: 'space-around',
  },
  iconCon: {
    alignItems: 'center',
    borderRadius: wp(100),
    width: dynamicSize(104),
    height: dynamicSize(104),
    justifyContent: 'center',
    backgroundColor: '#F6F7F9',
  },
  typeTitle: {
    color: '#979797',
    textAlign: 'center',
    fontSize: getFontSize(12),
    marginTop: dynamicSize(13),
    marginBottom: dynamicSize(52),
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
});
