import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {COLORS} from '../../../Utils/colors';
import {SCREEN_WIDTH} from '../../../Utils/helper';
import {dynamicSize} from '../../../Utils/responsive';

export const styles = StyleSheet.create({
  avatar: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(100),
  },
  heading: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
  },
  info: {
    width: wp(55),
    marginLeft: wp(2),
  },
  lastMsg: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: COLORS.TEXT_GRAY,
    marginLeft: wp(1),
  },
  imgInfo: {
    flexDirection: 'row',
  },
  time: {
    fontSize: 13,
    width: wp(22),
    color: COLORS.TEXT_GRAY,
  },
  flatList: {
    backgroundColor: COLORS.WHITE,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    paddingVertical: wp(4),
    flexDirection: 'row',
    paddingHorizontal: wp(3),
    justifyContent: 'space-between',
    backgroundColor: COLORS.WHITE,
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: wp(5),
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: wp(25),
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: COLORS.MAGENTA_ONE,
    right: 0,
  },
  trash: {
    width: wp(25),
  },
  delete: {
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.WHITE,
  },
  callInfoCon: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: dynamicSize(5),
  },
});
