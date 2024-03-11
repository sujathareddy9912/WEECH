import React from 'react';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import StarFav from '../../../Assets/Icons/star_pro.svg';
import {IMAGE_URL} from '../../../Services/Api/Common';
import { FONT_FAMILY } from '../../../Utils/fontFamily';

const AllGirls = props => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        data={props.data}
        keyExtractor={item => item.id}
        numColumns={2}
        style={{marginTop: wp('2%')}}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                props.navigation.navigate('ViewProfile', {details: item})
              }
              style={{
                width: '50%',
                alignItems: 'center',
                marginBottom: wp('1%'),
              }}>
              <ImageBackground
                // source={{
                //   uri: IMAGE_URL + item.profile,
                // }}
                source={item.image}
                style={{
                  height: wp('49%'),
                  overflow: 'hidden',
                  borderRadius: wp('3%'),
                  width: wp('49%'),
                }}
                imageStyle={{borderRadius: wp('3%')}}>
                <View
                  style={{
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    bottom: 5,
                    height: 17 + wp('2%'),
                    marginHorizontal: wp('1%'),
                    width: wp('47%'),
                    flexDirection: 'row',
                    alignSelf: 'baseline',
                  }}>
                  <View
                    style={{
                      alignSelf: 'baseline',
                      backgroundColor: 'white',
                      borderRadius: 100,
                      padding: wp('1%'),
                    }}>
                    <StarFav />
                  </View>
                  <View style={{margin: 0}}>
                    <Text
                      style={{
                        marginRight: wp('1%'),
                        borderRadius: 100,
                        backgroundColor: '#fff',
                        paddingHorizontal: wp('2%'),
                        paddingVertical: wp('1%'),
                        alignSelf: 'center',
                        fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
                        fontSize: 10,
                        color: 'rgba(241, 86, 125, 1)',
                        maxWidth: wp('48%') / 1.1,
                      }}>
                      {item.name}, {item.age}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default AllGirls;
