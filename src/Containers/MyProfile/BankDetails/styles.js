import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
  import { StyleSheet } from 'react-native';
  
  import { COLORS } from '../../../Utils/colors';
  import { FONT_FAMILY } from '../../../Utils/fontFamily';
  
  export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.WHITE,
      justifyContent: 'space-between',
      paddingBottom: wp(10),
      alignItems: 'center',
    },
    header: {
      backgroundColor: COLORS.BABY_PINK,
      marginBottom:hp(3),
      height:hp(12)
    },
    backContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      color: COLORS.WHITE,
      fontWeight: '700'
    },
    innerContainer: {
      alignItems:'center',
      paddingHorizontal:wp(5),
    },
    buttonStyle:{
      borderRadius:10,
      backgroundColor:COLORS.DENIM_BLUE
    },
    desc:{
        color:COLORS.LIGHT_GREY,
        lineHeight:hp(2.5),
    }
  });
  