
import { StyleSheet, Dimensions } from 'react-native'
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default StyleSheet.create({
    Container: {
     flex:1,
     backgroundColor:'#2C303A'
    },
    image:{
        width:wp('100%'),
        height:hp('100%'),
        justifyContent:'center',
        alignItems:'center'
    },
    logo:{
        width: wp('80%'),
        height: hp('40%'),
        
    }
  })
