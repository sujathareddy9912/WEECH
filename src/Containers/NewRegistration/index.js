import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import SelectImageDialog from '../../Component/SelectImageDialog';
import {HelperService} from '../../Services/Utils/HelperService';
import CommonActions from '../../Store/Common/Actions';
import {RadioButton, RadioGroup} from 'react-native-flexi-radio-button';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment'; // 292.3K (gzipped: 71.6K)
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {IMAGE_URL} from '../../Services/Api/Common';
import { FONT_FAMILY } from '../../Utils/fontFamily';

const NewRegistration = props => {
  const [name, setName] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [birthDate, setBirthDate] = React.useState('DOB');
  const [about, setAbout] = React.useState('');
  const [selectedPhoto1, setSelectedPhoto1] = React.useState('');
  const [selectedPhoto2, setSelectedPhoto2] = React.useState('');
  const [selectedPhoto3, setSelectedPhoto3] = React.useState('');
  const [selectedPhoto4, setSelectedPhoto4] = React.useState('');
  const [selectImagePos, setSelectedImagePos] = React.useState('');
  const refImageDialog = React.useRef();
  const [radioItem, setRadioSelectedItem] = React.useState();
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  var partPhoto;

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setBirthDate(moment(date).format('DD/MM/YYYY'));
    hideDatePicker();
  };

  const takePhotoFromCamera = item => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      compressImageQuality: 0.7,
      includeBase64: true,
      resizeMode: 1000,
    }).then(image1 => {
      var ext = image1.path.substr(image1.path.lastIndexOf('.') + 1);
      partPhoto = {
        name: image1.modificationDate + '.' + ext,
        type: image1.mime,
        uri:
          Platform.OS === 'android'
            ? image1.path
            : image1.path.replace('file://', ''),
      };

      if (item == '1') {
        setSelectedPhoto1('data:image/png;base64,' + image1.data);
      } else if (item == '2') {
        setSelectedPhoto2('data:image/png;base64,' + image1.data);
      } else if (item == '3') {
        setSelectedPhoto3('data:image/png;base64,' + image1.data);
      } else if (item == '4') {
        setSelectedPhoto4('data:image/png;base64,' + image1.data);
      } else {
        setSelectedPhoto1('');
        setSelectedPhoto2('');
        setSelectedPhoto3('');
        setSelectedPhoto4('');
      }
    });
  };

  const choosePhotoFromLibrary = item => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      width: 300,
      height: 300,
      compressImageQuality: 0.7,
      includeBase64: true,
    }).then(image1 => {
      var ext = image1.path.substr(image1.path.lastIndexOf('.') + 1);
      partPhoto = {
        name: image1.modificationDate + '.' + ext,
        type: image1.mime,
        uri:
          Platform.OS === 'android'
            ? image1.path
            : image1.path.replace('file://', ''),
      };

      if (item == '1') {
        setSelectedPhoto1('data:image/png;base64,' + image1.data);
      } else if (item == '2') {
        setSelectedPhoto2('data:image/png;base64,' + image1.data);
      } else if (item == '3') {
        setSelectedPhoto3('data:image/png;base64,' + image1.data);
      } else if (item == '4') {
        setSelectedPhoto4('data:image/png;base64,' + image1.data);
      } else {
        setSelectedPhoto1('');
        setSelectedPhoto2('');
        setSelectedPhoto3('');
        setSelectedPhoto4('');
      }
    });
  };
  const upateProfile = async () => {
    if (name == '') {
      HelperService.showToast('Enter name');
    } else if (gender == '') {
      HelperService.showToast('Enter Gender');
    } else if (country == '') {
      HelperService.showToast('Enter Country');
    } else if (birthDate == 'DOB') {
      HelperService.showToast('Enter BirthDate');
    } else if (about == '') {
      HelperService.showToast('Enter About');
    }
    //   else if(selectedPhoto2==''){
    //     HelperService.showToast('Select Gallary one');

    //   }
    //   else if(selectedPhoto3==''){ HelperService.showToast('Select Gallary two');

    //   }
    //   else if(selectedPhoto4==''){
    //     HelperService.showToast('Select Gallary three');

    // }
    else {
      var body = {
        name: name,
        country: country,
        homeTown: country,
        DateOfBirth: birthDate,
        nick_name: props.getUserList?.user?.nick_name,
        interests: [
          {id: 'askljdd87sd78d67a8d6as7d8'},
          {id: 'asjkdhasd76sd5asd5assda'},
        ],
        points: props.getUserList?.user?.points,
        bio: about,
        // mutlifile:[selectedPhoto2,selectedPhoto3,selectedPhoto4],
        file: selectedPhoto1,
      };
      props.updateUserProfile({...body, token: props.route.params.token});
    }
  };

  useEffect(() => {
    if (props.updateUserProfileSuccess) {
      //   props.clearUpdateProfile();
      props.navigation.navigate('MainTabNavigation', {
        screen: 'LiveSection',
      });
    }

    //
  }, [props.updateUserProfileSuccess]);

  //   useEffect(() => {
  //     if (props.getUserList?.user) {
  //       setName(props.getUserList?.user?.name);
  //       setGender(props.getUserList?.user?.gender);
  //       setCountry(props.getUserList?.user?.country);
  //       setBirthDate(moment(props.getUserList?.user?.DateOfBirth).format('MM/DD/YYYY'));

  //       setAbout(props.getUserList?.user?.bio);
  //       if(props.getUserList?.user?.gender=='male'){
  //         setRadioSelectedItem(0)
  //       }else if(props.getUserList?.user?.gender=='female'){
  //         setRadioSelectedItem(1)

  //       }

  setSelectedPhoto1(IMAGE_URL + props.getUserList?.user?.profile);
  //     }
  //   }, [props.getUserList]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <SelectImageDialog
        ref={refImageDialog}
        onPressTakePhoto={() => {
          refImageDialog.current.close();
          setTimeout(
            function () {
              takePhotoFromCamera(selectImagePos);
            }.bind(this),
            100,
          );
        }}
        onPressChooseFromLibrary={() => {
          refImageDialog.current.close();
          setTimeout(
            function () {
              choosePhotoFromLibrary(selectImagePos);
            }.bind(this),
            100,
          );
        }}
        onPressCancel={() => {
          refImageDialog.current.close();
        }}
      />
      <StatusBar backgroundColor="transparent" translucent={true} />
      <ScrollView>
        <View
          style={{
            marginTop: 40,
            width: wp('92%'),
            alignSelf: 'center',
            flexDirection: 'row',
          }}>
          {/* <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{justifyContent: 'center'}}>
            <FontAwesome5 name={'arrow-left'} color={'#000'} size={20} />
          </TouchableOpacity> */}
          <Text
            style={{
              fontFamily: FONT_FAMILY.GILROY_MEDIUM,
              fontSize: 22,
              color: '#000',
              marginLeft: 10,
            }}>
            Welcome!
          </Text>
        </View>
        <View style={{width: wp('92%'), alignSelf: 'center'}}>
          <Text
            style={{
              fontFamily: FONT_FAMILY.GILROY_MEDIUM,
              fontSize: 13,
              color: 'rgba(0, 0, 0, 0.3)',
            }}>
            long established fact that a reader long
          </Text>
        </View>

        <Pressable
          onPress={() => {
            setSelectedImagePos('1');
            refImageDialog.current.open();
          }}
          style={{
            marginTop: 20,
            backgroundColor: 'rgba(242, 242, 242, 1)',
            width: wp('92%'),
            alignSelf: 'center',
            alignItems: 'center',
            borderRadius: 4,
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingVertical: 15,
          }}>
          <View
            style={{
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {selectedPhoto1 != '' ? (
              <Image
                resizeMode="cover"
                source={{
                  uri: selectedPhoto1,
                }}
                style={{
                  width: 30,
                  height: 30,
                  overflow: 'hidden',
                  borderRadius: 15,
                }}></Image>
            ) : (
              <FontAwesome5 name={'camera'} color={'#000'} size={30} solid />
            )}
          </View>
          <View style={{flex: 1, marginLeft: 10}}>
            <Text
              style={{
                fontFamily: FONT_FAMILY.GILROY_MEDIUM,
                fontSize: 16,
                color: '#000',
              }}>
              Avatar
            </Text>
            <Text
              style={{
                fontFamily: FONT_FAMILY.GILROY_MEDIUM,
                fontSize: 10,
                color: 'rgba(0, 0, 0, 0.3)',
              }}>
              long established fact that a reader long
            </Text>
          </View>
          <View style={{width: 20}}>
            <FontAwesome5
              name={'chevron-right'}
              size={20}
              color={'#000'}
              solid
            />
          </View>
        </Pressable>
        <View
          style={{
            marginTop: 15,
            backgroundColor: 'rgba(242, 242, 242, 1)',
            width: wp('92%'),
            alignSelf: 'center',
            alignItems: 'center',
            borderRadius: 4,
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}>
          <View style={{marginLeft: 10, flex: 1}}>
            {/* <Text
              style={{
                fontFamily: FONT_FAMILY.GILROY_MEDIUM,
                fontSize: 12,
                color: 'rgba(91, 91, 91, 1)',
              }}>
              Name
            </Text> */}
            <TextInput
              placeholderTextColor={'grey'}
              placeholder={'Name'}
              value={name}
              allowFontScaling={false}
              onChangeText={text => {
                setName(text);
              }}
              style={{
                height: 40,
                flex: 1,
                fontFamily: FONT_FAMILY.GILROY_MEDIUM,
                fontSize: 16,
                color: 'rgba(0, 0, 0, 1)',
              }}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 15,
            backgroundColor: 'rgba(242, 242, 242, 1)',
            width: wp('92%'),
            alignSelf: 'center',
            // alignItems: 'center',
            borderRadius: 4,
            // flexDirection: 'row',
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}>
          <Text
            style={{
              fontFamily: FONT_FAMILY.GILROY_MEDIUM,
              fontSize: 12,
              marginLeft: 10,
              color: 'rgba(91, 91, 91, 1)',
            }}>
            Gender
          </Text>
          <RadioGroup
            size={18}
            thickness={2}
            color={'#383838'}
            custom={true}
            style={{
              flexDirection: 'row',
              // paddingHorizontal:10
            }}
            selectedIndex={radioItem}
            onSelect={(index, value) => {
              if (index == 0) setGender('male');
              else if (index == 1) setGender('female');
            }}>
            <RadioButton color={'#383838'} value={radioItem}>
              <Text
                style={{
                  color: '#383838',
                  fontWeight: '400',
                  marginTop: 0,
                }}>
                {'Male'}
              </Text>
            </RadioButton>

            <RadioButton color={'#383838'} value={radioItem}>
              <Text
                style={{
                  color: '#383838',
                  fontWeight: '400',
                  marginTop: 0,
                }}>
                {'Female'}
              </Text>
            </RadioButton>
          </RadioGroup>
        </View>

        {/* <View
          style={{
            marginTop: 10,
            backgroundColor: 'rgba(242, 242, 242, 1)',
            width: wp('92%'),
            alignSelf: 'center',
            alignItems: 'center',
            borderRadius: 4,
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}>
          <View style={{flex: 1, marginLeft: 10}}>
            <Text
              style={{
                fontFamily: FONT_FAMILY.GILROY_MEDIUM,
                fontSize: 12,
                color: 'rgba(91, 91, 91, 1)',
              }}>
              Gender
            </Text>
            <TextInput
              value={gender}
              onChangeText={text => {
                setGender(text);
              }}
              style={{
                fontFamily: FONT_FAMILY.GILROY_MEDIUM,
                fontSize: 16,
                color: 'rgba(0, 0, 0, 1)',
              }}></TextInput>
          </View>
        </View> */}
        <View
          style={{
            marginTop: 10,
            backgroundColor: 'rgba(242, 242, 242, 1)',
            width: wp('92%'),
            alignSelf: 'center',
            alignItems: 'center',
            borderRadius: 4,
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}>
          <View style={{flex: 1, marginLeft: 10, height: 40}}>
            {/* <Text
              style={{
                fontFamily: FONT_FAMILY.GILROY_MEDIUM,
                fontSize: 12,
                color: 'rgba(91, 91, 91, 1)',
              }}>
              Home Country
            </Text> */}
            <TextInput
              placeholderTextColor={'grey'}
              value={country}
              allowFontScaling={false}
              placeholder={'Home country'}
              onChangeText={text => {
                setCountry(text);
              }}
              style={{
                fontFamily: FONT_FAMILY.GILROY_MEDIUM,
                fontSize: 16,
                color: 'rgba(0, 0, 0, 1)',
              }}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            backgroundColor: 'rgba(242, 242, 242, 1)',
            width: wp('92%'),
            alignSelf: 'center',
            alignItems: 'center',
            borderRadius: 4,
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingVertical: 15,
          }}>
          <Pressable
            onPress={() => {
              showDatePicker();
            }}
            style={{flex: 1, marginLeft: 10}}>
            {/* <Text
              style={{
                fontFamily: FONT_FAMILY.GILROY_MEDIUM,
                fontSize: 12,
                color: 'rgba(91, 91, 91, 1)',
              }}>
              DOB
            </Text> */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome5
                name={'calendar'}
                size={20}
                color={'rgba(0,0,0,0.4)'}
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontFamily: FONT_FAMILY.GILROY_MEDIUM,
                  fontSize: 16,
                  color: 'rgba(0, 0, 0, 0.4)',
                }}>
                {birthDate}
              </Text>
            </View>
          </Pressable>
        </View>
        <View
          style={{
            marginTop: 10,
            backgroundColor: 'rgba(242, 242, 242, 1)',
            width: wp('92%'),
            alignSelf: 'center',
            alignItems: 'center',
            borderRadius: 4,
            flexDirection: 'row',
            paddingHorizontal: 10,
            // paddingVertical: ,
          }}>
          <View style={{flex: 1, marginHorizontal: 10}}>
            {/* <Text
              style={{
                fontFamily: FONT_FAMILY.GILROY_MEDIUM,
                fontSize: 12,
                color: 'rgba(91, 91, 91, 1)',
              }}>
              About
            </Text> */}
            <TextInput
              placeholderTextColor={'grey'}
              value={about}
              onChangeText={text => {
                setAbout(text);
              }}
              allowFontScaling={false}
              multiline={true}
              placeholder={'About'}
              style={{
                textAlignVertical: 'top',
                minHeight: 100,
                fontFamily: FONT_FAMILY.GILROY_MEDIUM,
                fontSize: 16,
                color: 'rgba(0, 0, 0, 1)',
              }}
            />
          </View>
        </View>
        <View style={{marginTop: 10, width: wp('92%'), alignSelf: 'center'}}>
          <Text
            style={{
              fontFamily: FONT_FAMILY.GILROY_MEDIUM,
              fontSize: 16,
              color: 'rgba(0,0,0, 1)',
            }}>
            Album Images
          </Text>
          <Text
            style={{
              marginTop: 5,
              fontFamily: FONT_FAMILY.GILROY_MEDIUM,
              fontSize: 12,
              color: 'rgba(91, 91, 91, 1)',
            }}>
            Upload your best selfies to attract more users{' '}
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            width: wp('92%'),
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Pressable
            onPress={() => {
              setSelectedImagePos('2');
              refImageDialog.current.open();
            }}
            style={{
              justifyContent: 'center',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#000',
              borderStyle: 'dashed',
              width: wp('92%') / 3 - 20,
              height: wp('92%') / 3 - 20,
              overflow: 'hidden',
            }}>
            {selectedPhoto2 != '' ? (
              <ImageBackground
                resizeMode="cover"
                source={{
                  uri: selectedPhoto2,
                }}
                // key={index}
                style={{
                  width: wp('90%') / 3 - 20,
                  height: wp('90%') / 3 - 20,
                }}
                imageStyle={{borderRadius: 3}}></ImageBackground>
            ) : null}
            <View
              style={{
                position: 'absolute',
                alignSelf: 'center',
                height: 2,
                backgroundColor: '#000',
                width: '30%',
              }}
            />
            <View
              style={{
                position: 'absolute',
                alignSelf: 'center',
                height: '30%',
                backgroundColor: '#000',
                width: 2,
              }}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              setSelectedImagePos('3');
              refImageDialog.current.open();
            }}
            style={{
              justifyContent: 'center',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#000',
              borderStyle: 'dashed',
              width: wp('92%') / 3 - 20,
              height: wp('92%') / 3 - 20,
              overflow: 'hidden',
            }}>
            {selectedPhoto3 != '' ? (
              <ImageBackground
                resizeMode="cover"
                source={{
                  uri: selectedPhoto3,
                }}
                // key={index}
                style={{
                  width: wp('90%') / 3 - 20,
                  height: wp('90%') / 3 - 20,
                }}
                imageStyle={{borderRadius: 3}}></ImageBackground>
            ) : null}
            <View
              style={{
                position: 'absolute',
                alignSelf: 'center',
                height: 2,
                backgroundColor: '#000',
                width: '30%',
              }}
            />
            <View
              style={{
                position: 'absolute',
                alignSelf: 'center',
                height: '30%',
                backgroundColor: '#000',
                width: 2,
              }}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              setSelectedImagePos('4');
              refImageDialog.current.open();
            }}
            style={{
              justifyContent: 'center',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#000',
              borderStyle: 'dashed',
              width: wp('92%') / 3 - 20,
              height: wp('92%') / 3 - 20,
              overflow: 'hidden',
            }}>
            {selectedPhoto4 != '' ? (
              <ImageBackground
                resizeMode="cover"
                source={{
                  uri: selectedPhoto4,
                }}
                // key={index}
                style={{
                  width: wp('90%') / 3 - 20,
                  height: wp('90%') / 3 - 20,
                }}
                imageStyle={{borderRadius: 3}}></ImageBackground>
            ) : null}
            <View
              style={{
                position: 'absolute',
                alignSelf: 'center',
                height: 2,
                backgroundColor: '#000',
                width: '30%',
              }}
            />
            <View
              style={{
                position: 'absolute',
                alignSelf: 'center',
                height: '30%',
                backgroundColor: '#000',
                width: 2,
              }}
            />
          </Pressable>
        </View>
        <View style={{marginTop: 3, width: wp('92%'), alignSelf: 'center'}}>
          <Text
            style={{
              marginTop: 5,
              fontFamily: FONT_FAMILY.GILROY_REGULAR,
              fontSize: 12,
              color: 'rgba(0,0,0, 1)',
            }}>
            *3 pictures are mandatory
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            backgroundColor: 'rgba(242, 242, 242, 1)',
            width: wp('92%'),
            alignSelf: 'center',
            alignItems: 'center',
            borderRadius: 4,
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingVertical: 15,
          }}>
          <View style={{flex: 1, marginLeft: 10}}>
            <Text
              style={{
                fontFamily: FONT_FAMILY.GILROY_MEDIUM,
                fontSize: 16,
                color: 'rgba(91, 91, 91, 1)',
              }}>
              Facetime Verification
            </Text>
            <Text
              style={{
                fontFamily: FONT_FAMILY.GILROY_MEDIUM,
                fontSize: 10,
                color: 'rgba(0, 0, 0, 1)',
              }}>
              long established fact that a reader
            </Text>
            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                right: 0,
                top: -19,
              }}>
              <Image
                source={require('../../Assets/Images/LeftArrows.png')}
                resizeMode="contain"
                style={{height: 70, width: 70}}
              />
              <Image
                source={require('../../Assets/Images/RightArrows.png')}
                resizeMode="contain"
                style={{height: 70, width: 70}}
              />
            </View>
          </View>
        </View>
        <Pressable
          onPress={() => {
            upateProfile();
          }}>
          <LinearGradient
            colors={['rgba(72, 101, 255, 1)', 'rgba(249, 70, 253, 1)']}
            style={{
              borderRadius: 5,
              marginVertical: 20,
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              alignSelf: 'center',
              width: wp('92%'),
            }}>
            <Text
              style={{
                fontFamily: FONT_FAMILY.GILROY_MEDIUM,
                fontSize: 20,
                color: 'rgba(255,255,255, 1)',
              }}>
              Submit
            </Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  updateUserprofileLoading: state.common.updateUserprofileLoading,
  updateUserProfileSuccess: state.common.updateUserProfileSuccess,
  getUserList: state.common.getUserList,
});

const mapDispatchToProps = dispatch => ({
  clearUpdateProfile: () => {
    dispatch(CommonActions.clearUpdateProfile());
  },

  updateUserProfile: params => {
    dispatch(CommonActions.updateUserProfile(params));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(NewRegistration);
