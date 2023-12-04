import React from 'react';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import GoldStarIcon from '../../../Assets/Icons/Gold_Star.svg';
import {IMAGE_URL} from '../../../Services/Api/Common';

const AllBoys = props => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        data={props.data}
        keyExtractor={item => item.id}
        style={{marginTop: wp('2%'), width: '100%'}}
        renderItem={({item}) => {
          return (
            <>
              <View
                style={{
                  paddingVertical: hp('1%'),
                  paddingHorizontal: 5,
                  alignSelf: 'center',
                  width: '95%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Chat')}>
                  {item.profile && item.profile != '' ? (
                    <ImageBackground
                      source={{
                        uri: IMAGE_URL + item.profile,
                      }}
                      style={{height: wp('17%'), width: wp('17%')}}
                      imageStyle={{
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: wp('100%'),
                      }}
                    />
                  ) : (
                    <ImageBackground
                      source={'../../../Assets/Icons/photo.svg'}
                      style={{height: wp('17%'), width: wp('17%')}}
                      imageStyle={{
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: wp('100%'),
                      }}
                    />
                  )}
                </TouchableOpacity>
                <View
                  style={{
                    alignSelf: 'center',
                    width: '40%',
                    marginLeft: wp('2%'),
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('ViewProfile', {details: item})
                    }>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'Gilroy-SemiBold',
                        marginBottom: hp('0.5%'),
                      }}>
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 10, fontFamily: 'Gilroy-Regular'}}>
                      Udaipur, India
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginLeft: 5,
                        borderRadius: 10,
                        alignItems: 'center',
                        backgroundColor: 'rgba(243, 41, 101, 1)',
                        paddingHorizontal: 3,
                        paddingVertical: 1,
                      }}>
                      <GoldStarIcon />
                      <Text
                        style={{
                          marginLeft: 2,
                          fontSize: 10,
                          fontFamily: 'SFPRODISPLAYREGULAR',
                          fontWeight: '600',
                          color: 'rgba(255, 255, 255, 1)',
                        }}>
                        {item?.points}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('Chat')}>
                    <Image
                      source={require('../../../Assets/Icons/Message.png')}
                      style={{width: wp('12.3%'), height: wp('12.3%')}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={require('../../../Assets/Icons/Call.png')}
                      style={{width: wp('12.3%'), height: wp('12.3%')}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('VideoCall')}>
                    <Image
                      source={require('../../../Assets/Icons/VideoCall.png')}
                      style={{width: wp('12.3%'), height: wp('12.3%')}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: 'rgba(0,0,0,0.05)',
                }}
              />
            </>
          );
        }}
      />
    </View>
  );
};

export default AllBoys;
