import { StyleSheet, Dimensions } from 'react-native'
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#181A20'
    },
    navIcon:{
        width:wp('6%'),
        resizeMode: 'contain'
    },
    tabBar: {
        backgroundColor:'#1F2129',
        borderTopRightRadius:wp('6%'),
        borderTopLeftRadius:wp('6%'),
        height:hp('10%')
    },
    tabBarText: {
        fontSize:wp('3%'),
        fontFamily:'Inter-Medium',
        marginBottom:'5%'
    }
})
