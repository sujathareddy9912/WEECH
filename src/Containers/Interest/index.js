import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
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
import {prop} from 'ramda';
import {connect} from 'react-redux';
import CommonActions from '../../Store/Common/Actions';
import {HelperService} from '../../Services/Utils/HelperService';
import { FONT_FAMILY } from '../../Utils/fontFamily';

const InterestScreen = props => {
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
  const submit = () => {
    let array = [];
    Interest.map(item => {
      if (item.isSelected == true) {
        array.push({id: item.name});
      }
    });

    let data = props.route.params.data;
    data.interests = array;
    if (array.length > 0) {
      props.updateProfile({body: data});
      props.navigation.navigate('SearchFriend');
    } else {
      HelperService.showToast('Select atleast one interest');
    }
  };
  return (
    <View style={Styles.Container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={Styles.header}>
          <AntDesign name="left" size={20} color="#F51DDB" />
        </TouchableOpacity>
        <View style={Styles.skipView}>
          <Text style={Styles.skiptext}>Skip</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{margin: '4%', marginLeft: wp('6%'), marginTop: hp('4%')}}>
        <Text style={Styles.welcome}>Your interests</Text>
        <Text style={Styles.welcomeSubtitle}>
          Select a few of your interests and let everyone know what you’re
          passionate about.
        </Text>
      </TouchableOpacity>

      <View style={Styles.parent}>
        {Interest &&
          Interest.map((item, index) => {
            return (
              <View style={Styles.child} key={index}>
                <TouchableOpacity
                  style={[
                    Styles.insidebtn,
                    {
                      backgroundColor: item.isSelected ? '#2BB1FD' : '#fff',
                      elevation: item.isSelected ? 20 : 0,
                    },
                  ]}
                  onPress={() => {
                    languageRender(item.id);
                  }}>
                  {item.name == 'Photography' ? (
                    <AntDesign
                      name={item.icon}
                      size={25}
                      color={item.isSelected ? '#fff' : 'red'}
                    />
                  ) : null}
                  {item.name == 'Shopping' ? (
                    <FontAwesome5
                      name={item.icon}
                      size={25}
                      color={item.isSelected ? '#fff' : 'red'}
                    />
                  ) : null}
                  {item.name == 'Karaoke' ? (
                    <Feather
                      name={item.icon}
                      size={25}
                      color={item.isSelected ? '#fff' : 'red'}
                    />
                  ) : null}
                  {item.name == 'Yoga' ? (
                    <MaterialCommunityIcons
                      name={item.icon}
                      size={25}
                      color={item.isSelected ? '#fff' : 'red'}
                    />
                  ) : null}
                  {item.name == 'Cooking' ? (
                    <MaterialCommunityIcons
                      name={item.icon}
                      size={25}
                      color={item.isSelected ? '#fff' : 'red'}
                    />
                  ) : null}
                  {item.name == 'Tennis' ? (
                    <Ionicons
                      name={item.icon}
                      size={25}
                      color={item.isSelected ? '#fff' : 'red'}
                    />
                  ) : null}
                  <Text
                    style={[
                      Styles.interesttext,
                      {color: item.isSelected ? '#fff' : '#000000'},
                    ]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
      </View>
      <TouchableOpacity
        onPress={() => {
          submit();
        }}
        style={{
          marginTop: hp('4%'),
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: hp('2%'),
        }}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1.2, y: 0}}
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
            Continue
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
// updateUserProfile
const mapStateToProps = state => ({
  updateUserProfileLoading: state.common.updateUserProfileLoading,
  updateUserProfileSuccess: state.common.updateUserProfileSuccess,
});

const mapDispatchToProps = dispatch => ({
  updateProfile: params => {
    dispatch(CommonActions.updateUserProfile(params));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(InterestScreen);
// export default ;
