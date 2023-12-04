import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';

import { COLORS } from '../../../Utils/colors';
import { FONT_FAMILY } from '../../../Utils/fontFamily';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  title: {
    color: COLORS.BLACK
  },
  header: {
    backgroundColor: COLORS.OFFWHITE,
    paddingTop: hp(5),
    height: hp(12),
    borderBottomWidth: 0.5
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(1.5),
  },
  itemText: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp(3),
  },
  bodyContainer: {
    paddingHorizontal: wp(4),
  },
  card: {
    paddingVertical: hp(2),
    paddingLeft: wp(4),
    borderRadius: 8,
    height: hp(20),
    width: wp(45.5),
    justifyContent: 'space-between'
  },
  cardTitle: {
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    color: COLORS.WHITE,
    fontSize: 20,
    zIndex: 1
  },
  dollor: {
    zIndex: 0,
  },
  dollorContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: hp(0),
    right: wp(0)
  },
  coin: {
    zIndex: 0,
    opacity: 0.4,
  },
  dimondContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  weeklyContainer: {
    backgroundColor: COLORS.OFFWHITE,
    borderRadius: 10,
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
  },
  bar: {
    height: hp(23),
  },
  chartTitle: {
    color: COLORS.NAVY_BLUE,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontWeight: 'bold',
    fontSize: 16
  },
  detailContainer: {
    backgroundColor: COLORS.OFFWHITE,
    borderRadius: 10,
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp(1)
  },
  detailText: {
    color: COLORS.NAVY_BLUE,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontWeight: 'bold',
    fontSize: 16,
  },
  todayContainer: {
    backgroundColor: COLORS.OFFWHITE,
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    marginVertical: hp(1)
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  box: {
    backgroundColor: COLORS.WHITE,
    flex: 0.5,
    alignItems: 'flex-start',
    paddingLeft: wp(2),
    paddingVertical: hp(1),
    borderBottomWidth: 1,
    borderColor: COLORS.LIGHT_GREY_OFFSET
  },
  agentContainer: {
    backgroundColor: COLORS.DARK_BLUE,
    paddingVertical: hp(1),
    paddingHorizontal: wp(3)
  },
  agentText: {
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  logoContainer: {
    width: hp(4),
    height: hp(4),
    borderRadius: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    overflow: 'hidden',
    marginRight:wp(2)
  }
});
