import {Platform, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../../Utils/fontFamily';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Utils/helper';
import {dynamicSize} from '../../Utils/responsive';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  secondPartyVideoContainer: {
    flex: 1,
    height: '100%',
    width: SCREEN_WIDTH,
    position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
  },
  flag: {
    width: dynamicSize(22),
    height: dynamicSize(16),
  },
  firstPartyVideoContainer: {
    position: 'absolute',
    zIndex: 10,
    bottom: dynamicSize(50),
    right: 0,
    width: SCREEN_WIDTH / 3,
    height: SCREEN_HEIGHT / 4.5,
    borderRadius: dynamicSize(7),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.WHITE,
    marginHorizontal: dynamicSize(15),
    overflow: 'hidden',
  },
  nameContainer: {
    position: 'absolute',
    width: SCREEN_WIDTH / 2,
    top: hp(2),
    paddingHorizontal: wp(5),
  },
  nameContainerAudio: {
    alignSelf: 'center',
    textAlign: 'center',
    position: 'absolute',
    zIndex: 10,
    top: 40,
  },
  name: {
    alignSelf: 'flex-start',
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.MID_BOLD,
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
  },
  time: {
    fontSize: FONT_SIZE.LARGE,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    color: COLORS.WHITE,
    fontWeight: '600',
  },
  nameAudio: {
    width: wp(50),
    alignSelf: 'center',
    textAlign: 'center',
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.MID_BOLD,
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
    // fontWeight: '600',
  },
  timeAudio: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: FONT_SIZE.LARGE,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    color: COLORS.WHITE,
    marginVertical: hp(1.5),
    fontWeight: '600',
  },
  infoCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(20),
    alignSelf: 'center',
    alignItems: 'center',
  },
  genderCon: {
    paddingHorizontal: wp(2),
  },
  videoContainer: {
    width: '100%',
    height: '100%',
  },
  imageBackgroundStyle: {
    width: SCREEN_WIDTH,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F5FF2',
  },
  blurViewStyle: {
    width: SCREEN_WIDTH,
    position: 'absolute',
  },
  profileStyle: {
    width: SCREEN_WIDTH / 1.7,
    height: SCREEN_WIDTH / 1.7,
    borderRadius: wp(100),
    backgroundColor: COLORS.LIGHT_GREY,
    marginTop: 40,
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#0055cc',
    margin: 5,
  },
  main: {flex: 1, alignItems: 'center'},
  scroll: {flex: 1, backgroundColor: '#ddeeff', width: '100%'},
  uservideo: {
    width: '100%',
    height: SCREEN_HEIGHT,
  },
  remoteView: {
    position: 'absolute',
    bottom: 160,
    right: 16,
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_WIDTH * 0.4,
    minWidth: 72,
    minHeight: 96,
    borderRadius: 8,
  },
  scrollContainer: {alignItems: 'center'},
  videoView: {width: '90%', height: 200},
  btnContainer: {flexDirection: 'row', justifyContent: 'center'},
  head: {fontSize: 20},
  info: {backgroundColor: '#ffffe0', color: '#0000ff'},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red', // Transparent background
    height: SCREEN_HEIGHT,
    width:SCREEN_WIDTH,
    padding:16
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width:'100%',
    height:160
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  okButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  okText: {
    color: 'white',
    fontSize: 16,
    textAlign:'center'
  },
});

export default styles;
