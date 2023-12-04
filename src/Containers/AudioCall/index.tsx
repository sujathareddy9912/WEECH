import React, {Component} from 'react';
import {
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  ImageBackground,
  Button,
  TextInput,
  View,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';
// Import the RtcEngine class into your project.
import RtcEngine from 'react-native-agora';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BottomSheet from 'reanimated-bottom-sheet';
import DashIcon from '../../Assets/Icons/dash.svg';
import MuteIcon from '../../Assets/Icons/Mute.svg';
import FlipCameraIcon from '../../Assets/Icons/FlipCamera.svg';
import EndCallIcon from '../../Assets/Icons/EndCall.svg';
import ShareGiftsIcon from '../../Assets/Icons/ShareGifts.svg';
import CameraOffIcon from '../../Assets/Icons/CameraOff.svg';
import SpeakerToggleIcon from '../../Assets/Icons/SpeakerToggle.svg';

const requestCameraAndAudioPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
    if (
      granted['android.permission.RECORD_AUDIO'] ===
      PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('You can use the mic');
    } else {
      console.log('Permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
// Define a Props interface.
interface Props {}

// Define a State interface.
interface State {
  appId: string;
  token: any;
  channelName: string;
  joinSucceed: boolean;
  openMicrophone: boolean;
  enableSpeakerphone: boolean;
  peerIds: number[];
  userJoined: boolean;
  hh: string;
  mm: string;
  ss: string;
}

// Create an App component, which extends the properties of the Pros and State interfaces.
export default class App extends Component<Props, State> {
  _engine?: RtcEngine;
  // Add a constructor，and initialize this.state. You need:
  // Replace yourAppId with the App ID of your Agora project.
  // Replace yourChannel with the channel name that you want to join.
  // Replace yourToken with the token that you generated using the App ID and channel name above.
  constructor(props) {
    super(props);
    this.state = {
      appId: `63ca465868f3430b9b55ae1db7664593`,
      token: null,
      channelName: '1-2',
      openMicrophone: true,
      enableSpeakerphone: true,
      joinSucceed: false,
      peerIds: [],
      userJoined: false,
      hh: '00',
      mm: '00',
      ss: '00',
    };
    if (Platform.OS === 'android') {
      // Request required permissions from Android
      requestCameraAndAudioPermission().then(() => {
        console.log('requested!');
      });
    }
  }
  // Other code. See step 5 to step 9.
  componentDidMount() {
    this.init();
  }
  componentWillUnmount(): void {
    this._engine.removeAllListeners();
  }
  // Pass in your App ID through this.state, create and initialize an RtcEngine object.
  init = async () => {
    const {appId} = this.state;
    this._engine = await RtcEngine.create(appId);
    // Enable the audio module.
    await this._engine.enableAudio();

    // Listen for the UserJoined callback.
    // This callback occurs when the remote user successfully joins the channel.
    this._engine.addListener('UserJoined', (uid, elapsed) => {
      this.setState({userJoined: true});
      this.renderTime();
      const {peerIds} = this.state;
      if (peerIds.indexOf(uid) === -1) {
        this.setState({
          peerIds: [...peerIds, uid],
        });
      }
    });

    // Listen for the UserOffline callback.
    // This callback occurs when the remote user leaves the channel or drops offline.
    this._engine.addListener('UserOffline', (uid, reason) => {
      this._leaveChannel();
      const {peerIds} = this.state;
      this.setState({
        // Remove peer ID from state array
        peerIds: peerIds.filter(id => id !== uid),
      });
      this.props?.navigation.goBack();
    });

    // Listen for the JoinChannelSuccess callback.
    // This callback occurs when the local user successfully joins the channel.
    this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      this.setState({
        joinSucceed: true,
      });
    });
    this._joinChannel();
  };
  _joinChannel = async () => {
    await this._engine?.joinChannel(
      this.state.token,
      this.state.channelName,
      null,
      0,
    );
  };
  _switchMicrophone = () => {
    const {openMicrophone} = this.state;
    this._engine
      ?.enableLocalAudio(!openMicrophone)
      .then(() => {
        this.setState({openMicrophone: !openMicrophone});
      })
      .catch(err => {
        console.warn('enableLocalAudio', err);
      });
  };
  renderTime = () => {
    let hh: any = 0;
    let mm: any = 0;
    let ss: any = 0;
    let time: any = 0;
    setInterval(() => {
      time = Number(time) + 1;
      ss = time % 60;
      mm = Math.trunc(time / 60);
      hh = Math.trunc(time / 60 / 60);
      if (ss < 10) {
        ss = '0' + ss;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      if (hh < 10) {
        hh = '0' + hh;
      }
      this.setState({ss: ss, hh: hh, mm: mm});
    }, 1000);
  };
  // Switch the audio playback device.
  _switchSpeakerphone = () => {
    const {enableSpeakerphone} = this.state;
    this._engine
      ?.setEnableSpeakerphone(!enableSpeakerphone)
      .then(() => {
        this.setState({enableSpeakerphone: !enableSpeakerphone});
      })
      .catch(err => {
        console.warn('setEnableSpeakerphone', err);
      });
  };
  _leaveChannel = async () => {
    await this._engine?.leaveChannel();
    this.setState({peerIds: [], joinSucceed: false});
  };
  renderContent = () => (
    <View
      style={{
        backgroundColor: 'rgba(30, 30, 30, 0.85)',
        // paddingHorizontal: wp('5%'),
        // paddingTop: hp('1%'),
        height: hp('40%'),
        borderTopRightRadius: wp('3%'),
        borderTopLeftRadius: wp('3%'),
      }}>
      <View style={{height: hp('15%')}}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            height: hp('2%'),
            justifyContent: 'center',
          }}>
          <DashIcon />
        </View>
        <View
          style={{
            width: '80%',
            alignSelf: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              this._switchMicrophone();
              this.setState({openMicrophone: !this.state.openMicrophone});
            }}>
            {!this.state.openMicrophone ? (
              <MuteIcon />
            ) : (
              <MuteIcon fillOpacity="0.2" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this._switchSpeakerphone();
            }}>
            {!this.state.enableSpeakerphone ? (
              <SpeakerToggleIcon />
            ) : (
              <SpeakerToggleIcon fillOpacity="0.2" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this._leaveChannel();
              this.props?.navigation.goBack();
            }}>
            <EndCallIcon />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: '95%',
          alignSelf: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          height: hp('10%'),
          alignItems: 'center',
        }}>
        <TouchableOpacity>
          <ShareGiftsIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
  render() {
    const {channelName, joinSucceed, openMicrophone, enableSpeakerphone} =
      this.state;

    return (
      <View style={{flex: 1}}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <ImageBackground
          source={require('../../Assets/Images/blur.png')}
          style={{width: wp('100%'), height: '100%'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: hp('10%'),
              marginLeft: wp('10%'),
            }}>
            <ImageBackground
              source={require('../../Assets/Images/man.png')}
              style={{width: 65, height: 65}}
              imageStyle={{borderRadius: 100}}
            />
            <View style={{marginLeft: 10}}>
              <Text
                style={{
                  fontFamily: 'SFPRODISPLAYREGULAR',
                  fontSize: 32,
                  color: 'rgba(255, 255, 255, 1)',
                }}>
                John Smith
              </Text>
              {this.state.userJoined ? (
                <Text
                  style={{
                    fontFamily: 'SFPRODISPLAYREGULAR',
                    fontSize: 21,
                    color: 'rgba(255, 255, 255, 0.66)',
                  }}>
                  {this.state.hh}:{this.state.mm}:{this.state.ss}
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: 'SFPRODISPLAYREGULAR',
                    fontSize: 21,
                    color: 'rgba(255, 255, 255, 0.66)',
                  }}>
                  Connecting...
                </Text>
              )}
            </View>
          </View>
          <BottomSheet
            // ref={bottomSheet}
            snapPoints={[hp('28%'), hp('15%')]}
            enabledInnerScrolling={false}
            renderContent={this.renderContent}
            // enabledBottomClamp={true}
            enabledBottomInitialAnimation={true}
            enabledContentTapInteraction={false}
            // enabledHeaderGestureInteraction={false}
          />
        </ImageBackground>
      </View>
    );
    /*<View style={styles.container}>
              <View style={styles.top}>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => this.setState({ channelName: text })}
                  placeholder={'Channel Name'}
                  value={channelName}
                />
                <Button
                  onPress={joinSucceed ? this._leaveChannel : this._joinChannel}
                  title={`${joinSucceed ? 'Leave' : 'Join'} channel`}
                />
              </View>
              <View style={styles.float}>
                <Button
                  onPress={this._switchMicrophone}
                  title={`Microphone ${openMicrophone ? 'on' : 'off'}`}
                />
                <Button
                  onPress={this._switchSpeakerphone}
                  title={enableSpeakerphone ? 'Speakerphone' : 'Earpiece'}
                />
              </View>
            </View>
        ) */
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  float: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  top: {
    width: '100%',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
  },
});
