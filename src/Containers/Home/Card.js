import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VideoCall from '../../Assets/Icons/VideoCallNew.svg';
import AudioCall from '../../Assets/Icons/AudioCallNew.svg';
import TextMessage from '../../Assets/Icons/MessageNew.svg';
import Diamonds from '../../Assets/Icons/diamonds.svg';
import India from '../../Assets/Icons/india.svg';
import InAppCallReceiving from '../../Contexts/InAppCallReceiving';
import {IMAGE_URL} from '../../Services/Api/Common';
import { FONT_FAMILY } from '../../Utils/fontFamily';

const Card = props => {
  const receiveCall = React.useContext(InAppCallReceiving);
  return (
    <View
      style={{
        height: hp('100%') - hp('3%') - hp('4%') - wp('6%') - hp('13%'),
        width: wp('100%'),
        zIndex: 2,
        borderBottomLeftRadius: wp('5%'),
        borderBottomRightRadius: wp('5%'),
        overflow: 'hidden',
        elevation: 0.3,
      }}>
      <Image
        source={props.data.imageUrl}
        style={{height: '100%', width: '100%'}}
        resizeMode="cover"
      />
      <View
        style={{
          height: '22%',
          width: '22%',
          backgroundColor: 'rgba(0,0,0,0.4)',
          borderWidth: 2,
          borderColor: 'white',
          position: 'absolute',
          right: '5%',
          top: '2%',
          borderRadius: 10,
          overflow: 'hidden',
        }}>
        <Image
          source={props.data.imageUrl}
          style={{height: '100%', width: '100%'}}
          resizeMode="cover"
        />
        <Text
          style={{
            position: 'absolute',
            left: '10%',
            top: '2%',
            fontFamily: FONT_FAMILY.ROBOTO_BLACK,
            fontWeight: 'bold',
            fontStyle: 'italic',
            color: 'white',
          }}>
          Live
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          alignSelf: 'baseline',
          position: 'absolute',
          bottom: 0,
          zIndex: 2,
          backgroundColor: 'rgba(0,0,0,0.1)',
        }}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('ViewProfile', {details: props.data})
          }
          style={{marginLeft: 20, marginTop: 10}}>
          <Text
            style={{
              fontFamily: FONT_FAMILY.GILROY_BOLD,
              fontSize: 20,
              color: 'white',
              alignSelf: 'baseline',
            }}>
            {props.data.name}, {props.data.age}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'baseline',
            marginLeft: 20,
            marginTop: 5,
            height: 25,
            alignItems: 'center',
          }}>
          <Diamonds width={'24'} height={'24'} />
          <Text
            style={{
              fontFamily: FONT_FAMILY.GILROY_BOLD,
              fontSize: 16,
              color: 'white',
              alignSelf: 'baseline',
              marginLeft: 5,
            }}>
            {props.data.rate}/min
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'baseline',
            marginLeft: 20,
            marginTop: 5,
            height: 25,
            alignItems: 'center',
          }}>
          <India width={'24'} height={'24'} />
          <Text
            style={{
              fontFamily: FONT_FAMILY.GILROY_BOLD,
              fontSize: 16,
              color: 'white',
              alignSelf: 'baseline',
              marginLeft: 5,
            }}>
            {props.data?.homeTown}
          </Text>
        </View>
        <View
          style={{
            marginVertical: 5,
            height: 70,
            flexDirection: 'row',
            alignItems: 'center',
            width: '70%',
            alignSelf: 'center',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('AudioCall')}>
            <AudioCall height={'64'} width={'64'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('VideoCall');
            }}>
            <VideoCall height={'80'} width={'80'} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              receiveCall.sendChannelMessage('1-2', 'Hello');
              props.navigation.navigate('Chat');
            }}>
            <TextMessage height={'64'} width={'64'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Card;
