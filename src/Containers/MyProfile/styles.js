import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {StyleSheet} from 'react-native';
import {COLORS} from '../../Utils/colors';
import {FONT_FAMILY} from '../../Utils/fontFamily';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
  },
  headerContainer: {
    backgroundColor: 'transparent',
    // position: 'absolute',
    // zIndex: 100,
  },
  coverImage: {
    width: wp(100),
    height: hp(45),
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  profileInfoContainer: {
    alignItems: 'center',
    marginTop: wp(-15),
  },
  name: {
    fontSize: 18,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    marginTop: wp(1),
    color: COLORS.BLACK
  },
  weechaId: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    marginTop: wp(1),
    color: COLORS.BLACK
  },
  avatarContainer: {
    height: wp(25),
    width: wp(25),
    borderRadius: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    height: wp(23),
    width: wp(23),
    borderRadius: wp(100),
  },
  socialInfoContainer: {
    width: wp(100),
    marginTop: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  socialInfo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoNumeric: {
    fontSize: 15,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    color: COLORS.MALEbLUE,
  },
  socialTitle: {
    color: COLORS.BLACK
  },
  list: {
    marginBottom: hp(10),
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wp(4),
    paddingHorizontal: wp(5),
    justifyContent: 'space-between',
  },
  iconLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listLabel: {
    fontSize: 16,
    marginLeft: wp(4),
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    color: COLORS.BLACK
  },
  rightComponent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weechaLevel: {
    borderRadius: wp(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(2),
    backgroundColor: COLORS.LIGHT_MAGENTA,
  },
  chipsText: {
    marginLeft: wp(1),
    color: COLORS.WHITE,
  },
  locationContainer: {
    marginVertical: wp(5),
  },
  locationInputHeader: {
    flexDirection: 'row',
    width: wp('92%'),
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginBottom: wp(2),
  },
  locationText: {
    fontFamily: FONT_FAMILY.GILROY_SEMIBOLD,
    fontSize: 16,
    color: COLORS.BLACK,
  },
  currLocation: {
    fontFamily: FONT_FAMILY.GILROY_SEMIBOLD,
    fontSize: 16,
    color: 'rgba(36, 125, 207, 1)',
  },
  locationInput: {
    height: hp('5.5%'),
    borderWidth: 1,
    width: wp('92%'),
    alignSelf: 'center',
    borderRadius: 5,
    borderColor: 'rgba(198, 198, 198, 1)',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: wp(3),
  },
  location: {
    fontFamily: FONT_FAMILY.GILROY_REGULAR,
    fontSize: 16,
    color: 'rgba(41, 41, 41, 1)',
  },
  thumbStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#383838',
  },
  thumbActive: {
    width: 4,
    height: 10,
    borderRadius: 30,
    backgroundColor: COLORS.SWITCH_ORANGE,
  },
  thumbInActive: {
    width: 4,
    height: 10,
    borderRadius: 30,
    backgroundColor: COLORS.TEXT_GRAY,
  },
  rightHeaderComponent: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  edit: {
    fontSize: 18,
    marginLeft: wp(2),
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
  },
  cameraCon: {
    width: wp(10),
    height: wp(10),
    position: 'absolute',
    alignItems: 'center',
    borderRadius: wp(100),
    top: wp(2),
    right: wp(5),
    justifyContent: 'center',
    backgroundColor: '#C4C4C4',
  },
});
