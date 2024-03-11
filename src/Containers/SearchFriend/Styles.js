
import { StyleSheet, Dimensions } from 'react-native'
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONT_FAMILY } from '../../Utils/fontFamily';
export default StyleSheet.create({
    Container: {
     flex:1,
     backgroundColor:'#fff'
    },
    image:{
         flex:0.3,
        justifyContent:'center',
        alignItems:'center'
    },
    skiptext:{
     color:'#F61EDC',
     fontFamily:FONT_FAMILY.POPPINS_SEMIBOLD,
     fontSize:wp('4%')
    },
   
    skipView:{
        marginTop:hp('4%'),
        justifyContent:'center',alignItems:'center',
        marginRight:wp('4%')
    },
    welcome:{
        fontFamily:FONT_FAMILY.POPPINS_SEMIBOLD,
        fontSize:wp('5.5%')
       },
       welcomeSubtitle:{
           fontFamily:FONT_FAMILY.POPPINS_REGULAR,
           fontSize:wp('3.3%'),
           color:'#9E9E9E',
           textAlign:'center',
           lineHeight:20,
           letterSpacing:0.5
       },
   
  })
