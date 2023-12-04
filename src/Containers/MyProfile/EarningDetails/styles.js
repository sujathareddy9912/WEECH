import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
  import { StyleSheet } from 'react-native';
  
  import { COLORS } from '../../../Utils/colors';
  import { FONT_FAMILY, FONT_SIZE } from '../../../Utils/fontFamily';
  
  export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.WHITE,
    },
    title: {
      color: COLORS.BLACK
    },
    header: {
      backgroundColor: COLORS.OFFWHITE,
      paddingTop: hp(5),
      height: hp(12),
    },
    itemText: {
      fontSize: 16,
      fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    },
    backContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemContainer:{
      paddingVertical:hp(2),
      paddingHorizontal:wp(3)
    },
    seperator:{
      borderBottomWidth:0.5,
      borderColor:COLORS.TEXT_GRAY
    },
    itemTitle:{
      fontFamily:FONT_FAMILY.POPPINS_MEDIUM,
      color:COLORS.NAVY_BLUE,
      fontSize:FONT_SIZE.LARGE
    },
    dimondContainer:{
      flexDirection:'row',
      alignItems:'center'
    },
    filterContainer:{
      backgroundColor: COLORS.OFFWHITE,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      paddingHorizontal:wp(5),
      paddingVertical:hp(1)
    },
    date:{
      color:COLORS.TEXT_GRAY,
      fontFamily:FONT_FAMILY.POPPINS_REGULAR
    },
    time:{
      fontFamily:FONT_FAMILY.POPPINS_REGULAR,
      color:COLORS.NAVY_BLUE,
      fontSize:FONT_SIZE.SMALL,
      textAlign:'right'
    },
    row:{
      flexDirection:'row',
      alignItems:'center'
    }
  });
  