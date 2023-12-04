import React,{useState} from "react";
import {Text,View,TouchableOpacity, TextInput,Image, ScrollView} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Styles from "./Styles";
const EditProfile=({navigation})=>{
    const [checked, setChecked] = useState('Male');
    return(
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <ScrollView>
            <TouchableOpacity onPress={()=>{navigation.goBack()}} style={{margin:'4%',marginLeft:wp('6%'),marginTop:hp('10%'),}}>
                <Text style={Styles.welcome}>Edit Profile</Text>
                <Text style={Styles.welcomeSubtitle}>Improve the profile win more attention</Text>
            </TouchableOpacity>
                <View style={Styles.textInput}>
                <View style={{marginLeft:wp('4%')}}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={['#6C56F1', '#F329F8']} style={{width:wp('18%'),height:hp('10%'),borderRadius:100,justifyContent:'center',alignItems:'center'}}>
                <Entypo name="camera" size={30} color={"white"} />
                    </LinearGradient>
                </View>

             <View style={{width:wp('90%'),height:hp('8%'),backgroundColor:'#E8E6F6',paddingLeft:20,borderRadius:100,flexDirection:'row',marginTop:hp('3%')}}>
                   <View style={{justifyContent:'center',alignItems:'center',paddingRight:'2%'}}>
                    <Text style={{color:'red'}}>*</Text>
                    </View>
                 <TextInput allowFontScaling={false} placeholder={"Nickname"} placeholderTextColor={"#000000"} style={{fontSize:wp('4%')}} />
             </View>
             <View style={{width:wp('90%'),height:hp('8%'),backgroundColor:'#E8E6F6',paddingLeft:20,borderRadius:100,flexDirection:'row',marginTop:hp('3%')}}>
                   <View style={{justifyContent:'center',alignItems:'center',paddingRight:'2%'}}>
                    <Text style={{color:'red'}}>*</Text>
                    </View>
                 <TextInput allowFontScaling={false} placeholder={"Birthday"} placeholderTextColor={"#000000"} style={{fontSize:wp('4%')}} />
             </View>
             <View style={{width:wp('90%'),height:hp('8%'),backgroundColor:'#E8E6F6',paddingLeft:20,borderRadius:100,flexDirection:'row',marginTop:hp('3%')}}>
                   <View style={{justifyContent:'center',alignItems:'center',paddingRight:'2%'}}>
                    <Text style={{color:'red'}}>*</Text>
                    </View>
                    <View style={{flexDirection:'column'}}>
                 <TextInput allowFontScaling={false} placeholder={"Album"} editable={false} placeholderTextColor={"#000000"} style={{fontSize:wp('4%')}} />
                 <View style={{justifyContent:'center',alignItems:'center',marginTop:hp('-1%')}}>
                    <Text style={{color:'#000000',fontSize:wp('3%')}}>Upload your best selfies to attract more users</Text>
                    </View>
                    </View>
                    
             </View>
                    
                </View>
                <View style={{marginLeft:wp('10%'),marginTop:hp('4%'),height:hp('17%')}}>
                <View style={{width:wp('20%'),height:hp('10%'),borderColor:'#F329F8', borderStyle: 'dashed',borderRadius:1,borderWidth:1,justifyContent:'center',alignItems:'center'}}>
                        <AntDesign name="plus" size={30} color={"#F329F8"}   />
                    </View>
                </View>
                <TouchableOpacity onPress={()=>{navigation.navigate('InterestScreen')}} style={{marginTop:hp('4%'),justifyContent:'center',alignItems:'center',marginBottom:hp('2%')}}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={['#6C56F1', '#F329F8']} style={{width:wp('79%'),height:hp('7%'),borderRadius:100,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#fff',fontSize:wp('4.3%'),fontFamily:'AvenirLTStd-Black'}}>Next</Text>

                    </LinearGradient>
                </TouchableOpacity>

             </ScrollView>
        </View>
    )
}
export default EditProfile;