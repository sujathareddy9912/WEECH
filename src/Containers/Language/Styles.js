
import { StyleSheet, Dimensions } from 'react-native'
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONT_FAMILY } from '../../Utils/fontFamily';
export default StyleSheet.create({
    Container: {
     flex:1,
     backgroundColor:'#2C303A'
    },
    image:{ 
          flex:0.5,
        justifyContent:'center',
        alignItems:'center'
    },
    tree:{
        width:wp('90%'),
        height:hp('25%'),
        
    },
    langText:{
    fontFamily:FONT_FAMILY.AVENIER_BOOK,
    },
    person1:{
        width:wp('90%'),
        height:hp('29%'),
        marginBottom:hp('3%')
    },
    heartImg:{
        width:wp('12%'),
        height:hp('15%'),  
        
    }
  })
