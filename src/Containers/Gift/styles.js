import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../../Utils/fontFamily';
import {dynamicSize} from '../../Utils/responsive';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-between',
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    backgroundColor: COLORS.LIGHT_PINK,
    paddingTop: hp(5),
    height: hp(12),
  },
  title: {
    color: COLORS.BLACK,
    fontWeight: '700',
  },
  textStyle: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    color: COLORS.BLACK,
    fontSize: FONT_SIZE.MEDIUM,
    fontWeight: '400',
    marginHorizontal: dynamicSize(15),
    textAlign: 'center',
  },
  inFocusedTextStyle: {
    fontWeight: '700',
    backgroundColor: COLORS.LIGHT_BABY_PINK,
    paddingHorizontal: dynamicSize(15),
    paddingVertical: dynamicSize(3),
    borderRadius: 20,
    textAlign: 'center',
  },
  toptabContainer: {
    flexDirection: 'row',
    paddingTop: dynamicSize(10),
    paddingBottom: dynamicSize(10),
    alignSelf: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    elevation: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  listRenderContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    padding: dynamicSize(10),
  },

  // Gift Render FlatList
  renderingContainer:{
    backgroundColor: COLORS.LIGHT_PINK,
    padding: dynamicSize(5),
    marginVertical: dynamicSize(10),
    flexDirection: 'row',
    elevation: 3,
    borderRadius: 5,
  },
  renderingIconStyle: {
    width: dynamicSize(55),
    height: dynamicSize(55),
    borderRadius: 5,
    elevation: 3,
  },
  renderingDetailsContainer: {
    paddingLeft: dynamicSize(5),
  },
  renderingTextStyle: {
    color: COLORS.BLACK,
  },

});
