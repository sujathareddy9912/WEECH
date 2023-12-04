import React from 'react'
import { View, Text, StatusBar, ImageBackground, Image, TouchableOpacity} from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BottomSheet from 'reanimated-bottom-sheet';
import DashIcon from '../../Assets/Icons/dash.svg'
import MuteIcon from '../../Assets/Icons/Mute.svg'
import FlipCameraIcon from '../../Assets/Icons/FlipCamera.svg'
import EndCallIcon from '../../Assets/Icons/EndCall.svg'
import ShareGiftsIcon from '../../Assets/Icons/ShareGifts.svg'
import CameraOffIcon from '../../Assets/Icons/CameraOff.svg'
import SpeakerToggleIcon from '../../Assets/Icons/SpeakerToggle.svg'

const AudioCall = (props) => {
    const bottomSheet = React.useRef()
    // React.useEffect(() => {
    //     StatusBar.setHidden(true, true);
    // })
    React.useEffect(() => {

    }, [])
    const renderContent = () => (
        <View
          style={{
            backgroundColor: 'rgba(30, 30, 30, 0.85)',
            // paddingHorizontal: wp('5%'),
            // paddingTop: hp('1%'),
            height: hp('40%'),
            borderTopRightRadius: wp('3%'),
            borderTopLeftRadius: wp('3%'),

          }}
        ><View style={{height: hp('15%')}}>
            <View style={{width: '100%', alignItems: 'center', height: hp('2%'), justifyContent: 'center'}}>
                <DashIcon />
            </View>
            <View style={{width: '80%', alignSelf: 'center', justifyContent: 'space-between', flexDirection: 'row', flex: 1, alignItems: 'center'}}>
            <TouchableOpacity><MuteIcon /></TouchableOpacity>
            <TouchableOpacity><SpeakerToggleIcon /></TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.goBack()}><EndCallIcon /></TouchableOpacity>
            </View>
            </View>
            <View style={{width: '95%', alignSelf: 'center',  justifyContent: 'center', flexDirection: 'row', height: hp('10%'),alignItems: 'center'}}>
            <TouchableOpacity><ShareGiftsIcon /></TouchableOpacity>
            </View>
        </View>
      );
      const renderHeader = () => (
        <View
          style={{
            backgroundColor: 'red',
            padding: 16,
            height: 100,
          }}
        >
          <Text>Header</Text>
        </View>
      );
    return (
        
        <View style={{flex: 1}}>
            <StatusBar translucent={true} backgroundColor="transparent" />
            <ImageBackground source={require('../../Assets/Images/blur.png')} style={{width: wp('100%'), height: '100%'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: hp('10%'), marginLeft: wp('10%')}}>
              <ImageBackground source={require('../../Assets/Images/man.png')} style={{width: 65, height: 65}} imageStyle={{borderRadius: 100}} />
              <View style={{marginLeft: 10}}>
              <Text style={{fontFamily: 'SFPRODISPLAYREGULAR', fontSize: 32, color: 'rgba(255, 255, 255, 1)'}}>John Smith</Text>
              <Text style={{fontFamily: 'SFPRODISPLAYREGULAR', fontSize: 21, color: 'rgba(255, 255, 255, 0.66)'}}>00:03</Text>
              </View>
            </View>
            <BottomSheet
            ref={bottomSheet}
            snapPoints={[hp('28%'), hp('15%')]}
            enabledInnerScrolling={false}
            
            renderContent={renderContent}
            // enabledBottomClamp={true}
            enabledBottomInitialAnimation={true}
            enabledContentTapInteraction={false}
            // enabledHeaderGestureInteraction={false}
      />
            </ImageBackground>
        </View>
    )
}

export default AudioCall
