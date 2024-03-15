import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';

import { COLORS } from '../../../Utils/colors';
import { FONT_FAMILY, FONT_SIZE } from '../../../Utils/fontFamily';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    backgroundColor: COLORS.TRANSPARENT,
    height: hp(5),
    justifyContent: 'center',
    paddingHorizontal: wp(4)
  },
  title: {
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    fontSize: 24
  },
  bodyContainer: {
    flex: 0.6,
    alignItems: 'center',
    paddingVertical: hp(2)
  },
  userImg: {
    width: hp(20),
    height: hp(20),
    borderRadius: hp(10),
  },
  imgContainer: {
    width: hp(21),
    height: hp(21),
    borderRadius: hp(10.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  crownContainer: {
    flexDirection: 'row',
    paddingHorizontal: wp(2),
    backgroundColor: COLORS.LIGHT_MAGENTA,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(2)
  },
  flag: {
    width: hp(2),
    height: hp(2)
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(1)
  },
  endedText: {
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    fontSize: 22,
    marginTop: hp(3),
    marginBottom: hp(1)
  },
  durationContainer: {
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    width: wp(92),
    justifyContent: 'space-between'
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: COLORS.WHITE,
    width: wp(30),
    height: hp(20),
    borderRadius: 12,
    marginRight: wp(2),
    overflow: 'hidden',
  },
  liveImgContainer: {
    width: wp(30),
    height: hp(20),
    borderRadius: 12,
    overflow: 'hidden',
    paddingVertical: hp(1),
    paddingHorizontal: wp(1),
  },
  btn: {
    backgroundColor: COLORS.LIGHT_MAGENTA,
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    bottom: hp(-1.5),
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(6),
    borderRadius: 20
  },
  joinText: {
    color: COLORS.WHITE,
  },
  followContainer: {
    backgroundColor: COLORS.LIGHT_MAGENTA,
    paddingVertical: hp(0.3),
    paddingHorizontal: wp(2),
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    bottom: hp(4),
    right: wp(-15),
  },
  follow: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontWeight: 'bold',
    color: COLORS.WHITE
  },
  buttonStyle: {
    backgroundColor: COLORS.BABY_PINK,
    alignSelf: 'center',
    height: hp(7),
    marginTop:hp(1)
  },
  btntext: {
    fontSize: FONT_SIZE.SEMI,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD
  },
  modalContainer: {
    flex: 0.5,
    backgroundColor: COLORS.WHITE,
    width: wp(90),
    height: hp(50),
    borderRadius: 15,
    alignItems:'center',
    justifyContent:'flex-end',
    paddingBottom:hp(2)
  },
  modalText:{
    width:wp(75),
    textAlign:'center',
    fontSize:FONT_SIZE.LARGE,
    marginVertical:hp(1)
  }
});
