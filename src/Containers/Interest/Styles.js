
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
    header:{
     marginTop:hp('4%'),
     marginLeft:wp('4%'),
     borderColor:'#E8E6EA',
     width:wp('10%'),
     height:hp('6%'),
     justifyContent:'center',
     alignItems:'center',
     borderWidth:1,
     borderRadius:10
    },
    welcome:{
     fontFamily:FONT_FAMILY.POPPINS_SEMIBOLD,
     fontSize:wp('6%'),
     color:'#000000'
    },
    welcomeSubtitle:{
        fontFamily:FONT_FAMILY.POPPINS_BOLD,
        fontSize:wp('3.3%'),
        color:'#000000B2',
        lineHeight:20
    },
    skipView:{
        marginTop:hp('4%'),
        justifyContent:'center',alignItems:'center',
        marginRight:wp('4%')
    },
    interestBtn:{
        width:wp('50%'),
        // flexDirection:'row',
        borderColor:'red',
        borderWidth:1,
    },
    parent: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        // width:wp('0%'),
      
    },
    child :{
        flexBasis: '50%',
        justifyContent:'center',
        alignItems:'center',
        // width:wp('40%')
        

    },
    insidebtn:{
        width:wp('40%'),
        height:hp('6%'),
        justifyContent:'space-evenly',
        alignItems:'center',
        borderWidth:1,
        borderColor:'#E8E6EA',
        marginBottom:hp('3%'),
        borderRadius:15,
        flexDirection:'row'
        
    },
    interesttext:{
        fontFamily:FONT_FAMILY.POPPINS_REGULAR,
    }
  })
