import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {COLORS} from '../../../Utils/colors';
import {FONT_FAMILY} from '../../../Utils/fontFamily';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    height: hp(12),
    paddingTop: hp(5),
  },
  iconCon: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  heading: {
    marginVertical: hp(5),
    textAlign: 'center',
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
    fontSize: 18,
  },
  appName: {
    fontSize: 14,
    marginTop: wp(2),
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    textAlign: 'center',
  },
  btn: {
    width: wp(20),
    marginHorizontal: 20,
    alignItems: 'center',
    marginVertical: hp(2),
  },
});
