import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import Styles from './Styles';
import {RadioButton} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {HelperService} from '../../Services/Utils/HelperService';
import {prop} from 'ramda';

const WelcomeScreen = props => {
  const [checked, setChecked] = useState('Male');
  const [avatar, setavatar] = useState('');
  const [name, setname] = useState('');
  const [homeCountry, sethomeCountry] = useState('');
  const [homeTown, sethomeTown] = useState('');
  const [DOB, setDOB] = useState('');
  const [Nickname, setNickname] = useState('');
  useEffect(async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);

        if (
          granted['android.permission.READ_EXTERNAL_STORAGE'] &&
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
        ) {
        } else {
        }
      } catch (err) {}
    }
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera.',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission = true
        } else {
          // Permission = false
        }
      } catch (err) {
        // Permission = false
      }
    }
  }, []);
  async function chooseFile() {
    var options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
        alert(response.customButton);
      } else {
        const source = {uri: 'data:image/jpeg;base64,' + response.data};
        setavatar(source);
      }
    });
  }
  const SubmitData = () => {
    if (name == '') {
      HelperService.showToast('Enter a name');
    } else if (homeTown == '') {
      HelperService.showToast('Enter a home town');
    } else if (homeCountry == '') {
      HelperService.showToast('Enter a home country');
    } else if (DOB == '') {
      HelperService.showToast('Enter a DOB');
    } else if (Nickname == '') {
      HelperService.showToast('Enter a nickname');
    } else if (avatar == '') {
      HelperService.showToast('Upload a avatar');
    } else {
      let obj = {
        name: name,
        country: homeCountry,
        homeTown: homeTown,
        dateOfBirth: DOB,
        nick_name: Nickname,
        file: avatar.uri,
      };
      props.navigation.navigate('InterestScreen', {data: obj});
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{margin: '4%', marginLeft: wp('6%'), marginTop: hp('10%')}}>
          <Text style={Styles.welcome}>Welcome User</Text>
          <Text style={Styles.welcomeSubtitle}>
            Improve the profile win more attention
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={chooseFile}
          style={{marginTop: hp('1%'), marginLeft: wp('4%')}}>
          {!avatar ? (
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              colors={['#6C56F1', '#F329F8']}
              style={{
                width: wp('18%'),
                height: hp('10%'),
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Entypo name="camera" size={30} color={'white'} />
            </LinearGradient>
          ) : (
            <Image
              source={avatar}
              style={{
                width: wp('18%'),
                height: hp('10%'),
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          )}
        </TouchableOpacity>
        <View style={Styles.radioBtn}>
          <RadioButton
            value="first"
            uncheckedColor={'#9F9F9F'}
            color={'#000000'}
            status={checked === 'Male' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('Male')}
          />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text>Male</Text>
          </View>
          <RadioButton
            value="second"
            uncheckedColor={'#9F9F9F'}
            color={'#000000'}
            status={checked === 'Female' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('Female')}
          />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text>Female</Text>
          </View>
        </View>
        <View style={Styles.textInput}>
          <View>
            <Text style={Styles.label}>Name *</Text>
            <View style={Styles.inputbox}>
              <TextInput
                allowFontScaling={false}
                value={name}
                onChangeText={text => {
                  setname(text);
                }}
                style={{width: wp('60%'), fontFamily: 'AvenirLTStd-Book'}}
                placeholder={'Enter a name'}
                placeholderTextColor={'#5B5B5B'}
              />
            </View>
          </View>
          <View style={{marginTop: hp('3%')}}>
            <Text style={Styles.label}>Home Country *</Text>
            <View style={Styles.inputbox}>
              <TextInput
                allowFontScaling={false}
                value={homeCountry}
                onChangeText={text => {
                  sethomeCountry(text);
                }}
                style={{width: wp('60%'), fontFamily: 'AvenirLTStd-Book'}}
                placeholder={'Enter a country'}
                placeholderTextColor={'#5B5B5B'}
              />
            </View>
          </View>
          <View style={{marginTop: hp('3%')}}>
            <Text style={Styles.label}>Home Town *</Text>
            <View style={Styles.inputbox}>
              <TextInput
                allowFontScaling={false}
                value={homeTown}
                onChangeText={text => {
                  sethomeTown(text);
                }}
                style={{width: wp('60%'), fontFamily: 'AvenirLTStd-Book'}}
                placeholder={'Enter a home town'}
                placeholderTextColor={'#5B5B5B'}
              />
            </View>
          </View>
          <View style={{marginTop: hp('3%')}}>
            <Text style={Styles.label}>DOB * </Text>
            <View style={Styles.inputbox}>
              <TextInput
                allowFontScaling={false}
                value={DOB}
                onChangeText={text => {
                  setDOB(text);
                }}
                style={{width: wp('60%'), fontFamily: 'AvenirLTStd-Book'}}
                placeholder={'Enter a DOB'}
                placeholderTextColor={'#5B5B5B'}
              />
            </View>
          </View>
          <View style={{marginTop: hp('3%')}}>
            <Text style={Styles.label}>Nickname *</Text>
            <View style={Styles.inputbox}>
              <TextInput
                allowFontScaling={false}
                value={Nickname}
                onChangeText={text => {
                  setNickname(text);
                }}
                style={{width: wp('60%'), fontFamily: 'AvenirLTStd-Book'}}
                placeholder={'Enter a nickname'}
                placeholderTextColor={'#5B5B5B'}
              />
            </View>
          </View>
          <View
            style={{
              width: wp('90%'),
              height: hp('8%'),
              backgroundColor: '#E8E6F6',
              paddingLeft: 20,
              borderRadius: 100,
              flexDirection: 'row',
              marginTop: hp('3%'),
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: '2%',
              }}>
              <Text style={{color: 'red'}}>*</Text>
            </View>
            <View style={{flexDirection: 'column'}}>
              <TextInput
                allowFontScaling={false}
                placeholder={'Album'}
                editable={false}
                placeholderTextColor={'#000000'}
                style={{fontSize: wp('4%')}}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: hp('-1%'),
                }}>
                <Text style={{color: '#000000', fontSize: wp('3%')}}>
                  Upload your best selfies to attract more users
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              marginLeft: wp('5%'),
              marginTop: hp('4%'),
              height: hp('17%'),
            }}>
            <View
              style={{
                width: wp('20%'),
                height: hp('10%'),
                borderColor: '#F329F8',
                borderStyle: 'dashed',
                borderRadius: 1,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AntDesign name="plus" size={30} color={'#F329F8'} />
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            SubmitData();
          }}
          style={{
            marginTop: hp('4%'),
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: hp('2%'),
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={['#6C56F1', '#F329F8']}
            style={{
              width: wp('79%'),
              height: hp('7%'),
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: wp('4.3%'),
                fontFamily: 'AvenirLTStd-Black',
              }}>
              Next
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default WelcomeScreen;
