import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';

import {COLORS} from '../../../Utils/colors';
import {FONT_FAMILY} from '../../../Utils/fontFamily';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-between',
    paddingBottom: wp(10),
  },
  header: {
    backgroundColor: 'transparent',
  },
  leftComponent: {
    width: wp(8),
    height: wp(8),
  },
  item: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingVertical:hp(1.5)
  },
  itemText: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  list: {
    marginTop: wp(10),
    paddingHorizontal:wp(3),
  },
  backContainer:{
    flexDirection:'row',
    alignItems:'center',
  },
  title:{
    color: COLORS.BLACK,
    fontWeight:'700'
  },
  clear:{
    fontSize: 13,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    color:COLORS.DARK_RED,
    fontWeight:'700',
    // marginTop: wp(2),
  },
  update:{
    fontSize: 16,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    color:COLORS.LIGHT_VIOLET,
  },
  logoutNo:{
    fontFamily:FONT_FAMILY.POPPINS_SEMIBOLD,
    color:COLORS.BABY_PINK,
    fontSize:16
  },
  logoutContainer:{
    backgroundColor: COLORS.WHITE,
    padding: hp(2),
    paddingHorizontal:hp(3),
    borderRadius: 8,
    shadowOffset: {
      height: 1,
      width: 2
    },
    elevation: 5,
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.5
  },
  NoContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop:hp(1)
  }
});
