import {StyleSheet} from 'react-native';
import {COLORS} from '../../../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../../../Utils/fontFamily';
import {SCREEN_HEIGHT} from '../../../Utils/helper';
import {dynamicSize} from '../../../Utils/responsive';

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    paddingHorizontal: dynamicSize(25),
    alignItems: 'center',
    justifyContent:'space-between',
    flexGrow:1,
    paddingBottom:dynamicSize(60)
  },
  header: {
    backgroundColor: 'transparent',
    height:dynamicSize(60),
    paddingTop:0
  },
  backContainer:{
    flexDirection:'row',
    alignItems:'center',
  },
  forgotLabel: {
    fontSize: FONT_SIZE.LARGE,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    color: COLORS.MAGENTA,
  },
  marginTop: {
    width: '90%',
    marginTop: SCREEN_HEIGHT * 0.035,
  },
  rowContainer: {
    width: '40%',
    marginRight: '5%',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    marginTop: dynamicSize(10),
  },
  smallText: {
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    color: COLORS.VIOLET,
  },
  textCenter: {
    textAlign: 'center',
  },
  buttonStyle: {
    marginTop: SCREEN_HEIGHT * 0.05,
    borderRadius:8,
    borderWidth:1
  },
  marginMidTop: {
    width: '90%',
    marginTop: SCREEN_HEIGHT * 0.015,
  },
  headerBackIcon: {
    position: 'absolute',
    alignSelf: 'flex-start',
    marginLeft: dynamicSize(25),
  },
});

export default styles;
