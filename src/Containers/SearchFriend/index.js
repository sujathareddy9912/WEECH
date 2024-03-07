import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Styles from './Styles';
import { FONT_FAMILY } from '../../Utils/fontFamily';

const SearchFriend = props => {
  const [Interest, setInterest] = useState([
    {id: 0, name: 'Photography', isSelected: false, icon: 'camera'},
    {id: 1, name: 'Shopping', isSelected: false, icon: 'shopping-bag'},
    {id: 2, name: 'Karaoke', isSelected: false, icon: 'mic'},
    {id: 3, name: 'Yoga', isSelected: false, icon: 'yoga'},
    {id: 4, name: 'Cooking', isSelected: false, icon: 'noodles'},
    {id: 5, name: 'Tennis', isSelected: false, icon: 'tennisball-outline'},
  ]);

  const languageRender = id => {
    setInterest(
      Interest.map(el =>
        el.id === id && el.isSelected == false
          ? {...el, isSelected: true}
          : el.id === id && el.isSelected == true
          ? {...el, isSelected: false}
          : el,
      ),
    );
  };
  return (
    <View style={Styles.Container}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <View style={Styles.skipView}>
          <Text style={Styles.skiptext}>Skip</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          height: hp('50%'),
        }}>
        <View style={{left: wp('11.5%'), top: hp('7%'), position: 'absolute'}}>
          <Image
            source={require('../../Assets/Images/ellipse1.png')}
            style={{width: wp('40%'), height: hp('30%'), resizeMode: 'contain'}}
          />
          <Image
            source={require('../../Assets/Images/Ellipse2.png')}
            style={{
              width: wp('45%'),
              height: hp('10%'),
              resizeMode: 'contain',
              position: 'absolute',
              top: hp('25.5%'),
            }}
          />
        </View>
        <View style={{right: wp('11.5%'), position: 'absolute'}}>
          <Image
            source={require('../../Assets/Images/Ellipse3.png')}
            style={{width: wp('40%'), height: hp('30%'), resizeMode: 'contain'}}
          />
          <Image
            source={require('../../Assets/Images/Ellipse4.png')}
            style={{
              width: wp('45%'),
              height: hp('10%'),
              resizeMode: 'contain',
              position: 'absolute',
              top: hp('25.5%'),
              right: wp('1%'),
            }}
          />
        </View>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={Styles.welcome}>Search friend’s</Text>
        <View
          style={{width: wp('70%'), marginTop: hp('3%'), height: hp('18%')}}>
          <Text style={Styles.welcomeSubtitle}>
            You can find friends from your contact lists to connected
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('DiscoverScreen');
        }}
        style={{
          marginTop: hp('4%'),
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: hp('2%'),
        }}>
        <LinearGradient
          start={{x: 0, y: 0.3}}
          end={{x: 1.4, y: 0}}
          colors={['#6C56F1', '#F329F8']}
          style={{
            width: wp('79%'),
            height: hp('8%'),
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: wp('4.3%'),
              fontFamily: FONT_FAMILY.AVENIER_BLACK,
            }}>
            Access to a contact list
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
export default SearchFriend;
