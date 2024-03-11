import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../Utils/colors';
import { FONT_FAMILY } from '../Utils/fontFamily';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
  },
  tabNavContainer: {
    flexDirection: 'row',
    width: wp('90%'),
    backgroundColor: COLORS.WHITE,
    alignSelf: 'center',
    borderRadius: wp('8%'),
    position: 'absolute',
    bottom: hp('3%'),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    elevation: 4,
  },
  navIcon: {
    width: wp('6%'),
    resizeMode: 'contain',
  },
  tabBar: {
    backgroundColor: '#1F2129',
    borderTopRightRadius: wp('6%'),
    borderTopLeftRadius: wp('6%'),
    height: hp('10%'),
  },
  tabBarText: {
    fontSize: wp('3%'),
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    marginBottom: '5%',
  },
});
